import React from 'react'
import useRouter  from 'next/router'
import Header from '../../components/Header'
import Property from '../../model/nieruchomosci'
import Searchview from "../../components/Searchview"
import mongoose from 'mongoose'

export default function Index() {


  const router = useRouter();

  const data = router.query
  console.log(data)

  return (
    <div>
        <Header />
        <Searchview />
    </div>
  )
}


export async function getServerSideProps (contex) {

  const request = contex.query.data
  console.log(request)

  console.log("Przed połączeniem")
  await mongoose.connect(process.env.MONGO_URI)
  console.log("Połączono!")

  const results = await Property.find(request)
  const properties = await JSON.parse(JSON.stringify(results))

  console.log(properties)

  return {
    props:{
      property: properties,
    }
  }
}


