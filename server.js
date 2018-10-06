const express=require('express');
const hbs=require('hbs');

const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');


app.use((req,res,next)=>{
      
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintain.hbs');
});
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.send('<h1>Hello express!</h1>');
});
app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'home page',
        currentYear:new Date().getFullYear()
    });
});
app.get('/about',(req,res) => {

    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear:new Date().getFullYear()
    });
});
app.listen(3000);