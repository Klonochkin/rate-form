import { Button } from './components/ui/button';
import { Form } from './modules/Form.tsx';
import { SelectRate } from './modules/SelectRate.tsx';
import { Review } from './modules/Review.tsx';
import { Toaster } from 'sonner';
import { useState, createContext, useContext } from 'react';

interface ContextType {
    currentPage: number;
    setCurrentPage: (id: number) => void;
}

const initialContextValue: ContextType = {
    currentPage: 0,
    setCurrentPage: () => {},
};

export const CurrentPageContext =
    createContext<ContextType>(initialContextValue);

function Control() {
    const context = useContext(CurrentPageContext);

    const { currentPage, setCurrentPage } = context;

    let form: HTMLFormElement | null = null;
    if (document.getElementById('form')) {
        form = document.getElementById('form') as HTMLFormElement;
    }

    return (
        <div>
            <Form className={currentPage !== 0 ? 'sr-only' : ''} />
            <SelectRate className={currentPage !== 1 ? 'sr-only' : ''} />
            <Review className={currentPage !== 2 ? 'sr-only' : ''} />
            <Button
                className={
                    currentPage == 3
                        ? 'flex flex-col self-start mt-4'
                        : 'sr-only'
                }
                onClick={() => {
                    if (form) {
                        form.reset();
                    }
                    setCurrentPage(0);
                }}>
                Вернуться на главную
            </Button>
        </div>
    );
}

export default function App() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <main className='max-w-[750px] m-auto'>
                <h1 className='text-gray-100 font-bold text-4xl my-5'>
                    {currentPage !== 3
                        ? 'Оцените работу нашего сервиса'
                        : 'Спасибо за отзыв'}
                </h1>
                <Control />
                <Toaster />
            </main>
        </CurrentPageContext.Provider>
    );
}
