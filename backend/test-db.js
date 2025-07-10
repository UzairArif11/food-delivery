const mongoose = require('mongoose');
const Category = require('./models/Category');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food-ordering-app')
  .then(async () => {
    console.log('Connected to database');
    
    const categories = await Category.find();
    console.log('Categories found:', categories.length);
    
    categories.forEach(category => {
      console.log({
        id: category._id,
        name: category.name,
        image: category.image,
        description: category.description
      });
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });