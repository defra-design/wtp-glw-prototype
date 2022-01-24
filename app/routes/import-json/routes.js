module.exports = function(router,_myData) {
    
    // Set the working diectory...
    var version = "import-json";

    //WILDCARD /*
    router.all('/' + version + '/*', function (req, res, next) {
        //
        //Set req.session.myData for first time or if query string of resetSession is present
        // IMPORTANT NOTE: req.session.myData may have already been set to session in a different version so need to force reset at time if you want to switch between versions with fresh data i.e. use the resetSession query string 
        //
        if(!req.session.myData || req.query.resetSession) {
            req.session.myData = JSON.parse(JSON.stringify(_myData))
            // Choose which JSON file to USE...
            req.session.myData.selectedAccount = "account-1"
        }
        //Set selectedAccount id on every get in case a query string was specified
        req.session.myData.selectedAccount = req.query.accountID || req.session.myData.selectedAccount
        //next(); makes sure next get request in stack is hit
        next();
    });

    //INDEX
    router.get('/' + version + '/index', function (req, res) {

        //Render page
        res.render(version + '/index', {
            myData: req.session.myData
        });

    });
    router.post('/' + version + '/index', function (req, res) {

        //
        //DEMO OF HOW YOU CAN EDIT THE DATA IN YOUR SESSION - AGAINST THE CORRECT ACCOUNT
        //
        //Find selected account from your data sets
        var _selectedAccount = req.session.myData.accounts[req.session.myData.selectedAccount]
        var _selectedAccountsUsers = _selectedAccount.users
        //Edit age against each user in list
        _selectedAccountsUsers.forEach(function(user, index) {
            user.age = req.session.data.accountusers[index]
        });
        
        //Render page
        res.render(version + '/index', {
            myData: req.session.myData
        });

    });

};