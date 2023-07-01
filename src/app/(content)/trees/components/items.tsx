"use client"
import { Icon } from "@/components/Icon"
import { DeleteTreeModal } from "@/components/content/trees/DeleteModal"
import { LoadingWrapper } from "@/components/loading"
import { useRequests } from "@/hooks/useRequests"
import { Trees } from "@/server/handlers/trees"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useEffect, useState } from "react"

export const TreesItems = () => {
  const [data, setData] = useState<Trees>([])
  const [isLoading, dataLoader] = useRequests(true)
  useEffect(() => {
    const loadData = async () => {
      const { data, errors } = await dataLoader("/trees/getTrees", "get")
      if (data) return setData(data)

      console.error(errors)
    }
    loadData()
  }, [])
  const deleteItem = (handle: string) => () => setData((prev) => prev.filter((itm) => itm.handle !== handle))

  if (!data) return null;

  return <LoadingWrapper isLoading={isLoading}>
    {data.map(({ title, description, _id, handle }) =>
      <div className="rounded-2xl bg-light-bg2 py-3 px-5 md:py-5 md:px-10" key={_id}>
        <div className="flex mb-3 items-center md:mb-7">
          <Link href={`/trees/${handle}`} className="text-3xl text-light-fg md:text-5xl break-all">{title}</Link>
          <div className="flex ml-auto pl-5">
            <DeleteTreeModal handle={handle} title={title} deleteItem={deleteItem(handle)} />
          </div>
        </div>
        <p className="text-xl text-light-fg break-words pr-4 md:text-2xl max-h-[10rem] overflow-hidden">{description}</p>
      </div>)
    }
    {
      data.length < 10 &&
      <Link href="/trees/create" className="rounded-2xl bg-light-bg2 py-3 px-5 flex justify-center items-center">
        <Icon icon={faPlus} className="text-5xl text-light-fg md:text-8xl" />
      </Link>
    }
  </LoadingWrapper>
}
