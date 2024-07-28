import fetch from 'node-fetch';
import Product from '../models/products.model.js';

const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const saveData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const products = await response.json();

    for (const productData of products) {
      
      console.log('Original product data:', productData);

      productData.imageUrls = productData.image ? [productData.image] : [];
      delete productData.image;
     
      console.log('Processed product data:', productData);

      const existingProduct = await Product.findOne({ id: productData.id });
      if (existingProduct) {
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
     
        const product = new Product(productData);
        await product.save();
        console.log(`Product ${product.title} created`);
      }
    }
  } catch (error) {
    console.error(error);
  }

  setTimeout(() => {
    process.exit(0);
  }, 5000);
}

export default saveData;
