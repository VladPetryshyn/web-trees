import { db } from "../db"
import { User } from "./helpers";

interface treesDataI {
  links: { value: string }[],
  title: string,
  description: string,
  handle: string
}

interface Tree {
  links: string[]
  description: string;
  title: string;
  handle: string;
  _id: string;
}

export type Trees = Tree[]

export const createTree = (user: User) => async (data: treesDataI) => {
  const handleTree = await db.Tree.findOne({ handle: data.handle })

  if (handleTree) throw "Tree with this handle already exists"

  const tree = new db.Tree({
    ...data,
    uid: user.id
  })

  await tree.save();
}

export const editTree = (user: User) => async (editHandle: string, { title, description, links, handle }: treesDataI) => {
  const handleTree = await db.Tree.findOne({ handle: editHandle })
  const newLinks = links.map(({ value }) => value)

  if (!handleTree) {
    const newHandle = await db.Tree.findOne({ handle })
    if (newHandle) throw { handle: "Handle is already taken" }

    const tree = new db.Tree({
      title,
      description,
      links: newLinks,
      handle,
      uid: user.id
    })

    return await tree.save();
  }
  if (handleTree) {
    if (handleTree.uid !== user.id) throw { error: "This tree doesn't belong to this user" }

    handleTree.title = title
    handleTree.description = description
    handleTree.links = newLinks

    const newHandle = await db.Tree.findOne({ handle })
    if (newHandle && handle !== editHandle) throw { handle: "Handle is already taken" }

    handleTree.handle = handle;


    await handleTree.save();
  }
}

export const deleteTree = (user: User) => async (handle: string) => {
  const tree = await db.Tree.findOne({ handle })

  if (tree.uid !== user.id) throw "This tree doesn't belong to this user"

  await db.Tree.deleteOne({ handle })
}

export const getTrees = (user: User) => async () => await db.Tree.find({ uid: user?.id })
export const getTree = (user?: User) => async (handle: string) => {
  try {
    const tree = await db.Tree.findOne({ handle })

    if (tree) return { ...tree._doc, isEditing: tree._doc.uid === user?.id }
  } catch {
    return;
  }

}
