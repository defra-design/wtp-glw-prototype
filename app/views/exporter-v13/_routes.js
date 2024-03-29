const { red } = require('ansi-colors');
const express = require('express')
const router = express.Router()
var version = "exporter-v13";

// cookies
router.post('/cookies', function(req, res) {
    if ((req.session.data['exporter-v13-cookies-yes-no'] == "yes") || (req.session.data['exporter-v13-cookies-yes-no'] == "no")) {
        req.session.data['exporter-v13-cookie-status'] = "changed";
        // Reload the same page, "Your cookie settings were saved" messaging will be triggered...
        res.redirect('cookies');
    } else {
        req.session.data['exporter-v13-cookie-status'] = "error";
        // Reload the same page, error state messaging will be triggered...
        res.redirect('cookies');
    }
})

//---------------------------------------------------------------------------------------------------------

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
    req.session.data['submit-export'] = "Cannot start yet";

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
    req.session.data['new-rename-template-name'] = "Euromovement WEEE waste export";
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
    req.session.data['iteration-variant-and-number'] = "exporter-v13";

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
    req.session.data['submit-export'] = "Cannot start yet";

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
    req.session.data['new-rename-template-name'] = "Euromovement WEEE waste export";
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

//------------------------------- TEMPLATES ------------------------------------------------------//

// save-as-template-confirm
router.post('/save-as-template', function(req, res) {
    res.redirect('create-template-success');
})

// save-as-template
router.post('/template-from-export-name', function(req, res) {
    res.redirect('template-created');
})

// select template type
router.post('/template-type', function(req, res) {
    res.redirect('template-create-how');
})

// create new template
router.post('/template-create-new', function(req, res) {
    res.redirect('prenotify-template');
})

