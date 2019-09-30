const url  = require('url' )

module.exports.main = async (evt, context, cb)  => {
    const { href } = getUrl(evt)
    
    if(is504(evt))
        console.log('504 at: ', href)
    cb(null, getResponse(evt))
}

function getUrl(evt){
    return new url.parse(evt.Records[0].cf.request.uri)
}

function getResponse(evt){
    return evt.Records[0].cf.Response
}

function is504(evt){
    return evt.Records[0].cf.Response.satus === '504'
}