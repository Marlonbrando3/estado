import React from 'react'
import { useContext } from 'react'
import { MainContext } from '@/pages'
import data from "../data/specialoffers.json"
import PropertyCard from './SearchEngine/PropertyCard'

export default function Specialoffers() {

  const {property} = useContext(MainContext)

    const results = property.map(i => (
      <PropertyCard 
        title={i.title}
        code={i.code}
        city={i.city}
        price={i.price}
        descryption={i.descryption}
        meters={i.meters}
        images={i.image}
      ></PropertyCard>))

  return (
    <div className='w-full h-18 flex flex-wrap mx-auto'>{results}</div>
  )
}
