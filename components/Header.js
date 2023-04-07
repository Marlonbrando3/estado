import React from 'react'
import Image from 'next/image'
import logo from './images/logo_estado.png'

export default function Header() {
  return (
    <div className="sticky drop-shadow-xl">
    <div className='relative bg-white w-full h-16 flex items-center justify-between px-40 py-2 z-40'>
      <Image 
          src={logo}
          width={180}
          height={20}
        />
      <nav>
        <ul className='flex'>
          <li className='px-2 py-1 cursor-pointer hover:bg-slate-700 hover:text-white duration-150'>Strona główna</li>
          <li className='px-2 py-1 cursor-pointer hover:bg-slate-700 hover:text-white duration-150'>Nieruchomości</li>
          <li className='px-2 py-1 cursor-pointer hover:bg-slate-700 hover:text-white duration-150'>O nas</li>
          <li className='px-2 py-1 cursor-pointer hover:bg-slate-700 hover:text-white duration-150'>Jak kupić?</li>
          <li className='px-2 py-1 cursor-pointer hover:bg-slate-700 hover:text-white duration-150'>Kontakt</li>
        </ul>
      </nav>
    </div>
    </div>
  )
}