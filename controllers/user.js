var User = require('../models/User.js');
var Group = require('../models/Group.js');
var Plan = require('../models/Plan.js');

exports.show_login = function(req, res, next) {
	res.render('user/login', { formData: {} });
}
exports.show_signup = function(req, res, next) {
	res.render('user/signup', { formData: {} });
} 
exports.signup = function(req, res, next) {
	User.getUser_id(req.body.login, req.body.password, (err, user) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  });
		else 
		{
			if(user.length){
			  //res.redirect('/plan/'+user[0].user_id+'/edit');
			  res.render('user/signup', { formData: {}, errors: {msg:"Uzytkownik "+req.body.login +" już istnieje. Proszę się zalogować"} });
			}
			else{
				User.createUser(req.body.login,req.body.password,(err,user_id)=>{
					if (err)
					  res.status(500).send({
						message:
						  err.message || "Some error occurred while retrieving customers."
					  });
					  else{
						console.log("dodano user: ", user_id);
						res.redirect('/');
					  }
				})

			}
			//console.log(user.kind);
			//
	
		}
	  });
	
	
	//res.render('user/signup', { formData: {} });
} 
exports.login = function(req, res, next) {
	console.log(req.body.login, req.body.password);
	//res.redirect('/');
	User.getUser_id(req.body.login, req.body.password, (err, user) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  });
		else 
		{
			if(user.length){
			  res.redirect('/plan/'+user[0].user_id+'/edit');
			}
			else{
				console.log('nie ma takiego uzytkownika');
				res.render('user/login', { formData: {}, errors: "Nie ma takiego użytkownika lub wprowadiłeś niepoprawne dane" });

			}
			//console.log(user.kind);
			//
	
		}
	  });
}

exports.show_edit = function(req, res, next) {
	Plan.findAll(req.params.user_id,(err, data) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  });
		else 
		{
		  console.log(data);
		  res.render('user/edit_plan',  { user_id :req.params.user_id , plan:data});
		 
		}
	  })

   
}
exports.submit_edit = function(req, res, next) {
	var course_name = req.body.plan_course;
	var subject = req.body.plan_subjects;
	var lecture = 0;
	var semester = req.body.plan_semester;
	var day_of_week = req.body.week_day;
	var hour = req.body.plan_hour;
	var group_id = 0;
	var user_id =req.params.user_id;
	
	if(req.body.lecture==='wykład')
	{
		console.log(false);
		lecture = 1;
	}else{
        lecture = 0;
	}

	Group.findIdForPlan(course_name, semester, subject, lecture,(err, record) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  });
		else 
		{
			console.log("group_id: ", record[0].group_id);
			group_id = record[0].group_id;
			Plan.createPlanRecord(day_of_week, hour, group_id, (err, plan_id) => {
				if (err)
				  res.status(500).send({
					message:
					  err.message || "Some error occurred while retrieving customers."
				  });
				else 
				{
					console.log("group_id: ", plan_id);
					User.addPlanRecord(user_id, plan_id, (err, user_plan_id)=>{
                      if(err)
					  res.status(500).send({
						message:
						  err.message || "Some error occurred while retrieving customers."
					  });
					  else{
						  console.log("dodano plan: ", user_plan_id);
						  res.redirect('/plan/'+user_id+'/edit');
					  }

					});
			
				}
			});
			
			
	
		}
	});
	
	
}
exports.delete_plan_json = function(req, res, next) {
	console.log(req.params.plan_id);
	Plan.deleteById(req.params.plan_id,(err, result) =>{
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  })
		  else{
			  console.log("success", result);
			  res.send({ msg: "Success" });
			  //res.redirect('/plan/'+user[0].user_id+'/edit');
		  }
	})
	
	

}