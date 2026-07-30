document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario-contacto');
    const badgeCount = document.getElementById('badgeCount');
    const notificacionIcono = document.getElementById('notificacionIcono');
    const modal = document.getElementById('modalContactos');
    const cerrarModal = document.getElementById('cerrarModal');
    const listaContactos = document.getElementById('listaContactos');
    
    function actualizarBadge() {
        const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        badgeCount.textContent = contactos.length;
    }
    
    function eliminarContacto(id) {
        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos = contactos.filter(c => c.id !== id);
        localStorage.setItem('contactos', JSON.stringify(contactos));
        actualizarBadge();
        mostrarContactos();
    }
    
    function mostrarContactos() {
        const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        listaContactos.innerHTML = '';
        
        if (contactos.length === 0) {
            listaContactos.innerHTML = '<p class="sin-contactos">No hay mensajes guardados</p>';
            return;
        }
        
        contactos.forEach(contacto => {
            const item = document.createElement('div');
            item.className = 'contacto-item';
            item.innerHTML = `
                <div class="contacto-header">
                    <h4>${contacto.nombre}</h4>
                    <button class="btn-eliminar" data-id="${contacto.id}">&times;</button>
                </div>
                <p><strong>Email:</strong> ${contacto.email}</p>
                <p class="fecha"><strong>Fecha:</strong> ${contacto.fecha}</p>
                <div class="mensaje">${contacto.mensaje}</div>
            `;
            listaContactos.appendChild(item);
        });
        
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarContacto(id);
            });
        });
    }
    
    actualizarBadge();
    
    notificacionIcono.addEventListener('click', function() {
        mostrarContactos();
        modal.classList.add('active');
    });
    
    cerrarModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (nombre === '' || email === '' || mensaje === '') {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo válido');
            return;
        }
        
        const contacto = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            fecha: new Date().toLocaleString()
        };
        
        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos.push(contacto);
        localStorage.setItem('contactos', JSON.stringify(contactos));
        
        actualizarBadge();
        
        alert('¡Mensaje guardado correctamente! Gracias por contactarme.');
        form.reset();
    });
});