
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
  galleryUrls: z.string().optional(),
});

export default function NewVehiclePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { addVehicle } = useVehicles();

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
            galleryUrls: "",
        },
    });

    const onSubmit = (data: z.infer<typeof vehicleSchema>) => {
        const newVehicle = {
            id: String(Date.now()), // temporary unique id
            ...data,
            image: PlaceHolderImages.find(p => p.id === (data.type === 'Car' ? 'car-1' : 'moto-1'))!,
            specs: {
                engine: data.engine || 'N/A',
                fuelType: data.fuelType || 'Gasoline',
                horsepower: data.horsepower || 0,
            },
            gallery: [],
        };
        addVehicle(newVehicle);
        toast({
            title: "Vehicle Added",
            description: `${data.name} has been successfully added to your fleet.`,
        });
        router.push('/vehicles');
    }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4 mb-6">
             <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href="/vehicles">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
             </Button>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Add New Vehicle</h2>
                <p className="text-muted-foreground">Fill in the details below to add a new vehicle to your fleet.</p>
            </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Vehicle Information</CardTitle>
                                <CardDescription>Basic details about the vehicle.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vehicle Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Urban Cruiser" {...field} />
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
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Car"><div className="flex items-center gap-2"><Car/>Car</div></SelectItem>
                                                        <SelectItem value="Motorcycle"><div className="flex items-center gap-2"><Bike/>Motorcycle</div></SelectItem>
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
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Available">Available</SelectItem>
                                                        <SelectItem value="Rented">Rented</SelectItem>
                                                        <SelectItem value="Maintenance">Maintenance</SelectItem>
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
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="A brief description of the vehicle." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                             <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                                <CardDescription>Technical details of the vehicle.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="engine"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><Gauge className="inline mr-2"/>Engine</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 1.5L 4-Cylinder" {...field} />
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
                                            <FormLabel><Sparkles className="inline mr-2"/>Horsepower (HP)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 120" {...field} />
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
                                            <FormLabel><Fuel className="inline mr-2"/>Fuel Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Gasoline">Gasoline</SelectItem>
                                                    <SelectItem value="Electric">Electric</SelectItem>
                                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
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
                                            <FormLabel><GitCommitHorizontal className="inline mr-2"/>Transmission</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select transmission" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Automatic">Automatic</SelectItem>
                                                    <SelectItem value="Manual">Manual</SelectItem>
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
                                            <FormLabel><Users className="inline mr-2"/>Seats</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 4" {...field} />
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
                                <CardTitle>Pricing</CardTitle>
                                <CardDescription>Set the daily rental rate.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <FormField
                                    control={form.control}
                                    name="pricePerDay"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price per Day ($)</FormLabel>
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
                                <CardTitle>Media</CardTitle>
                                <CardDescription>Upload vehicle images.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Main Image URL</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <Input placeholder="https://example.com/image.png" {...field} />
                                                        <Button variant="outline" size="icon" type="button"><Upload className="h-4 w-4"/></Button>
                                                    </div>
                                                </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="galleryUrls"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image Gallery URLs</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter one image URL per line." {...field} />
                                                </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="hidden lg:flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => router.push('/vehicles')}>Cancel</Button>
                            <Button type="submit">Save Vehicle</Button>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 flex justify-end gap-2 lg:hidden">
                    <Button variant="outline" type="button" onClick={() => router.push('/vehicles')} className="w-full sm:w-auto">Cancel</Button>
                    <Button type="submit" className="w-full sm:w-auto">Save Vehicle</Button>
                </div>
            </form>
        </Form>
    </div>
  );
