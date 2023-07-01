import { ComponentProps, FC } from "react"

interface Props extends ComponentProps<"input"> {
  error?: string
  isLoading?: boolean
  value?: any
  containerClassName?: string;
}

export const Input: FC<Props> = ({ className, error, isLoading, containerClassName, disabled, ...props }) => {
  return <div className={containerClassName}>
    <input
      {...props}
      className={`md:p-6 border-2 border-light-bg p-3 bg-light-bg2 rounded-2xl text-light-fg placeholder:text-light-grey ${error ? "placeholder:text-red-500 border-red-500 text-red-500" : ""} ${className} ${disabled ? "text-center" : ""}`}
      disabled={isLoading || disabled}
    />
    <p className="text-4 text-center mb-2 text-red-500 md:text-xl">{error}</p>
  </div>
}
