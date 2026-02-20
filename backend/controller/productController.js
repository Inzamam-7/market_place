import ApiError from "../helper/ApiError.js";
import successResponse from "../helper/successReponse.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/productModel.js";
import { User } from "../models/userModels.js";
import fs from 'fs'


export const addProduct = async(req,res) =>{
    try{
        const {title,price,description} = req.body
        console.log(req.body);
        

        if(!title || !price || !description){
            throw new ApiError(400, "All fields are required 403")
        }

        if(!req.file){
            throw new ApiError(400,"Please upload image")
        }

        console.log(req.file);
        

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"micro-marketplace"
        })

        fs.unlinkSync(req.file.path);

        const product = await Product.create({
            title,
            description,
            price,
            image:result.secure_url
        })

        return successResponse(res,200,product,"Product added successfully")

    }catch(error){
          return res.status(error.statusCode || 500).json({
            success:false,
            message:error.message
          })
    }
}

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;

    if (req.file) {
      const publicId = product.image.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(`micro-marketplace/${publicId}`);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "micro-marketplace",
      });

      console.log("yeh result h",result)
      

      fs.unlinkSync(req.file.path);

      product.image = result.secure_url;
    }
    await product.save();

    return successResponse(res, 200, product, "Product updated successfully");
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Delete image from Cloudinary if exists
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`micro-marketplace/${publicId}`);
    }

    await Product.findByIdAndDelete(id);

    return successResponse(res, 200, {}, "Product deleted successfully");
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Search
    const searchQuery = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};

    const total = await Product.countDocuments(searchQuery);

    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return successResponse(res, 200, {
      products,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    }, "Products fetched successfully");

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    const user = await User.findById(userId);
    const index = user.favorites ? user.favorites.indexOf(productId) : -1;

    if (index === -1) {
      user.favorites = user.favorites ? [...user.favorites, productId] : [productId];
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();
    return successResponse(res, 200, { favorites: user.favorites }, "Favorite toggled successfully");
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
