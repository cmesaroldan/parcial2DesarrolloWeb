// app.js

import { fetchFoods, createFood, updateFood } from './api.js';

// Obtener referencias a los elementos del DOM
const foodList = document.getElementById('food-list');
const nameInput = document.getElementById('food-name');
const descriptionInput = document.getElementById('food-description');
const imageInput = document.getElementById('food-image');
const addButton = document.getElementById('add-food');
const feedback = document.getElementById('feedback');
let currentFoodId = null;

// Cargar la lista inicial de alimentos
async function loadFoods() {
    try {
        const foods = await fetchFoods();
        foodList.innerHTML = ''; // Limpiar lista
        foods.forEach(food => createFoodElement(food));
    } catch (error) {
        console.error('Error al cargar alimentos:', error);
    }
}

// Crear elementos de alimentos dinámicamente
function createFoodElement(food) {
    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
    foodItem.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
    `;

    // Al hacer clic en un elemento de la lista, se llena el formulario para editarlo
    foodItem.addEventListener('click', () => fillFormForEditing(food));

    foodList.appendChild(foodItem);
}

// Rellenar el formulario con los datos del elemento seleccionado para editar
function fillFormForEditing(food) {
    currentFoodId = food.id; // Guardar el ID del alimento actual
    nameInput.value = food.name;
    descriptionInput.value = food.description;
    imageInput.value = food.image;

    feedback.textContent = 'Editando el alimento seleccionado...';
    addButton.textContent = 'Guardar Cambios'; // Cambiar el texto del botón
}

// Manejar la creación o actualización del alimento
addButton.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const image = imageInput.value.trim();

    if (!name || !description || !image) {
        feedback.textContent = 'Por favor, complete todos los campos.';
        feedback.classList.add('error');
        return;
    }

    // Si hay un ID almacenado, estamos actualizando el alimento
    if (currentFoodId !== null) {
        try {
            await updateFood(currentFoodId, { name, description, image });
            feedback.textContent = 'Alimento actualizado correctamente.';
            feedback.classList.remove('error');
            feedback.classList.add('success');
            currentFoodId = null; // Restablecer ID
            addButton.textContent = 'Agregar Alimento'; // Restaurar el botón
        } catch (error) {
            feedback.textContent = 'Error al actualizar el alimento.';
            feedback.classList.add('error');
        }
    } else {
        // Si no hay un ID, crear un nuevo alimento
        try {
            await createFood({ name, description, image });
            feedback.textContent = 'Nuevo alimento agregado correctamente.';
            feedback.classList.remove('error');
            feedback.classList.add('success');
        } catch (error) {
            feedback.textContent = 'Error al agregar el alimento.';
            feedback.classList.add('error');
        }
    }

    // Limpiar el formulario y recargar lista de alimentos
    clearForm();
    await loadFoods();
});

// Limpiar formulario
function clearForm() {
    nameInput.value = '';
    descriptionInput.value = '';
    imageInput.value = '';
    feedback.textContent = '';
}

// Cargar alimentos al iniciar la aplicación
loadFoods();
