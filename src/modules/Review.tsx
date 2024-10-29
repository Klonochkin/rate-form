import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function Review({
    changeStatus,
}: {
    changeStatus: (id: number) => void;
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
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    changeStatus(3);
                    toast('Отзыв отправлен', {
                        action: {
                            label: 'Скрыть',
                            onClick: () => console.log('скрыт'),
                        },
                    });
                }}>
                <Label className='text-2xl'>
                    Напишите отзыв
                    <Textarea className='mt-4' required />
                </Label>
                <Button type='submit' className='mt-4'>
                    Отправить
                </Button>
            </form>
        </div>
    );
}
