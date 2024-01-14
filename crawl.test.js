const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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