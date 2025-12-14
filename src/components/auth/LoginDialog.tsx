'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoginForm from '@/components/auth/LoginForm';
import { Car } from 'lucide-react';
import Link from 'next/link';

export default function LoginDialog() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.push('/')}>
      <DialogContent className="sm:max-w-md" hideCloseButton={true}>
        <DialogHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Car className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-headline">Welcome back to Rideasy</DialogTitle>
          <DialogDescription>Sign in to your account to continue</DialogDescription>
        </DialogHeader>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
