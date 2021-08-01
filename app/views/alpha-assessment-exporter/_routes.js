const { red } = require('ansi-colors');
const express = require('express')
const router = express.Router()

// index
router.post('/index', function(req, res) {
    
    // Reset prenotify statuses
    req.session.data['preparation-status'] = "Not started";
    req.session.data['person-arranging-the-shipment-status'] = "Not started";
    req.session.data['importer-consignee-status'] = "Not started";
    req.session.data['quantity-status'] = "Not started";
    req.session.data['date-of-shipment-status'] = "Not started";
    req.session.data['carrier-status'] = "Not started";
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Not started";
    req.session.data['recovery-facility-or-laboratory-status'] = "Not started";
    req.session.data['recovery-operation-status'] = "Not started";
    req.session.data['usual-description-of-the-waste-status'] = "Not started";
    req.session.data['waste-identification-codes-status'] = "Not started";
    req.session.data['countries-states-concerned-status'] = "Not started";
    req.session.data['container-number-status'] = "Not started";
    req.session.data['transaction-id-status'] = "Not started";
    req.session.data['submit-and-generate-status'] = "Cannot start yet";

    // set-up change variables

    // amount
    req.session.data['update-quantity-weight'] = "12";
    req.session.data['update-quantity-units'] = "update-tonnes-mg";
    req.session.data['update-actual-or-estimate'] = "update-estimated";

    // shipment date
    req.session.data['update-actual-shipment-day'] = "1";
    req.session.data['update-actual-shipment-month'] = "6";
    req.session.data['update-actual-shipment-year'] = "2021";
    req.session.data['update-actual-or-estimate-date'] = 'update-estimated-date';

    // reset template name variable
    req.session.data['template-name'] = undefined;

    res.redirect('dashboard');
})

// email
router.post('/email', function(req, res) {
        res.redirect('service-start');
})

// login
router.post('/login', function(req, res) {
    
    // Reset prenotify statuses
    req.session.data['preparation-status'] = "Not started";
    req.session.data['person-arranging-the-shipment-status'] = "Not started";
    req.session.data['importer-consignee-status'] = "Not started";
    req.session.data['quantity-status'] = "Not started";
    req.session.data['date-of-shipment-status'] = "Not started";
    req.session.data['carrier-status'] = "Not started";
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Not started";
    req.session.data['recovery-facility-or-laboratory-status'] = "Not started";
    req.session.data['recovery-operation-status'] = "Not started";
    req.session.data['usual-description-of-the-waste-status'] = "Not started";
    req.session.data['waste-identification-codes-status'] = "Not started";
    req.session.data['countries-states-concerned-status'] = "Not started";
    req.session.data['container-number-status'] = "Not started";
    req.session.data['transaction-id-status'] = "Not started";
    req.session.data['submit-and-generate-status'] = "Cannot start yet";

    // set-up change variables

    // amount
    req.session.data['update-quantity-weight'] = "12";
    req.session.data['update-quantity-units'] = "update-tonnes-mg";
    req.session.data['update-actual-or-estimate'] = "update-estimated";

    // shipment date
    req.session.data['update-actual-shipment-day'] = "1";
    req.session.data['update-actual-shipment-month'] = "6";
    req.session.data['update-actual-shipment-year'] = "2021";
    req.session.data['update-actual-or-estimate-date'] = 'update-estimated-date';

    // reset template name variable
    req.session.data['template-name'] = undefined;

    res.redirect('dashboard');
})

// submitted-817435283-update
router.post('/submitted-817435283-update', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('template-euromovement')) {
        // I've come from the choose template list
        res.redirect('confirmation');
    } else {
        // I've likely to have come from the update-prenotifications
        res.redirect('update-prenotifications');
    }
})

// submitted-817435283-update-quantity
router.post('/submitted-817435283-update-quantity', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('template-euromovement')) {
        res.redirect('template-euromovement#update-quantity');
    } else {
        res.redirect('submitted-817435283-update#update-quantity');
    }
})

// submitted-817435283-update-shipment
router.post('/submitted-817435283-update-shipment', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('template-euromovement')) {
        res.redirect('template-euromovement#update-date-of-shipment');
    } else {
        res.redirect('submitted-817435283-update#update-date-of-shipment');
    }
})

