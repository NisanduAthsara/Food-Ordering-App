const DB = require('../model/model')
const bcrypt = require('bcrypt')

exports.signup = async (req,res)=>{
    try{

        const pwd = req.body.password
        const u_email = req.body.email
        const u_name = req.body.username
        const address = req.body.address
        const tel_no1 = req.body.tel_no1
        const tel_no2 = req.body.tel_no2
        const user_type = req.body.user_type

        res.cookie('uname',u_name)
        res.cookie('pwd',pwd)
        res.cookie('uemail',u_email)
        res.cookie('address',address)
        res.cookie('tel_no1',tel_no1)
        res.cookie('tel_no2',tel_no2)
        res.cookie('user_type',user_type)

        if(!u_name || typeof u_name !== 'string'){
            res.clearCookie('uname');
            return res.redirect('/signup?usernameVal=false')
        }

        if(!address || typeof address !== 'string'){
            res.clearCookie('address');
            return res.redirect('/signup?address=false')
        }

        if(!tel_no1 || typeof tel_no1 !== 'string'){
            res.clearCookie('tel_no1');
            return res.redirect('/signup?tel_no1=false')
        }

        if(!tel_no2 || typeof tel_no2 !== 'string'){
            res.clearCookie('tel_no2');
            return res.redirect('/signup?tel_no2=false')
        }

        if(!user_type || typeof user_type !== 'string'){
            res.clearCookie('user_type');
            return res.redirect('/signup?user_type=false')
        }

        if(u_name.length < 3){
            res.clearCookie('uname');
            return res.redirect('/signup?usernameLen=false')
        }

        if(!u_email || !IsValid(u_email)){
            res.clearCookie('uemail');
            return res.redirect('/signup?emailVal=false')
        }

        if(!pwd || typeof pwd !== 'string'){
            res.clearCookie('pwd');
            return res.redirect('/signup?passVal=false')
        }

        if(pwd.length < 5){
            res.clearCookie('pwd');
            return res.redirect('/signup?passLen=false')
        }

        const count = await DB.findOne({email:req.body.email})
        
        if(count){
            res.clearCookie('uemail');
            return res.redirect('/signup?emailUse=true')
        }

        const salt = await bcrypt.genSalt(10);
        const salted_pwd = await bcrypt.hash(req.body.password, salt);

        const newUser = new DB({
            username:req.body.username,
            email:req.body.email,
            password:salted_pwd,
            address:req.body.address,
            tel_no1:req.body.tel_no1,
            tel_no2:req.body.tel_no2,
            user_type:req.body.user_type
        })

        const data = await newUser.save(newUser)
        if(data){
            res.clearCookie('pwd');
            res.clearCookie('uemail');
            res.clearCookie('uname');
            res.clearCookie('address');
            res.clearCookie('tel_no1');
            res.clearCookie('tel_no2');
            res.clearCookie('user_type');
            res.redirect('/signup?useradd=true')
        }else{
            res.send('Unable to add')
        }
    }catch(err){
        if(err.code === 11000){
            return res.send({message:'Email already in use'})
        }
        throw err
    }
}
