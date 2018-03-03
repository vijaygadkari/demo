var express = require("express");
var app=express();
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'barcode_project'
});

router.get("/",(req,res)=>{
    console.log("get called")
	
    connection.connect();

    connection.query(`select * from product_desc_table as p , 
            barcode_table as b, 
            date_table as d, 
            gtin_table as g,
            category_table as cat, 
            sub_category_table as s, 
            package_table as pt,   
            brand_table as br 
            where p.id = b.pro_id and 
            d.id = p.date_id and 
            g.id = p.gtin_id and 
            cat.id=p.category_id and 
            s.id = p.sub_category_id and 
            pt.id=p.Packaging_Type and 
            br.id=p.brand_id;`, function (error, results, fields) {
                if (error) throw error;
                // res.json(results);
                var obj ={print:results};
                res.render('public/pars/index',obj);
            });

        connection.end();
        res.end();
});

router.get("/:id",function(){

});
usersList=[];
router.post("/",function(req,res){
	console.log("post called")
    console.log(req.body);
    usersList.push(req.body);
    // con.connect(function(err) {
    //     if (err) throw err;
    //     // if connection is successful
    //     con.query("INSERT INTO students (name,rollno,marks) VALUES ?", [records], function (err, result, fields) {
    //       // if any error while executing above query, throw error
    //       if (err) throw err;
    //       // if there is no error, you have the result
    //       console.log(result);
    //     });
    //   });
    // res.send(JSON.stringify(req.body));

});
router.put("/",function(req,res){
	console.log("put called")
	var temp = {};
	temp.id = req.body.id;
	if(req.body.name!="")
		temp.name = req.body.name;
	if(req.body.addrs!="")
		temp.addrs = req.body.addrs;
	usersList.forEach(x => {
		if(x.id==req.body.id){
			if(temp.name) x.name = temp.name;
			if(temp.addrs) x.addrs = temp.addrs;
		}
	});
	console.log(usersList);
	res.end(JSON.stringify(temp));
});
router.delete("/",function(req,res){
	console.log("delete called")
	res.end("Show Users delete page");
});
module.exports = router;