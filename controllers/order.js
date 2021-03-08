const errorResponse =  require('../utils/errorResponse')
const Order = require('../models/Order')
const User = require('../models/User')

exports.getOrders= async (req,res,next)=>{
       
        // finding resource
        let query = await Order.aggregate([{
                $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userdetails'
                    }
        }, {
                $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'productdetails'
                    }  
            },
           {
                    $group:{
                       _id:"$user", orders:{$push:"$productdetails"}
            }
        }
])   
        res.status(200).json({success:true,  data:query})
   
}

exports.getOrderCount= async (req,res,next)=>{
       
        // finding resource
        let order = await Order.aggregate([
           {
                    $group:{
                         _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} }, count:{$sum: 1}
            }
        }
])           
        res.status(200).json({success:true,  data:order})
   
}

exports.getOrder = async (req,res,next)=>{
        
      
        const order = await Order.findById(req.params.id);
        if(!order){
          return  next(new errorResponse(`Order not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({success:true, data:order});  
}



exports.createOrder= async (req,res,next)=>{
       
        req.body.user  = req.user.id;
        //console.log(req.body);
        //return;
        const orderid = await User.findOne({user: req.user.id});

        if(orderid){
                return  next(new errorResponse(`User not found `, 404));
        }

        const order = await Order.create(req.body);
                
        res.status(201).json({success:true, data:order})   
}



exports.updateOrder= async (req,res,next)=>{
 
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,
            {new:true, runValidators: true});
        if(!order){
            return  next(new errorResponse(`Order not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({success:true, data:order})
}

exports.deleteOrder= async (req,res,next)=>{
        const order = await Order.findById(req.params.id);
        if(!order){
            return  next(new errorResponse(`Order not found with id ${req.params.id}`, 404));
        }
        
        order.remove();
        res.status(200).json({success:true, data:{}})
    
}


