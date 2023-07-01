import { db } from "../db";
import { User } from "./helpers";

interface linkDataI {
  link: string;
  handle: string;
}

export interface Link {
  link: string;
  handle: string;
  _id: string;
}
export type Links = Link[];

export const createLink = (user: User) => async (data: linkDataI) => {
  const link = await db.Link.findOne({ handle: data.handle })

  if (link) throw { handle: "This handle is already taken" }

  const newLink = new db.Link({
    ...data,
    uid: user?.id
  })

  await newLink.save();
}

export const deleteLink = (user: User) => async (handle: string,) => {
  const link = await db.Link.findOne({ handle })

  if (link.uid !== user.id) throw "This link doesn't belong to this user"

  await db.Link.deleteOne({ handle })
}

export const getLinks = async (user: User) => await db.Link.find({ uid: user?.id })

export const getLink = async (handle: string) => await db.Link.findOne({ handle })
