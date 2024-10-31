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

import { useContext, useState } from 'react';
import { CurrentPageContext } from '../App.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export function RateForm({}: {}) {
    const [isResetForm, setResetForm] = useState(true);
    const context = useContext(CurrentPageContext);
    let { currentPage, setCurrentPage } = context;

    const Schems = [PersonalInfoSchema, RateSchema, FeedbackSchema];

    const form = useForm<z.infer<(typeof Schems)[2]>>({
        resolver: zodResolver(Schems[currentPage]),
        defaultValues: {
            first_name: '',
            father_name: '',
            last_name: '',
            email: '',
            tel: '',
            bday: '',
            education: '',
            rate: '',
            review: '',
        },
    });
    function onSubmit() {
        console.log(form.getValues());
        setCurrentPage(++currentPage);
        if (currentPage === 3) {
            setResetForm(!isResetForm);
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
                <div
                    id='step-0'
                    className={
                        currentPage !== 0 ? 'sr-only' : 'flex gap-4 flex-col'
                    }>
                    <FormField
                        control={form.control}
                        name='first_name'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Имя
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Иван'
                                        autoComplete='first-name'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='father_name'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Отчество
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Иванович'
                                        autoComplete='additional-name'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='last_name'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Фамилия
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Иванов'
                                        autoComplete='family-name'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='bday'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    День рождения
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <DatePicker
                                            setValue={(value: string) => {
                                                form.setValue('bday', value);
                                                field.onChange(value);
                                            }}
                                            isResetForm={isResetForm}
                                        />
                                    </>
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='email'
                                        placeholder='example@gmail.com'
                                        autoComplete='email'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='tel'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Телефон
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='tel'
                                        placeholder='+7 (999) 999-99-99'
                                        autoComplete='tel'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='education'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Образование
                                </FormLabel>
                                <Select
                                    value={form.getValues('education')}
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
                                                Среднее-профессиональное
                                                образование
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-4 self-start'>
                        Далее
                        <ChevronRight />
                    </Button>
                </div>
                <div
                    id='step-1'
                    className={
                        currentPage !== 1 ? 'sr-only' : 'flex gap-4 flex-col'
                    }>
                    <Button
                        onClick={() => {
                            setCurrentPage(0);
                        }}
                        variant='ghost'
                        type='button'
                        className='pl-0 self-start'>
                        <ChevronLeft />
                        Назад
                    </Button>
                    <FormField
                        control={form.control}
                        name='rate'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Оценка
                                </FormLabel>
                                <Select
                                    value={form.getValues('rate')}
                                    onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className='w-[180px] mt-4'>
                                            <SelectValue placeholder='Выберите оценку' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='1'>1</SelectItem>
                                            <SelectItem value='2'>2</SelectItem>
                                            <SelectItem value='3'>3</SelectItem>
                                            <SelectItem value='4'>4</SelectItem>
                                            <SelectItem value='5'>5</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-4 self-start'>
                        Далее
                        <ChevronRight />
                    </Button>
                </div>
                <div
                    id='step-2'
                    className={
                        currentPage !== 2 ? 'sr-only' : 'flex gap-4 flex-col'
                    }>
                    <Button
                        onClick={() => {
                            setCurrentPage(1);
                        }}
                        variant='ghost'
                        type='button'
                        className='pl-0 self-start'>
                        <ChevronLeft />
                        Назад
                    </Button>
                    <FormField
                        control={form.control}
                        name='review'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    Напишите отзыв
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        value={form.getValues('review')}
                                        className='mt-4'
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        fieldState.invalid
                                            ? 'text-[#ff5252]'
                                            : ''
                                    }>
                                    {fieldState.error?.message}{' '}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-4 self-start'>
                        Отправить
                    </Button>
                </div>
            </form>
        </Form>
    );
}
