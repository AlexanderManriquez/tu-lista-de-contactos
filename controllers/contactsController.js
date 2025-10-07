const fs = require('fs');
const path = require('path');
const contactsFilePath = path.join(__dirname, '../data/contacts.json');

function getAllContacts() {
  const data = fs.readFileSync(contactsFilePath, 'utf-8');
  return JSON.parse(data);
}

function saveContacts(contacts) {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
}

function addContact(contact) {
  const contacts = getAllContacts();
  contacts.push(contact);
  saveContacts(contacts);
  return contact;
}

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

module.exports = {
  getAllContacts,
  addContact,
  editContact,
  deleteContact
};