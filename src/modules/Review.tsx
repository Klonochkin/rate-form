import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { CurrentPageContext } from '../App.tsx';
import { useContext } from 'react';

export function Review({ className }: { className: string }) {
    const context = useContext(CurrentPageContext);

    const { setCurrentPage } = context;

    return (
        <div className={className}>
            <Button
                onClick={() => {
                    setCurrentPage(1);
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
                    setCurrentPage(3);
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