//------ create new template journey

    // template-waste-codes-and-description
        router.post('/template-waste-codes-and-description', function(req, res) {
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#about-waste');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#about-waste');
            } {
                if (req.session.data['template-code'] == 'not-applicable') {
                    res.redirect('template-ec-code-2');
                  } else {
                      res.redirect('template-ec-code');
                  }
            }
        })


    //-----------------

    // template-ec-code (code counter)
        router.post('/template-ec-code', function(req, res) {
            if(req.session.data['template-ec-code']=='Yes'){
            if(typeof req.session.data['code-count'] == "undefined"){
                req.session.data['template-code-count'] = 0;
            }
            else {
                req.session.data['template-code-count']++;
            }

            req.session.data['template-code-'+req.session.data['template-code-count']] = req.session.data['ec-wastes-typeahead'];
            res.redirect('template-code-add-another');
            }
            else if (req.session.data['template-ec-code']=='No') {
            res.redirect('template-national-code');
            }
        });

        router.get('/template-code-add-another', function (req, res) {
        var carrierArray = [];

        for (var i = 0; i <= req.session.data['template-code-count']; i++) {
        carrierArray[i] = req.session.data['template-code-'+i];
        }

        res.render(version+'/template-code-add-another', {
            'codes' : carrierArray });
        });

        router.post('/template-ec-code-2', function(req, res) {
            if(typeof req.session.data['template-code-count'] == "undefined"){
            req.session.data['template-code-count'] = 0;
            }
            else {
            req.session.data['template-code-count']++;
            }

            req.session.data['template-code-'+req.session.data['template-code-count']] = req.session.data['ec-wastes-typeahead'];
            res.redirect('template-code-add-another');
        });

        //------- FOR TEMPLATE CHANGE LINK (edit, new export) --------

        /* router.get('/template-code-add-another-change', function (req, res) {
            var carrierArray = [];
    
            for (var i = 0; i <= req.session.data['template-code-count']; i++) {
            carrierArray[i] = req.session.data['template-code-'+i];
            }
    
            res.render(version+'/template-code-add-another-change', {
                'codes' : carrierArray });
            });
    
            router.post('/template-ec-code-2-change', function(req, res) {
                if(typeof req.session.data['template-code-count'] == "undefined"){
                req.session.data['template-code-count'] = 0;
                }
                else {
                req.session.data['template-code-count']++;
                }
    
                req.session.data['template-code-'+req.session.data['template-code-count']] = req.session.data['ec-wastes-typeahead'];
                res.redirect('template-code-add-another-change');
            }); */

     //-----------------

     //template-waste-codes
        router.post('/template-code-add-another', function(req, res) {
            if (req.session.data['template-add-ec-code'] == 'Yes') {
                res.redirect('template-ec-code-2');
            } else if (req.session.data['template-add-ec-code'] == 'No') {    
                res.redirect('template-national-code');
                }
            
            })

            //------ for change link

            router.post('/template-code-add-another-change', function(req, res) {  
                        if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                            res.redirect('template-new-export#about-waste');
                        } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                            res.redirect('template-euromovement-selected#about-waste');
                            } 
                    
                })

     // template-national-code
        router.post('/template-national-code', function(req, res) {
            //req.session.data['usual-description-of-the-waste-status'] = "Completed";
            req.session.data['template-usual-description-of-the-waste-status'] = "In Progress";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#about-waste');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#about-waste');
            } else {
            res.redirect('template-waste-description');
            }
        })

    // template-waste-description
        router.post('/template-waste-description', function(req, res) {
            req.session.data['template-usual-description-of-the-waste-status'] = "Completed";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#about-waste');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#about-waste');
            } else {
            res.redirect('template-quantity');
            }
        })

    // template-new-waste-description
        router.post('/template-new-waste-description', function(req, res) { 
            req.session.data['template-new-description'] = req.session.data['template-new-description'];
            //req.session.data['just-edited'] = 'yes';
            
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#about-waste');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#about-waste');
            } else {
             res.redirect('template-new-export');
            }
         })

    // template-quantity
        router.post('/template-quantity', function(req, res) {
            req.session.data['template-quantity-status'] = "Completed";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#about-waste');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#about-waste');
            } else {
            res.redirect('prenotify-template');
            }
        })

    // template-exporter
        router.post('/template-exporter-postcode', function(req, res) {
            req.session.data['template-person-arranging-the-shipment-status'] = "Completed";
            res.redirect('template-exporter-address');
            
        })

        router.post('/template-exporter-address', function(req, res) {
            req.session.data['template-person-arranging-the-shipment-status'] = "Completed";
            res.redirect('template-who-arranged-shipment-details');
            
        })

        router.post('/template-exporter-address-manual', function(req, res) {
            req.session.data['template-person-arranging-the-shipment-status'] = "Completed";
            res.redirect('template-who-arranged-shipment-details');
            
        })

        router.post('/template-who-arranged-shipment-details', function(req, res) {
            req.session.data['template-person-arranging-the-shipment-status'] = "Completed";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#exporter-importer');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#exporter-importer');
            } else {
            res.redirect('template-importer-consignee');
            }
            
        })
        
    // template-importer-consignee
        router.post('/template-importer-consignee', function(req, res) {
            req.session.data['template-importer-consignee-status'] = "Completed";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#exporter-importer');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#exporter-importer');
            } else {
            res.redirect('prenotify-template');
            }
        })

    // template-actual-date-of-shipment
        router.post('/template-date-of-shipment', function(req, res) {
            req.session.data['template-date-of-shipment-status'] = "Completed";
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
            } else {
            res.redirect('template-carrier-add-1');
            }
         })

    // template carriers ----------------------------------------------------

        router.post('/template-carrier-check', function(req, res) {
            console.log(typeof req.session.data['template-carrier-count']);
            if (req.session.data['template-add-third-carrier'] == 'Yes' && req.session.data['template-carrier-count'] <= 3) {
                res.redirect('template-carrier-add-3');
            } else if (req.session.data['template-add-third-carrier'] == 'No' || req.session.data['template-carrier-count'] >= 4) {
                if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                    res.redirect('template-new-export#waste-journey');
                } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                    res.redirect('template-euromovement-selected#waste-journey');
                } else {
                    res.redirect('template-carrier-collect-postcode');
                }
            }
        })

        router.post('/template-carrier-check-change', function(req, res) {  
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
                } 
        
        })
        
        router.post('/template-carriers', function(req, res) {
        if (req.session.data['template-add-second-carrier'] == 'Yes') {
            res.redirect('template-carrier-add-3');
        } else if (req.session.data['template-add-second-carrier'] == 'No') {
            if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
                res.redirect('check-your-answers');
            } else {
                res.redirect('template-carrier-collect-postcode');
            }
        }
        })
        
        router.post('/template-carrier-add-1', function(req, res) {
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
        
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
            } else {
            res.redirect('template-carrier-transport-1b');          //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            }
        })


        /*  router.post('/template-carrier-add-1b', function(req, res) {  
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
                } 
        
        }) */

        
        /* router.post('/template-carrier-transport-1b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
        
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
            } else {
            res.redirect('template-carrier-transport-1b');
            }
        }) */

        // Carrier transport options
        router.post('/template-carrier-transport-1b', function(req, res) {
            if (req.session.data['transport'] == 'shipping') {
                res.redirect('template-carrier-1b-shipping');
            } else if (req.session.data['transport'] == 'trailer') {
                res.redirect('template-carrier-1b-trailer');
            } else if (req.session.data['transport'] == 'bulk-vessel') {
                res.redirect('template-carrier-1b-vessel');
            }
        })

        // Carrier transport shipping
        router.post('/template-carrier-1b-shipping', function(req, res) {
                res.redirect('template-carriers');
        })

        // Carrier transport trailer
        router.post('/template-carrier-1b-trailer', function(req, res) {
                res.redirect('template-carriers');    
        })

        // Carrier transport bulk-vessel
        router.post('/template-carrier-1b-vessel', function(req, res) {
            res.redirect('template-carriers');    
        })
        
        
        router.post('/template-carrier-add-2', function(req, res) { //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-transport-2b');          //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
        })
        
        router.post('/template-carrier-transport-2b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-check');
        })

        router.post('/template-carrier-add-3', function(req, res) {
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-transport-3b');                  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
        })
        
        router.post('/template-carrier-transport-3b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-check');
        })
        
        router.post('/template-carrier-delete', function(req, res) {
            req.session.data['template-carrier-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-check');
        })
        
        router.post('/template-carrier-collect-postcode', function(req, res) {
            req.session.data['template-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-carrier-collect-address');
        })
        
        router.post('/template-carrier-collect-address', function(req, res) {
            req.session.data['template-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-waste-generator');
        })
        
        router.post('/template-carrier-collect-address-manual', function(req, res) {
            req.session.data['template-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";
            res.redirect('template-waste-generator');
        })

        router.post('/template-waste-generator', function(req, res) {
            req.session.data['template-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['template-carrier-add-1'] = "true";

            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
            } else {
            res.redirect('template-point-of-exit');
            }
        })

        //-----------------

        // template location waste leaves
        router.post('/template-point-of-exit', function(req, res) {
            req.session.data['template-point-of-exit-status'] = "Completed";
        
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-journey');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-journey');
            } else { {
                res.redirect('template-countries-states-concerned-new');
            }
        }
        })

        // template recovery facility
        router.post('/template-recovery-facility-laboratory', function(req, res) {
            req.session.data['template-recovery-facility-or-laboratory-status'] = "Completed";
        
            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-treatment');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-treatment');
            } else {
                res.redirect('template-recovery-operation');
            }
        })

        // template recovery code
        router.post('/template-recovery-operation', function(req, res) {
            req.session.data['template-recovery-operation-status'] = "Completed";

            if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
                res.redirect('template-new-export#waste-treatment');
            } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
                res.redirect('template-euromovement-selected#waste-treatment');
            } else {
                res.redirect('prenotify-template');
            }
        })






// new template tasklist
    router.post('/prenotify-template', function(req, res) {
        res.redirect('template-saved');
    })


