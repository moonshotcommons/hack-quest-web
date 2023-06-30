import Image from 'next/image'
import React from 'react'
import Logo from '@/public/text-Logo.svg'
import Avatar from '@/public/assets/avatar.svg'
const NavBar = () => {
  return (
    <div className="h-[4.75rem] flex items-center justify-between">
      <nav className="gap-[4rem] text-[#B2B2B2] font-next-book flex">
        <Image src={Logo} alt="logo"></Image>
        <span className="text-sm">All Courses</span>
        <span className="text-sm">Learning Dashboard</span>
      </nav>
      <Image src={Avatar} alt="avatar"></Image>
    </div>
  )
}

export default NavBar
