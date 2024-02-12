// make function private prefix with underscore like _functionName
function _respond(res, next, status, data, http_code){
    var response = {
        'status': status,
        'data': data
    };
    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    res.end(JSON.stringify(response));
    return next();
}

// make function public by module.exports.functionName
module.exports.success = function(res, next, data) {
    _respond(res, next, 'success', data, 200) ;
};

module.exports.failure = function(res, next, data, http_code) {
    _respond(res, next, 'failure', data, http_code);
};