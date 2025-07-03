import React from 'react'
import Link from 'next/link'
import ThemeSwitch from "./ThemeSwitch"
import { Imperial_Script } from "next/font/google";
const font = Imperial_Script({weight: "400", subsets: ["latin"]})
const Navbar = () => {
  return (
    <div className="mx-auto px-10 py-6">
      <div className="flex justify-between items-center h-16 w-full">
        <Link href="/">
          <div className={`${font.className} text-3xl dark:text-amber-50`}>
            <span className="text-purple-500">Genuinely A</span>
          </div>
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default Navbar
