import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useRouter }  from 'next/router'
import data from '../data/regions.json'
import prices from "../data/prices.json"

export default function SearchMain() {

    const router = useRouter();

    // const {code, city, pricefrom, priceto} = router.query

    const handleFilters = useRef();
    const filters = useRef();
    const filtersContent = useRef();
    const morelessfilters = useRef();

    const [options, setOptions] = useState([
        {name: "code", value:'Namysłowski'},
        {name: "city", value:'Wszystkie'},
        {name: "type", value:'Mieszkanie'},
        {name: "pricefrom", value:''},
        {name: "priceto", value:''},
        {name: "areafrom", value:''},
        {name: "areato", value:''},
        {name: "floorfrom", value:''},
        {name: "floorto", value:''},
        {name: "pricefromsquare", value:''},
        {name: "pricetosquare", value:''},
        {name: "roomsfrom", value:''},
        {name: "roomsto", value:''},
        {name: "firstmarket", value:false},
        {name: "secondmarket", value:false},
        {name: "balcony", value:false},
        {name: "parking", value:false},
        {name: "cellar", value:false},
        {name: "foto", value:false}
    ]);

    let powiat =''

    options.map(i => {
        if(i.name === 'code'){
            powiat = i.value
        }
    })

    const powiats = data.map(obj => (
        <option key={obj} value={obj.powiat}>{obj.powiat}</option>
    ))

    const cities = data.map(obj => {
        if(powiat === obj.powiat){
            return (
                obj.miejscowosci.map(i => (<option key={i}  value={i}>{i}</option>)
                )
            )
        }
    })

    const price = prices.map(p => {
            return (
                p.price.map(i => (<option key={p} value={i}>{i}</option>)
                )
            )
        })

    const handleSearch = () => {

        const queryData = options.map(i => {
            // console.log(i)
            if(i.value === true){
                return {
                    ...i
                }
            }
            
            else if(i.value !== '' && (i.value !== true && i.value !== false)){
                return {
                    ...i
                }
            } else return
        })

        const queryObiect = queryData.filter(i => i !== undefined)
        const results = queryObiect.map(i => {
            return {
                [i.name]:i.value
            }
        })

        const query = results.reduce(function(result, currentObject) {
            for(var key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                    result[key] = currentObject[key];
                }
            }
            return result;
        }, {});

        router.push({
            pathname:"/[code]",
            query:query
        })
    }   

    const handleShowFilters = () => {

        if(filters.current.style.marginTop !== "-350px"){
            filters.current.style.marginTop = "-350px"
            handleFilters.current.style.height = "350px"
            setTimeout(() => {
                handleFilters.current.style.boxShadow = "10px 10px 10px lightgray"
                morelessfilters.current.innerHTML = "Mniej filtrów"
            },10)

        } else {

            setTimeout(() => {
                handleFilters.current.style.boxShadow = "0"
                morelessfilters.current.innerHTML = "Więcej filtrów"
            },210)

            setTimeout(() => {
                filters.current.style.marginTop = "0px"
                handleFilters.current.style.height = "0px"
            },210)

    }
    }

    const handleParams = (e) => {
        const value = e.target.value
        const name = e.target.getAttribute('name')

        setOptions(options.map(i => {
            console.log(name)
            if(i.name === name && (i.value === true || i.value === false)){
                console.log("opcja 1")
                return {
                    ...i,
                    value:!i.value
                }
            }
            if(i.name === name && (i.value !== true && i.value !== false)){
                console.log("opcja 2")
                return {
                    ...i,
                    value:value
                }
            } else return i
        }))
    }
    
  return (
    <>
    <div ref={filters} className='relative w-[1070px] h-24 mx-auto rounded-md flex bg-slate-700 z-10 duration-300 drop-shadow-[0_20px_20px_rgba(0,0,0,0.55)]'>
        <div id='code' className='w-52 flex flex-col px-4 my-auto'>
            <label id="code"className='text-white font-thin -mt-2 pb-1'>Powiat</label>
            <select onChange={handleParams} name="code"  className='border font-[300] h-10 rounded-sm bg-slate-50'>
                {powiats}
            </select>
        </div>
        <div id='city' className='w-52 flex flex-col px-4 my-auto'>
            <label id="city" className='text-white font-thin -mt-2 py-1'>Miejscowość</label>
            <select onChange={handleParams} name="city" className='border h-10 rounded-sm bg-slate-50 font-[300] '>
                {cities}
            </select>
        </div>
        <div id='type' className='w-52 flex flex-col px-4 my-auto'>
            <label id="type" className='text-white pb-1 font-thin -mt-2'>Rodzaj</label>
            <select onChange={handleParams} name="type" className='border h-10 rounded-sm bg-slate-50 font-[300]'>
                <option value='mieszkanie'>Mieszkanie</option>
                <option value='działka'>Działka</option>
                <option value='dom'>Dom</option>
                <option value='pokój'>Pokój</option>
                <option value='garaż'>Garaż</option>
            </select>
        </div>
        <div id='price' className='w-3/12 flex my-auto justify-around'>
            <div className='w-1/2 flex flex-col h-full'>
                <label id="priceFrom" className='text-white pb-1 font-thin -mt-2'> Cena od</label>
                <select onChange={handleParams} name="pricefrom" className='font-[300] w-11/12 border h-10 rounded-sm'>
                    {price}
                </select>
            </div>
            <div className='w-1/2 flex flex-col h-full'>
                <label id="priceTo" className='text-white pb-1 font-thin -mt-2'>Cena do</label>
                <select onChange={handleParams} name="priceto" className='w-11/12 h-10 rounded-sm font-[300]'>
                    {price}
                </select>
            </div>
        </div>
        <div id='filters' className='w-2/12 flex flex-col justify-center items-center my-1'>
            <div ref={morelessfilters} onClick={handleShowFilters} className='w-10/12 bg-white h-7 my-1 font-normal border border-white flex items-center justify-center cursor-pointer rounded-md hover:bg-slate-700 hover:text-white duration-150'>Więcej filtrów</div>
            <div onClick={handleSearch} className='w-10/12 bg-red-500 h-7 my-1 text-white font-normal border border-red-500 flex items-center justify-center cursor-pointer rounded-md hover:bg-green-500 hover:text-white hover:border-green-500 duration-150'>Pokaż wyniki</div>
        </div>
    </div>
    <div ref={handleFilters} className='w-[1070px] relative mx-auto top-0 h-0 bg-white z-10 flex duration-300 overflow-hidden'>
        <div ref={filtersContent} id="content" className=' flex flex-wrap pt-2'>
            <div className='w-1/4 h-[140px] pt-2 px-5'>
            <p className='ml-4 py-2 font-[400]'>Powierzchnia (m2)</p>
                <div className='flex w-full items-center'>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="areafrom" placeholder='od' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="areato" placeholder='do' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                </div>
            </div>
            <div className='w-1/4 h-[140px] pt-2 px-5'>
            <p className='ml-4 py-2 font-[400]'>Piętro</p>
                <div className='flex w-full items-center'>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="floorfrom" placeholder='od' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="floorto" placeholder='do' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                </div>
            </div>
            <div className='w-1/4 h-[140px] pt-2 px-5'>
            <p className='ml-4 py-2 font-[400]'>Cena (m2)</p>
                <div className='flex w-full items-center'>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="pricefromsquare" placeholder='od' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                    <div className='w-1/2 text-center'>
                        <label></label>
                        <input onChange={handleParams} type='number' name="pricetosquare" placeholder='do' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                </div>
            </div>
            <div className='w-1/4 h-[140px] pt-2 px-5'>
            <p className='ml-4 py-2 font-[400]'>Liczba pokoi</p>
                <div className='flex w-full items-center'>
                    <div className='w-1/2 text-center'>
                        <input onChange={handleParams} type='number' name="roomsfrom" placeholder='od' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                    <div className='w-1/2 text-center'>
                        <input onChange={handleParams} type='number' name="roomsto" placeholder='do' className='border border-gray-400 w-9/12 rounded-md h-11 mx-auto px-2'></input>
                    </div>
                </div>
            </div>
            <div className='w-1/4 h-[210px] px-5'>
                <p className='ml-4 py-2 font-[400]'>Rynek</p>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="firstmarket" className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Pierwotny</p>
                </div>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="secondmarket" className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Wtórny</p>
                </div>
            </div>
            <div className='w-1/4 h-[210px] px-5'>
                <p className='ml-4 py-2 font-[400]'>Opcje</p>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="balcony" className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Balkon</p>
                </div>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="parking" className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Garaż</p>
                </div>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="cellar" className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Piwnica</p>
                </div>
                <div className='flex my-2'>
                    <input type="checkbox" onClick={handleParams} name="foto"  className='w-5 h-5 border border-gray-500 mx-4 cursor-pointer hover:bg-red-100 duration-150 hover:border-gray-400'></input>
                    <p>Tylko ze zdjęciem</p>
                </div>
            </div>
            <div className='w-1/2 h-[210px] p-8 font-bold flex items-end justify-end'>
                <button className='bg-red-500 text-white px-2 py-1 rounded-md font-normal hover:bg-green-500 hover:text-white hover:border-green-500 duration-300'>Przeglądaj oferty </button>
            </div>
        </div>
    </div>
    </>
  )
}
