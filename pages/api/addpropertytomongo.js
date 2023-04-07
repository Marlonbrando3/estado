import mongoose from "mongoose"
import Property from '../../model/nieruchomosci'

export default async function addpropertytomongo(req,res){

    console.log("łączę aby dodać nieruchomość")
    await mongoose.connect(process.env.MONGO_URI);
    console.log("połączyłem aby dodać nieruchomość")


    const newProperty = new Property({
        id: req.body.id,
        code: req.body.code,
        city: req.body.city,
        favorites: req.body.favorites,
        recomended: req.body.recomended,
        title: req.body.title,
        market: req.body.market,
        type: req.body.type,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        garden: req.body.garden,
        parking: req.body.parking,
        taras: req.body.taras,
        balcony: req.body.balcony,
        price: req.body.price,
        description: req.body.description,
        owner: req.body.owner,
        image: req.body.image

    })    
    await newProperty.save();
    res.redirect('newproperty')
    res.send(console.log("Sended to Mongo"))

}