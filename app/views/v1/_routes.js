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
    res.redirect('confirmation-bulk');
})

// who-arranged-shipment
router.post('/who-arranged-shipment', function(req, res) {
    if (req.session.data['are-you-arranging'] == 'yes') {

        // Details known, so set data, etc.
        req.session.data['who-arranged-contact-full-name'] = "Erica Walsh";
        req.session.data['who-arranged-email'] = "erica.walsh@eaststreetwaste.ltd.uk";
        req.session.data['who-arranged-telephone'] = "07851984503";
        req.session.data['who-arranged-fax'] = "";
        req.session.data['who-arranged-carrier-name'] = "East Street Waste Services Limited";
        req.session.data['who-arranged-address-line-1'] = "103  East Street";
        req.session.data['who-arranged-address-line-2'] = "";
        req.session.data['who-arranged-address-town'] = "Manton";
        req.session.data['who-arranged-address-county'] = "";
        req.session.data['who-arranged-address-postcode'] = "LE15 2LF";

        //res.redirect('check-your-answers');
        res.redirect('importer-consignee');
    } else {
        res.redirect('who-arranged-shipment-details');
    }
})

// who-arranged-shipment-details
router.post('/who-arranged-shipment-details', function(req, res) {
    res.redirect('importer-consignee');
})

// importer-consignee
router.post('/importer-consignee', function(req, res) {
    //if (req.header.referer == '/check-your-answers') {
    //    res.redirect('check-your-answers');
    //} else {
    //    res.redirect('unique-id');
    //}
    res.redirect('unique-id');
    //res.redirect('check-your-answers');
})

// unique-id
router.post('/unique-id', function(req, res) {
    res.redirect('actual-quantity');
})

// actual-quantity
router.post('/actual-quantity', function(req, res) {
    res.redirect('actual-date-of-shipment');
})

// actual-date-of-shipment
router.post('/actual-date-of-shipment', function(req, res) {
    res.redirect('first-carrier');
})

// first-carrier
router.post('/first-carrier', function(req, res) {
    if (req.session.data['add-another-carrier'] == 'yes') {
        res.redirect('second-carrier');
    } else {
        res.redirect('waste-generator');
    }
})

// second-carrier
router.post('/second-carrier', function(req, res) {
    if (req.session.data['add-another-carrier'] == 'yes') {
        res.redirect('third-carrier');
    } else {
        res.redirect('waste-generator');
    }
})

// third-carrier
router.post('/third-carrier', function(req, res) {
    res.redirect('waste-generator');
})

// waste-generator
router.post('/waste-generator', function(req, res) {
    res.redirect('recovery-facility-laboratory');
})

// recovery-facility-laboratory
router.post('/recovery-facility-laboratory', function(req, res) {
    res.redirect('recovery-operation');
})

// recovery-operation
router.post('/recovery-operation', function(req, res) {
    res.redirect('usual-description');
})

// usual-description
router.post('/usual-description', function(req, res) {
    res.redirect('waste-identification-basel-annex-ix');
})

// waste-identification-basel-annex-ix
router.post('/waste-identification-basel-annex-ix', function(req, res) {
    res.redirect('waste-identification-oecd');
})

// waste-identification-oecd
router.post('/waste-identification-oecd', function(req, res) {
    res.redirect('waste-identification-annex-iiia');
})

// waste-identification-annex-iiia
router.post('/waste-identification-annex-iiia', function(req, res) {
    res.redirect('waste-identification-annex-iiib');
})

// waste-identification-annex-iiib
router.post('/waste-identification-annex-iiib', function(req, res) {
    res.redirect('waste-identification-ec-wastes');
})

// waste-identification-ec-wastes
router.post('/waste-identification-ec-wastes', function(req, res) {
    res.redirect('waste-identification-national-code');
})

// waste-identification-national-code
router.post('/waste-identification-national-code', function(req, res) {
    res.redirect('export-dispatch');
})

// export-dispatch
router.post('/export-dispatch', function(req, res) {
    res.redirect('transit');
})

// transit
router.post('/transit', function(req, res) {
    res.redirect('import-destination');
})

// import-destination
router.post('/import-destination', function(req, res) {
    res.redirect('check-your-answers');
})

// check-your-answers
router.post('/check-your-answers', function(req, res) {
    res.redirect('confirmation');
})

// Add your routes here - above the module.exports line
module.exports = router
