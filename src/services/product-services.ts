import Product from "../models/product";
import { IProduct } from "../models/product";
import createError, { CustomErrorType } from "../utils/custom-error";

class ProductServices {
  async getAllProducts() {
    const products = await Product.find({});

    return products;
  }

  async createNewProduct(product: IProduct): Promise<IProduct> {
    const { name, price, quantity, userId, available, date } = product;

    const newProduct = new Product({
      name,
      price: Number(price) || undefined,
      quantity: Number(quantity) || undefined,
      userId: userId,
      available: available,
      date,
    });
    await newProduct.save();

    return newProduct;
  }

  async getAProduct(
    productId: string
  ): Promise<IProduct | CustomErrorType | null> {
    const product = await Product.findById(productId);

    if (!product) {
      throw createError("Could not find a product with this id", 400);
    }

    return product;
  }

  async editAProduct(productId: string, product: IProduct): Promise<IProduct> {
    const { name, price, quantity, available, userId, date } = product;

    const editedProduct = await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      {
        name,
        price: Number(price) || undefined,
        quantity: Number(quantity) || undefined,
        available: available,
        date,
      },
      { new: true }
    );

    if (!editedProduct) {
      throw createError("You cannot edit this product", 403);
    }

    return editedProduct;
  }

  async deleteAProduct(productId: string, userId: string): Promise<IProduct> {
    const product = await Product.findOneAndDelete({
      _id: productId,
      userId: userId,
    });

    if (!product) {
      throw createError("You cannot delete this product", 403);
    }

    return product;
  }
}

export default new ProductServices();
