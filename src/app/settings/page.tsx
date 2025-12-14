'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Globe, Palette, Bell, MapPin, Shield, Lock, Info, Landmark } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function SettingsPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const handleSaveChanges = () => {
    toast({
      title: t('settingsSavedTitle'),
      description: t('settingsSavedDesc'),
    });
    // Optional: force a reload if needed, though context should update UI.
    window.location.reload();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('settings')}</h2>
          <p className="text-muted-foreground">
            {t('settingsDesc')}
          </p>
        </div>
        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifikasi */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6" />
                  <div>
                    <CardTitle>{t('notifications')}</CardTitle>
                    <CardDescription>
                      {t('notificationsDesc')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('enableAllNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('enableAllNotificationsDesc')}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{t('rentalDueReminder')}</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{t('lateReturnNotification')}</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{t('bookingStatusNotification')}</Label>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Lokasi & Tracking */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <CardTitle>{t('locationAndTracking')}</CardTitle>
                    <CardDescription>
                      {t('locationAndTrackingDesc')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('allowLocationAccess')}</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                    <Label className="text-base">{t('realtimeLocationRefresh')}</Label>
                     <RadioGroup defaultValue="active" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="loc-active" />
                            <Label htmlFor="loc-active">{t('active')}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="saver" id="loc-saver" />
                            <Label htmlFor="loc-saver">{t('batterySaver')}</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gps-interval">{t('gpsUpdateInterval')}</Label>
                    <Input id="gps-interval" type="number" placeholder={t('gpsIntervalPlaceholder')} defaultValue={5}/>
                </div>
              </CardContent>
            </Card>

             {/* Privasi & Data */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <CardTitle>{t('privacyAndData')}</CardTitle>
                    <CardDescription>{t('privacyAndDataDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('vehicleTrackingConsent')}</Label>
                    <p className="text-sm text-muted-foreground">
                        {t('vehicleTrackingConsentDesc')}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t('privacyPolicy')}</Label>
                  </div>
                  <Button variant="secondary" asChild><Link href="/privacy-policy">{t('view')}</Link></Button>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Bahasa */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  <div>
                    <CardTitle>{t('language')}</CardTitle>
                    <CardDescription>{t('languageDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'id')}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('languagePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Mata Uang */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Landmark className="w-6 h-6" />
                  <div>
                    <CardTitle>{t('currency')}</CardTitle>
                    <CardDescription>{t('currencyDesc')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={currency} onValueChange={(value) => setCurrency(value as 'USD' | 'IDR')}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('currencyPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="IDR">IDR (Rp)</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tema Tampilan */}
            <Card>
              <CardHeader>
                 <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6" />
                    <div>
                        <CardTitle>{t('displayTheme')}</CardTitle>
                        <CardDescription>{t('displayThemeDesc')}</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="system" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">{t('lightMode')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">{t('darkMode')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">{t('followSystem')}</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Keamanan Aplikasi */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6" />
                    <div>
                        <CardTitle>{t('appSecurity')}</CardTitle>
                        <CardDescription>{t('appSecurityDesc')}</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">{t('changePassword')}</Button>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{t('autoLogout')}</Label>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timeout-app">{t('appTimeout')}</Label>
                    <Input id="timeout-app" type="number" placeholder={t('appTimeoutPlaceholder')}/>
                </div>
              </CardContent>
            </Card>
            
            {/* Tentang Aplikasi */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Info className="w-6 h-6"/>
                        <div>
                            <CardTitle>{t('aboutApp')}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>{t('appVersion')}:</span> <span>1.0.0</span></div>
                    <div className="flex justify-between"><span>{t('developer')}:</span> <span>Rideasy Team</span></div>
                    <Separator/>
                    <Button variant="link" className="p-0 h-auto" asChild><Link href="/terms">{t('termsAndConditions')}</Link></Button>
                    <br/>
                    <Button variant="link" className="p-0 h-auto" asChild><Link href="/contact">{t('contactSupport')}</Link></Button>
                </CardContent>
            </Card>
          </div>
        </div>
        <Button onClick={handleSaveChanges}>{t('saveChanges')}</Button>
      </div>
    </div>
  );
}
