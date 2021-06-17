const express = require('express')
const router = express.Router()

// Defra ID
router.use('/defra-id', require('./views/defra-id/_routes'));

// Import V4 Agency Officer routes
router.use('/v4-agency-officer/', (req, res, next) => {
  return require(`./views/v4-agency-officer/_routes`)(req, res, next);
})

// Import V3 Agency Officer routes
router.use('/v3-agency-officer/', (req, res, next) => {
  return require(`./views/v3-agency-officer/_routes`)(req, res, next);
})

// Import V3 Consignor routes
router.use('/v3-consignor/', (req, res, next) => {
  return require(`./views/v3-consignor/_routes`)(req, res, next);
})

// Import V2 routes
router.use('/v2/', (req, res, next) => {
    return require(`./views/v2/_routes`)(req, res, next);
})

// Import V1 routes
router.use('/v1/', (req, res, next) => {
    return require(`./views/v1/_routes`)(req, res, next);
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
