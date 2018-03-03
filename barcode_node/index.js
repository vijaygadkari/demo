var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var mysql=require('mysql');
var path=require('path');
var session=require('express-session');
var userRoute = require('./routes/users');

app.set('port',3000);
app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./'));
app.use(session({secret:'hellow'}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended:false}));

app.use('/details',userRoute);
`use strict`;
app.get('/',function(req,res){
	if(req.session.username){
    	res.render('public/pars/index');
    }
    else{
		// res.render('users');
        res.render('public/pars/index');
	}
});
app.listen(process.env.PORT || app.get('port'),function(){
	console.log('Server started at port ',app.get('port'));
});
