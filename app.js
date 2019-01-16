const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.render('contact')
});

app.post('/send', (req, res)=>{
    const output=`
        <p>You have a new contact</p>
        <h3>Contact Details</h3>
        <ul>
        <li>First Name: ${req.body.firstname}</li>
        <li>Last Name: ${req.body.lastname}</li>
        <li>email: ${req.body.email}</li>
        <li>phone: ${req.body.phone}</li>
</ul>
<h3>message: ${req.body.message}</h3>
    
`;
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
        from:'"serdar tekin" <serdar807@gmail.com',
        to: 'serdar8078@gmail.com',
        subject: 'node js mail',
        text: 'bu mail node js ile gönderilmiştir',
        html: output

    };
    transporter.sendMail(HelperOption, (error, info) =>{
        if(error) {
            console.log(error);
        }
        console.log('email yollandı');
        console.log(info)

        res.render('contact', {msg:'Email gönderildi'});
    });
})

app.listen(3000, ()=> console.log('server started'));