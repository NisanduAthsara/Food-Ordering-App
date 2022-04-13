const DB = require('../model/model')
const bcrypt = require('bcrypt')

//login
exports.login = async (req,res)=>{
    try{
        res.clearCookie('pwd');
        res.clearCookie('uemail');
        res.clearCookie('uname');
        res.clearCookie('address');
        res.clearCookie('tel_no1');
        res.clearCookie('tel_no2');

        const uEmail = req.body.email

        const data = await DB.findOne({email:uEmail})
        if(data){
            const is_vali = await bcrypt.compare(req.body.password,data.password)
            if(is_vali){
                req.session.username = data.username
                res.cookie('id',data._id)
                if(data.user_type == 'User'){
                    res.redirect('/')
                }else{
                    req.session.admin = true
                    res.redirect('/admin/dashboard')
                }
            }else{
                if(req.session.username){
                    req.session.destroy((err)=>{
                        if(err){
                            console.log(err)
                        }
                    })
                }
                if(req.cookies.id){
                    res.clearCookie('id')
                }
                res.redirect('/login?login=false')
            }
        }else{
            if(req.session.username){
                req.session.destroy((err)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }
            res.redirect('/login?login=false')
        }
    }catch(err){

    }
}