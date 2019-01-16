const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    services: 'gmail',
    secureConnection: false,
    host:'smtp.gmail.com',
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth:{
        user: 'serdar807@gmail.com',
        pass: 'ss199297123ss'
    },
    tls:
        {
            rejectUnauthorized: false
        }
} );

let HelperOption = {
    from:'"serdar tekin" <serdar8078@gmail.com',
    to: 'ahmetaykutay@gmail.com',
    subject: 'node js mail',
    text: 'bu mail node js ile gönderilmiştir'

};
transporter.sendMail(HelperOption, (error, info) =>{
    if(error) {
        console.log(error);
    }
    console.log('email yollandı');
    console.log(info)
});