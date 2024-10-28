import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DatePicker() {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 100);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'w-[100%] justify-start text-left font-normal mt-4',
                        !date && 'text-muted-foreground',
                    )}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Выберите дату</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    fromDate={maxDate}
                    toDate={minDate}
                />
            </PopoverContent>
        </Popover>
    );
}