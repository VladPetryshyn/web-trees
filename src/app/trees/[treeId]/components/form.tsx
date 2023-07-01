"use client"
import { Icon } from "@/components/Icon";
import { Input } from "@/components/input";
import { LoadingWrapper } from "@/components/loading";
import { treeFormValidation } from "@/helpers/validation";
import { useRequests } from "@/hooks/useRequests";
import { User } from "@/server/handlers/helpers";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface FormI {
  handle: string;
  title: string;
  description: string;
  links: { value: string }[];
  error: string;
}

interface Props {
  user: User | undefined;
  handle: string;
}

export const TreeForm: FC<Props> = ({ handle, user }) => {
  const route = useRouter()
  const [data, setData] = useState<any>();
  const { control, handleSubmit, formState: { errors }, setValue, register, setError } = useForm<FormI>();
  const { fields, append, remove, update } = useFieldArray({ name: 'links', control });
  const [isLoading, dataFetcher, toggleLoading] = useRequests(true)

  const isCreate = handle === "create"
  const isOwner = data?.isEditing || isCreate

  useEffect(() => {
    const loadData = async () => {
      const { data: d } = await dataFetcher(`/trees/getTree/${handle}`, "get")
      if (d) return setData(d)
      if (!user && !data) route.replace("/404")
    }

    if (isCreate) return toggleLoading()
    if (!data) loadData()
  }, [])

  useEffect(() => {
    if (!data || data?.links?.length < 1) append({ value: "" })
    if (data) {
      setValue("title", data.title)
      setValue("handle", data.handle)
      setValue("description", data.description)
      data.links.forEach((link: string, i: number) => update(i, { value: link }))
    }
  }, [data])

  const onSubmit = handleSubmit(async (body) => {
    const { data: resp, errors } = await dataFetcher("/trees/update", "post", { ...body, editTreeHandle: data?.handle })

    if (resp) {
      if (data?.handle !== body.handle) return route.replace(`/trees/${body.handle}`)
    }

    if (errors) {
      register("error")
      Object.keys(errors).forEach((key) => {
        setError(key as keyof FormI, { message: errors[key] })
      })
    }
  })

  return <LoadingWrapper isLoading={isLoading}>
    <form onSubmit={isOwner ? onSubmit : () => null} className="flex flex-col lg:px-28">
      <p className="text-4 text-center mb-2 text-red-500 md:text-xl">{errors?.error?.message}</p>
      {isOwner && <Controller
        name="handle"
        control={control}
        rules={treeFormValidation.handle}
        render={({ field }) => <Input
          {...field}
          placeholder="Tree Handle"
          className="md:text-2xl lg:text-4xl mt-5 w-full"
          error={errors.handle?.message}
        />}
      />
      }
      <Controller
        name="title"
        control={control}
        rules={treeFormValidation.title}
        render={({ field }) => <Input
          {...field}
          placeholder="Tree Title"
          className="md:text-2xl lg:text-4xl mt-5 w-full"
          error={errors.title?.message}
          disabled={!isOwner}
        />}
      />
      <Controller
        name="description"
        control={control}
        rules={treeFormValidation.description}
        render={({ field }) => <Input
          {...field}
          placeholder="Tree Description"
          className="md:text-2xl lg:text-4xl mt-5 w-full"
          error={errors.description?.message}
          disabled={!isOwner}
        />}
      />
      {fields.map((field, i) => (
        <div key={field.id} className="flex items-center w-full mt-5" onClick={isOwner ? undefined : () => route.replace(field.value)}>
          <Controller
            name={`links.${i}.value`}
            control={control}
            rules={treeFormValidation.link}
            render={({ field }) => <Input
              {...field}
              placeholder={`Tree Link #${i + 1}`}
              className={`md:text-2xl lg:text-4xl w-full ${isOwner ? "" : "cursor-pointer"}`}
              error={errors?.links?.[i]?.value?.message}
              containerClassName="w-full"
              disabled={!isOwner}
            />}
          />
          {isOwner && i > 0 && <Icon icon={faClose} className="ml-2 text-xl text-light-fg md:text-3xl cursor-pointer" onClick={() => remove(i)} />}
        </div>
      )
      )}
      {fields.length < 10 && isOwner &&
        <div className="rounded-2xl bg-light-bg2 py-3 px-5 flex justify-center items-center mt-5 cursor-pointer" onClick={() => append({ value: "" })}>
          <Icon icon={faPlus} className="text-2xl text-light-fg md:text-5xl" />
        </div>
      }
      {isOwner && <Input type="submit" className="mt-5 w-full md:text-4xl cursor-pointer" />}
    </form>
  </LoadingWrapper>
}