// save-as-template
router.post('/save-as-template', function(req, res) {
    res.redirect('prenotification-templates');
})

// manual-bulk-api
router.post('/manual-bulk-api', function(req, res) {
    if (req.session.data['manual-bulk'] == 'bulk') {
        res.redirect('bulk');
    } else if (req.session.data['manual-bulk'] == 'manual') {
        // Reset prenotify statuses
        req.session.data['first-trigger'] = 'yes';
        req.session.data['preparation-status'] = "Not started";
        req.session.data['person-arranging-the-shipment-status'] = "Not started";
        req.session.data['importer-consignee-status'] = "Not started";
        req.session.data['quantity-status'] = "Not started";
        req.session.data['date-of-shipment-status'] = "Not started";
        req.session.data['carrier-status'] = "Not started";
        req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Not started";
        req.session.data['recovery-facility-or-laboratory-status'] = "Not started";
        req.session.data['recovery-operation-status'] = "Not started";
        req.session.data['usual-description-of-the-waste-status'] = "Not started";
        req.session.data['waste-identification-codes-status'] = "Not started";
        req.session.data['countries-states-concerned-status'] = "Not started";
        req.session.data['container-number-status'] = "Not started";
        req.session.data['transaction-id-status'] = "Not started";
        req.session.data['submit-and-generate-status'] = "Cannot start yet";

        res.redirect('prenotify');
    } else {
        res.redirect('api-information');
    }
})

// template-euromovement
router.post('/template-euromovement', function(req, res) {
    res.redirect('template-confirmation');
})

