module.exports = (req,res)=>{
    try{
        if(req.session.username && req.cookies.id){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err)
                }
            })
            res.clearCookie('id')
            res.redirect('/?logout=true')
        }
        else{
            res.json('Unauthorized User')
        }
    }catch(err){

    }
}