// Create new template options
router.post('/template-create-how', function(req, res) {
    if (req.session.data['template-create'] == 'template-blank') {
        res.redirect('template-create-new');
    } else if (req.session.data['template-create'] == 'template-exist') {
        res.redirect('template-create-export-radios');
    } else if (req.session.data['template-create'] == 'template-prev') {
        res.redirect('submitted-exports');
    }
})


// create template from existing (radios)
router.post('/template-create-export-radios', function(req, res) {
    if (req.session.data['duplicate-which-template'] == 'other') {
        res.redirect('prenotification-templates');
    } else if (req.session.data['duplicate-which-template'] == 'euromove-paper') {
        res.redirect('template-euromovement-duplicate');
    } else if (req.session.data['duplicate-which-template'] == 'waste-ltd') {
        res.redirect('template-euromovement-duplicate');
    } else if (req.session.data['duplicate-which-template'] == 'excel-list') {
        res.redirect('template-euromovement-duplicate');
    } else if (req.session.data['duplicate-which-template'] == 'euromove-card') {
        res.redirect('template-euromovement-duplicate');
    } else if (req.session.data['duplicate-which-template'] == 'fabric-society') {
        res.redirect('template-euromovement-duplicate');
    } 
})

// Duplicated template
router.post('/template-euromovement-duplicate', function(req, res) {
    res.redirect('template-duplicate-saved');
})


// submit export from template (radios)
    router.post('/template-submit-export-radios', function(req, res) {
        if (req.session.data['which-template'] == 'other') {
            res.redirect('prenotification-templates');
        } else if (req.session.data['which-template'] == 'euromove-paper') {
            res.redirect('template-new-export');
        } else if (req.session.data['which-template'] == 'waste-ltd') {
            res.redirect('template-new-export');
        } else if (req.session.data['which-template'] == 'excel-list') {
            res.redirect('template-new-export');
        } else if (req.session.data['which-template'] == 'euromove-card') {
            res.redirect('template-new-export');
        } else if (req.session.data['which-template'] == 'fabric-society') {
            res.redirect('template-new-export');
        } 
    })


// template-edit-name
    router.post('/template-edit-name', function(req, res) {
        //res.redirect('prenotification-templates');
       // req.session.data['template-name'] = req.session.data['rename-template-name'];
        req.session.data['template-name'] = req.session.data['new-rename-template-name'];
        //req.session.data['template-description'] = req.session.data['rename-template-description'];
        req.session.data['template-description'] = req.session.data['new-rename-template-description'];
        req.session.data['just-edited'] = 'yes';
        res.redirect('template-euromovement-selected');
    })

// template-edit-DUPLICATE-name
    router.post('/template-edit-duplicate-name', function(req, res) {
        //res.redirect('prenotification-templates');
        //req.session.data['duplicate-template-name'] = req.session.data['rename-template-name'];
        req.session.data['duplicate-template-name'] = req.session.data['duplicate-rename-template-name'];
        //req.session.data['duplicate-template-description'] = req.session.data['rename-template-description'];
        req.session.data['duplicate-template-description'] = req.session.data['duplicate-rename-template-description'];
        req.session.data['just-edited'] = 'yes';
        res.redirect('template-euromovement-duplicate');
    })


// template-new-unique-ref
router.post('/template-new-unique-ref', function(req, res) {
    req.session.data['template-add-unique-ref'] = req.session.data['added-unique-ref'];
    req.session.data['just-edited'] = 'yes';
    res.redirect('template-new-export');
})


/* // template-edit-description
    router.post('/template-edit-name', function(req, res) {
        //res.redirect('prenotification-templates');
        req.session.data['template-description'] = req.session.data['rename-template-description'];
        req.session.data['template-description'] = req.session.data['new-rename-template-description'];
        req.session.data['just-edited'] = 'yes';
        res.redirect('template-euromovement-selected');
    }) */

// delete-template
    router.post('/delete-template', function(req, res) {
        //req.session.data['template-name'] = undefined;
        if (req.session.data['delete-template-check'] == 'Yes') {
            res.redirect('delete-confirmation');
        } else if (req.session.data['delete-template-check'] == 'No') {
            res.redirect('prenotification-templates');
        }
        
    })

// template-euromovement
    router.post('/template-euromovement', function(req, res) {
        res.redirect('template-confirmation');
    })

// template-new-export
    router.post('/template-new-export', function(req, res) {
        if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
            res.redirect('template-export-confirmation');
        } else {
            res.redirect('template-export-confirmation');
        }
    })



//------------- BULK UPLOAD API --------------------------------------------------------------------------------------------

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
            req.session.data['who-arranged-contact-full-name'] = 'Alex Fields';
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
        req.session.data['point-of-exit-status'] = "Not started";
        req.session.data['container-number-status'] = "Not started";
        req.session.data['transaction-id-status'] = "Not started";
        req.session.data['submit-export'] = "Cannot start yet";

        res.redirect('prenotify');

    } else if (req.session.data['manual-bulk'] == 'use-template') {
        res.redirect('prenotification-templates');

    } else {
        res.redirect('api-information');
    }
})

//------------- BULK UPLOAD ROUTES --------------------------------------------------------------------------------------------

// bulk file upload
router.post('/bulk-upload', function(req, res) {
    res.redirect('bulk-uploading-1');
})

// bulk-uploading-1  ---> This is taken are of in the uploading files
    //router.post('/bulk-uploading-1', function(req, res) {
    //    res.redirect('bulk-errors-1');
    //})

// bulk error upload 1
router.post('/bulk-errors-1', function(req, res) {
    res.redirect('bulk-uploading-2');
})

// bulk-uploading-2
    //router.post('/bulk-uploading-2', function(req, res) {
    //    res.redirect('bulk-errors-2');
    //})

// bulk error upload 2
router.post('/bulk-errors-2', function(req, res) {
    res.redirect('bulk-uploading-3');
})

