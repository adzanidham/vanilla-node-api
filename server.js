const http = require('http')
const { getProducts } = require('./controller/products-controller')

const server = http.createServer((req, res) => {
  // set url route
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
