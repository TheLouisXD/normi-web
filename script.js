// Codigo de javascript para manejar el cambio de pestaña en la pagina :3
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    const contSections = document.querySelectorAll('.content-section');

    // configuracion del indicador de pestaña
    updateIndicator(document.querySelector('.nav-item.active'));

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover la clase active
            navItems.forEach(nav => nav.classList.remove('active'))

            // Agregar la clase active al elemento seleccionado
            this.classList.add('active')

            // actualizar indicador
            updateIndicator(this);

            // obtener el target de la seccion
            const target = this.getAttribute('data-target')

            // Ocultar todas las secciones
            contSections.forEach(section => {
                section.classList.remove('active');
            })

            // Mostrar la seccion correspondiente
            document.getElementById(target).classList.add('active')
        })
    })

    function updateIndicator(activeItem) {
        const itemPos = activeItem.getBoundingClientRect()
        const containerPos = document.getElementById('main-navbar').getBoundingClientRect()

        // Asignamos las medidas del indicador
        navIndicator.style.width = `${itemPos.width + 16}px`;
        navIndicator.style.left = `${itemPos.left - containerPos.left - 47}px`;
    }

    // hacer la barra responsiva
    window.addEventListener('resize', function() {
        updateIndicator(this.document.querySelector('.nav-item.active'));
    })
})

document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.inicio-icons');

    console.log('holaaaaaaaaa');

    icons.forEach(icon => {
        icon.addEventListener('click', function() {
            alert('Hiciste click en un icono.');
            alert('Pero nada a pasado ~(>_<。)＼');
            alert('(O si? (。﹏。))');
        });
    });
})

document.addEventListener('DOMContentLoaded', function() {
    const stream_date = document.querySelector('.stream-date');

    // Función para calcular la diferencia de tiempo
    function calculateTimeDifference(startDate) {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        return `${years} año${years !== 1 ? 's' : ''}, ${months % 12} mes${months % 12 !== 1 ? 'es' : ''}, ${days % 30} día${days % 30 !== 1 ? 's' : ''}`;
    }

    calculateTimeDifference(Date('2024-03-07')); // Fecha de inicio del streaming
    stream_date.textContent = calculateTimeDifference(new Date('2022-03-01'));
})

// --- Mostrar última canción escuchada usando Last.fm ---
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'abf74485c14a6727d9f1454dc1a75a85'; // Reemplaza con tu API key de Last.fm
    const user = 'THELouisXD0u0';   // Reemplaza con tu usuario de Last.fm

    function updateLastSong() {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`)
            .then(response => response.json())
            .then(data => {
                const track = data.recenttracks.track[0];
                if (track) {
                    document.querySelector('.album-image').src = track.image[2]['#text'] || 'images/sdafsdfsd.png';
                    document.querySelector('.song-title').textContent = track.name;
                    document.querySelector('.artist-name').textContent = track.artist['#text'];
                }
            })
            .catch(error => {
                console.error('Error al obtener la canción:', error);
            });
    }

    // Solo actualiza cuando la sección está visible
    document.querySelector('[data-target="reproduciendo"]').addEventListener('click', updateLastSong);

    // Opcional: actualiza al cargar la página
    // updateLastSong();
});