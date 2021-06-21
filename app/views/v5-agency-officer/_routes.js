const express = require('express')
const router = express.Router()

// sign-in
router.post('/sign-in', function(req, res) {
    res.redirect('dashboard');
})

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
    //res.redirect('alerts');
    res.redirect('dashboard');
})

// reports
router.post('/reports', function(req, res) {
    if (req.session.data['reportchoice'] == 'reportone') {
        res.redirect('report-destination-timeframe');
    } else if (req.session.data['reportchoice'] == 'reporttwo') {
        res.redirect('report-exporter-timeframe');
    } else if (req.session.data['reportchoice'] == 'reportthree') {
        res.redirect('report-departure-timeframe');
    } else {
        res.redirect('report-download-all-data');
    }
})

// 1. report-destination-timeframe
router.post('/report-destination-timeframe', function(req, res) {
    res.redirect('report-is-generating');
})

// 2. report-exporter-timeframe
router.post('/report-exporter-timeframe', function(req, res) {
    res.redirect('report-is-generating');
})

// 3. report-departure-timeframe
router.post('/report-departure-timeframe', function(req, res) {
    res.redirect('report-is-generating');
})

// 4. report-download-all-data
router.post('/report-download-all-data', function(req, res) {
    res.redirect('report-is-generating');
})

// Add your routes here - above the module.exports line
module.exports = router
