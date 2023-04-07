import React from 'react'
import { useRef, useState } from 'react';

export default function AdminInputs() {


    const [UniqeId, setUniqeId] = useState('');

        let data = fetch("/api/randomizedId",{
        method:"POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        })
        const dataID = data.then(r => r.json())
        dataID.then(i => {
            if(UniqeId === ''){
                setUniqeId(parseInt(i.id))
            } else {}
        }
    )   
    
    const id = useRef();
    const favorites = useRef();
    const recomended = useRef();
    const localization = useRef();
    const meters = useRef();
    const code = useRef();
    const city = useRef();
    const title = useRef();
    const market = useRef();
    const type = useRef();
    const bathrooms = useRef();
    const bedrooms = useRef();
    const garden = useRef();
    const parking = useRef();
    const taras = useRef();
    const balcony = useRef();
    const price = useRef();
    const description = useRef();
    const owner = useRef();
    const images = useRef();

    //send data to backend and save images on public/images
    
    const connectwithbackend = async(e) => {

        e.preventDefault();

        const fileData = images.current

        let imagestoFetch = []

        for (const file of fileData.files) {
            console.log("name"+file.name)
        }

        const formData = new FormData();
        for (const file of fileData.files){

            const data = new Date().toLocaleDateString();
            const filename = file.name
            const link = 'https://res.cloudinary.com/onestagrouppl/image/upload/Nieruchomosci/'
            const id = UniqeId
            const uniqueSuffix = '_'+ data+'_'+ Date.now()+'_.' + 'jpg'
            const uniqueImgNameWork = link+id+'_'+code.current.value+'_'+city.current.value+'_'+title.current.value+'_'+uniqueSuffix
            const uniqueImgName = uniqueImgNameWork.toString().replaceAll(' ','_')

            // console.log(uniqueImgName.toString().replaceAll(' ','_'))

             //set links to files for Mongo DB array
            imagestoFetch = [...imagestoFetch, uniqueImgName]

            formData.set('file', file,`${uniqueImgName}`)
            formData.append('upload_preset', 'Nieruchomosci')
            await fetch(`https://api.cloudinary.com/v1_1/onesetagrouppl/image/upload?api_key=565674343466964`, {
            method:"POST",
            body:formData})
        }

        let msg = await fetch('/api/addpropertytomongo', {
            method:"POST",
            model:"no-cors",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods':'GET, POST',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                id: UniqeId,
                favorites: favorites.current.value,
                recomended:recomended.current.value,
                localization: localization.current.value,
                meters: meters.current.value,
                code: code.current.value,
                city: city.current.value,
                title: title.current.value,
                market: market.current.value,
                type: type.current.value,
                bathrooms: bathrooms.current.value,
                bedrooms: bedrooms.current.value,
                garden: garden.current.value,
                parking: parking.current.value,
                taras: taras.current.value,
                balcony: balcony.current.value,
                price: price.current.value,
                description: description.current.value,
                owner: owner.current.value,
                image:imagestoFetch
            }),
        })
    }

  return (
    <form  method="POST" onSubmit={connectwithbackend} className='flex flex-col w-10/12 mx-auto' enctype='multipart/form-data'>
        <label id="id">Numer oferty (nadany automatycznie)</label>
        <input ref={id} className="inputs-add-property" name="id" value={UniqeId} readOnly></input>

        <label id="code" className="inputs-add-property-label">Powiat</label>
        <select ref={code}  className="inputs-add-property" name="code">
            <option value="Namysłowski">Namysłowski</option>
            <option value="Kluczborski">Kluczborski</option>
            <option value="Brzeski">Brzeski</option>
            <option value="Oleski">Oleski</option>
            <option value="Olesnicki">Olesnicki</option>
        </select>

        <label id="city" className="inputs-add-property-label">Miejscowość</label>
        <input ref={city} className="inputs-add-property" name="region"></input>

        <label id="favorites" className="inputs-add-property-label">Wyróżniona?</label>
        <select ref={favorites} className="inputs-add-property" name="favorites">
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="recomended" className="inputs-add-property-label">Polecana na stronie gównej?</label>
        <select ref={recomended} className="inputs-add-property" name="addtohomeview" >
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="title" className="inputs-add-property-label">Tytuł na portal</label>
        <input ref={title} className="inputs-add-property" name="title"></input>

        <label id="market" className="inputs-add-property-label">Rynek</label>
        <select ref={market} className="inputs-add-property" name="market" >
            <option value="First">Pierwotny</option>
            <option value="Second">Wtórny</option>
        </select>

        <label id="type" className="inputs-add-property-label">Typ</label>
        <select ref={type} className="inputs-add-property" name="type">
            <option value="house">Dom</option>
            <option value="apartament">Apartament</option>
            <option value="bungalow">Bungalow</option>
        </select>

        <p className="pt-5 font-bold text-2xl">O Nieruchomości:</p>

        <label id="bathrooms" className="inputs-add-property-label">Łazienki</label>
        <input ref={bathrooms} className="inputs-add-property" name="bathrooms"></input>


        <label id="bedrooms" className="inputs-add-property-label">Sypilanie</label>
        <input ref={bedrooms} className="inputs-add-property" name="bedrooms"></input>

        <label id="garden" className="inputs-add-property-label">Ogród</label>
        <select ref={garden} className="inputs-add-property" name="garden">
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="parking" className="inputs-add-property-label">Parking</label>
        <select ref={parking} className="inputs-add-property" name="parking">
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="taras" className="inputs-add-property-label">Taras</label>
        <select ref={taras} className="inputs-add-property" name="taras">
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="balcony" className="inputs-add-property-label">Balkon</label>
        <select ref={balcony} className="inputs-add-property" name="balcony">
            <option value="true">Tak</option>
            <option value="false">Nie</option>
        </select>

        <label id="price" className="inputs-add-property-label">Cena</label>
        <input ref={price} className="inputs-add-property" name="price"></input>

        <label id="localization" className="inputs-add-property-label">Lokalizacja(link google)</label>
        <input ref={localization} className="inputs-add-property" name="localization"></input>

        <label id="meters" className="inputs-add-property-label">Powierznia obiektu</label>
        <input ref={meters} className="inputs-add-property" type="number" name="meters"></input>
        
        <label id="owner" className="inputs-add-property-label">Źródło</label>
        <input ref={owner} className="inputs-add-property" name="owner" type="text"></input>

        <label id="description" className="inputs-add-property-label">Opis nieruchomości</label>
        <textarea ref={description} className="inputs-add-property-textarea h-40"name="description"></textarea>

        <label id="PropImages" className="inputs-add-property-label">Zdjęcia</label>
        <input ref={images} type="file" multiple name="PropImages"></input>

        <button type="submit" className='bg-green-700 my-6 py-2 w-52 rounded-md text-white hover:bg-slate-700'>Add property</button>
    </form>
  )
}
