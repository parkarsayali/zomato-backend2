const { response } = require('express');
const MealType = require('../model/mealtype');

exports.getMealTypes = (req, res) => {
    MealType.find().
    then(response => {
        res.status(200).json({ message : 'MealTypes Fetched successfully', meals :  response });
    }).catch(err => {
        res.status(500).json({ message :'MealTypes data fetching unsuccessful.', error : err});
    });
}