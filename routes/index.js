var express = require('express');
var router = express.Router();
let landing = require('../controllers/landing');
let user = require('../controllers/user');

/* GET home page. */

router.get('/',landing.get_landing);


router.get('/plan/login', user.show_login);
router.post('/plan/login', user.login);
router.get('/signup',user.show_signup);
router.post('/signup', user.signup);
router.post('/select-json/:semester/:course', landing.change_options);
router.post('/plan/:user_id/edit/select-plan-json/:semester/:course', landing.change_plan_options);



router.get('/plan/:user_id/edit',user.show_edit);
router.post('/plan/:user_id/edit',user.submit_edit);
router.post('/plan/:user_id/edit/delete-json/:plan_id',user.delete_plan_json);


router.post('/subjects', landing.submit_subjects);
router.get('/subjects', landing.show_subjects);

router.post('/group',landing.submit_group);
router.get('/group', landing.show_group);

module.exports = router;
