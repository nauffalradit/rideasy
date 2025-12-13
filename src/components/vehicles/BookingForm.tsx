'use client';

import * as React from 'react';
import { addDays, format, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Vehicle } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type BookingFormProps = {
  vehicle: Vehicle;
};

export default function BookingForm({ vehicle }: BookingFormProps) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });

  const rentalDays = date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0;
  const totalCost = rentalDays * vehicle.pricePerDay;

  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `You've successfully booked the ${vehicle.name}.`,
    });
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Book Your Ride</CardTitle>
        <CardDescription>Select your rental dates to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {rentalDays > 0 && (
            <div className="space-y-2 rounded-lg border p-4">
                <h4 className='font-medium'>Rental Summary</h4>
                <div className='flex justify-between items-center text-sm'>
                    <p className='text-muted-foreground'>Price per day</p>
                    <p className='font-semibold'>${vehicle.pricePerDay}</p>
                </div>
                <div className='flex justify-between items-center text-sm'>
                    <p className='text-muted-foreground'>Number of days</p>
                    <p className='font-semibold'>{rentalDays}</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-2 pt-2 border-t'>
                    <p className='font-bold'>Total Cost</p>
                    <p className='font-bold'>${totalCost}</p>
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full font-bold text-lg" size="lg" onClick={handleBooking}>Book Now</Button>
      </CardFooter>
    </Card>
  );
}