// bulk-uploading-3
    //router.post('/bulk-uploading-3', function(req, res) {
    //    res.redirect('bulk-declaration');
    //})

// bulk declaration
router.post('/bulk-declaration', function(req, res) {
    res.redirect('bulk-confirmation');
})

// submitted-817435283-alert
router.post('/submitted-817435283-alert', function(req, res) {
    res.redirect('submitted-prenotifications');
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

//---------------------------------------------------------------------------------------------------------

// preparation
router.post('/preparation', function(req, res) {
    req.session.data['preparation-status'] = "Completed";
    res.redirect('prenotify');
})

router.post('/delete-draft-export', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('draft-exports');
    }
})

router.post('/update-delete-export', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('update-prenotifications');
    }
})

router.post('/submitted-cancel-export', function(req, res) {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('submitted-exports');
    }
})

// exporter
router.post('/exporter-postcode', function(req, res) {
    req.session.data['person-arranging-the-shipment-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('exporter-address');
    }
})

router.post('/exporter-address', function(req, res) {
    req.session.data['person-arranging-the-shipment-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('who-arranged-shipment-details');
    }
})

router.post('/exporter-address-manual', function(req, res) {
    req.session.data['person-arranging-the-shipment-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('who-arranged-shipment-details');
    }
})

router.post('/who-arranged-shipment-details', function(req, res) {
    req.session.data['person-arranging-the-shipment-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('importer-consignee');
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


// enter-waste-quantity
router.post('/quantity', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

router.post('/quantity-estimate-metres', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})

router.post('/quantity-actual-metres', function(req, res) {
    req.session.data['quantity-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('date-of-shipment');
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


//---------------------------------------------------------------------------------------------------------

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
        res.redirect('carrier-add-1');
    }
})

//waste-codes
router.post('/code-add-another', function(req, res) {
if (req.session.data['add-ec-code'] == 'Yes') {
    res.redirect('ec-code-2');
} else if (req.session.data['add-ec-code'] == 'No') {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('national-code');
    }
}

})

//------------------ TRANSIT COUNTRIES ---------------------------------

router.post('/countries-add-another', function(req, res) {
    if (req.session.data['add-transit-country'] == 'Yes') {
        res.redirect('countries-add-2');
    } else if (req.session.data['add-transit-country'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
            res.redirect('check-your-answers');
        } else {
            req.session.data['countries-states-concerned-status'] = "Completed";
            res.redirect('prenotify');
        }
    }
    
    })


router.post('/declaration', function(req, res) {
if (req.session.data['declaration'] == 'yes') {
    res.redirect('confirmation');
} else if (req.session.data['declaration'] == 'no') {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
}

})

//------------------ CARRIERS ----------------------------------------------------

router.post('/carrier-check', function(req, res) {
  console.log(typeof req.session.data['carrier-count']);
  if (req.session.data['add-third-carrier'] == 'Yes' && req.session.data['carrier-count'] <= 3) {
      res.redirect('carrier-add-3');
  } else if (req.session.data['add-third-carrier'] == 'No' || req.session.data['carrier-count'] >= 4) {
      if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
          res.redirect('check-your-answers');
      } else {
          res.redirect('carrier-collect-postcode');
      }
  }
})


router.post('/carriers', function(req, res) {
if (req.session.data['add-second-carrier'] == 'Yes') {
    res.redirect('carrier-add-3');
} else if (req.session.data['add-second-carrier'] == 'No') {
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('carrier-collect-postcode');
    }
}

})


router.post('/carrier-add-1', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
    res.redirect('carrier-transport-1b'); //---------  <<<< Changed from carrier-transport-1 <<<<<<<<< ---//

  }
})



router.post('/carrier-transport-1b', function(req, res) { //---------  <<<< Changed from carrier-transport-1 <<<<<<<<< ---//
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
    res.redirect('carriers');
  }
})

 //------------ TEMP ROUTE FOR TEST PAGE

/*  router.post('/carrier-transport-1b', function(req, res) {
    res.redirect('carriers');
})  */

//-----------------------------------------

router.post('/carrier-add-2', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carrier-transport-2b');  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
})

router.post('/carrier-transport-2b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carrier-check');
})

router.post('/carrier-transport-3b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carrier-check');
})

router.post('/carrier-delete', function(req, res) {
    req.session.data['carrier-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carrier-check');
})

router.post('/carrier-collect-postcode', function(req, res) {
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('carrier-collect-address');
})

router.post('/carrier-collect-address', function(req, res) {
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('waste-generator');
})

router.post('/waste-generator', function(req, res) {
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('point-of-exit');
})

router.post('/carrier-collect-address-manual', function(req, res) {
    req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
    req.session.data['carrier-add-1'] = "true";
    res.redirect('waste-generator');
})


// recovery-facility-laboratory
router.post('/waste-treated', function(req, res) {
    req.session.data['recovery-facility-or-laboratory-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('recovery-facility-laboratory');
    }
})

router.post('/recovery-facility-laboratory', function(req, res) {
    req.session.data['recovery-facility-or-laboratory-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('recovery-operation');
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
    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        if (req.session.data['code'] == 'not-applicable') {
            res.redirect('ec-code-2');
          } else {
              res.redirect('ec-code');
          }
    }
})



router.post('/national-code', function(req, res) {
    //req.session.data['usual-description-of-the-waste-status'] = "Completed";
    req.session.data['usual-description-of-the-waste-status'] = "In Progress";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('waste-description');
    }
})

router.post('/unique-ref', function(req, res) {

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})


router.post('/point-of-exit', function(req, res) {
    req.session.data['point-of-exit-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('countries-states-concerned-new');
    }
})


// waste-description
router.post('/waste-description', function(req, res) {
    req.session.data['usual-description-of-the-waste-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('quantity');
    }
})

/* ** NO LONGER IN USE v12 ***
// usual-description 
router.post('/usual-description', function(req, res) {
    req.session.data['usual-description-of-the-waste-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
}) 
*/

