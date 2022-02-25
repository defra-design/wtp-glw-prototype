const { red } = require('ansi-colors');
const express = require('express')
const router = express.Router()

// cookies
router.post('/cookies', function(req, res) {
    if ((req.session.data['exporter-v5-cookies-yes-no'] == "yes") || (req.session.data['exporter-v5-cookies-yes-no'] == "no")) {
        req.session.data['exporter-v5-cookie-status'] = "changed";
        // Reload the same page, "Your cookie settings were saved" messaging will be triggered...
        res.redirect('cookies');
    } else {
        req.session.data['exporter-v5-cookie-status'] = "error";
        // Reload the same page, error state messaging will be triggered...
        res.redirect('cookies');
    }
})

// index
router.post('/index', function(req, res) {
    // Reset prenotify statuses (move into a function?)
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
    req.session.data['rename-template-name'] = "Fabric Society Waste mixed paper";
    req.session.data['new-rename-template-name'] = "Euromovement paper waste movement";
    req.session.data['total-favs'] = "6";

    req.session.data['just-edited'] = 'no';

    req.session.data["entered-criteria"] = undefined;

    res.redirect('dashboard');
})

// _index
// IMPORTANT: When making use of the Defra ID creation journey, we need to ensure the correct
// iteration of the prototype is picked-up from the single instance of Defra ID. This being 
// from "/defra-id/check-your-answers".
//
// We set-up an iteration variable from the "Start from invitation email" button on this _index
// page, as it is wrapped as a <form> and as such we can intercept the sumbission and therefore
// set the appropriate variable with the correct iteration number.
//
// This is then checked via an "if...then" statement over on the Defra ID "check-your-answers"
// page, with the correct routing then taking place.
//
// Also, ensure defra-id/sign-in has been updated with the relevant "if... then" statements as we
// make use of the same concept there too. This is to ensure routing takes place in the event the
// user chooses the create Defra ID journey but then chooses to "Sign in" rather than choosing to
// create their Defra ID credentials.
//
router.post('/_index', function(req, res) {
    // Set iteration version number for routing
    req.session.data['iteration-variant-and-number'] = "exporter-v5";

    res.redirect('email');
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
    req.session.data['rename-template-name'] = "Fabric Society Waste mixed paper";
    req.session.data['new-rename-template-name'] = "Euromovement paper waste movement";
    req.session.data['total-favs'] = "6";

    req.session.data['just-edited'] = 'no';

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
    res.redirect('create-template-success');
})

// template-edit-name
router.post('/template-edit-name', function(req, res) {
    //res.redirect('prenotification-templates');
    req.session.data['template-name'] = req.session.data['rename-template-name'];
    req.session.data['template-name'] = req.session.data['new-rename-template-name'];
    req.session.data['just-edited'] = 'yes';
    res.redirect('template-euromovement-edit');
})

