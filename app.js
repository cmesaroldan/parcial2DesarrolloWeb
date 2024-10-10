//Importacion de modulos
import { FoodAPI } from './api.js';
import { DOMManager } from './dom.js';

//URL de la API asignada
const api = new FoodAPI('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods');
const domManager = new DOMManager();

document.getElementById('fetch-food').addEventListener('click', async () => {
    try {
        const foods = await api.fetchFoods();
        if (foods && foods.length > 0) {
            domManager.displayFoods(foods);
        } else {
            throw new Error('No se recibieron datos de la API.');
        }
    } catch (error) {
        console.warn(error.message);
        domManager.showMessage('Error al obtener datos de la API.', false);
    }
});

domManager.formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newFood = {
        name: domManager.nameInput.value,
        description: domManager.descriptionInput.value,
        ingredients: domManager.ingredientsInput.value.split(',').map(item => item.trim()),
        image: domManager.imageInput.value,
    };

    try {
        await api.createFood(newFood);
        domManager.showMessage('Alimento creado exitosamente.', true);
        domManager.clearForm();
    } catch (error) {
        domManager.showMessage('Error al crear el alimento.', false);
    }
});
