const brain = require('brain.js');
const fs = require('fs');
const data = require('./data.json');

// const networkPath = 'PricePredictor.network.json';

const network = new brain.recurrent.LSTMTimeStep();
// Map data
const trainingData = data.map((item) => ({
  input: {
    total_sqft: item.total_sqft,
    bath: item.bath,
    balcony: item.balcony,
  },
  output: {
    price: item.price,
  },
}));
console.log(trainingData);

// let networkData = null;
// if (fs.existsSync(networkPath)) {
//   networkData = JSON.parse(fs.readFileSync(networkPath));
//   network.fromJSON(networkData);
// } else {
//   network.train(trainingData, {
//     iterations: 2,
//   });
//   fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), null, 2));
// }

network.train(trainingData, {
  iterations: 1,
});

const input = { total_sqft: 1056, bath: 2, balcony: 3 };
const normalizedValue = network.run(input);
console.log(normalizedValue);
