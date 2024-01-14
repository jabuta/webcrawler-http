const { crawlPage } = require('./crawl.js')

async function main(){
    if (process.argv.length < 3){
      console.log('no website provided')
    } else if (process.argv.length > 3){
      console.log('too many arguments provided')
    } else {  
        const baseURL = process.argv[2]    
        console.log(`starting crawl on: ${baseURL}...`)
        await crawlPage(baseURL)
    }
}

main()
