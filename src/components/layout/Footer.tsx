import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Car className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold font-headline text-lg">Rideasy</span>
          </div>
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Rideasy. All rights reserved.
          </div>
          <nav className="flex space-x-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
