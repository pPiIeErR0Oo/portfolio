
// 1. Opciones para el observador
const observerOptions = {
    root: null, // Usa el viewport como el contenedor de observación
    rootMargin: '0px',
    // 0.2 significa que la acción se dispara cuando el 20% del elemento es visible
    threshold: 0.2 
};

// --- ANIMACIÓN DE ESCRITURA Y BORRADO (LOOP) ---
const typedNameElement = document.getElementById('typed-name');
const nameToType = "Piero Valdes."; 
let charIndex = 0;
const typingSpeed = 100; // Milisegundos por carácter (velocidad de escritura)
const eraseSpeed = 50;  // Milisegundos por carácter (velocidad de borrado)
const newTextDelay = 2000; // Milisegundos de espera después de escribir antes de borrar

//------------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Botón Volver Arriba
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    // Mostrar botón si bajamos más de 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Al hacer clic, subir suavemente
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
    // Opcional: animar el icono de hamburguesa a una X
});

// Cerrar el menú después de hacer clic en un enlace (en móvil)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('is-open');
        }
    });
});

function typeName() {
    if (charIndex < nameToType.length) {
        // Escribe el siguiente carácter
        typedNameElement.textContent += nameToType.charAt(charIndex);
        charIndex++;
        // Llama a typeName nuevamente después del tiempo de escritura
        setTimeout(typeName, typingSpeed);
    } else {
        // Si el nombre está completo, espera y luego llama a la función de borrado
        setTimeout(eraseName, newTextDelay);
    }
}

function eraseName() {
    if (charIndex > 0) {
        // Borra el último carácter
        typedNameElement.textContent = nameToType.substring(0, charIndex - 1);
        charIndex--;
        // Llama a eraseName nuevamente después del tiempo de borrado
        setTimeout(eraseName, eraseSpeed);
    } else {
        // Si el nombre está completamente borrado, espera y vuelve a empezar a escribir
        setTimeout(typeName, typingSpeed); 
    }
}

// Inicia el bucle de animación cuando el contenido de la página está cargado
document.addEventListener("DOMContentLoaded", function() {
    typeName();
});

// 2. Función que se ejecuta cuando un elemento cruza el umbral
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Si el elemento es visible (isIntersecting es true)
        if (entry.isIntersecting) {
            // Añade la clase 'active' para iniciar la animación CSS
            entry.target.classList.add('active');
            // Deja de observar el elemento, ya que la animación ya se ejecutó
            observer.unobserve(entry.target); 
        }
    });
};

// 3. Crear el observador y seleccionar los elementos
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Selecciona todos los elementos que tienen la clase 'reveal'
const elementsToAnimate = document.querySelectorAll('.reveal');

// Observar cada elemento
elementsToAnimate.forEach(element => {
    observer.observe(element);
});