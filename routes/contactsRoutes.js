const express = require('express');
const router = express.Router();
const { getAllContacts, addContact, editContact, deleteContact } = require('../controllers/contactsController');
const generateId = require('../utils/generateId');

//Ruta que muestra todos los contactos
router.get('/contacts', (req, res) => {
  const contacts = getAllContacts();
  res.json(contacts);
});

//Ruta para agregar un nuevo contacto
router.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    const message = 'Todos los campos son obligatorios.';
    return res.render('contactList', { contacts: getAllContacts(), message });
  }
  
  const newContact = {
    id: generateId(),
    name,
    phone,
    email
  }

  const addedContact = addContact(newContact);
  const message = `Contacto ${addedContact.name} agregado exitosamente.`;
  res.render('contactList', { contacts: getAllContacts(), message });
});

//Ruta para editar un contacto existente
router.post('/contacts/edit/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const updatedContact = editContact(contactId, req.body);

  if (updatedContact) {
    const message = `Contacto ${updatedContact.name} editado exitosamente.`;
    res.render('contactList', { contacts: getAllContacts(), message });
  } else {
    res.render('contactList', { contacts: getAllContacts(), message: 'Contacto no encontrado.' });
  }
});

//Ruta para eliminar un contacto
router.post('/contacts/delete/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const deletedContact = deleteContact(contactId);

  if (deletedContact) {
    const message = `Contacto ${deletedContact.name} eliminado exitosamente.`;
    res.render('contactList', { contacts: getAllContacts(), message });
  } else {
    res.render('contactList', { contacts: getAllContacts(), message: 'Contacto no encontrado.' });
  }
})

module.exports = router;