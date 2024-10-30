'use client';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePicker } from './DatePicker.tsx';
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
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
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

export function RateForm({
    changeStatus,
    status,
}: {
    changeStatus: (id: number) => void;
    status: number;
}) {
    const [isResetForm, setResetForm] = useState(true);
    function onSubmit() {
        changeStatus(++status);
        if (status === 3) {
            setResetForm(!isResetForm);
            form.reset();
            toast('Отзыв отправлен', {
                action: {
                    label: 'Скрыть',
                    onClick: () => console.log('скрыт'),
                },
            });
        }
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: '',
            father_name: '',
            last_name: '',
            email: '',
            tel: '',
            bday: '',
            education: '',
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
                id='form'>
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
                                        setValue={(value) => {
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
                                            Среднее-профессиональное образование
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>
                    Далее <ChevronRight />
                </Button>
            </form>
        </Form>
    );
}
