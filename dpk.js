const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = '0';
const MAX_PARTITION_KEY_LENGTH = 256;

const generateHash = (data) => { 
  return crypto
		.createHash('sha3-512')
		.update(data)
		.digest('hex');
}
exports.extractPartitionKey = (tableData) => {
  let partitionKey;

  if (tableData) {
    partitionKey = tableData.partitionKey ? tableData.partitionKey : generateHash(JSON.stringify(tableData));
  }

  if (partitionKey) {
    if (typeof partitionKey !== "string") {
      partitionKey = JSON.stringify(partitionKey);
    }
  } else {
    partitionKey = TRIVIAL_PARTITION_KEY;
  }

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? generateHash(partitionKey) : partitionKey;
};