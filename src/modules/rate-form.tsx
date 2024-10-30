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
    rate: z.string({
        required_error: 'Это поле обязательно для заполнения',
    }),
    review: z.string(),
});

import { DatePicker } from './date-picker.tsx';

import { useContext, useState } from 'react';
import { CurrentPageContext } from '../App.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function RateForm({}: {}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: '',
            father_name: '',
            last_name: '',
            email: '',
            tel: '',
            bday: '',
            rate: '',
            review: '',
            education: '',
        },
    });

    const [isResetForm, setResetForm] = useState(true);

    const context = useContext(CurrentPageContext);

    let { currentPage, setCurrentPage } = context;

    function onSubmit() {
        setCurrentPage(++currentPage);
        if (currentPage === 3) {
            setResetForm(!isResetForm);
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
                                            name='bday'
                                            id='bday'
                                            autoComplete='bday'
                                            className='sr-only w-0'
                                            required
                                            type='date'
                                        />
                                        <DatePicker
                                            setValue={(value: string) => {
                                                form.setValue('bday', value);
                                            }}
                                            isResetForm={isResetForm}
                                        />
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
                                <FormMessage />
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Оценка</FormLabel>
                                <Select
                                    required={currentPage !== 1 ? false : true}
                                    value={form.getValues('rate')}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
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
                                <FormMessage />
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Напишите отзыв</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        value={form.getValues('review')}
                                        className='mt-4'
                                        required={
                                            currentPage !== 2 ? false : true
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
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