// submitted-817435283-alert
router.post('/submitted-817435283-alert', function(req, res) {
    res.redirect('submitted-prenotifications');
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

// preparation
router.post('/preparation', function(req, res) {
    req.session.data['preparation-status'] = "Completed";
    res.redirect('prenotify');
})

// who-arranged-shipment-details
router.post('/who-arranged-shipment-details', function(req, res) {
    req.session.data['person-arranging-the-shipment-status'] = "Completed";

    if ((req.session.data['who-arranged-company-name'].length == 0) || 
        (req.session.data['who-arranged-address-line-1'].length == 0) || 
        (req.session.data['who-arranged-address-town'].length == 0) || 
        (req.session.data['who-arranged-address-postcode'].length == 0) || 
        (req.session.data['who-arranged-address-country'].length == 0) || 
        (req.session.data['who-arranged-contact-full-name'].length == 0) || 
        (req.session.data['who-arranged-email'].length == 0) || 
        (req.session.data['who-arranged-telephone'].length == 0)) {
        // Reload the same page, errors will now be flagged...
        req.session.data['first-trigger'] = 'no';
        res.redirect('who-arranged-shipment-details');
    } else if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        req.session.data['first-trigger'] = 'no';
        // Assuming all's well we then navigate backto check-your-answers if that was the previous location
        res.redirect('check-your-answers');
    } else {
        req.session.data['first-trigger'] = 'no';
        // Otherwise go back to the prenotify to do list
        res.redirect('prenotify');
    }
})

// importer-consignee
router.post('/importer-consignee', function(req, res) {
    req.session.data['importer-consignee-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// actual-quantity
router.post('/quantity', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// actual-date-of-shipment
router.post('/date-of-shipment', function(req, res) {
    req.session.data['date-of-shipment-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// carriers
router.post('/carriers', function(req, res) {
  
    if (req.session.data['add-fourth-carrier'] == 'Yes' || req.session.data['add-fourth-carrier'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
            res.redirect('check-your-answers');
        } else {
            res.redirect('prenotify');
        }
    }

    if (req.session.data['add-third-carrier'] == 'Yes') {
        res.redirect('carrier-add-3');
    } else if (req.session.data['add-third-carrier'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
            res.redirect('check-your-answers');
        } else {
            res.redirect('prenotify');
        }
    }

    if (req.session.data['add-second-carrier'] == 'Yes') {
        res.redirect('carrier-add-2');
    } else if (req.session.data['add-second-carrier'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
            res.redirect('check-your-answers');
        } else {
            res.redirect('prenotify');
        }
    }

    if (req.session.data['add-first-carrier'] == 'Yes') {
        res.redirect('carrier-add-1');
    } else if (req.session.data['add-first-carrier'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
            res.redirect('check-your-answers');
        } else {
            res.redirect('prenotify');
        }
    }

})

// carrier-add-1
router.post('/carrier-add-1', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carriers');
})

// carrier-add-2
router.post('/carrier-add-2', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-2'] = "true";
    res.redirect('carriers');
})

// carrier-add-3
router.post('/carrier-add-3', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-3'] = "true";
    res.redirect('carriers');
})

// waste-generator
router.post('/waste-generator', function(req, res) {
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// recovery-facility-laboratory
router.post('/recovery-facility-laboratory', function(req, res) {
    req.session.data['recovery-facility-or-laboratory-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// recovery-operation
router.post('/recovery-operation', function(req, res) {
    req.session.data['recovery-operation-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// usual-description
router.post('/usual-description', function(req, res) {
    req.session.data['usual-description-of-the-waste-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// waste-identification-codes
router.post('/waste-identification-codes', function(req, res) {
    req.session.data['waste-identification-codes-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// countries-states-concerned
router.post('/countries-states-concerned', function(req, res) {
    req.session.data['countries-states-concerned-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers#countries-concerned');
    } else {
        res.redirect('prenotify');
    }
})

// consignmnet-number
router.post('/container-number', function(req, res) {
    req.session.data['container-number-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers#container-number');
    } else {
        res.redirect('prenotify');
    }
})

// transaction-ids
router.post('/transaction-id', function(req, res) {
    req.session.data['transaction-id-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers#check-transaction-id');
    } else {
        res.redirect('prenotify');
    }
})

// check-your-answers
router.post('/check-your-answers', function(req, res) {

    // Reset prenotify statuses
    req.session.data['preparation-status'] = "Not started";
    req.session.data['person-arranging-the-shipment-status'] = "Not started";
    req.session.data['importer-consignee-status'] = "Not started";
    req.session.data['quantity-status'] = "Not started";
    req.session.data['date-of-shipment-status'] = "Not started";
    req.session.data['carrier-status'] = "Not started";
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Not started";
    req.session.data['recovery-facility-or-laboratory-status'] = "Not started";
    req.session.data['recovery-operation-status'] = "Not started";
    req.session.data['usual-description-of-the-waste-status'] = "Not started";
    req.session.data['waste-identification-codes-status'] = "Not started";
    req.session.data['countries-states-concerned-status'] = "Not started";
    req.session.data['container-number-status'] = "Not started";
    req.session.data['transaction-id-status'] = "Not started";
    req.session.data['submit-and-generate-status'] = "Cannot start yet";

    res.redirect('confirmation');
})

// received-form-validation
router.get('*/received-form-validation', function (req, res) {
    if (req.session.data['utid-reference'] == "" ) {
        req.session.data.error = 'no-utid-entered';
        req.session.data['who-arranged-contact-full-name'] = undefined;
        res.redirect ('submitted-prenotifications');
    } else if (req.session.data['utid-reference'].includes = "35283" ) {
        req.session.data.error = "35283";
        req.session.data['who-arranged-contact-full-name'] = "What you entered includes 35283";
        res.redirect ('submitted-prenotifications');
    } else {
        req.session.data.error = "no-error";
        //res.redirect('head off to a results page')
        req.session.data['who-arranged-contact-full-name'] = "Hello there I worked";
        res.redirect ('submitted-prenotifications');
    }
})

// update-prenotifications-form-validation
router.get('*/update-prenotifications-form-validation', function (req, res) {
    if (req.session.data['utid-reference'] == "" ) {
        req.session.data.error = 'no-utid-entered';
        req.session.data['who-arranged-contact-full-name'] = undefined;
        res.redirect ('update-prenotifications');
    } else if (req.session.data['utid-reference'].includes = "35283" ) {
        req.session.data.error = "35283";
        res.redirect ('update-prenotifications');
    } else {
        req.session.data.error = "no-error";
        res.redirect ('update-prenotifications');
    }
})

// Add your routes here - above the module.exports line
module.exports = router
