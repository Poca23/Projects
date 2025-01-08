const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'livre-recettes-personnalisables',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

