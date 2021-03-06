const errorResponse =  require('../utils/errorResponse')
const User = require('../models/User')

exports.register = async(req,res,next)=>{
    const {name,email,password,role} =  req.body;
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    sendTokenResponse(user,200,res);
}

exports.login =  async(req,res,next)=>{
    const { email,password} =  req.body;
 
    if(!email || !password){
       
        return next(new errorResponse('please fill all the field', 400));
    }

    const user =await User.findOne({email}).select('+password');
  
    if(!user){
       
        return next(new errorResponse('user not found', 400));
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        
        return next(new errorResponse('invalid credential', 401));
    }
    sendTokenResponse(user,200,res);
}

exports.getme = async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data:user
    })
}


const sendTokenResponse = (user,statusCode,res)=>{
   
    const token = user.getSignedJwtToken();
    const options ={
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24 * 60 * 60 * 1000),
        httpOnly: true

    }
    if(process.env.NODE_ENV == 'production'){
       options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token
    })
}
