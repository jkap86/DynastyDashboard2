const workerpool = require('workerpool')
const axios = require('axios')
const cheerio = require('cheerio')

const get_proj = async () => {
    let elements = []
    const page = await axios.get('https://keeptradecut.com/dynasty-rankings')
    let $ = cheerio.load(page.data)
    $('.onePlayer').each((index, element) => {
        let name = $(element).find('.player-name a').text().replace(' III', '')
        let searchName = name.replace(/[^0-9a-z]/gi, '').toLowerCase()
        elements.push({
            name: name,
            searchName: searchName,
            value: $(element).find('.value p').text(),
            team: $(element).find('.player-name span.player-team').text(),
            position: $(element).find('div.position-team p.position').text().slice(0, 2)
        })
    })
    return elements
}

workerpool.worker({
    get_proj, get_proj
})