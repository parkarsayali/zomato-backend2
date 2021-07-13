
const { response } = require('express');
const Restaurant = require('../model/restaurant');
const Item = require('../model/items');

//to get restaurants by location ID
exports.getRestaurantsByLocation = (req,res) => {
    const locationId = req.params.locationId;
    Restaurant.find({ location_id: locationId })
        .then( response => {
            res.status(200).json({ message: 'Restaurant Fetched Successfully', restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }

// filter page API

exports.filterRestaurants = (req,res) => {
    const reqBody = req.body;
    const locationId = reqBody.locationId;
    const mealtypeId = reqBody.mealtypeId;
    const cuisineId = reqBody.cuisineId;
    const lcost = reqBody.lcost;
    const hcost = reqBody.hcost;
    const sort = reqBody.sort ? reqBody.sort : 1 ;
    const page = reqBody.page ? reqBody.page: 1;

    let payload = {};

    const itemsPerPage =2;
    let startIndex = (page* itemsPerPage-2);
    let endIndex = (page * itemsPerPage);

    // jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/

// var items = $(".cafes_list");
// var numItems = items.length;
// var perPage = 2;

// items.slice(perPage).hide();

// $('.pagination').pagination({
//     items: numItems,
//     itemsOnPage: perPage,
//     prevText: "&laquo;",
//     nextText: "&raquo;",
//     onPageClick: function (pageNumber) {
//         var showFrom = perPage * (pageNumber - 1);
//         var showTo = showFrom + perPage;
//         items.hide().slice(showFrom, showTo).show();
//     }
// });

    if (mealtypeId){
        payload = { mealtype_id: mealtypeId}
    }

    if (mealtypeId && locationId){
        payload = { mealtype_id: mealtypeId,location_id: locationId}
    }

    if (mealtypeId && lcost && hcost){
        payload = 
        { mealtype_id: mealtypeId,
          min_cost: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtypeId && locationId && lcost && hcost){
        payload = 
        {   mealtype_id: mealtypeId,
            location_id: locationId,
            min_cost: { $lte: hcost, $gte: lcost }
        }
    }
    if(mealtypeId && cuisineId){
        payload = { mealtype_id: mealtypeId,cuisineId: cuisineId}
    }
    if (mealtypeId && cuisineId && lcost && hcost){
        payload = 
        {   mealtype_id: mealtypeId,
            cuisineId: cuisineId,
            min_cost: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtypeId && cuisineId && lcost && hcost && locationId){
        payload = 
        {   mealtype_id: mealtypeId,
            cuisineId: cuisineId,
            min_cost: { $lte: hcost, $gte: lcost },
            location_id: locationId
        }
    }

     Restaurant.find(payload).sort({min_cost: sort}).then(response => {
        //pagination
         const filterRes = response.slice(startIndex,endIndex);
        res.status(200).json({ message:"Fetched ",restaurants : filterRes })
    
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}


//get restaurant details by restaurant Id
exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurantDetails: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

//get menu items by restaurant

exports.getMenuItemsByRestaurant = (req,res) => {
    const restaurantId = req.params.restaurantId;
    Item.find({restaurant_id:restaurantId})
    .then(response => {
        res.status(200).json({ message: "MenuItems Fetched Succesfully", MenuItems: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}
