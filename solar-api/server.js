const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;
const swaggerDocument = YAML.load('./openapi/openapi.yaml');

app.use(cors());
app.use(express.json());
app.use('/api/plants', require('./routes/plants'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, '0.0.0.0', () => {
  console.log(`API running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs`);
});