const express = require('express')
const router = express.Router()

// manual-or-bulk
router.post('/manual-or-bulk', function(req, res) {
    if (req.session.data['manual-bulk'] == 'bulk') {
        res.redirect('bulk');
    } else {
        res.redirect('who-arranged-shipment');
    }
})

// bulk
router.post('/bulk', function(req, res) {
    res.redirect('bulk-uploading');
})

// bulk-uploading
router.post('/bulk-uploading', function(req, res) {
    res.redirect('confirmation');
})

// who-arranged-shipment
router.post('/who-arranged-shipment', function(req, res) {
    if (req.session.data['are-you-arranging'] == 'yes') {

        // Details known, so set data, etc.
        req.session.data['who-arranged-contact-full-name'] = "[Prefilled contact fullname]";
        req.session.data['who-arranged-email'] = "prefilled-email@address.com";
        req.session.data['who-arranged-telephone'] = "[Prefilled contact telephone number]";
        req.session.data['who-arranged-fax'] = "[Prefilled contact fax number]";
        req.session.data['who-arranged-company-name'] = "[Prefilled company name]";
        req.session.data['who-arranged-address-line-1'] = "[Prefilled company address line 1]";
        req.session.data['who-arranged-address-line-2'] = "[Prefilled company address line 2]";
        req.session.data['who-arranged-address-town'] = "[Prefilled company town]";
        req.session.data['who-arranged-address-county'] = "[Prefilled company county or region]";
        req.session.data['who-arranged-address-postcode'] = "[Prefilled company postcode]";
        req.session.data['who-arranged-address-country'] = "[Prefilled company country]";

        res.redirect('who-arranged-shipment-details');

    } else {

        // Details not known, so ensure they're set to null
        req.session.data['who-arranged-contact-full-name'] = null;
        req.session.data['who-arranged-email'] = null;
        req.session.data['who-arranged-telephone'] = null;
        req.session.data['who-arranged-fax'] = null;
        req.session.data['who-arranged-company-name'] = null;
        req.session.data['who-arranged-address-line-1'] = null;
        req.session.data['who-arranged-address-line-2'] = null;
        req.session.data['who-arranged-address-town'] = null;
        req.session.data['who-arranged-address-county'] = null;
        req.session.data['who-arranged-address-postcode'] = null;
        req.session.data['who-arranged-address-country'] = null;

        res.redirect('who-arranged-shipment-details');
    }
})

// who-arranged-shipment-details
router.post('/who-arranged-shipment-details', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('importer-consignee');
    }
})

// importer-consignee
router.post('/importer-consignee', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('unique-id');
    }
})

// unique-id
router.post('/unique-id', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('actual-quantity');
    }
})

// actual-quantity
router.post('/actual-quantity', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('actual-date-of-shipment');
    }
})

// actual-date-of-shipment
router.post('/actual-date-of-shipment', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('first-carrier');
    }
})

// first-carrier
router.post('/first-carrier', function(req, res) {
    if (req.session.data['add-second-carrier'] == 'yes') {
        res.redirect('second-carrier');
    } else if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        req.session.data['add-second-carrier'] = 'no';
        req.session.data['add-third-carrier'] = 'no';
        res.redirect('waste-generator');
    }
})

// second-carrier
router.post('/second-carrier', function(req, res) {
    if (req.session.data['add-third-carrier'] == 'yes') {
        res.redirect('third-carrier');
    } else if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        req.session.data['add-third-carrier'] = 'no';
        res.redirect('waste-generator');
    }
})

// third-carrier
router.post('/third-carrier', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('waste-generator');
    }
})

// waste-generator
router.post('/waste-generator', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('recovery-facility-laboratory');
    }
})

// recovery-facility-laboratory
router.post('/recovery-facility-laboratory', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('recovery-operation');
    }
})

// recovery-operation
router.post('/recovery-operation', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('usual-description');
    }
})

// usual-description
router.post('/usual-description', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('waste-identification');
    }
})

// waste-identification
router.post('/waste-identification', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('countries-states-concerned');
    }
})

// countries-states-concerned
router.post('/countries-states-concerned', function(req, res) {
    res.redirect('check-your-answers');
})

// check-your-answers
router.post('/check-your-answers', function(req, res) {
    res.redirect('confirmation');
})

// Add your routes here - above the module.exports line
module.exports = router
