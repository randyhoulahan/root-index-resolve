const url  = require('url' )
const path = require('path')

module.exports.main = async (evt, context, cb)  => {
    let uri = getUrl(evt)
    if (!needsRootIndex(uri)) return cb(null, getRequest(evt))
    cb(null, addIndexToUri(evt))
}

function addIndexToUri(evt){
    let req = getRequest(evt)

    if(hasSlash(req.uri))
        req.uri =req.uri + 'index.html'
    else req.uri =req.uri + '/index.html'
    return req
}

function getUrl(evt){
    return new url.parse(evt.Records[0].cf.request.uri)
}

function getRequest(evt){
    return evt.Records[0].cf.request
}

function needsRootIndex(uri){
    return !path.extname(uri.pathname)
}

function hasSlash(pathname){
    return pathname.substring(pathname.length - 1) === '/'
}