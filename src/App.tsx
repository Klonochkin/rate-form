import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

function SelectRate({
    changeStatus,
}: {
    changeStatus: (id: number, flag: boolean) => void;
}) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                changeStatus(1, true);
            }}>
            <Label className='text-2xl'>
                Выберите оценку
                <Select required>
                    <SelectTrigger className='w-[180px] mt-4'>
                        <SelectValue placeholder='Оценка' />
                    </SelectTrigger>
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
            </Label>
            <Button className='w-[6.5rem] mt-4' type='submit'>
                Отправить
            </Button>
        </form>
    );
}

function Form({
    changeStatus,
}: {
    changeStatus: (id: number, flag: boolean) => void;
}) {
    return (
        <form
            className='border p-3.5 flex flex-col gap-5'
            onSubmit={(event) => {
                event.preventDefault();
                changeStatus(0, true);
            }}>
            <fieldset className='text-gray-200 font-bold my-1.5 text-2xl '>
                Заполните форму
            </fieldset>
            <Label>
                Введите имя
                <Input
                    className='mt-4'
                    required
                    type='text'
                    placeholder='Иван'
                />
            </Label>
            <Label>
                Введите отчество
                <Input
                    className='mt-4'
                    required
                    type='text'
                    placeholder='Иванович'
                />
            </Label>
            <Label>
                Введите фамилию
                <Input
                    className='mt-4'
                    required
                    type='text'
                    placeholder='Иванов'
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
                />
            </Label>
            <Label>
                Введите номер телефона
                <Input
                    className='mt-4'
                    required
                    type='tel'
                    placeholder='+7 (999) 999-99-99'
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
            <Button className='w-[6.5rem]' type='submit'>
                Отправить
            </Button>
        </form>
    );
}

function Review({
    changeStatus,
}: {
    changeStatus: (id: number, flag: boolean) => void;
}) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                changeStatus(2, true);
            }}>
            <Label className='text-2xl'>
                Напишите отзыв
                <Textarea className='mt-4' required />
            </Label>
            <Button className='w-[6.5rem] mt-4' type='submit'>
                Отправить
            </Button>
        </form>
    );
}

function DatePicker() {
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
                    variant={'outline'}
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

function Control({
    status,
    changeStatus,
}: {
    status: boolean[];
    changeStatus: (id: number, flag: boolean) => void;
}) {
    if (!status[0]) {
        return <Form changeStatus={changeStatus} />;
    } else if (!status[1]) {
        return <SelectRate changeStatus={changeStatus} />;
    } else if (!status[2]) {
        return <Review changeStatus={changeStatus} />;
    }
    return (
        <main className='flex flex-col'>
            <Button
                className='w-[10rem] mt-4'
                onClick={() => {
                    changeStatus(0, false);
                }}>
                Вернуться на главную
            </Button>
        </main>
    );
}

function App() {
    const [formStatus, setFormStatus] = useState<boolean[]>([]);

    function changeFormStatus(id: number, flag: boolean) {
        if (flag === false && id === 0) {
            setFormStatus([]);
            return;
        }
        toast('Форма успешно заполнена', {
            action: {
                label: 'Скрыть',
                onClick: () => console.log('скрыт'),
            },
        });
        const newFormStatus = formStatus.slice();
        newFormStatus[id] = flag;
        setFormStatus(newFormStatus);
    }

    return (
        <main className='max-w-[750px] m-auto'>
            {formStatus[2] === true ? (
                <h1 className='text-gray-100 font-bold text-4xl my-5'>
                    Спасибо за отзыв
                </h1>
            ) : (
                <h1 className='text-gray-100 font-bold text-4xl my-5'>
                    Оцените работу нашего сервиса
                </h1>
            )}
            <Control status={formStatus} changeStatus={changeFormStatus} />
            <Toaster />
        </main>
    );
}

export default App;
