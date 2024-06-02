const express=require('express');
const path = require('path');
const nodemailer=require('nodemailer')
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Token, MODE, Environment, OwnerId, EventName, CustomHeader,X-CheckSum');
    next();
}

const server=express();
server.use(allowCrossDomain);
var transporter=nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth:{
        user: 'rajeshrishant67@gmail.com',
        pass: 'dmhw qzpx mkjh ufzp'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
});
const mailOptions={
    from: {
        name:'Test',
        address: 'rajeshrishant67@gmail.com'
    },
    to: ['satdevs551@gmail.com','rajesh.ae171408@gmail.com'],
    subject: "Sending Test Email",
    text: "Hellow",
    html: "<b>hel</b>"
}
server.get('/api/worklist',(req,res)=>{
    try {
        
    } catch (error) {
        console.log('Error While getting worklist',e)
    }
})
server.post('/api/email',async(req,res)=>{
    try {
        // const from=req.body.from,to=req.body.to,subject=req.body.subject,message=req.body.message;
        const from='satdevs551@gmail.com',to='rajeshrishant67@gmail.com',subject='Test for Email',message='Hello Man!!';
        const sendEmail=await transporter.sendMail(mailOptions);
        console.log('dsfasd',sendEmail)
        res.status(200).json({ResponseStatus:"Message Sent Successfully!!"})
    } catch (error) {
        console.log('Error in Post of Email',error);
    }
});
server.get('/',(req,res)=>{
    server.use(express.static(path.join(__dirname,'../FrontEnd','build')))
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));
})
server.listen(5010);