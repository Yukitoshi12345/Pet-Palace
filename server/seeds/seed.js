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
    const petSeeds = [...birdSeeds, ...catSeeds, ...dogSeeds, ...hamsterSeeds, ...rabbitSeeds].sort((a, b) => a.name.localeCompare(b.name));
    await Pet.create(petSeeds);
    await User.create(userSeeds);
  
    console.log('Seeding finished successfully!');
    process.exit(0);
  }catch (err){
    console.error(`%c${err}, "color: red; font-size: 20px;"`);
    console.log("Seeding failed!");
  }

});
