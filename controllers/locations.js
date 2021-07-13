const { response } = require('express');
const Locations = require('../model/locations');
exports.getLocations = (req,res) => {
    Locations.find().then(response => {
        res.status(200).json({message:'Locations fetched successfully', city : response})
    }).catch(err => {
        res.status(500).json(err)
    })

}
exports.addLocation = (req,res) => {
    const reqBody = req.body;
    const name = reqBody.name;
    const city_id = reqBody.city_id;
    const location_id = reqBody.location_id;
    const city = reqBody.city;
    const country_name = reqBody.country_name;

    const locationData = new Locations({name:name,city_id:city_id,location_id:location_id,city:city,country_name:country_name});
    locationData.save().then(response => {
        res.status(200).json({  messsage: 'Location Data inserted successfully.', location: response})

    }).catch(err => {
        res.status(500).json({  messsage: 'Location Data insertion  unsuccessful.', error : err})
    })
}