//Script para eliminación de los mensajes de alerta al agregar, editar y eliminar contactos.
document.addEventListener('DOMContentLoaded', () => {
  const alert = document.getElementById('alert-message');
  if (alert) {
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
  }   
});