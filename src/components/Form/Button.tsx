import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', isLoading = false, ...props }, ref) => {
    const { children, ...rest } = props
    return (
      <button type={type} {...rest}>
        {isLoading ? 'loading' : children}
      </button>
    )
  }
)
