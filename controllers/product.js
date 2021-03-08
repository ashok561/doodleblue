const errorResponse =  require('../utils/errorResponse')
const Product = require('../models/Product')

exports.getProducts= async (req,res,next)=>{      
        const product = await Product.find();
        res.status(200).json({success:true, count:product.length, data:product})
   
};

exports.getProduct= async (req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if(!product){
          return  next(new errorResponse(`Product not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({success:true, data:product});  
}


exports.createProduct = async (req,res,next)=>{
        
        const productid = await Product.findOne({name: req.body.name});

        if(productid){
                return  next(new errorResponse(`Product name already exist `, 404));
        }

        const product = await Product.create(req.body);
        res.status(201).json({success:true, data:product})   
}

exports.updateProduct = async (req,res,next)=>{
 
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,
            {new:true, runValidators: true});
        if(!product){
            return  next(new errorResponse(`Product not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({success:true, data:product})
}


exports.deleteProduct= async (req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if(!product){
            return  next(new errorResponse(`Product not found with id ${req.params.id}`, 404));
        }
        product.remove();
        res.status(200).json({success:true, data:{}})
}


