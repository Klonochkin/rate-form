import { Button } from './components/ui/button';
import { RateForm } from './modules/rate-form.tsx';
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

    return (
        <div>
            <RateForm />
            <Button
                className={
                    currentPage == 3
                        ? 'flex flex-col self-start mt-4'
                        : 'sr-only'
                }
                onClick={() => {
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
