import type { ReactNode } from 'react'
import { useForm, SubmitHandler, UseFormReturn, UseFormProps } from 'react-hook-form'

export const Form = <TFieldValues extends Record<string, unknown> = Record<string, unknown>>({
  onSubmit,
  children,
  options,
}: {
  onSubmit: SubmitHandler<TFieldValues>
  children: (methods: UseFormReturn<TFieldValues>) => ReactNode
  options?: UseFormProps<TFieldValues>
}) => {
  const methods = useForm<TFieldValues>(options)
  return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
}
