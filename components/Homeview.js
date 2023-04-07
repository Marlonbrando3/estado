import React from 'react'
import Search from './SearchMain'

export default function Homeview() {
  return (
    <div className='relative w-full h-[470px] bg-cover bg-center bg-[url("../components/images/background_home1.jpeg")] z-0'>
        <div className="absolute w-full bottom-0 h-12 bg-gradient-to-t from-white to-white/[0] z-0"></div>
        <div className="absolute left-0 h-full w-4/6 bg-gradient-to-r from-white to-white/[0] z-0"></div>
        <div className='text-darkblue text-7xl flex flex-col justify-center h-[400px] w-9/12 mx-auto z-10 relative'>
            {/* <p>Twój nowy</p>
            <p>dom</p> */}
        </div>
        <Search className="z-20"/>
    </div>
  )
}
 