// manual-bulk-api
router.post('/manual-bulk-api', function(req, res) {
    if (req.session.data['manual-bulk'] == 'bulk') {
        res.redirect('bulk');
    } else if (req.session.data['manual-bulk'] == 'manual') {

        // Clear down prenotify variables (move into a function?)
    
        // set-up auto-populated 'who is arranging' variables
        if (req.session.data['userId'] == 'rogerparker') {
            req.session.data['who-arranged-company-name'] = 'Lancelot Exports Limited';
            req.session.data['who-arranged-address-line-1'] = '12 Manchester Way';
            req.session.data['who-arranged-address-line-2'] = null;
            req.session.data['who-arranged-address-town'] = 'Chatham';
            req.session.data['who-arranged-address-county'] = 'Kent';
            req.session.data['who-arranged-address-postcode'] = 'ME16 9PG';
            req.session.data['who-arranged-address-country'] = 'england';
            req.session.data['who-arranged-contact-full-name'] = 'Roger Parker';
            req.session.data['who-arranged-email'] = 'rogerparker@lancelotexl.com';
            req.session.data['who-arranged-telephone'] = '01634 256941';
            req.session.data['who-arranged-fax'] = null;
        } else {
            req.session.data['who-arranged-company-name'] = "";
            req.session.data['who-arranged-address-line-1'] = "";
            req.session.data['who-arranged-address-line-2'] = "";
            req.session.data['who-arranged-address-town'] = "";
            req.session.data['who-arranged-address-county'] = "";
            req.session.data['who-arranged-address-postcode'] = "";
            req.session.data['who-arranged-address-country'] = "";
            req.session.data['who-arranged-contact-full-name'] = "";
            req.session.data['who-arranged-email'] = "";
            req.session.data['who-arranged-telephone'] = "";
            req.session.data['who-arranged-fax'] = "";
        }
        
        req.session.data['importer-company-name'] = "";
        req.session.data['importer-company-address-line-1'] = "";
        req.session.data['importer-company-address-line-2'] = "";
        req.session.data['importer-company-address-town'] = "";
        req.session.data['importer-company-address-county'] = "";
        req.session.data['importer-company-address-postcode'] = "";
        //req.session.data['importer-company-address-country'] = "";
        req.session.data['importer-consignee-typeahead'] = "";
        req.session.data['importer-contact-full-name'] = "";
        req.session.data['importer-email'] = "";
        req.session.data['importer-telephone'] = "";
        req.session.data['importer-fax'] = "";
        
        req.session.data['actual-or-estimate'] = "";
        req.session.data['quantity-weight'] = "";
        req.session.data['quantity-units'] = "";
        
        req.session.data['estimate-shipment-day'] = ""; 
        req.session.data['estimate-shipment-month'] = "";
        req.session.data['estimate-shipment-year'] = "";
        
        req.session.data['actual-shipment-day'] = ""; 
        req.session.data['actual-shipment-month'] = "";
        req.session.data['actual-shipment-year'] = "";
                
        //req.session.data['is-first-carrier-or-company'] = "";

        req.session.data['add-first-carrier'] = "Yes";

        req.session.data['first-carrier-name'] = "";
        req.session.data['first-carrier-address-line-1'] = "";
        req.session.data['first-carrier-address-line-2'] = "";
        req.session.data['first-carrier-address-town'] = "";
        req.session.data['first-carrier-address-county'] = "";
        req.session.data['first-carrier-address-postcode'] = "";
        //req.session.data['first-carrier-address-country'] = "";
        req.session.data['first-carrier-typeahead'] = "";
        req.session.data['first-carrier-means-of-transport'] = "";
        req.session.data['first-carrier-contact-full-name'] = "";
        req.session.data['first-carrier-email'] = "";
        req.session.data['first-carrier-telephone'] = "";
        req.session.data['first-carrier-fax'] = "";
        
        req.session.data['second-carrier-name'] = "";
        req.session.data['second-carrier-name'] = "";
        req.session.data['second-carrier-address-line-1'] = "";
        req.session.data['second-carrier-address-line-2'] = "";
        req.session.data['second-carrier-address-town'] = "";
        req.session.data['second-carrier-address-county'] = "";
        req.session.data['second-carrier-address-postcode'] = "";
        //req.session.data['second-carrier-address-country'] = "";
        req.session.data['second-carrier-typeahead'] = "";
        req.session.data['second-carrier-means-of-transport'] = "";
        req.session.data['second-carrier-contact-full-name'] = "";
        req.session.data['second-carrier-email'] = "";
        req.session.data['second-carrier-telephone'] = "";
        req.session.data['second-carrier-fax'] = "";
        
        req.session.data['third-carrier-name'] = "";
        req.session.data['third-carrier-name'] = "";
        req.session.data['third-carrier-address-line-1'] = "";
        req.session.data['third-carrier-address-line-2'] = "";
        req.session.data['third-carrier-address-town'] = "";
        req.session.data['third-carrier-address-county'] = "";
        req.session.data['third-carrier-address-postcode'] = "";
        //req.session.data['third-carrier-address-country'] = "";
        req.session.data['third-carrier-typeahead'] = "";
        req.session.data['third-carrier-means-of-transport'] = "";
        req.session.data['third-carrier-contact-full-name'] = "";
        req.session.data['third-carrier-email'] = "";
        req.session.data['third-carrier-telephone'] = "";
        req.session.data['third-carrier-fax'] = "";
        
        req.session.data['waste-generator-company-name'] = "";
        req.session.data['waste-generator-address-line-1'] = "";
        req.session.data['waste-generator-address-line-2'] = "";
        req.session.data['waste-generator-address-town'] = "";
        req.session.data['waste-generator-address-county'] = "";
        req.session.data['waste-generator-address-postcode'] = "";
        req.session.data['waste-generator-address-country'] = "";
        req.session.data['waste-generator-contact-full-name'] = "";
        req.session.data['waste-generator-email'] = "";
        req.session.data['waste-generator-telephone'] = "";
        req.session.data['waste-generator-fax'] = "";
        
        req.session.data['facility-or-lab-choice'] = "";
        req.session.data['facility-or-lab-carrier-name'] = "";
        req.session.data['facility-or-lab-address-line-1'] = "";
        req.session.data['facility-or-lab-address-line-2'] = "";
        req.session.data['facility-or-lab-address-town'] = "";
        req.session.data['facility-or-lab-address-county'] = "";
        req.session.data['facility-or-lab-address-postcode'] = "";
        //req.session.data['facility-or-lab-address-country'] = "";
        req.session.data['facility-or-lab-typeahead'] = "";
        req.session.data['facility-or-lab-contact-full-name'] = "";
        req.session.data['facility-or-lab-email'] = "";
        req.session.data['facility-or-lab-telephone'] = "";
        req.session.data['facility-or-lab-fax'] = "";
        
        req.session.data['recovery-operation-typeahead'] = "";
        
        req.session.data['usual-description'] = "";
        
        req.session.data['basel-annex-ix-typeahead'] = "";
        req.session.data['oecd-typeahead'] = "";
        req.session.data['annex-iiia-typeahead'] = "";
        req.session.data['annex-iiib-typeahead'] = "";
        req.session.data['ec-wastes-typeahead'] = "";
        req.session.data['national-code-typeahead'] = "";
        
        req.session.data['export-country'] = "";
        req.session.data['transit-country_1'] = "";
        req.session.data['transit-country_2'] = "";
        req.session.data['transit-country_3'] = "";
        req.session.data['import-destination-typeahead'] = "";
        
        req.session.data['container-number-entered'] = "";
        
        req.session.data['unique-transaction-id'] = "";

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

    } else if (req.session.data['manual-bulk'] == 'use-template') {
        res.redirect('prenotification-templates');
        
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

// view-all-cancel
router.post('/view-all-cancel', function(req, res) {
    if (req.session.data['view-all-cancel-confirmation'] == 'yes') {
        res.redirect('view-all-cancel-confirmation');
    } else if (req.session.data['view-all-cancel-confirmation'] == 'no') {
        res.redirect('view-all-with-cancel');
    }
})

// draft-cancel
router.post('/draft-cancel', function(req, res) {
    if (req.session.data['cancel-confirmation'] == 'yes') {
        res.redirect('draft-cancel-confirmation');
    } else if (req.session.data['cancel-confirmation'] == 'no') {
        res.redirect('draft-prenotify?person-arranging-the-shipment-status=Completed&importer-consignee-status=Completed&quantity-status=Completed&recovery-operation-status=Completed&usual-description-of-the-waste-status=Completed&waste-identification-codes-status=Completed&transaction-id-status=Completed');
    }
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

// quantity
router.post('/quantity', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        if (req.session.data['actual-or-estimate'] == 'actual') {
            res.redirect('enter-waste');
        } else if (req.session.data['actual-or-estimate'] == 'estimated') {
            res.redirect('enter-estimate-waste');
        }
    }
})

// enter-waste
router.post('/enter-waste', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

// enter-estimate-waste
router.post('/enter-estimate-waste', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
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

// manual-bulk-api
//router.post('/manual-bulk-api', function(req, res) {
//    if (req.session.data['manual-bulk'] == 'bulk') {
//        res.redirect('bulk');
//    } else if (req.session.data['manual-bulk'] == 'manual') {
//        // Reset prenotify statuses
//        req.session.data['first-trigger'] = 'yes';
//        req.session.data['preparation-status'] = "Not started";
//        req.session.data['person-arranging-the-shipment-status'] = "Not started";
//        req.session.data['importer-consignee-status'] = "Not started";
//        req.session.data['quantity-status'] = "Not started";
//        req.session.data['date-of-shipment-status'] = "Not started";
//        req.session.data['carrier-status'] = "Not started";
//        req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Not started";
//        req.session.data['recovery-facility-or-laboratory-status'] = "Not started";
//        req.session.data['recovery-operation-status'] = "Not started";
//        req.session.data['usual-description-of-the-waste-status'] = "Not started";
//        req.session.data['waste-identification-codes-status'] = "Not started";
//        req.session.data['countries-states-concerned-status'] = "Not started";
//        req.session.data['container-number-status'] = "Not started";
//        req.session.data['transaction-id-status'] = "Not started";
//        req.session.data['submit-and-generate-status'] = "Cannot start yet";
//
//        res.redirect('prenotify');
//
//    } else if (req.session.data['manual-bulk'] == 'use-template') {
//        res.redirect('prenotification-templates');
//        
//    } else {
//        res.redirect('api-information');
//    }
//})


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

// waste-codes-and-description
router.post('/waste-codes-and-description', function(req, res) {
    req.session.data['usual-description-of-the-waste-status'] = "Completed";

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

// search-sort-filter
router.post('/search-sort-filter', function(req, res) {
    req.session.data['search-results'] = req.session.data['entered-criteria'];
    res.redirect ('search-sort-filter');
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

// delete-template
router.post('/delete-template', function(req, res) {
    req.session.data['delete-template'] = "yes";
    req.session.data['template-name'] = undefined;
    res.redirect('delete-confirmation');
})

// create-template-from-view-all
//router.post('/create-template-from-view-all', function(req, res) {
//    res.redirect('create-template-success');
//})

// Add your routes here - above the module.exports line
module.exports = router
