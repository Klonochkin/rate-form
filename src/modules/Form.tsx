import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/modules/DatePicker.tsx';
import { ChevronRight } from 'lucide-react';

export function Form({ changeStatus }: { changeStatus: (id: number) => void }) {
    return (
        <div>
            <form
                id='form'
                className='border p-3.5 flex flex-col gap-5 rounded-md'
                onSubmit={(event) => {
                    event.preventDefault();
                    changeStatus(1);
                }}
                autoComplete='on'>
                <fieldset className='text-gray-200 font-bold my-1.5 text-2xl'>
                    Заполните форму
                </fieldset>
                <Label>
                    Введите имя
                    <Input
                        className='mt-4'
                        required
                        type='text'
                        placeholder='Иван'
                        autoComplete='first-name'
                    />
                </Label>
                <Label>
                    Введите отчество
                    <Input
                        className='mt-4'
                        required
                        type='text'
                        placeholder='Иванович'
                        autoComplete='additional-name'
                    />
                </Label>
                <Label>
                    Введите фамилию
                    <Input
                        className='mt-4'
                        required
                        type='text'
                        placeholder='Иванов'
                        autoComplete='family-name'
                    />
                </Label>
                <Label>
                    Введите дату рождения
                    <DatePicker />
                </Label>
                <Label>
                    Введите email
                    <Input
                        className='mt-4'
                        required
                        type='email'
                        placeholder='example@gmail.com'
                        autoComplete='email'
                    />
                </Label>
                <Label>
                    Введите номер телефона
                    <Input
                        className='mt-4'
                        required
                        type='tel'
                        placeholder='+7 (999) 999-99-99'
                        autoComplete='tel'
                    />
                </Label>
                <Label>
                    Выберите уровень образования
                    <Select required>
                        <SelectTrigger className='mt-4'>
                            <SelectValue placeholder='Образование' />
                        </SelectTrigger>
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
                </Label>
            </form>
            <Button form='form' className='self-start mt-4' type='submit'>
                Далее
                <ChevronRight />
            </Button>
        </div>
    );
}
