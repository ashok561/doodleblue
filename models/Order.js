const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    product:[{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }],
    createdAt:{
        type:Date,
        default: Date.now
    }
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})

orderSchema.pre('remove',async function (next){
    
    await this.model('OrderDetails').deleteMany({order: this._id});
    next();
})

orderSchema.virtual('orderdetails',{
    ref:'OrderDetails',
    localField:'_id',
    foreignField:'order',
    justOne:true
})
module.exports = mongoose.model('Order', orderSchema);