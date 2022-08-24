const db = require('../config/connection');
const { Restaurant,User, Dish, Heart, Photo, Comment} = require('../models');

const userData = require('./user.json');

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Restaurant.deleteMany({});
  await Dish.deleteMany({});
  await Heart.deleteMany({});
  await Photo.deleteMany({});
  await Comment.deleteMany({});


  
  console.log('all done!');
  process.exit(0);
});
