const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');

const now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

const pattern = date.format(now, 'YYYY/MM/DD HH:mm:ss');

const DateNow =date.format(now, pattern);                  
const orderSchema = Schema({
   user_id:{
       type:String,
       require:true
   },
   items:{
       type:String,
       require:true
   },
   amount:{
        type:String,
        require:true
   },
   time:{
        type:String,
        require:true,
        default:DateNow
   },
   address:{
        type:String,
        require:true
   },
   restaurant:{
        type:String,
        require:true    
   }

});

module.exports = mongoose.model('order',orderSchema);