// Arquivo: frontend/js/app.js (Com correção)

// ... imports ...
import { handleContact } from './modules/contact.js';
import { handleRegister } from './modules/auth.js';
import { handleLogin } from './modules/auth.js';


document.addEventListener('DOMContentLoaded', () => {
    
    // === CONEXÃO DE FORMULÁRIOS ===
    
    // 1. Formulário de Cadastro (no cadastro.html)
    // Seletor ajustado para capturar o formulário de cadastro:
    const registerForm = document.querySelector('.content .second-column .form'); 
    if (registerForm && window.location.pathname.includes('cadastro.html')) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // 2. Formulário de Login (no login.html)
    const loginForm = document.querySelector('.first-content .second-column .form');
    // Adicionamos a verificação para que a lógica não se confunda com o formulário de cadastro:
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // 3. Formulário de Contato (no contato.html)
    const contactForm = document.querySelector('.container-contato form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
        //console.log("handleContact conectado");
    }

    // === CARREGAMENTO DE DADOS ===
    
    // 4. Carrega os livros se estiver na página 'livros.html'
    //fetchAndRenderBooks();
});
