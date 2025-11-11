// Arquivo: frontend/js/modules/api.js

// URL local
// const API_BASE_URL = 'http://localhost/bibliovida-project_ver_final/backend/api_simples.php';

const API_BASE_URL = `${window.location.origin}/backend/api_simples.php`;

export async function apiRequest(endpoint, method = 'GET', data = null) {
    // sem substring(1) pq tira a pimeira letra do endpoint
    const url = `${API_BASE_URL}?route=${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    const text = await response.text();
    console.log("RESPOSTA CRUA DO PHP:", text);

    let result;
    try {
        result = JSON.parse(text);
    } catch (err) {
        throw new Error("Resposta não é JSON válido: " + text);
    }

    // const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Erro no servidor.');
    }

    return result;
}
