// Arquivo: frontend/js/modules/contact.js

import { apiRequest } from './api.js';

/**
 * Manipula a submissão do formulário de Contato (POST /api/contact).
 * @param {Event} event 
 */
export async function handleContact(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[placeholder="Seu Nome"]').value;
    const email = form.querySelector('input[placeholder="Seu Email"]').value;
    const message = form.querySelector('textarea[placeholder="Sua Mensagem"]').value;

    const data = { name, email, message };

    try {
        // importa apiRequest corretamente
        const response = await apiRequest('contact', 'POST', data);

        
        alert(`MENSAGEM ENVIADA COM SUCESSO: ${response.message}`);
        form.reset(); // Limpa o formulário

    } catch (error) {
        alert(`FALHA NO ENVIO: ${error.message}`);
    }
}