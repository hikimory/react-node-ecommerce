const {Router} = require('express')
const Product = require('../models/Product')
const { isAdmin, isAuth } = require('../util')
const router = Router()

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ?
    (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
    :
    { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
    res.send(products);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    const {name, price, image,
        brand, category,countInStock,
        description, rating, numReviews} = req.body
    const product = new Product({
      name, price, image,
      brand, category, countInStock,
      description, rating, numReviews,
    });

    const newProduct = await product.save();
    if (newProduct) {
      return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
})

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const {name, price, image,
    brand, category,countInStock,
    description} = req.body
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });

});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});


module.exports = router