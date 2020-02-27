const marked = require ('marked')
var fs = require ('fs')

var readStream = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/README.md','utf-8')
var markdown = marked (readStream)
fs.writeFileSync('energy_group012/cli.html', markdown)