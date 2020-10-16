// CONTROLLER UNTUK MENGONTROL ROUTE

const Product = require('../model/products-model')
const { getPostData } = require('../utils')

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
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      title,
      description,
      price
    }

    const newProduct = await Product.create(product)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

//  Update product
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product not found' }))
    } else {
      const body = await getPostData(req)

      const { title, description, price } = JSON.parse(body)

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price
      }

      const updProduct = await Product.update(id, productData)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct
}
