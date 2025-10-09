document.addEventListener('DOMContentLoaded', () => {
  const deleteForms = document.querySelectorAll('form[action^="/contacts/delete/"]');

  deleteForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      const confirmed = confirm('¿Estás seguro de que deseas eliminar este contacto?');
      if (!confirmed) {
        event.preventDefault();
      }
    });
  });
});