/* ** NO LONGER IN USE v12 ***
// waste-identification-codes
router.post('/waste-identification-codes', function(req, res) {
    req.session.data['waste-identification-codes-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers');
    } else {
        res.redirect('prenotify');
    }
})
*/

// countries-states-concerned
/* router.post('/countries-states-concerned-new', function(req, res) {
    //req.session.data['countries-states-concerned-status'] = "Completed";

    if ((req.session.data.gPreviousLocation).includes('check-your-answers')) {
        res.redirect('check-your-answers#countries-concerned');
    } else {
        res.redirect('prenotify');
    }
}) */

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

//------------------ TASK LIST STATUS ----------------------------------------------------------------------------------------------------

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
    req.session.data['point-of-exit-status'] = "Not started";
    req.session.data['container-number-status'] = "Not started";
    req.session.data['transaction-id-status'] = "Not started";
    req.session.data['submit-export'] = "Cannot start yet";

    res.redirect('check-your-answers');
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




//---------------------- SECTIONS COMPLETED -----------------------------

//----- PRENOTIFY
router.get('/prenotify', function (req, res) {

		var count = 0;

		if(req.session.data['usual-description-of-the-waste-status'] == "Completed" && req.session.data['quantity-status'] == "Completed"){
			count++;
		}

    if(req.session.data['person-arranging-the-shipment-status'] == "Completed" && req.session.data['importer-consignee-status'] == "Completed"){
      count++;
    }

    if(req.session.data['date-of-shipment-status'] == "Completed" && req.session.data['carrier-status'] == "Completed" && req.session.data['waste-generator-original-producer-new-producer-or-collector-status'] == "Completed" && req.session.data['countries-states-concerned-status'] == "Completed"){
      count++;
    }

    if(req.session.data['recovery-facility-or-laboratory-status'] == "Completed" && req.session.data['recovery-operation-status'] == "Completed"){
      count++;
    }

		res.render(version+'/prenotify', {
			'sectionscompleted' : count
		});

});

//------ PRENOTIFY TEMPLATE
router.get('/prenotify-template', function (req, res) {

    var count = 0;

    if(req.session.data['template-usual-description-of-the-waste-status'] == "Completed" && req.session.data['template-quantity-status'] == "Completed"){
        count++;
    }

if(req.session.data['template-person-arranging-the-shipment-status'] == "Completed" && req.session.data['template-importer-consignee-status'] == "Completed"){
  count++;
}

if(req.session.data['template-date-of-shipment-status'] == "Completed" && req.session.data['template-carrier-status'] == "Completed" && req.session.data['template-waste-generator-original-producer-new-producer-or-collector-status'] == "Completed" && req.session.data['template-countries-states-concerned-status'] == "Completed"){
  count++;
}

if(req.session.data['template-recovery-facility-or-laboratory-status'] == "Completed" && req.session.data['template-recovery-operation-status'] == "Completed"){
  count++;
}

    res.render(version+'/prenotify-template', {
        'sectionscompleted' : count
    });

});


//------ PRENOTIFY IMPORTS
router.get('/imports-prenotify', function (req, res) {

    var count = 0;

    if(req.session.data['imports-usual-description-of-the-waste-status'] == "Completed" && req.session.data['imports-quantity-status'] == "Completed"){
        count++;
    }

if(req.session.data['imports-person-arranging-the-shipment-status'] == "Completed" && req.session.data['imports-importer-consignee-status'] == "Completed"){
  count++;
}

if(req.session.data['imports-date-of-shipment-status'] == "Completed" && req.session.data['imports-carrier-status'] == "Completed" && req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] == "Completed" && req.session.data['imports-countries-states-concerned-status'] == "Completed"){
  count++;
}

if(req.session.data['imports-recovery-facility-or-laboratory-status'] == "Completed" && req.session.data['imports-recovery-operation-status'] == "Completed"){
  count++;
}

    res.render(version+'/imports-prenotify', {
        'sectionscompleted' : count
    });

});



//------ carrier counter
  router.post('/carrier-add-3', function(req, res) {
      if(typeof req.session.data['carrier-count'] == "undefined"){
        req.session.data['carrier-count'] = 0;
      }
      else {
        req.session.data['carrier-count']++;
      }

      req.session.data['carrier-name-'+req.session.data['carrier-count']] = req.body.additonalcarrier;
      res.redirect('carrier-transport-2b');  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
  });

  router.get('/carrier-check', function (req, res) {
    var carrierArray = [];

    for (var i = 0; i <= req.session.data['carrier-count']; i++) {
      carrierArray[i] = req.session.data['carrier-name-'+i];
    }

    res.render(version+'/carrier-check', {
    	'items' : carrierArray });
  });



  //------ TEMPLATE-carrier-counter
  router.post('/template-carrier-add-3', function(req, res) {
    if(typeof req.session.data['template-carrier-count'] == "undefined"){
      req.session.data['template-carrier-count'] = 0;
    }
    else {
      req.session.data['template-carrier-count']++;
    }

    req.session.data['template-carrier-name-'+req.session.data['template-carrier-count']] = req.body.additonalcarrier;
    res.redirect('template-carrier-transport-2b');
});

