"use strict";

var allowedHosts = ['http://18.188.173.23','http://18.188.173.23:3000','http://18.188.37.151','http://localhost:3000','http://localhost:3002','http://34.237.223.97'];
module.exports = function (req,res,next) {
	if(allowedHosts.indexOf(req.headers.origin) > -1){
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
	}
    next();
};
