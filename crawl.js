const { JSDOM } = require( 'jsdom' )

async function crawlPage( currentURL ) {
    console.log(`Crawling: ${currentURL}...`)
    try {
        const currentResponse = await fetch(currentURL)
        console.log(...currentResponse.headers)
        if ( currentResponse.status >= 400 ) {
            console.log(`${currentResponse.status} error, cannot fetch`)
            return
        } else if ( ! currentResponse.headers.get('Content-Type').includes('text/html') ) {
            console.log(`content is not HTML. content-type: ${currentResponse.headers.get('Content-Type')}`)
            return 
        }
        console.log(await currentResponse.text())
    } catch (err) {
        console.log(err.message)
    }
}





function getURLsFromHTML(htmlBody, baseURL){
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


function normalizeURL(url){
    let urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === "/" && fullPath.length > 0) {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath 
}






module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}