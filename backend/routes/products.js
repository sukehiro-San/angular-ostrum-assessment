const express = require("express");
const router = express.Router();
let products = require("../data/products");
const { randomUUID } = require("crypto");

// GET all
router.get("/", (req, res) => res.json(products));

// ADD new
router.post("/", (req, res) => {
  const newProduct = { ...req.body, id: randomUUID() };
  products.push(newProduct);
  res.json(newProduct);
});

// UPDATE
router.put("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).send("Not found");
  products[index] = { ...req.body, id: products[index].id };
  res.json(products[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  products = products.filter((p) => p.id != req.params.id);
  res.json({ success: true });
});

module.exports = router;
