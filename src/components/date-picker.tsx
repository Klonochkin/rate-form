import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function DatePicker({
    setValue,
    value,
}: {
    setValue: (value: string) => void;
    value: string;
    isResetForm?: boolean;
}) {
    const [date, setDate] = useState<Date | undefined>(
        value?.length > 0 ? new Date(value) : undefined,
    );
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 100);

    useEffect(() => {
        setDate(value?.length > 0 ? new Date(value) : undefined);
    }, [value]);

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
                    {date ? (
                        format(date, 'PPP', { locale: ru })
                    ) : (
                        <span>Выберите дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(date) => {
                        setDate(date);
                        setValue(date?.toISOString().slice(0, 10) ?? '');
                    }}
                    initialFocus
                    fromDate={maxDate}
                    toDate={minDate}
                    locale={ru}
                />
            </PopoverContent>
        </Popover>
    );
}
