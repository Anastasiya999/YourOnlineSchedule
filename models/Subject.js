var sql = require('../database.js');

const Subject = function(subject) {
    this.course_id = subject.course_id;
    this.name = subject.name;
    this.semester = subject.semester;
  };
  
  Subject.findById = (subjectId, result) => {
    sql.query(`SELECT * FROM subjects WHERE id = ${subjectId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found subject: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Subject with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Subject.getAll = result => {
    sql.query("SELECT * FROM subjects", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("subjects: ", res);
      result(null, res);
    });
  };
  
  Subject.getNames = (semester, course, result) => {
    sql.query(
      `select name from subjects where semester = ${semester} and course_id = (select course_id from course where name like '${course}')`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found subjects
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("subjects: ", res);
        result(null, res);
      }
    );
  };
  
  
  
  module.exports = Subject;