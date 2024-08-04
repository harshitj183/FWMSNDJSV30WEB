// models/donorModel.js
const fs = require('fs');
const path = require('path');

const donorsFilePath = path.join(__dirname, '../data/donors.csv');

exports.createDonor = (donor, callback) => {
  const donorData = `${donor.name},${donor.email},${donor.password}\n`;

  fs.appendFile(donorsFilePath, donorData, 'utf8', (err) => {
    if (err) return callback(err);
    callback(null);
  });
};
