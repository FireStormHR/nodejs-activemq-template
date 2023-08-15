import { Validation } from 'monet';

export type ValidationError = { message: string; innerError?: ValidationError };

export type Spec<T> = { [key in keyof T]: ((x: any) => x is T[key]) | ((x: any) => boolean) | ((x: any) => Validation<ValidationError, void>) };
