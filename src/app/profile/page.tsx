'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Camera, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const { t } = useTranslation();

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    const name = user?.displayName;
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };
  
  const handleSaveChanges = () => {
    toast({
      title: t('profileUpdatedTitle'),
      description: t('profileUpdatedDesc'),
    });
  };
  
  if (isUserLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-6">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Separator />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
             <Skeleton className="h-8 w-40" />
             <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2">
                 <Skeleton className="h-10 w-32" />
                 <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-36 ml-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 text-center">
            <h2 className="text-2xl font-bold">{t('accessDenied')}</h2>
            <p className="text-muted-foreground">{t('pleaseLogin')}</p>
            <Button asChild>
                <Link href="/login">{t('login')}</Link>
            </Button>
        </div>
    )
  }

  const [firstName, lastName] = user.displayName?.split(' ') || ['', ''];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('myProfile')}</h2>
          <p className="text-muted-foreground">
            {t('myProfileDesc')}
          </p>
        </div>
        <Separator />

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserIcon className="w-6 h-6" />
              <div>
                <CardTitle>{t('personalInfo')}</CardTitle>
                <CardDescription>
                  {t('personalInfoDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="w-24 h-24 text-4xl">
                  <AvatarImage src={user.photoURL || ''} alt={t('profilePhotoAlt')} />
                  <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white"/>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                 <Button variant="outline">{t('uploadNewPhoto')}</Button>
                 <Button variant="ghost" className='text-destructive hover:text-destructive'>{t('removePhoto')}</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('firstName')}</Label>
                <Input id="firstName" defaultValue={firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('lastName')}</Label>
                <Input id="lastName" defaultValue={lastName} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">{t('emailAddress')}</Label>
                <Input id="email" type="email" defaultValue={user.email || ''} disabled />
              </div>
               <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">{t('phoneNumber')}</Label>
                <Input id="phone" type="tel" placeholder={t('phonePlaceholder')} defaultValue={user.phoneNumber || ''} />
              </div>
            </div>
            <div className='flex justify-end'>
                <Button onClick={handleSaveChanges}>{t('saveChanges')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
