const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const User = require('./model/User')
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sarveshgoyal4152@gmail.com",
        pass: process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/RegisterOtp', { useNewUrlParser: true, useUnifiedTopology: true });



const storage = multer.diskStorage({
    destination:__dirname+"/uploads",
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({
    storage
});

const app = express();
app.set('view engine','hbs');
app.set('views','views')

app.use(express.urlencoded());
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})


app.get('/',(req,res)=>{
    res.send("Welcome to Email verfication");
})

app.get('/register',(req,res)=>{
    res.render("register");
})
var email;
var Otp;
app.post('/register',upload.single('img'),async (req,res)=>{
    const file = req.file;
    const data = req.body;
    const newUser = new User(data);

    const newName= newUser._id+"."+file.mimetype.split("/")[1];
    const newPath = file.destination+"/"+newName;
    fs.renameSync(file.path,newPath);
    
    try{
        await newUser.save();
        email=newUser.email
        Otp=random();
        mail1()
        res.render("otp");
    }catch{
        res.send("Error");
    }
})

app.post('/verify',async (req,res)=>{
    const otp = req.body;
    const user = await User.findOne().where('email').equals(email);
    if(otp.otp==Otp)
    {
        user.verified=true;  
        await user.save(); 
        res.send("Verified");
    }
    else   
        res.send("Not Verified");
})

app.get("/display",async(req,res)=>{
    const data = req.query.search;
    const user = await User.findOne().where('email').equals(data);

res.render("display",{
    user
});
})

function random() {
    var randomNumber = Math.floor(Math.random() * 9000) + 1000;
    console.log(randomNumber);
    return randomNumber;
}



function mail1() {
    const mail = {
        from: "sarveshgoyal4152@gmail.com",
        to: email,
        subject: 'OTP Verification',
        text: `Your Otp is ${Otp}`,
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}