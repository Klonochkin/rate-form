import { Button } from './components/ui/button';
import { Form } from './modules/Form.tsx';
import { SelectRate } from './modules/SelectRate.tsx';
import { Review } from './modules/Review.tsx';
import { Toaster } from 'sonner';
import { useState } from 'react';

function Control({
    status,
    changeStatus,
}: {
    status: number;
    changeStatus: (id: number) => void;
}) {
    if (status === 5) {
        changeStatus(0);
        return <></>;
    }
    return (
        <div>
            <div className={status == 0 ? '' : 'sr-only'}>
                <Form changeStatus={changeStatus} />
            </div>
            <div className={status == 1 ? '' : 'sr-only'}>
                <SelectRate changeStatus={changeStatus} />
            </div>
            <div className={status == 2 ? '' : 'sr-only'}>
                <Review changeStatus={changeStatus} />
            </div>
            <div className={status == 3 ? 'flex flex-col' : 'sr-only'}>
                <Button
                    className='w-[10rem] mt-4'
                    onClick={() => {
                        changeStatus(5);
                    }}>
                    Вернуться на главную
                </Button>
            </div>
        </div>
    );
}

function App() {
    const [currentPage, setCurrentPage] = useState(0);

    function changeFormStatus(id: number) {
        setCurrentPage(id);
    }

    return (
        <main className='max-w-[750px] m-auto'>
            <h1 className='text-gray-100 font-bold text-4xl my-5'>
                {currentPage !== 3
                    ? 'Оцените работу нашего сервиса'
                    : 'Спасибо за отзыв'}
            </h1>
            <Control status={currentPage} changeStatus={changeFormStatus} />
            <Toaster />
        </main>
    );
}

export default App;
