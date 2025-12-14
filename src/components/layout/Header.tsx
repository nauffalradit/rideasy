'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car, LogOut, LayoutDashboard, CarFront, MapPin, Settings, User as UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

const navLinks = [
  { href: '/', labelKey: 'dashboard', icon: LayoutDashboard },
  { href: '/vehicles', labelKey: 'vehicles', icon: CarFront },
  { href: '/tracking', labelKey: 'liveMap', icon: MapPin },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: t('signOutSuccessTitle'),
        description: t('signOutSuccessDesc'),
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('signOutErrorTitle'),
        description: error.message,
      });
    }
  };
  
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Rideasy Admin</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80 flex items-center gap-2',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              <link.icon className="h-4 w-4" />
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isUserLoading ? (
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || 'Admin User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>{t('myProfile')}</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t('settings')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className='flex items-center gap-2'>
               <Button asChild variant="ghost">
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t('register')}</Link>
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-8">
                  <Link href="/" className="flex items-center space-x-2 mb-4">
                    <Car className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Rideasy Admin</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg flex items-center gap-2"
                    >
                      <link.icon className="h-5 w-5" />
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