router.get('/template-carrier-check', function (req, res) {
  var carrierArray = [];

  for (var i = 0; i <= req.session.data['template-carrier-count']; i++) {
    carrierArray[i] = req.session.data['template-carrier-name-'+i];
  }

  res.render(version+'/template-carrier-check', {
      'items' : carrierArray });
});


  //------ EWC code counter
  router.post('/ec-code', function(req, res) {
          if(req.session.data['ec-code']=='Yes'){
            if(typeof req.session.data['code-count'] == "undefined"){
              req.session.data['code-count'] = 0;
            }
            else {
              req.session.data['code-count']++;
            }

            req.session.data['code-'+req.session.data['code-count']] = req.session.data['ec-wastes-typeahead'];
            res.redirect('code-add-another');
          }
          else if (req.session.data['ec-code']=='No') {
            res.redirect('national-code');
          }
      });

    router.get('/code-add-another', function (req, res) {
      var carrierArray = [];

      for (var i = 0; i <= req.session.data['code-count']; i++) {
        carrierArray[i] = req.session.data['code-'+i];
      }

      res.render(version+'/code-add-another', {
      	'codes' : carrierArray });
    });

    router.post('/ec-code-2', function(req, res) {
          if(typeof req.session.data['code-count'] == "undefined"){
            req.session.data['code-count'] = 0;
          }
          else {
            req.session.data['code-count']++;
          }

          req.session.data['code-'+req.session.data['code-count']] = req.session.data['ec-wastes-typeahead'];
          res.redirect('code-add-another');
      });



 //------ countries-state country counter

 router.post('/countries-states-concerned-new', function(req, res) {
    console.log(req.session.data['country-state']);
    if(req.session.data['countries-state']=='Yes'){
      if(typeof req.session.data['country-count'] == "undefined"){
        req.session.data['country-count'] = 0;
      }
      else {
        req.session.data['country-count']++;
      }

      req.session.data['country-'+req.session.data['country-count']] = req.session.data['transit-typeahead'];
      res.redirect('countries-add-another');
    }
    else if (req.session.data['countries-state']=='No') {
    req.session.data['countries-states-concerned-status'] = "Completed";
      res.redirect('prenotify');
    }
});

router.get('/countries-add-another', function (req, res) {
var carrierArray = [];

for (var i = 0; i <= req.session.data['country-count']; i++) {
  carrierArray[i] = req.session.data['country-'+i];
}

res.render(version+'/countries-add-another', {
    'countries' : carrierArray });
});

router.post('/countries-add-2', function(req, res) {
    if(typeof req.session.data['country-count'] == "undefined"){
      req.session.data['country-count'] = 0;
    }
    else {
      req.session.data['country-count']++;
    }

    req.session.data['country-'+req.session.data['country-count']] = req.session.data['transit-typeahead'];
    res.redirect('countries-add-another');  
});


//------ TEMPLATE countries-state country counter

router.post('/template-countries-states-concerned-new', function(req, res) {
    console.log(req.session.data['template-country-state']);
    if(req.session.data['template-countries-state']=='Yes'){
      if(typeof req.session.data['template-country-count'] == "undefined"){
        req.session.data['template-country-count'] = 0;
      }
      else {
        req.session.data['template-country-count']++;
      }

      req.session.data['template-country-'+req.session.data['template-country-count']] = req.session.data['transit-typeahead'];
      res.redirect('template-countries-add-another');
    }
    else if (req.session.data['template-countries-state']=='No') {
    req.session.data['template-countries-states-concerned-status'] = "Completed";
      res.redirect('prenotify-template');
    }
});

router.get('/template-countries-add-another', function (req, res) {
var carrierArray = [];

for (var i = 0; i <= req.session.data['template-country-count']; i++) {
  carrierArray[i] = req.session.data['template-country-'+i];
}

res.render(version+'/template-countries-add-another', {
    'countries' : carrierArray });
});

router.post('/template-countries-add-2', function(req, res) {
    if(typeof req.session.data['template-country-count'] == "undefined"){
      req.session.data['template-country-count'] = 0;
    }
    else {
      req.session.data['template-country-count']++;
    }

    req.session.data['template-country-'+req.session.data['template-country-count']] = req.session.data['transit-typeahead'];
    res.redirect('template-countries-add-another');  
});

router.post('/template-countries-add-another', function(req, res) {
    if (req.session.data['template-add-transit-country'] == 'Yes') {
        res.redirect('template-countries-add-2');
    } else if (req.session.data['template-add-transit-country'] == 'No') {
        if ((req.session.data.gPreviousLocation).includes('template-new-export')) {
            res.redirect('template-new-export#waste-journey');
        } else if ((req.session.data.gPreviousLocation).includes('template-euromovement-selected')) {
            res.redirect('template-euromovement-selected#waste-journey');
        } else {
            req.session.data['template-countries-states-concerned-status'] = "Completed";
            res.redirect('prenotify-template');
        }
    }
    
    })


//------------****** IMPORTS (from v13 onwards) ******---------------------------------------------------------------------

// Submit import options
router.post('/imports-submit-how', function(req, res) {
    if (req.session.data['imports-create'] == 'imports-blank') {
        res.redirect('imports-unique-ref');
    } else if (req.session.data['imports-create'] == 'imports-exist') {
        res.redirect('imports-submit-how');
    } else if (req.session.data['imports-create'] == 'imports-csv') {
        res.redirect('imports-submit-how');
    }
})

// imports-unique-ref
router.post('/imports-unique-ref', function(req, res) {
    req.session.data['imports-add-unique-ref'] = req.session.data['added-unique-ref'];
    req.session.data['just-edited'] = 'yes';
    res.redirect('imports-prenotify');
})


//------------ IMPORTS - ABOUT THE WASTE --------------------------------

// imports-waste-codes-and-description
router.post('/imports-waste-codes-and-description', function(req, res) {
        if (req.session.data['imports-code'] == 'not-applicable') {
            res.redirect('imports-ec-code-2');
          } else {
              res.redirect('imports-ec-code');
          }
})

