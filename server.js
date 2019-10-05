const express=require('express');
const hbs=require('hbs');


const port=process.env.PORT || 3000;
const fs=require('fs');
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');


app.use((req,res,next)=>{fdhfd
      
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

/*app.use((req,res,next)=>{
    res.render('maintain.hbs');
});
*/app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
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
app.get('/projects',(req,res)=>{

    res.render('projects.hbs',{
        pageTitle:'Projects'
    });
});
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
