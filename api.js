// api.js

const API_URL = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods';

export async function fetchFoods() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener alimentos:', error);
        return []; // Retornar un array vacío si falla
    }
}

export async function createFood(newFood) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFood),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al crear el alimento:', error);
        throw error;
    }
}

export async function updateFood(id, updatedFood) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFood),
        });
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el alimento:', error);
        throw error;
    }
}
