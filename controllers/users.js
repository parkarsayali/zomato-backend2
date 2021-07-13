// const {response} = require('express');
const UserData = require('../model/users');


//for sign up 
exports.createUser =(req,res) =>{
    const reqBody = req.body;
    const name=reqBody.name;
    const email=reqBody.email;
    const password = reqBody.password;
    

    const addUser = new UserData({name,email,password});

    addUser.save().then(response =>{
        res.status(200).json({message:"Sign up successful",Users:response})
        })
        .catch(err =>
            {
                res.status(500).json({ error: err })
            })
}

//for login

exports.authenticateUser =(req,res) =>{
    const reqBody = req.body;
    const name=reqBody.name;
    const email=reqBody.email;
    const password = reqBody.password;
    UserData.find({email:email , password:password})
        .then(response =>{
            res.status(200).json({message:"Logged in ",LoginUser:response});
        }).catch(err =>
            {
                res.status(500).json({ error: err })
            })
}
