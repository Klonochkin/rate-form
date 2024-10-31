import { Button } from '@/components/ui/button';
import { RateForm } from '@/components/rate-form.tsx';
import { Toaster } from 'sonner';
import {
    useState,
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
} from 'react';

interface ContextType {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

const initialContextValue: ContextType = {
    currentPage: 0,
    setCurrentPage: () => {},
};

export const CurrentPageContext =
    createContext<ContextType>(initialContextValue);

function Control() {
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext);

    return (
        <div>
            <RateForm />
            {currentPage == 3 && (
                <Button
                    className='flex flex-col self-start mt-4'
                    onClick={() => {
                        setCurrentPage(0);
                    }}>
                    Вернуться на главную
                </Button>
            )}
        </div>
    );
}

export default function App() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <main className='max-w-[750px] m-auto antialiased'>
                <h1 className='text-gray-100 font-bold text-4xl my-5'>
                    {currentPage !== 3
                        ? 'Оцените работу нашего сервиса'
                        : 'Спасибо за отзыв'}
                </h1>
                <Control />
            </main>
            <Toaster />
        </CurrentPageContext.Provider>
    );
}
