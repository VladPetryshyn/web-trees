"use client"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { LoadingWrapper } from "@/components/loading";
import { useRequests } from "@/hooks/useRequests";
import { registrValidation } from "@/helpers/validation";

interface FormI {
  username: String;
  email: String;
  password: String;
  error: String;
}

export const RegistrationForm = () => {
  const { handleSubmit, formState: { errors }, control, setError, register } = useForm<FormI>()
  const [isLoading, dataFetcher] = useRequests()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormI> = async (body) => {
    const { data, errors } = await dataFetcher("/users/register", "post", body)

    if (data) return router.replace("/login")

    register("error")
    Object.keys(errors).forEach((key) => {
      setError(key as keyof FormI, { message: errors[key] })
    })
  }


  return <LoadingWrapper isLoading={isLoading}>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col lg:items-start">
      <p className="text-4 text-center mb-2 text-red-500 md:text-xl">{errors?.error?.message}</p>
      <Controller
        name="username"
        rules={registrValidation.username}
        control={control}
        render={({ field }) => <Input
          {...field}
          placeholder="Username"
          className="md:text-2xl lg:text-4xl"
          error={errors.username?.message}
          isLoading={isLoading}
        />}
      />
      <Controller
        name="email"
        rules={registrValidation.email}
        control={control}
        render={({ field }) => <Input
          {...field}
          placeholder="E-mail"
          className="md:text-2xl lg:text-4xl mt-5"
          error={errors.email?.message}
          isLoading={isLoading}
        />}
      />
      <Controller
        name="password"
        rules={registrValidation.password}
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
      <Input type="submit" className="mt-5 md:text-2xl lg:text-4xl" isLoading={isLoading} />
    </form>
  </LoadingWrapper>
}
