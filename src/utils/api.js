// src/utils/api.js
const API_URL = 'http://localhost:3000/produtos';

/**
 * Busca todos os produtos do backend
 * @returns {Promise<Array>} Lista de produtos
 */
export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error('getProducts:', error);
    return [];
  }
}

/**
 * Adiciona um produto no backend
 * @param {Object} product Produto a ser criado
 * @returns {Promise<Object>} Produto criado com ID
 */
export async function addProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Erro ao adicionar produto');
    return await response.json();
  } catch (error) {
    console.error('addProduct:', error);
    throw error;
  }
}

/**
 * Atualiza um produto existente no backend
 * @param {number|string} id ID do produto a atualizar
 * @param {Object} product Dados atualizados do produto
 * @returns {Promise<Object>} Produto atualizado
 */
export async function updateProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return await response.json();
  } catch (error) {
    console.error('updateProduct:', error);
    throw error;
  }
}

/**
 * Remove um produto do backend
 * @param {number|string} id ID do produto a excluir
 * @returns {Promise<Object>} Mensagem de sucesso
 */
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar produto');
    return await response.json();
  } catch (error) {
    console.error('deleteProduct:', error);
    throw error;
  }
}