var express=require("express");
var app=express();
var mongoose=require("mongoose");
var contact=require("./models/contact")
var bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost/contactlist",function(){
	console.log("successfully connected to mongodb...");
});

//if any environment port is available it will take that port else it will use 3000
var PORT=process.env.PORT || 3000 

app.use(express.static(__dirname + "/public")) 
app.use(bodyParser.json());

//assume it is http://localhost/contactList
app.get("/contactList",function(req,res){
	contact.getContacts(function(err,data){
		if(err){
			throw err;
		}
		//console.log(data);
		res.json(data); //sends data in json format and res goes to controller
	})
    
});

//2.add contact logic
app.post("/contactList",function(req,res){ 

var body=req.body; //will fetch body details 

//console.log(body); //sends data push data to node.js server

contact.addContact(body,function(err,data){
	if(err){
		throw err;
	}

	res.json(data);
})
})

//2.edit  logic

app.get("/contactList/:id",function(req,res){
	var id=req.params.id;
	contact.getContactById(id,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})

})
//2.update logic
app.put("/contactList/:id",function(req,res){
	var id=req.params.id;
	var body=req.body;
	contact.updateContact(id,body,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})

//2.remove contact logic

app.delete("/contactList/:id",function(req,res){
	var id=req.params.id;	
	contact.removeContact(id,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})

//listening to port
app.listen(PORT,function(){
	console.log("server is listening at port " +PORT);
})