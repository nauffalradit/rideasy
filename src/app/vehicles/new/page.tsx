
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Car, Bike, Sparkles, Fuel, Gauge, Users, GitCommitHorizontal, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useVehicles } from '@/context/VehicleContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';

const vehicleSchema = z.object({
  name: z.string().min(1, "Vehicle name is required"),
  type: z.enum(['Car', 'Motorcycle']),
  status: z.enum(['Available', 'Rented', 'Maintenance']),
  pricePerDay: z.coerce.number().min(1, "Price is required"),
  seats: z.coerce.number().min(1, "Number of seats is required"),
  engine: z.string().optional(),
  horsepower: z.coerce.number().optional(),
  fuelType: z.enum(['Gasoline', 'Electric', 'Hybrid']).optional(),
  transmission: z.enum(['Automatic', 'Manual']),
  description: z.string().optional(),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
});

export default function NewVehiclePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { addVehicle } = useVehicles();
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof vehicleSchema>>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            name: "",
            type: "Car",
            status: "Available",
            pricePerDay: 0,
            seats: 4,
            engine: "",
            horsepower: 0,
            fuelType: "Gasoline",
            transmission: "Automatic",
            description: "",
            imageUrl: "",
        },
    });

    const onSubmit = (data: z.infer<typeof vehicleSchema>) => {
        // Find a placeholder image based on type. In a real app, you'd handle image uploads.
        const imagePlaceholder = PlaceHolderImages.find(p => p.id === (data.type === 'Car' ? 'car-1' : 'moto-1'))!;
        
        const newVehicleData = {
            name: data.name,
            type: data.type,
            pricePerDay: data.pricePerDay,
            seats: data.seats,
            transmission: data.transmission,
            status: data.status,
            // Saving image info instead of the full object
            image: {
                imageUrl: data.imageUrl || imagePlaceholder.imageUrl,
                description: imagePlaceholder.description,
                imageHint: imagePlaceholder.imageHint,
            },
            // Saving specs info
            specs: {
                engine: data.engine || 'N/A',
                fuelType: data.fuelType || 'Gasoline',
                horsepower: data.horsepower || 0,
            },
            // Gallery would be handled by an upload mechanism
            gallery: [], 
        };

        addVehicle(newVehicleData);

        toast({
            title: t('vehicleAddedTitle'),
            description: t('vehicleAddedDesc', { vehicleName: data.name }),
        });
        router.push('/vehicles');
    }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
             <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href="/vehicles">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">{t('back')}</span>
                </Link>
             </Button>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('addNewVehicle')}</h2>
                <p className="text-muted-foreground">{t('addNewVehicleDesc')}</p>
            </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('vehicleInfo')}</CardTitle>
                                <CardDescription>{t('vehicleInfoDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('vehicleName')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('vehicleNamePlaceholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('type')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder={t('selectVehicleType')} /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Car"><div className="flex items-center gap-2"><Car/>{t('car')}</div></SelectItem>
                                                        <SelectItem value="Motorcycle"><div className="flex items-center gap-2"><Bike/>{t('motorcycle')}</div></SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('status')}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder={t('selectStatus')} /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Available">{t('available')}</SelectItem>
                                                        <SelectItem value="Rented">{t('rented')}</SelectItem>
                                                        <SelectItem value="Maintenance">{t('maintenance')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('description')}</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder={t('descriptionPlaceholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                             <CardHeader>
                                <CardTitle>{t('specifications')}</CardTitle>
                                <CardDescription>{t('specificationsDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="engine"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><Gauge className="inline mr-2"/>{t('engine')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enginePlaceholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="horsepower"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><Sparkles className="inline mr-2"/>{t('horsepower')}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t('horsepowerPlaceholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="fuelType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><Fuel className="inline mr-2"/>{t('fuelType')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder={t('selectFuelType')} /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Gasoline">{t('gasoline')}</SelectItem>
                                                    <SelectItem value="Electric">{t('electric')}</SelectItem>
                                                    <SelectItem value="Hybrid">{t('hybrid')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="transmission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><GitCommitHorizontal className="inline mr-2"/>{t('transmission')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder={t('selectTransmission')} /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Automatic">{t('automatic')}</SelectItem>
                                                    <SelectItem value="Manual">{t('manual')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="seats"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><Users className="inline mr-2"/>{t('seats')}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={t('seatsPlaceholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Side Column */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('pricing')}</CardTitle>
                                <CardDescription>{t('pricingDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <FormField
                                    control={form.control}
                                    name="pricePerDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('pricePerDay')}</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 55" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('media')}</CardTitle>
                                <CardDescription>{t('mediaDesc')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('mainImageUrl')}</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <Input placeholder="https://example.com/image.png" {...field} />
                                                    </div>
                                                </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="hidden lg:flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => router.push('/vehicles')}>{t('cancel')}</Button>
                            <Button type="submit">{t('saveVehicle')}</Button>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 flex justify-end gap-2 lg:hidden">
                    <Button variant="outline" type="button" onClick={() => router.push('/vehicles')} className="w-full sm:w-auto">{t('cancel')}</Button>
                    <Button type="submit" className="w-full sm:w-auto">{t('saveVehicle')}</Button>
                </div>
            </form>
        </Form>
    </div>
  );
}

    
