const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Use .env This file should not upload to github(.gitignore) This .env file is a secret file in our group5
const secretKey = process.env.SECRET_KEY

router.get('/',(req,res) =>{
  console.log('Imported secretKey:', secretKey);
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);
  
  if(!token) return res.status(401).send('Acsedioder ss Denied');
  
  try{
    const decoded_verified = jwt.verify(token, secretKey);
    console.log('Decoded JWT Payload:', decoded_verified);
    console.log('User Role:', decoded_verified.role);
    if(decoded_verified.role ==='admin'){
      console.log('Data for admin');
      res.json({data: 'Secret data for admin!'});
    }else{
      console.log('Data for user');
      res.json({data: 'Secret data for user!'});
    }
   }catch (error) {
      res.status(401).send(`Invalid Token: ${error.message}`);
   }
  });
  
  module.exports = router;