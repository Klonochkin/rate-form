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

export function SelectRate({
    changeStatus,
}: {
    changeStatus: (id: number) => void;
}) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                changeStatus(2);
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
            <span className='self-start'>
                <Button type='submit'>Далее</Button>
                <Button
                    onClick={() => {
                        changeStatus(0);
                    }}
                    type='button'
                    className='m-4'>
                    Назад
                </Button>
            </span>
        </form>
    );
}
