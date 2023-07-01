"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AddLinkModal } from "./AddLinkModal"
import { DeleteLinkModal } from "./DeleteModal"
import { useRequests } from "@/hooks/useRequests"
import { LoadingWrapper } from "@/components/loading"
import { Links } from "@/server/handlers/links"


export const LinksItems = () => {
  const [data, setData] = useState<Links>([])
  const [isLoading, dataFetcher] = useRequests(true)

  useEffect(() => {
    const getData = async () => {
      const { data, errors } = await dataFetcher("/links/getLinks", "get")
      if (data) return setData(data)

      console.error(errors)
    }
    getData()
  }, [])

  const addLink = (link: any) => setData((prev) => [...prev, link])
  const deleteItem = (handle: string) => setData((prev) => prev.filter((itm) => itm.handle !== handle))

  return <LoadingWrapper isLoading={isLoading}>
    {
      data.map(({ handle, _id, link }) =>
        <div className="rounded-2xl bg-light-bg2 py-3 px-5 md:py-5 md:px-10" key={_id}>
          <div className="flex mb-3 items-center md:mb-7">
            <Link href={`/link/${handle}`} className="text-3xl text-light-fg md:text-5xl break-all">{handle}</Link>
            <div className="flex ml-auto pl-5">
              <DeleteLinkModal handle={handle} deleteItem={deleteItem} />
            </div>
          </div>
          <Link href={link} className="text-xl text-light-fg break-words pr-4 md:text-2xl max-h-[10rem] overflow-hidden">{link}</Link>
        </div>)
    }
    {
      data.length < 10 &&
      <AddLinkModal addLink={addLink} />
    }
  </LoadingWrapper>
}
