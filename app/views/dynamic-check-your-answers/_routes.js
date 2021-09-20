const express = require('express')
const router = express.Router()

// index
router.post('/index', function(req, res) {
    if (req.session.data['choose-check-your-answers'] == 'both') {
        req.session.data['show-change-links'] = "yes";
        req.session.data['show-declaration'] = "yes";
    } else if (req.session.data['choose-check-your-answers'] == 'change-links-only') {
        req.session.data['show-change-links'] = "yes";
        req.session.data['show-declaration'] = "no";
    } else if (req.session.data['choose-check-your-answers'] == 'declaration-only') {
        req.session.data['show-change-links'] = "no";
        req.session.data['show-declaration'] = "yes";
    } else if (req.session.data['choose-check-your-answers'] == 'neither') {
        req.session.data['show-change-links'] = "no";
        req.session.data['show-declaration'] = "no";
    }
    res.redirect('include-check-your-answers');
})

// include-check-your-answers
router.post('/include-check-your-answers', function(req, res) {
    res.redirect('index');
})

// cookies
router.post('/cookies', function(req, res) {
    if ((req.session.data['exporter-v4-cookies-yes-no'] == "yes") || (req.session.data['exporter-v4-cookies-yes-no'] == "no")) {
        req.session.data['exporter-v4-cookie-status'] = "changed";
        // Reload the same page, "Your cookie settings were saved" messaging will be triggered...
        res.redirect('cookies');
    } else {
        req.session.data['exporter-v4-cookie-status'] = "error";
        // Reload the same page, error state messaging will be triggered...
        res.redirect('cookies');
    }
})

// Add your routes here - above the module.exports line
module.exports = router
