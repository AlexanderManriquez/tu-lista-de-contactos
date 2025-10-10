document.addEventListener('DOMContentLoaded', () => {
  const deleteForms = document.querySelectorAll('form[action^="/contacts/delete/"]');

  deleteForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c94c4c',
        cancelButtonColor: '#64647c',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#2c344c',
        color: '#f9f9f9'
      }).then((result) => {
        if (result.isConfirmed) {
          form.submit();
        }
      });
    });
  });
});