import type { ReactNode } from 'react'
import { useForm, SubmitHandler, UseFormReturn, UseFormProps } from 'react-hook-form'
import type { ZodType, ZodTypeDef } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const Form = <
  TFieldValues extends Record<string, unknown> = Record<string, unknown>,
  ValidationScheme extends ZodType<unknown, ZodTypeDef, unknown> = ZodType
>({
  onSubmit,
  children,
  options,
  validationScheme,
}: {
  onSubmit: SubmitHandler<TFieldValues>
  children: (methods: UseFormReturn<TFieldValues>) => ReactNode
  options?: UseFormProps<TFieldValues>
  validationScheme?: ValidationScheme
}) => {
  const methods = useForm<TFieldValues>({ ...options, resolver: validationScheme && zodResolver(validationScheme) })
  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
}
