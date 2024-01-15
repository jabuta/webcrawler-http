function printReport ( pages ) {
    sortedPages = sortPages( pages )
    sortedPages.forEach(element => {
        console.log(`${element.count} occurences of ${element.url}`)
    });
}

function sortPages ( pages ) {
    let pagesArray = Object.keys(pages).map(url => {
        return { 
          url: url, 
          count: pages[url]
        };
    });
    
    let sortedPagesArray = pagesArray.sort((a,b) => b.count - a.count);
    return sortedPagesArray      
}

module.exports = {
    printReport,
    sortPages
}