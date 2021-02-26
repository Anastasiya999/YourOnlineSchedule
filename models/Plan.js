var sql = require('../database.js');

var Plan =function(plan){
    this.day_of_week = plan.day_of_week;
    this.hour = plan.hour;
    this.group_id = plan.group_id;
};
Plan.createPlanRecord = function (day_of_week, hour, group_id, result) { 
    sql.query("INSERT INTO plan(day_of_week, hour, group_id) values(?, ?, ?) ", [day_of_week, hour, group_id], function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });   
} 

Plan.findAll = function(user_id,result){
    sql.query('SELECT course.name, subjects.name, day_of_week, hour, lecture, plan.plan_id FROM `users` inner join users_plan using(user_id) inner join plan using(plan_id) inner join groups using(group_id) inner join subjects using(subject_id) inner join course using(course_id) where users.user_id= ?',[user_id],function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });  
}

Plan.deleteById = function(plan_id, result){
    sql.query('DELETE FROM `plan` WHERE `plan_id` = ?',[plan_id],function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });  

}


module.exports = Plan;