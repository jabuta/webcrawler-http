function normalizeURL(url){
    let urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === "/" && fullPath.length > 0) {
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath 
}


module.exports = {
    normalizeURL
}