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

export function SelectRate({
    changeStatus,
    status,
}: {
    changeStatus: (id: number) => void;
    status: number;
}) {
    return (
        <div>
            <Button
                onClick={() => {
                    changeStatus(0);
                }}
                variant='ghost'
                type='button'
                className='mb-4 pl-0'>
                <ChevronLeft />
                Назад
            </Button>
            <Label className='text-2xl block'>
                Выберите оценку
                <Select form='form' required={status === 1 ? true : false}>
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
            <Button form='form' type='submit' className='mt-4'>
                Далее
                <ChevronRight />
            </Button>
        </div>
    );
}
