const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');


const generatePlants = (count = 100) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name() + ' Solar Plant',
    location: `${faker.location.city()}, ${faker.location.country()}`,
    capacityKw: faker.number.int({ min: 100, max: 5000 }),
    status: faker.helpers.arrayElement(['active', 'maintenance', 'offline']),
  }));
};

const generateAlerts = (plants, count = 100) => {
  return Array.from({ length: count }, () => {
    const plant = faker.helpers.arrayElement(plants);
    return {
      id: faker.string.uuid(),
      plantId: plant.id,
      type: faker.helpers.arrayElement(['warning', 'error', 'info']),
      message: faker.lorem.sentence(),
      timestamp: faker.date.recent({ days: 7 }).toISOString(),
    };
  });
};

const plants = generatePlants();
const alerts = generateAlerts(plants);

// Crear carpeta si no existe
const dbPath = path.join(__dirname, 'db');
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
}

// Guardar archivos
fs.writeFileSync(path.join(dbPath, 'plants.json'), JSON.stringify(plants, null, 2));
fs.writeFileSync(path.join(dbPath, 'alerts.json'), JSON.stringify(alerts, null, 2));

console.log('✔ Datos generados correctamente en /db');
