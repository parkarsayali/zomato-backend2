const Orders = require('../model/orders');


exports.addOrderDetails = (req,res) => {
    const reqBody = req.body;
    const user_id = reqBody.user_id;
    const items = reqBody.items;
    const amount = reqBody.amount;
    const time = reqBody.time;
    const address = reqBody.address;
    const restaurant = reqBody.restaurant;

    const orderData = new Orders({user_id:user_id,items:items,amount:amount,time:time,address:address,restaurant:restaurant});

    orderData.save().then(response => {
        res.status(200).json({  messsage: 'Order Data inserted successfully.', order: response})

    }).catch(err => {
        res.status(500).json({  messsage: 'Order Data insertion  unsuccessful.', error : err})
    })
}