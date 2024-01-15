const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { sortPages } = require('./report.js')

test('Normalize protocol', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path'),
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
}
)

test('Normalize CaPs', () => {
    expect(normalizeURL('https://blog.BoOT.dev/path/')).toBe('blog.boot.dev/path'),
    expect(normalizeURL('https://BLOG.BoOT.dev/path')).toBe('blog.boot.dev/path'),
    expect(normalizeURL('http://blog.BoOT.dev/path/')).toBe('blog.boot.dev/path'),
    expect(normalizeURL('http://blog.BoOT.dev/path')).toBe('blog.boot.dev/path')
}
)

test('Normalize CaPs', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path'),
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
}
)

test('Ensure all links retrieved from HTML', () => {
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev/somepage"><span>Go to Boot.dev</span></a> <a href="https://www.google.com"><span>Go to Boot.dev</span></a><p>wheemios this stuff<a href="https://www.obrasximpuestos.com/">obras por impuestos en colombia</a></p></body></html>',
    'http://localhost')
    ).toEqual(['https://blog.boot.dev/somepage','https://www.google.com/','https://www.obrasximpuestos.com/'])
})

test('Ensure relative links are properly parsed', () => {
    expect(getURLsFromHTML('<html><body><a href="/como-funcionan-las-coas/otracosa/"><span>Go to Boot.dev</span></a> <a href="/unlink.html"><span>otra cosa</span></a></body></html>',
    'http://localhost')
    ).toEqual(['http://localhost/como-funcionan-las-coas/otracosa/','http://localhost/unlink.html'])
})

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})

test('Check Sorting', () => {
  const pages = {
    'page1': 6,
    'page2': 5,
    'page3': 10,
    'page4': 1000
  }
  const actual = sortPages(pages)
  const expected = [{
    'url': 'page4',
    'count': 1000
  }, {
    'url': 'page3',
    'count': 10
  }, {
    'url': 'page1',
    'count': 6
  }, {
    'url': 'page2',
    'count': 5
  }]
  expect(actual).toEqual(expected)
})