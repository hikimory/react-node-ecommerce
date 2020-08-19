const {Router} = require('express')
const Product = require('../models/Product')
const { isAdmin, isAuth } = require('../util')
const router = Router()

router.get("/", async (req, res) => {
    const products = await Product.find({});
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