//-----------------

        // imports-ec-code (code counter)
        router.post('/imports-ec-code', function(req, res) {
            if(req.session.data['imports-ec-code']=='Yes'){
            if(typeof req.session.data['imports-code-count'] == "undefined"){
                req.session.data['imports-code-count'] = 0;
            }
            else {
                req.session.data['imports-code-count']++;
            }

            req.session.data['imports-code-'+req.session.data['imports-code-count']] = req.session.data['ec-wastes-typeahead'];
            res.redirect('imports-code-add-another');
            }
            else if (req.session.data['imports-ec-code']=='No') {
            res.redirect('imports-national-code');
            }
        });

        router.get('/imports-code-add-another', function (req, res) {
        var carrierArray = [];

        for (var i = 0; i <= req.session.data['imports-code-count']; i++) {
        carrierArray[i] = req.session.data['imports-code-'+i];
        }

        res.render(version+'/imports-code-add-another', {
            'codes' : carrierArray });
        });

        router.post('/imports-ec-code-2', function(req, res) {
            if(typeof req.session.data['imports-code-count'] == "undefined"){
            req.session.data['imports-code-count'] = 0;
            }
            else {
            req.session.data['imports-code-count']++;
            }

            req.session.data['imports-code-'+req.session.data['imports-code-count']] = req.session.data['ec-wastes-typeahead'];
            res.redirect('imports-code-add-another');
        });



/* // imports-waste-codes-and-description
router.post('/imports-waste-codes-and-description', function(req, res) {
        if (req.session.data['imports-code'] == 'not-applicable') {
            res.redirect('imports-ec-code-2');
          } else {
              res.redirect('imports-ec-code');
          }
}) */

// imports-ec-code
router.post('/imports-ec-code', function(req, res) {
          res.redirect('imports-code-add-another');
})

// imports-code-add-another
router.post('/imports-code-add-another', function(req, res) {
    res.redirect('imports-national-code');
})


/* // imports-code-add-another
router.post('/imports-code-add-another', function(req, res) {
    if (req.session.data['imports-add-ec-code'] == 'Yes') {
        res.redirect('imports-ec-code-2');
    } else if (req.session.data['imports-add-ec-code'] == 'No') {    
        res.redirect('imports-national-code');
        }
    
    }) */

// imports-national-code
router.post('/imports-national-code', function(req, res) {
    req.session.data['imports-usual-description-of-the-waste-status'] = "Completed";
    res.redirect('imports-waste-description');
})

// imports-waste-description
router.post('/imports-waste-description', function(req, res) {
    req.session.data['imports-quantity-status'] = "Completed";
    res.redirect('imports-quantity');
})

// imports-quantity
router.post('/imports-quantity', function(req, res) {
    req.session.data['imports-quantity-status'] = "Completed";
    res.redirect('imports-prenotify');
})


//------------ IMPORTS - EXPORTER IMPORTER --------------------------------


// imports-EXPORTER-details  <<<<<<--------- now EXPORTER details
router.post('/imports-importer-consignee', function(req, res) {
    req.session.data['imports-importer-consignee-status'] = "Completed";
    res.redirect('imports-exporter-postcode');
})

// imports-exporter-postcode
router.post('/imports-exporter-postcode', function(req, res) {
    req.session.data['imports-person-arranging-the-shipment-status'] = "Completed";
    res.redirect('imports-exporter-address'); 
})

// imports-IMPORTER-address <<<<<<--------- now IMPORTER details
router.post('/imports-exporter-address', function(req, res) {
    req.session.data['imports-person-arranging-the-shipment-status'] = "Completed";
    res.redirect('imports-who-arranged-shipment-details');
})

// imports-IMPORTER-address-manual
router.post('/imports-exporter-address-manual', function(req, res) {
    req.session.data['imports-person-arranging-the-shipment-status'] = "Completed";
    res.redirect('imports-who-arranged-shipment-details');
})

// imports-IMPORTER-details
router.post('/imports-who-arranged-shipment-details', function(req, res) {
    req.session.data['imports-person-arranging-the-shipment-status'] = "Completed";
    res.redirect('imports-person-arranged-signed');
})

// imports-person-arranged-signed
router.post('/imports-person-arranged-signed', function(req, res) {
    req.session.data['imports-person-arranged-signed'] = "Completed";
    res.redirect('imports-recovery-details');
})

// imports-recovery-details
router.post('/imports-recovery-details', function(req, res) {
    req.session.data['imports-recovery-details'] = "Completed";
    res.redirect('imports-recovery-weight');
})

// imports-recovery-weight
router.post('/imports-recovery-weight', function(req, res) {
    req.session.data['imports-recovery-weight'] = "Completed";
    res.redirect('imports-prenotify');
})



//------------ IMPORTS - JOURNEY OF WASTE --------------------------------

