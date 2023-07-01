"use client"
import { motion } from "framer-motion"
import { FC, useState } from "react"
import "./index.css"
import Link from "next/link"
import { User } from "@/server/handlers/helpers"

interface Props {
  user?: User | undefined
}

export const HeaderMenu: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen((prev) => !prev)

  return <>
    <div className="relative ml-auto mr-3 w-8 h-0 -translate-y-9 lg:hidden cursor-pointer" onClick={toggleIsOpen}>
      <span className="w-8 h-1 bg-light-fg absolute"></span>
      <span className="w-8 h-1 top-3 bg-light-fg absolute"></span>
      <span className="w-8 h-1 top-6 bg-light-fg absolute"></span>
    </div>
    <motion.div
      className={`bg-light-fg w-auto rounded-2xl flex flex-col items-center justify-center overflow-hidden h-0 py-0 mt-0 ${isOpen ? "menu-open" : ""} transition-all lg:h-auto lg:flex-row lg:-translate-y-10 lg:py-3 lg:absolute lg:ml-auto lg:mr-auto lg:left-0 lg:right-0 lg:w-96 lg:mt-7`}
    >
      {user ? <>
        <Link href="/trees" className="text-4xl text-light-bg">
          Trees
        </Link>
        <Link href="/links" className="text-4xl text-light-bg pt-7 md:pt-10 lg:pt-0 lg:pl-28">
          Links
        </Link>
      </> : <>
        <Link href="/login" className="text-4xl text-light-bg">
          Login
        </Link>
        <Link href="/registration" className="text-4xl text-light-bg pt-7 md:pt-10 lg:pt-0 lg:pl-28">
          Register
        </Link>
      </>
      }
    </motion.div>
  </>
}
