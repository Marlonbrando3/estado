import React from 'react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function PropertyCard({title, city, price, descryption, meters, code, images}) {

  const imageslist = useRef();

  const [margin, setMargin] = useState(0); 

  const img = images.map((i, index) => (
    <div className='border w-[290px] h-[200px] bg-red-900 overflow-hidden'>
      {/* Foto {index} */}
      <Image 
        src={i}
        width={400}
        height={200}
        priority
        // fill
        responsive
      />
      </div>
  )
  )

  const slideLeft = () => {
    const imagesWidth = 290
    const marginchange = margin-imagesWidth

    const imgDivLength = imagesWidth*img.length
    console.log(imgDivLength-imagesWidth)
    console.log(imgDivLength)
    console.log(marginchange)

    if(Math.abs(margin) < (imgDivLength-imagesWidth)){
      console.log("warunek 1")
      imageslist.current.style.marginLeft = `-${marginchange}px`
      setMargin(margin-imagesWidth)

    } if(Math.abs(margin) === imgDivLength-imagesWidth){ 
      console.log("warunek 2")
      imageslist.current.style.marginLeft = `-${imagesWidth}px`
      setMargin(imagesWidth)
    }
    if(Math.abs(margin) === 0){ 
    console.log("warunek 2")
    imageslist.current.style.marginLeft = `-${imgDivLength-imagesWidth}px`
    setMargin(imgDivLength-imagesWidth)
  }
    

  }

  const slideRight = () => {
    const imagesWidth = 290
    const marginchange = margin+imagesWidth
    const imgDivLength = imagesWidth*img.length

    console.log(imgDivLength-imagesWidth)
    console.log(imgDivLength)
    console.log(marginchange)

    console.log(imgDivLength)

    if(Math.abs(margin) < imgDivLength-imagesWidth){
      console.log("warunek 1")
      imageslist.current.style.marginLeft = `-${marginchange}px`
      setMargin(margin+imagesWidth)

    } else { 
      console.log("warunek 2")
      imageslist.current.style.marginLeft = "0px"
      setMargin(0)
    }

  }

  return (
    <div className='w-[330px] h-[420px] mx-auto flex bg-white rounded-md cursor-pointer duration-300 shadow-xl hover:shadow-2xl'>
        <div className='relative w-full flex flex-col rounded-md p-5'>
          <div id="imgcontainer" className='relative w-full h-[240px] mx-auto overflow-hidden'>
            <div onClick={slideLeft} className='absolute bottom-0 bg-gray-600/[0.5] h-1/6 w-1/2 left-0 cursor-pointer duration-300 hover:bg-red-700/[0.5] z-10 flex justify-center items-center text-white'><ArrowBackIosIcon /></div>
                <div ref={imageslist} id="images" className='absolute h-[200px] bg-blue-900 flex flex-nowrap duration-300 '>
                  {img}
                </div>
            <div onClick={slideRight} className='absolute bg-gray-600/[0.5] h-1/6 w-1/2 bottom-0 right-0 cursor-pointer duration-300 hover:bg-red-700/[0.5] z-10 flex justify-center items-center text-white'><ArrowForwardIosIcon /></div>
          </div>
            <div id="desc" className=' w-full h-[100px]'>
                <p className='font-bold text-xl my-4'>{title}</p> 
                <p><span className='font-bold'>Powiat: </span>{code}, {city}</p> 
                <p><span className='font-bold'>Powierzchnia: </span>{meters}</p>
                <p><span className='font-bold'>Cena: </span>{price} zł</p>
            </div>
        </div>
    </div>
  )
}
