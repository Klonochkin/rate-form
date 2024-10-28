import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function Review({
    changeStatus,
}: {
    changeStatus: (id: number) => void;
}) {
    return (
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
            <span className='self-start'>
                <Button type='submit'>Отправить</Button>
                <Button
                    onClick={() => {
                        changeStatus(1);
                    }}
                    type='button'
                    className='m-4'>
                    Назад
                </Button>
            </span>
        </form>
    );
}
