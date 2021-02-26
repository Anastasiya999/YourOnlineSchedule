var Subject = require('../models/Subject.js');
var Group = require('../models/Group.js');
var User = require('../models/User.js');
var Plan = require('../models/Plan.js');
const url = require('url');  



exports.get_landing = function(req, res, next) {
 
    
    res.render('landing');
    
    
}
exports.submit_subjects = function(req, res, next) {
    
    console.log(req.body.course, req.body.semester);
    var course = req.body.course;
    var semester = req.body.semester;
   // res.redirect('/subjects/'+course+'/'+semester);
    res.redirect(url.format({
        pathname:"/subjects",
        query: {
           "course": course,
           "semester": semester
         }
      }));
    
}
exports.submit_group = function(req, res, next) {
    var course = req.body.course_group;
    var semester = req.body.semester_group;
    var subject = req.body.subject_group;
    //res.redirect('/group/'+req.body.course_group+'/'+req.body.semester_group+'/'+req.body.subject_group);
    res.redirect(url.format({
        pathname:"/group",
        query: {
           "course": course,
           "semester": semester,
           "subject":subject
         }
      }));
    
}
exports.show_group = function(req, res, next) {

    Group.getStudentsName(req.query.course,req.query.semester,req.query.subject, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else 
        {
          console.log(data[0]);
          res.render('landing', { title: 'Express', data:JSON.stringify(data),students:data,subject: req.query.subject});
        }
      });
    
    
        
}
   
exports.change_options = function(req, res, next){
    var semester = req.params.semester;
    var course = req.params.course;
   
    console.log(semester, course)
    Subject.getNames(semester, course ,(err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else 
        {
         // res.send({ msg: "success", data: data });
         
         res.send({data:data, msg:"Success"});
         //res.render('landing', { title: 'Express', subjects:subjects, course:req.params.course,semester:req.params.semester });

    
        }
    });

}
exports.change_plan_options = function(req, res, next){
    var semester = req.params.semester;
    var course = req.params.course;
   
    console.log(semester, course)
    Subject.getNames(semester, course ,(err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else 
        {
         // res.send({ msg: "success", data: data });
         
         res.send({data:data, msg:"Success"});
         //res.render('landing', { title: 'Express', subjects:subjects, course:req.params.course,semester:req.params.semester });

    
        }
    });

}

exports.show_subjects = function(req, res, next) {
    
    Subject.getNames(req.query.semester, req.query.course ,(err, subjects) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else 
        {
         // res.send({ msg: "success", data: data });
         console.log(subjects);
         res.render('landing', { title: 'Express', subjects:subjects, course:req.query.course,semester:req.query.semester });
        

    
        }
    });
   
    
}