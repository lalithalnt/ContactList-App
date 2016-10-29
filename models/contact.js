var mongoose=require("mongoose");

//give schema name and create schema i.e., mongoose.Schema
var contactSchema=mongoose.Schema({
name:{
	type: String,
	required: true
},

email: {
	type:String,
	required: true
},

mobile: {
	type:String,
	required: true
}

});
//Note: give db table name as singular like contact then it will search for plural in db 
//thatis what we created in db like contacts
//module.exports is used to export your models or funtions or files
var Contact=module.exports=mongoose.model("contact",contactSchema);
// this is like var a=b=c 
//module.exports.getContact=funtion(callback){
module.exports.getContacts=function(callback){	
Contact.find(callback)
}

module.exports.addContact=function(contact,callback){
	//Contact.create(contact,callback);

	var ctc=new Contact(contact);
	ctc.save(contact,callback);
}

//3.edit code logic

module.exports.getContactById=function(id,callback){

	// to fetch single record by id we use findById() method in mongoose 
	var query={ _id:id }
	Contact.findById(query,callback);
}
//3.update logic
module.exports.updateContact=function(id,contact,callback){
	Contact.update({_id:id},
					{$set:{
						name:contact.name,
						email:contact.email,
						mobile:contact.mobile
					}},
		 			callback)
}
//3.remove contact logic

module.exports.removeContact=function(id,callback){
	
	Contact.remove({_id:id},callback)

					
					
}