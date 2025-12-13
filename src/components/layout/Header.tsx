'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car, LogOut, LayoutDashboard, CarFront, Users, MapPin, Settings } from 'lucide-react';
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

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vehicles', label: 'Vehicles', icon: CarFront },
  { href: '/tracking', label: 'Live Map', icon: MapPin },
  { href: '/users', label: 'Users', icon: Users },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign Out Error',
        description: error.message,
      });
    }
  };
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
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
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isUserLoading ? (
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
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
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className='flex items-center gap-2'>
               <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
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
                      {link.label}
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
