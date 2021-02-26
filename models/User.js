'user strict';
var sql = require('../database.js');

var User =function(user){
    this.user_id = user.user_id;
    this.login = user.login;
    this.password = user.password;
};
User.createUser = function (login, password, result) { 
    sql.query("INSERT INTO users(login, password) values(?, ?) ", [login, password], function (err, res) {
                
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

/*User.getUser_id = function (login, password, result) {
    sql.query("Select user_id from users where login = ? and password = ? ", [login,password], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
                console.log(result);
               
          
            }
        });   
};*/
User.getUser_id = function(login, password, result){
   
    sql.query(
        `select user_id from users where login like '${login}' and password like '${password}'`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            // not found subjects
            result({ kind: "not_found" }, null);
            //console.log("subjects: ", res);
            return;
          }
          console.log("subjects: ", res);
          result(null, res);
        }
      );
};

  User.findByLogin = (login, result) => {
    sql.query(`SELECT * FROM users WHERE login like '${login}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found Subject with the id
      //result({ kind: "not_found" }, null);
    });
  };

  User.addPlanRecord = function (user_id, plan_id, result) { 
    sql.query("INSERT INTO users_plan(user_id, plan_id) values(?, ?) ", [user_id, plan_id], function (err, results) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(results.insertId);
            result(null, results.insertId);
        }
    });   
} 

module.exports = User;