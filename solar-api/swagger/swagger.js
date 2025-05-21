const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerPath = path.join(__dirname, '..', 'openapi', 'openapi.yaml');
const swaggerDocument = YAML.load(swaggerPath);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocument),
};
