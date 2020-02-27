const marked = require ('marked')
var fs = require ('fs')

var readStream = fs.readFileSync('README.md','utf-8')
var markdown = marked (readStream)
fs.writeFileSync('index.html', markdown)