import fetch from 'node-fetch';
import Product from '../models/products.model.js';

// Fetch data from URL
const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const saveData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const products = await response.json();

    for (const productData of products) {
      // Debug: Log product data before processing
      console.log('Original product data:', productData);

      // Map image field to imageUrls field
      productData.imageUrls = productData.image ? [productData.image] : [];
      delete productData.image;

      // Debug: Log product data after mapping imageUrls
      console.log('Processed product data:', productData);

      // Check if product already exists in DB
      const existingProduct = await Product.findOne({ id: productData.id });
      if (existingProduct) {
        // Update existing product
        existingProduct.title = productData.title;
        existingProduct.price = productData.price;
        existingProduct.description = productData.description;
        existingProduct.category = productData.category;
        existingProduct.imageUrls = productData.imageUrls;
        existingProduct.sold = productData.sold;
        existingProduct.dateOfSale = productData.dateOfSale;
        await existingProduct.save();
        console.log(`Product ${existingProduct.title} updated`);
      } else {
        // Create new product
        const product = new Product(productData);
        await product.save();
        console.log(`Product ${product.title} created`);
      }
    }
  } catch (error) {
    console.error(error);
  }

  // Run only once
  setTimeout(() => {
    process.exit(0);
  }, 5000);
}

export default saveData;
