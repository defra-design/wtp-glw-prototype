const express = require('express')
const router = express.Router()

/////////////////////////////////////////////////
// myData object to pass to prototype versions //
/////////////////////////////////////////////////
var _myData = {
  // Fake Data JSON Files //
  accounts: {
    "account-1": require(__dirname + '/data/account-1.json')
  }
}

/////////////////////////////////////////////////////////
// myAnnexVIIData object to pass to prototype versions //
/////////////////////////////////////////////////////////
var _myAnnexVIIData = {
  // Fake Data JSON Files //
  accounts: {
    "account-1": require(__dirname + '/data/annex-vii-data.json')
  }
}

//Version 1-0 routing
//Pass myData variable as parameter into version specific routes file
require('./routes/import-json/routes.js')(router,JSON.parse(JSON.stringify(_myData)));

//Pass myAnnexVIIData variable as parameter into version specific routes file
require('./routes/annex-vii-data/routes.js')(router,JSON.parse(JSON.stringify(_myAnnexVIIData)));

/////////////////////////////////////////////////
// myData object to pass to prototype versions //
/////////////////////////////////////////////////
//var _myData = {
  // Fake Data JSON Files //
  //accounts: {
//  importedSubmissions: {
//    "imports-1": require(__dirname + '/data/annex-vii-data.json')
    //"account-1": require(__dirname + '/data/account-1.json'),
    //"account-2": require(__dirname + '/data/account-2.json'),
    //"account-3": require(__dirname + '/data/account-3.json')
//  }
//}

// Playground routing
// Pass myData variable as parameter into specific routes file
//require('./routes/import-json/routes.js')(router,JSON.parse(JSON.stringify(_myData)));

// Dynamic check your answers routes
router.use('/dynamic-check-your-answers/', (req, res, next) => {
  return require(`./views/dynamic-check-your-answers/_routes`)(req, res, next);
})

// Defra ID
router.use('/defra-id', require('./views/defra-id/_routes'));

// Import Agency Officer V3 routes
router.use('/agency-officer-v3/', (req, res, next) => {
  return require(`./views/agency-officer-v3/_routes`)(req, res, next);
})

// Import Agency Officer V4 routes
router.use('/agency-officer-v4/', (req, res, next) => {
  return require(`./views/agency-officer-v4/_routes`)(req, res, next);
})

// Import Agency Officer V2 routes
router.use('/agency-officer-v2/', (req, res, next) => {
  return require(`./views/agency-officer-v2/_routes`)(req, res, next);
})

// Import Agency Officer V1 routes
router.use('/agency-officer-v1/', (req, res, next) => {
  return require(`./views/agency-officer-v1/_routes`)(req, res, next);
})

// Import Exporter V5 routes
router.use('/exporter-v5/', (req, res, next) => {
  //req.session.data["entered-criteria"] = undefined;
  return require(`./views/exporter-v5/_routes`)(req, res, next);
})

// Import Exporter V4 routes
router.use('/exporter-v4/', (req, res, next) => {
  //req.session.data["entered-criteria"] = undefined;
  return require(`./views/exporter-v4/_routes`)(req, res, next);
})

// Import Exporter V3 routes
router.use('/exporter-v3/', (req, res, next) => {
  return require(`./views/exporter-v3/_routes`)(req, res, next);
})

// Import Exporter V2 routes
router.use('/exporter-v2/', (req, res, next) => {
    return require(`./views/exporter-v2/_routes`)(req, res, next);
})

// Import Exporter V1 routes
router.use('/exporter-v1/', (req, res, next) => {
    return require(`./views/exporter-v1/_routes`)(req, res, next);
})

// Import alpha-assessment-defra-id
router.use('/alpha-assessment-defra-id', require('./views/alpha-assessment-defra-id/_routes'));

// Import alpha-assessment-agency-officer routes
router.use('/alpha-assessment-agency-officer/', (req, res, next) => {
  return require(`./views/alpha-assessment-agency-officer/_routes`)(req, res, next);
})

// Import alpha-assessment-exporter routes
router.use('/alpha-assessment-exporter/', (req, res, next) => {
  return require(`./views/alpha-assessment-exporter/_routes`)(req, res, next);
})

// SET GLOBAL PREVIOUS PAGE
router.use('/', (req, res, next) => {
    req.session.data.gPreviousLocation = req.get('Referrer');
    req.session.data.gCurrentLocation = req.originalUrl;
    console.log('gPreviousLocation was : ' + req.session.data.gPreviousLocation);
    console.log('gCurrentLocation is   : ' + req.session.data.gCurrentLocation);
    next();
  });

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen
    //req.session.data.previousLocation = req.get('Referrer'); // GLOBAL PREVIOUS PAGE
    console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
    //console.log('GLOBAL PREVIOUS PAGE: ' + req.session.data.previousLocation);
    next();
  });

// Add your routes here - above the module.exports line

module.exports = router
