const { getAllContacts } = require("../controllers/contactsController");

function generateId() {
  const contacts = getAllContacts();
  if (contacts.length === 0) return 1;

  const ids = contacts.map(contact => contact.id);
  return Math.max(...ids) + 1;
}

module.exports = generateId;