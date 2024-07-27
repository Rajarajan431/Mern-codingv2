import axios from 'axios';
import mongoose from 'ongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the model
const Product = mongoose.model('Product', {
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  imageUrls: [String],
  sold: Boolean,
  dateOfSale: Date
});

// Fetch data from URL
const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const saveData = () => {
  axios.get(url)
 .then(response => {
    const data = response.data;
    // Create or update MongoDB document
    const product = new Product(data);
    product.save((err, doc) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Product created or updated: ${doc.title}`);
      }
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