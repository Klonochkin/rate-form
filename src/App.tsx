import { Button } from './components/ui/button';
import { RateForm } from './modules/form.tsx';
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
    return (
        <div>
            <div className={status == 0 ? '' : 'sr-only'}>
                <RateForm changeStatus={changeStatus} status={status} />
            </div>
            <div className={status == 1 ? '' : 'sr-only'}>
                <SelectRate changeStatus={changeStatus} status={status} />
            </div>
            <div className={status == 2 ? '' : 'sr-only'}>
                <Review changeStatus={changeStatus} status={status} />
            </div>
            <div className={status == 3 ? 'flex flex-col' : 'sr-only'}>
                <Button
                    className='w-[10rem] mt-4'
                    onClick={() => {
                        changeStatus(0);
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
