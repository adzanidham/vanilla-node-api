// CONTROLLER UNTUK MENGONTROL ROUTE

const Product = require('../model/products-model')

//  Get all products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

//  Get selected product
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

//  Create product
async function createProduct(req, res) {
  try {
    const product = {
      title: 'Test Second Product',
      description: 'This is my second product',
      price: 105
    }
    const newProduct = await Product.create(product)

    res.writeHead(201, { 'Content-type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct
}
