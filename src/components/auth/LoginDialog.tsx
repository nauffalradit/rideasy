'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import LoginForm from '@/components/auth/LoginForm';
import { Car } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

export default function LoginDialog() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.push('/')}>
      <DialogContent className="sm:max-w-md p-0" hideCloseButton={true}>
         <div className="p-6">
             <CardHeader className="text-center p-2">
                <div className="flex justify-center items-center mb-4">
                    <Car className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline">Welcome back to Rideasy</CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline">
                Sign up
                </Link>
            </div>
         </div>
      </DialogContent>
    </Dialog>
  );
}
