import React from 'react'
import pecialoffers from './Specialoffers'
import Specialoffers from '../components/Specialoffers'



export default function Content() {

  return (
    <div id="content" className='pt-52'>
        <div className='text-center w-full text-3xl font-bold'>Oferty Wyróżnione</div>
        <div className='h-screen mt-10 mx-auto w-[1100px]'>
        <div id="special-offers">
          <Specialoffers />
        </div>
        </div>
    </div>
  )
}
