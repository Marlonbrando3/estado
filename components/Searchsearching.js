import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import data from '../data/regions.json'
import prices from "../data/prices.json"

export default function Searchsearching() {

    const [powiat, setPowiat] = useState('Namysłowski');

    const powiats = data.map(obj => (
        <option value={obj.powiat}>{obj.powiat}</option>
    ))

    const cities = data.map(obj => {
        if(powiat === obj.powiat){
            return (
                obj.miejscowosci.map(i => (<option value={i}>{i}</option>)
                )
            )
        }
    })

    const price = prices.map(p => {
            return (
                p.price.map(i => (<option value={i}>{i}</option>)
                )
            )
        })

    const setNewPowiat = (e) => {
        console.log(e.target.value)
        setPowiat(e.target.value)
    }

    const setNewCity = (e) => {
        console.log(e.target.value)
        setCity(e.target.value)
    }

    // useEffect(() => {
    //     console.log(powiat.current.value)
    // })

  return (
    <div className='fixed w-[1900px] h-24 mx-auto flex bg-white z-40'>
        <div id='code' className='w-52 flex flex-col px-4 my-auto'>
            <label id="code" className='text-black'>Powiat</label>
            <select onChange={setNewPowiat} className='border h-10 rounded-sm bg-slate-50'>
                {powiats}
            </select>
        </div>
        <div id='city' className='w-52 flex flex-col px-4 my-auto'>
            <label id="city" className='text-black'>Miejscowość</label>
            <select className='border h-10 rounded-sm'>
                {cities}
            </select>
        </div>
        <div id='type' className='w-52 flex flex-col px-4 my-auto'>
            <label id="type" className='text-black'>Rodzaj</label>
            <select className='border h-10 rounded-sm bg-slate-50'>
                <option value='mieszkanie'>Mieszkanie</option>
                <option value='działka'>Działka</option>
                <option value='dom'>Dom</option>
                <option value='pokój'>Pokój</option>
                <option value='garaż'>Garaż</option>
            </select>
        </div>
        <div id='price' className='w-3/12 flex my-auto justify-around'>
            <div className='w-1/2 flex flex-col h-full'>
                <label id="priceFrom" className='text-black'> cena (Od)</label>
                <select className='w-11/12 border h-10 rounded-sm'>
                    {price}
                </select>
            </div>
            <div className='w-1/2 flex flex-col h-full'>
                <label id="priceTo" className='text-black'>Cena (Do)</label>
                <select className='w-11/12 border h-10 rounded-sm'>
                    {price}
                </select>
            </div>
        </div>
        <div id='filters' className='w-2/12 flex flex-col justify-around items-center my-1'>
            <div className='w-10/12 bg-white h-8 font-bold flex items-center justify-center cursor-pointer rounded-md'>Więcej filtrów</div>
            <div className='w-10/12 bg-yellow-300 h-8 font-bold flex items-center justify-center cursor-pointer rounded-md'>Pokaż wyniki</div>
        </div>
    </div>
  )
}
