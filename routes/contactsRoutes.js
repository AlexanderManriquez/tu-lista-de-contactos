const express = require('express');
const router = express.Router();
const { getAllContacts, addContact, editContact, deleteContact } = require('../controllers/contactsController');
const generateId = require('../utils/generateId');

//Ruta que muestra todos los contactos
router.get('/', (req, res) => {
  const contacts = getAllContacts();
  res.json(contacts);
});

//Ruta para agregar un nuevo contacto
router.post('/', (req, res) => {
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
router.post('/edit/:id', (req, res) => {
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
router.post('/delete/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const deletedContact = deleteContact(contactId);

  if (deletedContact) {
    const message = `Contacto ${deletedContact.name} eliminado exitosamente.`;
    res.render('contactList', { contacts: getAllContacts(), message });
  } else {
    res.render('contactList', { contacts: getAllContacts(), message: 'Contacto no encontrado.' });
  }
})

//Ruta que muestra el formulario para agregar contactos
router.get('/new', (req, res) => {
  res.render('addForm', {
    title: 'Agregar Nuevo Contacto',
    action: '/contacts',
    contact: {},
    buttonText: 'Agregar Contacto'
  })
})

//Ruta que muestra el formulario para editar contactos
router.get('/edit/:id', (req, res) => {
  const contactId = parseInt(req.params.id);
  const contacts = getAllContacts();
  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return res.status(404).render('404', {message: 'Contacto no encontrado.'});
  }

  res.render('editForm', {
    title: 'Editar Contacto',
    action: `/contacts/edit/${contactId}`,
    contact,
    buttonText: 'Guardar Cambios'
  });
});

module.exports = router;