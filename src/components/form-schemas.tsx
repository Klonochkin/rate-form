import { z } from 'zod';

const today = new Date();
const minDate = new Date(today);
const minAge = 16;
const maxAge = 100;
minDate.setFullYear(today.getFullYear() - minAge);
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() - maxAge);

console.log(maxDate > minDate);

const PersonalInfoSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, {
            message: 'Имя обязательно для заполнения',
        })
        .max(50, { message: 'Максимальный длинна - 50 символов' }),
    father_name: z
        .string()
        .trim()
        .max(50, { message: 'Максимальный длинна - 50 символов' })
        .optional(),
    last_name: z
        .string()
        .trim()
        .min(1, {
            message: 'Фамилия обязательна для заполнения',
        })
        .max(50, { message: 'Максимальный длинна - 50 символов' }),
    email: z
        .string()
        .trim()
        .min(1, {
            message: 'Email обязателен для заполнения',
        })
        .email('Некорректный email')
        .max(320, { message: 'Максимальный длинна - 320 символов' })
        .toLowerCase(),
    tel: z
        .string()
        .trim()
        .min(1, {
            message: 'Телефон обязателен для заполнения',
        })
        .regex(/^\+7\d{10}$/, {
            message: 'Некорректный номер телефона',
        }),
    education: z.string().min(1, {
        message: 'Образование обязательно для заполнения',
    }),
    bday: z
        .string()
        .min(1, {
            message: 'День рождения обязателен для заполнения',
        })
        .refine((val) => new Date(val) <= minDate, {
            message: `Вам должно быть больше ${minAge} лет`,
        })
        .refine((val) => new Date(val) >= maxDate, {
            message: `Вам должно быть меньше ${maxAge} лет`,
        }),
});

const RateSchema = z.object({
    rate: z.string().min(1, {
        message: 'Оценка обязательна для заполнения',
    }),
});

const FeedbackSchema = z.object({
    review: z
        .string()
        .min(1, {
            message: 'Отзыв обязателен для заполнения',
        })
        .max(1000, { message: 'Максимальный длинна - 1000 символов' }),
});

export const Schemas = [PersonalInfoSchema, RateSchema, FeedbackSchema];