// imports-date-of-shipment
router.post('/imports-date-of-shipment', function(req, res) {
    req.session.data['imports-date-of-shipment-status'] = "Completed";
    res.redirect('imports-carrier-add-1');
 })

 router.post('/imports-carrier-add-1', function(req, res) {
    req.session.data['imports-carrier-status'] = "Completed";
    req.session.data['imports-carrier-add-1'] = "true";

    res.redirect('imports-carrier-transport-1b');          //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
    
})

        // Carrier transport options
        router.post('/imports-carrier-transport-1b', function(req, res) {
            if (req.session.data['imports-transport'] == 'shipping') {
                res.redirect('imports-carrier-1b-shipping');
            } else if (req.session.data['imports-transport'] == 'trailer') {
                res.redirect('imports-carrier-1b-trailer');
            } else if (req.session.data['imports-transport'] == 'bulk-vessel') {
                res.redirect('imports-carrier-1b-vessel');
            }
        })

        // Carrier transport shipping
        router.post('/imports-carrier-1b-shipping', function(req, res) {
                res.redirect('imports-carriers');
        })

        // Carrier transport trailer
        router.post('/imports-carrier-1b-trailer', function(req, res) {
                res.redirect('imports-carriers');    
        })

        // Carrier transport bulk-vessel
        router.post('/imports-carrier-1b-vessel', function(req, res) {
            res.redirect('imports-carriers');    
        })

        router.post('/imports-carriers', function(req, res) {
            if (req.session.data['imports-add-second-carrier'] == 'Yes') {
                res.redirect('imports-carrier-add-3');
            } else if (req.session.data['imports-add-second-carrier'] == 'No') {
                if ((req.session.data.gPreviousLocation).includes('imports-check-your-answers')) {
                    res.redirect('imports-check-your-answers');
                } else {
                    // res.redirect('imports-carrier-collect-postcode');
                    res.redirect('imports-carrier-collect-address-manual-2');
                }
            }
            })
        
        router.post('/imports-carrier-check', function(req, res) {
            console.log(typeof req.session.data['imports-carrier-count']);
            if (req.session.data['imports-add-third-carrier'] == 'Yes' && req.session.data['imports-carrier-count'] <= 3) {
                res.redirect('imports-carrier-add-3');
            } else if (req.session.data['imports-add-third-carrier'] == 'No' || req.session.data['imports-carrier-count'] >= 4) {
                     // res.redirect('imports-carrier-collect-postcode');
                     res.redirect('imports-carrier-collect-address-manual-2');
             }
            })

        router.post('/imports-carrier-add-2', function(req, res) { //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['imports-carrier-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-transport-2b');          //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
        })
        
        router.post('/imports-carrier-transport-2b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['imports-carrier-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-check');
        })

        router.post('/imports-carrier-add-3', function(req, res) {
            req.session.data['imports-carrier-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-transport-3b');                  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
        })
        
        router.post('/imports-carrier-transport-3b', function(req, res) {  //---------  <<<< added 'b' to the end of the url <<<<<<<<< ---//
            req.session.data['imports-carrier-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-check');
        })
        
        router.post('/imports-carrier-delete', function(req, res) {
            req.session.data['imports-carrier-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-check');
        })
        
        router.post('/imports-carrier-collect-postcode', function(req, res) {
            req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-carrier-collect-address');
        })
        
        router.post('/imports-carrier-collect-address', function(req, res) {
            req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-waste-generator');
        })
        
        router.post('/imports-carrier-collect-address-manual', function(req, res) {
            req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-waste-generator');
        })

        router.post('/imports-carrier-collect-address-manual-2', function(req, res) {
            req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-point-of-exit');
        })

        /* router.post('/imports-waste-generator', function(req, res) {
            req.session.data['imports-waste-generator-original-producer-new-producer-or-collector-status'] = "Completed";
            req.session.data['imports-carrier-add-1'] = "true";
            res.redirect('imports-point-of-exit');
            
        }) */

        //-----------------

        // imports location waste leaves
        router.post('/imports-point-of-exit', function(req, res) {
            req.session.data['imports-point-of-exit-status'] = "Completed";
            res.redirect('imports-countries-states-concerned-new');
        })

        router.post('/imports-countries-states-concerned-new', function(req, res) {
            console.log(req.session.data['imports-country-state']);
            if(req.session.data['imports-countries-state']=='Yes'){
              if(typeof req.session.data['imports-country-count'] == "undefined"){
                req.session.data['imports-country-count'] = 0;
              }
              else {
                req.session.data['imports-country-count']++;
              }
        
              req.session.data['imports-country-'+req.session.data['imports-country-count']] = req.session.data['transit-typeahead'];
              res.redirect('imports-countries-add-another');
            }
            else if (req.session.data['imports-countries-state']=='No') {
            req.session.data['imports-countries-states-concerned-status'] = "Completed";
              res.redirect('imports-prenotify');
            }
        });
        
        router.get('/imports-countries-add-another', function (req, res) {
        var carrierArray = [];
        
        for (var i = 0; i <= req.session.data['imports-country-count']; i++) {
          carrierArray[i] = req.session.data['imports-country-'+i];
        }
        
        res.render(version+'/imports-countries-add-another', {
            'countries' : carrierArray });
        });
        
        router.post('/imports-countries-add-2', function(req, res) {
            if(typeof req.session.data['imports-country-count'] == "undefined"){
              req.session.data['imports-country-count'] = 0;
            }
            else {
              req.session.data['imports-country-count']++;
            }
        
            req.session.data['imports-country-'+req.session.data['imports-country-count']] = req.session.data['transit-typeahead'];
            res.redirect('imports-countries-add-another');  
        });
        
        router.post('/imports-countries-add-another', function(req, res) {
            if (req.session.data['imports-add-transit-country'] == 'Yes') {
                res.redirect('imports-countries-add-2');
            } else if (req.session.data['imports-add-transit-country'] == 'No') {
                    req.session.data['imports-countries-states-concerned-status'] = "Completed";
                    res.redirect('imports-prenotify');
            }
            })


        // imports recovery facility
        router.post('/imports-recovery-facility-laboratory', function(req, res) {
            req.session.data['imports-recovery-facility-or-laboratory-status'] = "Completed";
            res.redirect('imports-recovery-operation');
        })

        // imports recovery code
        router.post('/imports-recovery-operation', function(req, res) {
            req.session.data['imports-recovery-operation-status'] = "Completed";
            res.redirect('imports-prenotify');
        })

        // imports-prenotify
        router.post('/imports-prenotify', function(req, res) {
            res.redirect('imports-check-your-answers');
         })

        // imports-check-your-answers
        router.post('/imports-check-your-answers', function(req, res) {
            res.redirect('imports-check-your-answers');
         })

//------------ IMPORTS - REJECT --------------------------------

// Reject already told us
router.post('/imports-reject-told-us', function(req, res) {
    if (req.session.data['told-us'] == 'yes') {
        res.redirect('imports-reject-search-submitted');
    } else if (req.session.data['told-us'] == 'no') {
        res.redirect('imports-reject-unique-ref');
    }
})

// imports-reject-search-submitted
router.post('/imports-reject-search-submitted', function(req, res) {
    res.redirect('imports-reject-search-results-1');
 })

// imports-reject-unique-ref
router.post('/imports-reject-unique-ref', function(req, res) {
    req.session.data['imports-add-unique-ref'] = req.session.data['added-unique-ref'];
    req.session.data['just-edited'] = 'yes';
    res.redirect('imports-reject-prenotify');
})

// create-template-from-view-all
//router.post('/create-template-from-view-all', function(req, res) {
//    res.redirect('create-template-success');
//})

// Add your routes here - above the module.exports line
module.exports = router
