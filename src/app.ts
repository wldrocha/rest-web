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
    return
  }
  if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' })
  }
  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
  res.end(responseContent)
})

server.listen(8080, () => {
  console.log('Server is running on port 8080')
})
