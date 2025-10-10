const fs = require("fs");
const path = require("path");
const { getAllContacts } = require("../controllers/contactsController");

const lastIdPath = path.join(__dirname, '../data/lastId.json');
// Función para generar un Id único y secuencial para cada contacto
function generateId() {
  let lastId = 0;

  if (fs.existsSync(lastIdPath)) {
    const data = fs.readFileSync(lastIdPath, 'utf-8');
    lastId = JSON.parse(data).lastId;
  } else {
    const contacts = getAllContacts();
    if (contacts.length > 0) {
      lastId = Math.max(...contacts.map(c => c.id));
    }  
  }

  const newId = lastId + 1;
  fs.writeFileSync(lastIdPath, JSON.stringify({ lastId: newId }, null, 2));
  return newId;
}

module.exports = generateId;