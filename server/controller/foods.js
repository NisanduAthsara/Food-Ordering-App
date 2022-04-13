const DB = require('../model/foods')
const fs = require('fs')

exports.addFood = async (req,res,next)=>{
    try {
        const file = req.files;

        if(!file){
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }

        let img = fs.readFileSync(file.path)
        let encode_img = img.toString('base64')

        let content_type = file.mimetype

        const food = new DB({
            name:req.body.foodName,
            price:req.body.price,
            delivery_time:req.body.deliveryTime,
            image:encode_img,
            image_ext:content_type
        })

        const result = await food.save(food)

        if(result){
            res.send('Upload successfully')
        }else{
            res.send('An error occured!')
        }
    } catch (error) {
        console.log(error);
    }
}