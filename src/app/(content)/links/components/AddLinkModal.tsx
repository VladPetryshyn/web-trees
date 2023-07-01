"use client"
import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { Input } from "@/components/input"
import { LoadingWrapper } from "@/components/loading"
import { addLinkModalValidation } from "@/helpers/validation"
import { useRequests } from "@/hooks/useRequests"
import { useToggle } from "@/hooks/useToggle"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

interface FormI {
  handle: string;
  link: string;
}

interface Props {
  addLink(link: any): void;
}

export const AddLinkModal: FC<Props> = ({ addLink }) => {
  const [isOpen, toggle] = useToggle(false)
  const { control, formState: { errors }, handleSubmit, setError, setValue } = useForm<FormI>()
  const [isLoading, dataFetcher] = useRequests()

  const onToggle = () => {
    toggle()
    setValue("link", "")
    setValue("handle", "")
  }

  const onSubmit = handleSubmit(async (body) => {
    const { data, errors } = await dataFetcher("/links/create", "post", body)

    if (data) {
      addLink(body);
      return onToggle();
    }

    Object.keys(errors).forEach((key) => {
      if (key !== "code") setError(key as keyof FormI, { message: errors[key] })
    })
  })

  return <>
    <div className="rounded-2xl bg-light-bg2 py-3 px-5 flex justify-center items-center cursor-pointer" onClick={onToggle}>
      <Icon icon={faPlus} className="text-5xl text-light-fg md:text-8xl" />
    </div>
    <Modal handleClose={toggle} isOpen={isOpen}>
      <div className="flex flex-col">
        <h2 className="text-light-fg text-3xl md:text-4xl break-all">Add Link</h2>
        <LoadingWrapper isLoading={isLoading}>
          <form className="my-5" onSubmit={onSubmit}>
            <Controller
              name={"handle"}
              control={control}
              rules={addLinkModalValidation.handle}
              render={({ field }) => <Input
                {...field}
                placeholder="Link Handle"
                className="md:text-2xl lg:text-4xl w-full"
                error={errors?.handle?.message}
                containerClassName="w-full"
              />}
            />
            <Controller
              name={"link"}
              control={control}
              rules={addLinkModalValidation.link}
              render={({ field }) => <Input
                {...field}
                placeholder="Link"
                className="md:text-2xl lg:text-4xl w-full"
                error={errors?.link?.message}
                containerClassName="w-full"
              />}
            />
          </form>
        </LoadingWrapper>
        <div className="flex ml-auto">
          <button className="text-light-fg md:text-xl" onClick={toggle}>
            CANCEL
          </button>
          <button className="text-light-fg ml-5 md:text-xl" onClick={onSubmit}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  </>
}
