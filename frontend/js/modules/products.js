// Arquivo: frontend/js/modules/products.js

import { apiRequest } from './api.js';

/**
 * Busca a lista de livros na API e os renderiza na galeria da página livros.html.
 */
export async function fetchAndRenderBooks() {
    // Tenta encontrar a div da galeria (só existe em livros.html)
    const galeria = document.querySelector('.galeria');
    if (!galeria) return; 

    try {
        const response = await apiRequest('/products', 'GET');
        const livros = response.data; // Lista de livros

        // Limpa o conteúdo existente do HTML (os hardcodes)
        galeria.innerHTML = ''; 

        livros.forEach(livro => {
            const item = document.createElement('div');
            item.className = 'galeria-item';
            
            // Cria a URL de destino: uma página de detalhes que você criaria (ex: detail.html)
            const detalheUrl = `detalhe.html?id=${livro.id}`; 
            
            // IMPORTANTE: O caminho da imagem agora é dinâmico, baseado na sua estrutura 'img_livros/'
            // Ajustamos o '../img_livros/' para ser o caminho real no seu frontend.
            const imageUrl = `../img_livros/${livro.cover_url.split('/').pop()}`; 

            item.innerHTML = `
                <a href="${detalheUrl}">
                    <img src="${imageUrl}" alt="Capa do livro ${livro.title}">
                </a>
                <p class="preco">${livro.title}</p>
                <p class="preco" style="font-size:16px;">R$ ${livro.price.toFixed(2).replace('.', ',')}</p>
            `;
            galeria.appendChild(item);
        });

    } catch (error) {
        galeria.innerHTML = `<p style="color:red; text-align:center; padding: 50px;">
                                Erro ao carregar o catálogo: ${error.message}. 
                                Verifique se o servidor XAMPP (Apache) está ativo.
                            </p>`;
    }
}
