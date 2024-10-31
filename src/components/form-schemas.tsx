import { z } from 'zod';

const PersonalInfoSchema = z.object({
    first_name: z.string().min(1, {
        message: 'Имя обязательно для заполнения',
    }),
    father_name: z.string().min(1, {
        message: 'Отчество обязательно для заполнения',
    }),
    last_name: z.string().min(1, {
        message: 'Фамилия обязательна для заполнения',
    }),
    email: z
        .string()
        .min(1, {
            message: 'Email обязателен для заполнения',
        })
        .email('Некорректный email'),
    tel: z.string().min(1, {
        message: 'Телефон обязателен для заполнения',
    }),
    education: z.string().min(1, {
        message: 'Образование обязательно для заполнения',
    }),
    bday: z.string().min(1, {
        message: 'День рождения обязателен для заполнения',
    }),
});

const RateSchema = z.object({
    rate: z.string().min(1, {
        message: 'Оценка обязательна для заполнения',
    }),
});

const FeedbackSchema = z.object({
    review: z.string().min(1, {
        message: 'Отзыв обязателен для заполнения',
    }),
});

export const Schemas = [PersonalInfoSchema, RateSchema, FeedbackSchema];
