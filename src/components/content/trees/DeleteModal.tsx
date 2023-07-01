"use client"

import { Icon } from "@/components/Icon"
import { Modal } from "@/components/Modal"
import { useToggle } from "@/hooks/useToggle"
import { req } from "@/server/apiHelper"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FC } from "react"

interface Props {
  handle: string
  title: string
  deleteItem(): void;
}

export const DeleteTreeModal: FC<Props> = ({ handle, title, deleteItem }) => {
  const [isOpen, toggle] = useToggle(false)

  const onDelete = async () => {
    const resp = await req("/trees/delete", "post", { handle })
    if (resp.ok) {
      deleteItem()
      toggle()
    }
  }

  return <>
    <Icon icon={faTrashCan} className="text-light-fg text-2xl cursor-pointer" onClick={toggle} />
    <Modal handleClose={toggle} isOpen={isOpen}>
      <div className="flex flex-col">
        <h2 className="text-light-fg text-3xl md:text-4xl">Delete {title}</h2>
        <p className="text-light-fg break-words my-4 md:text-xl">Are you sure that you want to delete this &apos;{title}&apos;?</p>
        <div className="flex ml-auto">
          <button className="text-light-fg md:text-xl" onClick={toggle}>
            CANCEL
          </button>
          <button className="text-light-fg ml-5 md:text-xl" onClick={onDelete}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  </>
}
