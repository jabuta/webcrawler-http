const { JSDOM } = require( 'jsdom' )

async function crawlPage( currentURL, baseURL, pages ) {
    
    if ( new URL(currentURL).hostname !== new URL(baseURL).hostname ) {
        return pages
    }

    normCurrentURL = normalizeURL(currentURL)

    if ( normCurrentURL in pages ) {
        pages[normCurrentURL]++
        return pages
    }

    if ( currentURL === baseURL ) {
        pages[normCurrentURL] = 0
    } else {
        pages[normCurrentURL] = 1
    }

    let htmlBody = ''
    try {
        console.log(`Crawling: ${currentURL}...`)
        const currentResponse = await fetch(currentURL)
        if ( currentResponse.status > 399 ) {
            console.log(`${currentResponse.status} error, cannot fetch`)
            return pages
        } else if ( ! currentResponse.headers.get('Content-Type').includes('text/html') ) {
            console.log(`content is not HTML. content-type: ${currentResponse.headers.get('Content-Type')}`)
            return pages
        }
        htmlBody = await currentResponse.text()
    } catch (err) {
        console.log(err.message)
    }

    const urlsOnPage = getURLsFromHTML( htmlBody, baseURL )
    for (link of urlsOnPage) {
        if ( link.includes('cdn-cgi') ) {
            continue
        }
        pages = await crawlPage(link,baseURL,pages)
    }
    return pages
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