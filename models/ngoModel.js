const fs = require('fs');
const path = require('path');

// Path to the CSV file
const filePath = path.join(__dirname, '../data/ngos.csv');

// Function to ensure CSV file exists
const ensureFileExists = (callback) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it and write headers
      fs.writeFile(filePath, 'name,email,password\n', (err) => {
        if (err) {
          console.error('Error creating CSV file:', err);
          return callback(err);
        }
        callback(null);
      });
    } else {
      callback(null);
    }
  });
};

// Function to escape CSV fields
const escapeCsvField = (field) => {
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
};

exports.createNgo = (ngoData, callback) => {
  const { name, email, password } = ngoData;

  // Validate NGO data
  if (!name || !email || !password) {
    return callback(new Error('All fields are required'));
  }

  // Prepare data to be saved (CSV format)
  const escapedName = escapeCsvField(name);
  const escapedEmail = escapeCsvField(email);
  const escapedPassword = escapeCsvField(password);
  const line = `${escapedName},${escapedEmail},${escapedPassword}\n`;

  // Ensure the file exists, then append data
  ensureFileExists((err) => {
    if (err) {
      return callback(err);
    }

    fs.appendFile(filePath, line, (err) => {
      if (err) {
        console.error('Error writing to CSV file:', err);
        return callback(err);
      }
      console.log('NGO data saved successfully.');
      callback(null); // Success
    });
  });
};
