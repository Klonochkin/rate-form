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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const PersonalInfoSchema = z.object({
    first_name: z.string().min(1, {
        message: 'Имя обязательно для заполнения',
    }),
    father_name: z.string().min(1, {
        message: 'Отчество обязательно для заполнения',
    }),
    last_name: z.string().min(1, {
        message: 'Фамилия обязательна для заполнения',
    }),
    email: z
        .string({
            required_error: 'Email обязателeн для заполнения',
        })
        .email('Некорректный email'),
    tel: z.string().min(1, {
        message: 'Телефон обязателен для заполнения',
    }),
    education: z.string().min(1, {
        message: 'Образование обязательно для заполнения',
    }),
    bday: z.string().min(1, {
        message: 'День рождения обязателен для заполнения',
    }),
});

const RateSchema = z.object({
    rate: z.string().min(1, {
        message: 'Оценка обязательна для заполнения',
    }),
});

const FeedbackSchema = z.object({
    review: z.string().min(1, {
        message: 'Отзыв обязателен для заполнения',
    }),
});

import { DatePicker } from './date-picker.tsx';

import { useContext } from 'react';
import { CurrentPageContext } from '@/components/current-page-context.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function RateForm() {
    const context = useContext(CurrentPageContext);
    const { currentPage, setCurrentPage } = context;

    const Schemas = [PersonalInfoSchema, RateSchema, FeedbackSchema];

    const form = useForm<z.infer<(typeof Schemas)[2]>>({
        resolver: zodResolver(Schemas[currentPage]),
        defaultValues: {
            first_name: '',
            father_name: '',
            last_name: '',
            email: '',
            tel: '',
            bday: '',
            education: '1',
            rate: '',
            review: '',
        },
    });

    const goToNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    function onSubmit() {
        console.log(form.getValues());

        goToNextPage();

        const isLastPage = currentPage === 2;

        if (isLastPage) {
            toast('Отзыв отправлен', {
                action: {
                    label: 'Скрыть',
                    onClick: () => console.log('скрыт'),
                },
            });

            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                {currentPage > 0 && (
                    <Button
                        onClick={goToPrevPage}
                        variant='ghost'
                        type='button'
                        className='pl-0 self-start'>
                        <ChevronLeft />
                        Назад
                    </Button>
                )}
                <div className='flex gap-4 flex-col'>
                    {currentPage === 0 && (
                        <>
                            <FormField
                                control={form.control}
                                name='first_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
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
                                            <DatePicker
                                                value={field.value}
                                                setValue={field.onChange}
                                            />
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
                                                type='email'
                                                placeholder='example@gmail.com'
                                                autoComplete='email'
                                                {...field}
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
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Выберите образование' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='1'>
                                                    Высшее образование
                                                </SelectItem>
                                                <SelectItem value='2'>
                                                    Среднее-профессиональное
                                                    образование
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {currentPage === 1 && (
                        <FormField
                            control={form.control}
                            name='rate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Оценка</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className='w-[180px] mt-4'>
                                                <SelectValue placeholder='Выберите оценку' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <SelectItem
                                                        value={i.toString()}
                                                        key={i + 1}>
                                                        {i + 1}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {currentPage === 2 && (
                        <>
                            <FormField
                                control={form.control}
                                name='review'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Напишите отзыв</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                className='mt-4'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='mt-4 self-start'>
                                Отправить
                            </Button>
                        </>
                    )}
                </div>
                {currentPage < 2 && (
                    <Button type='submit' className='mt-4 self-start'>
                        Далее
                        <ChevronRight />
                    </Button>
                )}
            </form>
        </Form>
    );
}
