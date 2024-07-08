import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    console.log(req.url)

  //   res.writeHead(200, { 'Content-Type': 'text/html' })
  //   res.write('<h1>Hello World</h1>')
  //   res.end()
  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlFile)
    res.end()
  } else if (req.url === '/css/styles.css') {
    const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/css' })
    res.end(cssFile)
  } else if( req.url === '/js/app.js'){
    const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/javascript' })
    res.end(jsFile)
  }else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(8080, () => {
  console.log('Server is running on port 8080')
})
