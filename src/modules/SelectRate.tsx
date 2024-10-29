import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CurrentPageContext } from '../App.tsx';
import { useContext } from 'react';

export function SelectRate({ className }: { className: string }) {
    const context = useContext(CurrentPageContext);

    const { setCurrentPage } = context;
    return (
        <div className={className}>
            <Button
                onClick={() => {
                    setCurrentPage(0);
                }}
                variant='ghost'
                type='button'
                className='mb-4 pl-0'>
                <ChevronLeft />
                Назад
            </Button>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setCurrentPage(2);
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
                <Button type='submit' className='mt-4'>
                    Далее
                    <ChevronRight />
                </Button>
            </form>
        </div>
    );
}
