'use client';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe } from './api/auth.server';
import { login } from './api/auth';
import { useRouter } from 'next/navigation';

//Hook para obtener datos del usuario actual
export function useMe() {
    const router = useRouter();
    const { data, isSuccess, error, isError } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: getMe
    });
    
    console.log('useMe - data:', data, 'isSuccess:', isSuccess, 'error:', error, 'isError:', isError);
    useEffect(() => {
        if (isSuccess) {
            console.log('Usuario obtenido exitosamente:', data);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            router.push('/login');
        }
    }, [isError, error, router]);

    return { data, isSuccess, error, isError };
}

export function useLogin() {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: ({ email, password }: { email: string; password: string }) => 
            login(email, password)
    });
}
