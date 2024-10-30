import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function Review({
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
                    changeStatus(1);
                }}
                variant='ghost'
                type='button'
                className='mb-4 pl-0'>
                <ChevronLeft />
                Назад
            </Button>
            <Label className='text-2xl block'>
                Напишите отзыв
                <Textarea
                    className='mt-4'
                    form='form'
                    required={status === 2 ? true : false}
                />
            </Label>
            <Button form='form' type='submit' className='mt-4'>
                Отправить
                <ChevronRight />
            </Button>
        </div>
    );
}
