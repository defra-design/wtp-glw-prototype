module.exports = function(router,_myAnnexVIIData) {
    
    // Set the working diectory...
    var version = "annex-vii-data";

    //WILDCARD /*
    router.all('/' + version + '/*', function (req, res, next) {
        //
        //Set req.session.myAnnexVIIData for first time or if query string of resetSession is present
        // IMPORTANT NOTE: req.session.myAnnexVIIData may have already been set to session in a different version so need to force reset at time if you want to switch between versions with fresh data i.e. use the resetSession query string 
        //
        if(!req.session.myAnnexVIIData || req.query.resetSession) {
            req.session.myAnnexVIIData = JSON.parse(JSON.stringify(_myAnnexVIIData))
            // Choose which JSON file to USE...
            req.session.myAnnexVIIData.selectedAccount = "account-1"
        }
        //Set selectedAccount id on every get in case a query string was specified
        req.session.myAnnexVIIData.selectedAccount = req.query.accountID || req.session.myAnnexVIIData.selectedAccount
        //next(); makes sure next get request in stack is hit
        next();
    });

    //INDEX
    router.get('/' + version + '/index', function (req, res) {

        //Render page
        res.render(version + '/index', {
            myAnnexVIIData: req.session.myAnnexVIIData
        });

    });
    router.post('/' + version + '/index', function (req, res) {

        //
        //DEMO OF HOW YOU CAN EDIT THE DATA IN YOUR SESSION - AGAINST THE CORRECT ACCOUNT
        //
        //Find selected account from your data sets
        var _selectedAccount = req.session.myAnnexVIIData.accounts[req.session.myAnnexVIIData.selectedAccount]
        var _selectedAccountsUsers = _selectedAccount.users
        //Edit age against each user in list
        _selectedAccountsUsers.forEach(function(user, index) {
            user.age = req.session.data.accountusers[index]
        });
        
        //Render page
        res.render(version + '/index', {
            myAnnexVIIData: req.session.myAnnexVIIData
        });

    });

};