const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct } = require('./controller/products-controller')

const server = http.createServer((req, res) => {
  // set url route
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  }
  // select product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  }
  // input product
  else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)
  }
  // update product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
