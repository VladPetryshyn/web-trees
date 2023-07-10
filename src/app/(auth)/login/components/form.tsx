"use client"
import { Input } from "@/components/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useRequests } from "@/hooks/useRequests";
import { LoadingWrapper } from "@/components/loading";
import { loginValidation } from "@/helpers/validation";

interface FormI {
  email: String;
  password: String;
  error: String;
}

export const LoginForm = () => {
  const { register, handleSubmit, control, formState: { errors }, setError } = useForm<FormI>()
  const [isLoading, dataFetcher] = useRequests()
  const router = useRouter();

  const onSubmit: SubmitHandler<FormI> = async (body) => {
    const { data, errors } = await dataFetcher("/users/authenticate", "post", body)

    if (data) {
      router.refresh()
      return router.replace("/trees")
    }

    register("error")
    Object.keys(errors).forEach((key) => {
      setError(key as keyof FormI, { message: errors[key] })
    })
  }

  return <LoadingWrapper isLoading={isLoading}>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col lg:items-start">
      <p className="text-4 text-center mb-2 text-red-500 md:text-xl">{errors?.error?.message}</p>
      <Controller
        name="email"
        rules={loginValidation.email}
        control={control}
        render={({ field }) => <Input
          {...field}
          placeholder="Username"
          className="md:text-2xl lg:text-4xl"
          error={errors.email?.message}
          isLoading={isLoading}
        />}
      />
      <Controller
        name="password"
        rules={loginValidation.password}
        control={control}
        render={({ field }) => <Input
          {...field}
          placeholder="Password"
          className="md:text-2xl lg:text-4xl mt-5"
          error={errors.password?.message}
          isLoading={isLoading}
          type="password"
        />}
      />
      <Input type="submit" className="mt-5 md:text-2xl lg:text-4xl cursor-pointer" isLoading={isLoading} />
    </form>
  </LoadingWrapper>
}
