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
import { Globe, Palette, Bell, MapPin, Shield, Lock, Info } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Perubahan Anda telah berhasil disimpan.',
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
          <p className="text-muted-foreground">
            Kelola preferensi akun dan aplikasi Anda.
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
                    <CardTitle>Notifikasi</CardTitle>
                    <CardDescription>
                      User pegang kendali, tidak berisik.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Aktifkan Semua Notifikasi</Label>
                    <p className="text-sm text-muted-foreground">
                      Satu tombol untuk mengontrol semua notifikasi.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Reminder Jatuh Tempo Sewa</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Telat Pengembalian</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Status Booking</Label>
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
                    <CardTitle>Lokasi & Tracking</CardTitle>
                    <CardDescription>
                      Transparan, tidak terasa “mengintai” 📍
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Izinkan Akses Lokasi</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                    <Label className="text-base">Refresh Lokasi Real-time</Label>
                     <RadioGroup defaultValue="active" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="loc-active" />
                            <Label htmlFor="loc-active">Aktif</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="saver" id="loc-saver" />
                            <Label htmlFor="loc-saver">Hemat Baterai</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gps-interval">Interval Update GPS (detik)</Label>
                    <Input id="gps-interval" type="number" placeholder="Contoh: 5" defaultValue={5}/>
                </div>
              </CardContent>
            </Card>

             {/* Privasi & Data */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <CardTitle>Privasi & Data</CardTitle>
                    <CardDescription>Rapi dan aman.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Persetujuan Pelacakan Kendaraan</Label>
                    <p className="text-sm text-muted-foreground">
                        Data lokasi hanya digunakan selama masa sewa aktif.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Kebijakan Privasi</Label>
                  </div>
                  <Button variant="secondary" asChild><Link href="/privacy-policy">Lihat</Link></Button>
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
                    <CardTitle>Bahasa</CardTitle>
                    <CardDescription>Pilih bahasa antarmuka.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Select defaultValue="id">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
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
                        <CardTitle>Tema Tampilan</CardTitle>
                        <CardDescription>Mata aman, baterai senang 🌙</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="system" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Mode Terang</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Mode Gelap</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">Ikuti Sistem</Label>
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
                        <CardTitle>Keamanan Aplikasi</CardTitle>
                        <CardDescription>Kecil, tapi krusial 🔐</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">Ubah Password</Button>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Logout Otomatis</Label>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timeout-app">Timeout Aplikasi (menit)</Label>
                    <Input id="timeout-app" type="number" placeholder="Contoh: 15"/>
                </div>
              </CardContent>
            </Card>
            
            {/* Tentang Aplikasi */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Info className="w-6 h-6"/>
                        <div>
                            <CardTitle>Tentang Aplikasi</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Versi Aplikasi:</span> <span>1.0.0</span></div>
                    <div className="flex justify-between"><span>Pengembang:</span> <span>Rideasy Team</span></div>
                    <Separator/>
                    <Button variant="link" className="p-0 h-auto" asChild><Link href="/terms">Syarat & Ketentuan</Link></Button>
                    <br/>
                    <Button variant="link" className="p-0 h-auto" asChild><Link href="/contact">Kontak Bantuan</Link></Button>
                </CardContent>
            </Card>
          </div>
        </div>
        <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
