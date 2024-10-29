'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
const FormSchema = z.object({
    first_name: z.string(),
    father_name: z.string(),
    last_name: z.string(),
    email: z
        .string({
            required_error: 'Это поле обязательно для заполнения',
        })
        .email('Некорректный email'),
    tel: z.string(),
    education: z.string(),
    bday: z.string(),
});

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
import { useEffect, useRef, useState } from 'react';

export function InputForm({
    changeStatus,
}: {
    changeStatus: (id: number) => void;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: '',
            father_name: '',
            last_name: '',
            email: '',
            tel: '',
            bday: '',
        },
    });
    const [date, setDate] = useState<Date>();

    const myRef = useRef<HTMLInputElement>(null);

    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 16);
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() - 100);

    function onSubmit() {
        changeStatus(1);
    }

    useEffect(() => {
        const str: string =
            String(date?.getFullYear()).padStart(2, '0') +
            '-' +
            String(date?.getMonth()).padStart(2, '0') +
            '-' +
            String(date?.getDate()).padStart(2, '0');
        if (
            myRef.current?.value !== str &&
            str !== 'undefined-undefined-undefined'
        ) {
            if (myRef?.current) {
                myRef.current.value = str;
            }
        }
    }, [myRef.current?.value, date]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    type='text'
                                    placeholder='Иван'
                                    autoComplete='first-name'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='father_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Отчество</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    type='text'
                                    placeholder='Иванович'
                                    autoComplete='additional-name'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Фамилия</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    type='text'
                                    placeholder='Иванов'
                                    autoComplete='family-name'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='bday'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>День рождения</FormLabel>
                            <FormControl>
                                <>
                                    <Input
                                        {...field}
                                        ref={myRef}
                                        name='bday'
                                        id='bday'
                                        autoComplete='bday'
                                        className='sr-only w-0'
                                        required
                                        type='date'
                                    />
                                    {/* <DatePicker /> */}

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-[100%] justify-start text-left font-normal mt-4',
                                                    !date &&
                                                        'text-muted-foreground',
                                                )}>
                                                <CalendarIcon />
                                                {date ? (
                                                    format(date, 'PPP', {
                                                        locale: ru,
                                                    })
                                                ) : (
                                                    <span>Выберите дату</span>
                                                )}
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
                                                locale={ru}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    type='email'
                                    placeholder='example@gmail.com'
                                    autoComplete='email'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='tel'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    type='tel'
                                    placeholder='+7 (999) 999-99-99'
                                    autoComplete='tel'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='education'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Образование</FormLabel>
                            <Select
                                required
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Выберите образование' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='1'>
                                            Высшее образование
                                        </SelectItem>
                                        <SelectItem value='2'>
                                            Среднее-профессиональное образование
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
