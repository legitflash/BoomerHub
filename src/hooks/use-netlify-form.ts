
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z, ZodType } from 'zod';
import { useToast } from './use-toast';

interface UseNetlifyFormProps<T extends ZodType<any, any, any>> {
  formName: string;
  schema: T;
  defaultValues: z.infer<T>;
}

export function useNetlifyForm<T extends ZodType<any, any, any>>({
  formName,
  schema,
  defaultValues,
}: UseNetlifyFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<T>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/form-handler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName,
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the submission.');
      }
      
      setIsSuccess(true);
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'Could not submit the form. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSuccess,
  };
}
