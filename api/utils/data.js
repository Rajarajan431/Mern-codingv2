import axios from 'axios';
import Product from '../models/products.model.js';

// Fetch data from URL
const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const saveData = () => {
  axios.get(url)
    .then(response => {
      const data = response.data;
      // Map image field to imageUrls field
      data.imageUrls = [data.image];
      delete data.image;

      // Check if product already exists in DB
      Product.findOne({ id: data.id })
        .then(existingProduct => {
          if (existingProduct) {
            // Update existing product
            existingProduct.title = data.title;
            existingProduct.price = data.price;
            existingProduct.description = data.description;
            existingProduct.category = data.category;
            existingProduct.imageUrls = data.imageUrls;
            existingProduct.sold = data.sold;
            existingProduct.dateOfSale = data.dateOfSale;
            return existingProduct.save();
          } else {
            // Create new product
            const product = new Product(data);
            return product.save();
          }
        })
        .then(doc => {
          console.log(`Product ${doc.title} updated or created`);
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(error => {
      console.error(error);
    });

  // Run only once
  setTimeout(() => {
    process.exit(0);
  }, 5000);
}

export default saveData;