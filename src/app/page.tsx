'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Car, Loader2 } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';

function DashboardLoading() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <Skeleton className="h-9 w-48" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-3 w-48 mt-1" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return <DashboardLoading />;
  }

  const stats = [
    { titleKey: "totalRevenue", value: "$45,231.89", icon: DollarSign, changeKey: "fromLastMonth" },
    { titleKey: "activeRentals", value: "+23", icon: ShoppingBag, changeKey: "fromLastMonth" },
    { titleKey: "newUsers", value: "+57", icon: Users, changeKey: "fromLastMonth" },
    { titleKey: "vehiclesAvailable", value: "8", icon: Car, changeKey: "sinceLastMonth" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.titleKey}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t(stat.titleKey)}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.changeKey === 'fromLastMonth' ? `+20.1% ${t(stat.changeKey)}` : `+2 ${t(stat.changeKey)}`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('recentRentals')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t('recentRentalsDesc')}</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('vehicleOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
             <p>{t('vehicleOverviewDesc')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
