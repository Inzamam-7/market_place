import express from 'express'
import upload from '../middleware/mutler.js'
import Protect from '../middleware/authMiddleware.js'
import { addProduct, deleteProduct, editProduct, getAllProducts, toggleFavorite } from '../controller/productController.js'

const router = express.Router()

router.post("/add-product",upload.single("image"),addProduct)
router.get("/get-products",getAllProducts)
router.patch("/edit-product/:id",upload.single("image"),editProduct)
router.delete("/delete-product/:id",deleteProduct)
router.post("/products/:id/favorite", Protect, toggleFavorite);
export default router