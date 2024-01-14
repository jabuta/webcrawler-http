function normalizeURL(url){
    let urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === "/" && fullPath.length > 0) {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath 
}

//DOM parsing and URL retrieval

function getURLsFromHTML(htmlBody, baseURL){
    const { JSDOM } = require( 'jsdom' )
    const dom = new JSDOM(htmlBody)
    const aElementList = dom.window.document.querySelectorAll('a')
    const urls = []
    for ( aElement of aElementList ){
        if ( aElement.href.slice(0,1) === '/') {
            try {
                urls.push( new URL(aElement.href, baseURL).href )
            } catch (err){
                console.log( `${err.message}: ${aElement.href}` )
            }
        } else {
            try{
                urls.push( new URL(aElement.href).href )
            } catch (err) {
                console.log( `${err.message}: ${aElement.href}` )
            }       
        }
    }
    return urls
}







module.exports = {
    normalizeURL,
    getURLsFromHTML
}