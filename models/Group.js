var sql = require('../database.js');

const Group = function(group) {
    this.subject_id = group.name;
    this.lecture = group.lecture;
  };

Group.getStudentsName=(course_name, semester, subject,result)=>{
    sql.query(`select first_name, last_name from students where student_id in
    (select student_id from students_in_group WHERE group_id in
        (select group_id from groups where subject_id in
            (select subject_id from subjects where course_id = 
                (select course_id from course where name like '${course_name}') and semester=${semester} and name like '${subject}') ))`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            // not found students
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("students: ", res);
          result(null, res);
    });

};
Group.findIdForPlan = (course_name, semester, subject, lecture,result)=>{
  sql.query(`select group_id from groups where subject_id in 
  (select subject_id from subjects where name like '${subject}' and semester=${semester} and course_id=
  (select course_id from course where name like '${course_name}')) and lecture =${lecture}`, (err, res)=>{
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) { 
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("students: ", res);
        result(null, res);
  });

};
module.exports = Group;