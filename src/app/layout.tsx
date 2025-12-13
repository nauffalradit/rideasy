import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import { FirebaseClientProvider } from '@/firebase';
import { VehicleProvider } from '@/context/VehicleContext';

export const metadata: Metadata = {
  title: 'Rideasy - Vehicle Rentals Made Easy',
  description: 'Browse and book your perfect ride, from cars to motorcycles, in just a few clicks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen bg-muted/40')}>
        <FirebaseClientProvider>
          <VehicleProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Toaster />
          </VehicleProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}