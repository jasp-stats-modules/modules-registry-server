const crypto = require("crypto");

function generateSecretKey() {
  // Generate 32 bytes (256 bits) of random data and convert it to a hexadecimal string
  return crypto.randomBytes(32).toString("hex");
}

// Example usage
const secretKey = generateSecretKey();
console.log(secretKey);
