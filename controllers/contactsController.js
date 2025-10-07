const fs = require('fs');
const path = require('path');
const contactsFilePath = path.join(__dirname, '../data/contacts.json');
// Mostrar todos los contactos
function getAllContacts() {
  const data = fs.readFileSync(contactsFilePath, 'utf-8');
  return JSON.parse(data);
}
//Función auxiliar para guardar contactos (sobreescribir el archivo)
function saveContacts(contacts) {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
}
// Agregar un nuevo contacto
function addContact(contact) {
  const contacts = getAllContacts();
  contacts.push(contact);
  saveContacts(contacts);
  return contact;
}
// Editar un contacto existente
function editContact(id, updatedContact) {
  const contacts = getAllContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedContact };  
    saveContacts(contacts);
    return contacts[index];   
  }

  return null;
}
// Eliminar un contacto
function deleteContact(id) {
  const contacts = getAllContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1);
    saveContacts(contacts);
    return deletedContact[0];
  }

  return null;
}
//Exportamos las funciones para poder utilizarlas en otros archivos
module.exports = {
  getAllContacts,
  addContact,
  editContact,
  deleteContact
};