// Arquivo: frontend/js/modules/auth.js

import { apiRequest } from './api.js';

/**
 * Manipula a submissão do formulário de Cadastro (POST /api/register).
 * @param {Event} event 
 */
export async function handleRegister(event) {
    event.preventDefault();

    const form = event.target;
    
    // Obter dados dos inputs (Nota: dependendo de como você nomeou os inputs, os seletores podem precisar de ajuste)
    // O seu HTML 'cadastro.html' usa placeholders, então faremos a seleção por eles:
    const email = form.querySelector('input[placeholder=" Email"]').value;
    const password = form.querySelector('input[placeholder=" Senha"]').value;
    const confirmPassword = form.querySelector('input[placeholder=" Confirmar senha"]').value;
    const dataNascimento = form.querySelector('input[type="date"]').value; 
    
    const data = {
        email: email,
        password: password,
        password_confirmation: confirmPassword, // Necessário para a regra 'confirmed' no backend
        data_nascimento: dataNascimento
    };
    
    // Checagem básica do lado do cliente
    if (password !== confirmPassword) {
        alert('Erro de validação: As senhas digitadas não coincidem!');
        return;
    }

   try {
    const response = await apiRequest('register', 'POST', data);

    if (!response.success) {
        throw new Error(response.message);
    }

    alert(`SUCESSO NO CADASTRO: ${response.message}`);
    window.location.href = 'login.html';
    } catch (error) {
        alert(`FALHA NO CADASTRO: ${error.message}`);
    }

}


/**
 * Manipula a submissão do formulário de Login (POST /api/login).
 * @param {Event} event 
 */
export async function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    // Seleção usando os tipos de input no login.html
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    const data = { email, password };
    
    try {
        const response = await apiRequest('login', 'POST', data);
        
        alert(`LOGIN BEM-SUCEDIDO: ${response.message}`);
        // Armazena o token de acesso no navegador para futuras requisições
        localStorage.setItem('userToken', response.access_token);
        
        // Redireciona para a home page
        window.location.href = '../../index.html'; 

    } catch (error) {
        alert(`FALHA NO LOGIN: ${error.message}`);
    }
}