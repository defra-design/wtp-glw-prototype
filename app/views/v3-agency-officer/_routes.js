const express = require('express')
const router = express.Router()

// sign-in
router.post('/sign-in', function(req, res) {
    res.redirect('dashboard');
})

// received-forms
//router.post('/received-forms', function(req, res) {
//    res.redirect('received-forms');
//})

// received-forms
router.get('*/received-form-validation', function (req, res) {
    if (req.session.data['utid-reference'] == "" ) {
        req.session.data.error = 'no-utid-entered';
        req.session.data['who-arranged-contact-full-name'] = undefined;
        res.redirect ('received-forms');
    } else if (req.session.data['utid-reference'].includes = "35283" ) {
        req.session.data.error = "35283";
        req.session.data['who-arranged-contact-full-name'] = "What you entered includes 35283";
        res.redirect ('received-forms');        
    } else {
        req.session.data.error = "no-error";
        //res.redirect('head off to a results page')
        req.session.data['who-arranged-contact-full-name'] = "Hello there I worked";
        res.redirect ('received-forms');
    }
})

// view-annex-vii
router.post('/received-forms', function(req, res) {
    req.session.data.error = "";
    req.session.data['who-arranged-contact-full-name'] = "Cleared the search crtieria";
    res.redirect('received-forms');
})

// alert-817435283
router.post('/alert-817435283', function(req, res) {
    res.redirect('alerts');
})

// reports
router.post('/reports', function(req, res) {
    req.session.data.error = "";
    res.redirect('report-is-generating');
})

// Add your routes here - above the module.exports line
module.exports = router
