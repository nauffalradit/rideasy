
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Car, Bike, Sparkles, Fuel, Gauge, Users, GitCommitHorizontal, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewVehiclePage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically handle form submission, e.g., send data to an API
        toast({
            title: "Vehicle Added",
            description: "The new vehicle has been successfully added to your fleet.",
        });
        router.push('/vehicles');
    }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/vehicles">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
             </Button>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Add New Vehicle</h2>
                <p className="text-muted-foreground">Fill in the details below to add a new vehicle to your fleet.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                            <CardDescription>Basic details about the vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Vehicle Name</Label>
                                <Input id="name" placeholder="e.g., Urban Cruiser" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select required>
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Car"><div className="flex items-center gap-2"><Car/>Car</div></SelectItem>
                                            <SelectItem value="Motorcycle"><div className="flex items-center gap-2"><Bike/>Motorcycle</div></SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select defaultValue="Available" required>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Rented">Rented</SelectItem>
                                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="A brief description of the vehicle."/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                            <CardTitle>Specifications</CardTitle>
                            <CardDescription>Technical details of the vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="engine"><Gauge className="inline mr-2"/>Engine</Label>
                                <Input id="engine" placeholder="e.g., 1.5L 4-Cylinder" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="horsepower"><Sparkles className="inline mr-2"/>Horsepower (HP)</Label>
                                <Input id="horsepower" type="number" placeholder="e.g., 120" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="fuelType"><Fuel className="inline mr-2"/>Fuel Type</Label>
                                <Select>
                                    <SelectTrigger id="fuelType">
                                        <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Gasoline">Gasoline</SelectItem>
                                        <SelectItem value="Electric">Electric</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="transmission"><GitCommitHorizontal className="inline mr-2"/>Transmission</Label>
                                <Select>
                                    <SelectTrigger id="transmission">
                                        <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Automatic">Automatic</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="seats"><Users className="inline mr-2"/>Seats</Label>
                                <Input id="seats" type="number" placeholder="e.g., 4" required/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Side Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-2">
                                <Label htmlFor="price">Price per Day ($)</Label>
                                <Input id="price" type="number" placeholder="e.g., 55" required />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                            <CardDescription>Upload vehicle images.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="main-image">Main Image</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="main-image" type="text" placeholder="Enter image URL" />
                                     <Button variant="outline" size="icon" type="button"><Upload className="h-4 w-4"/></Button>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="gallery">Image Gallery</Label>
                                <Textarea id="gallery" placeholder="Enter one image URL per line."/>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => router.push('/vehicles')}>Cancel</Button>
                        <Button type="submit">Save Vehicle</Button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}
