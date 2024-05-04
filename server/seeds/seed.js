const db = require('../config/connection');
const { Pet, User } = require('../models');
const birdSeeds = require('./birdData.json');
const catSeeds = require('./catData.json');
const dogSeeds = require('./dogData.json');
const hamsterSeeds = require('./hamsterData.json');
const rabbitSeeds = require('./rabbitData.json');
const userSeeds = require('./userData.json');

const cleanDB = require('./cleanDB');

db.once('open', async () => {
  //implement try catch
  try{
    await cleanDB('Pet', 'pets');
    await cleanDB('User', 'users');
  
    await Pet.create(birdSeeds);
    await Pet.create(catSeeds);
    await Pet.create(dogSeeds);
    await Pet.create(hamsterSeeds);
    await Pet.create(rabbitSeeds);
    await User.create(userSeeds);
  
    console.log('Seeding finished successfully!');
    process.exit(0);
  }catch (err){
    console.error(`%c${err}, "color: red; font-size: 20px;"`);
    console.log("Seeding failed!");
  }

});
