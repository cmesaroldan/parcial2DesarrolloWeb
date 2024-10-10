//Con el objetivo de relacionar variables de mi JS con mi html

export class DOMManager {
    constructor() {
        this.foodList = document.getElementById('food-list');
        this.formElement = document.getElementById('food-form');
        this.nameInput = document.getElementById('name');
        this.descriptionInput = document.getElementById('description');
        this.ingredientsInput = document.getElementById('ingredients');
        this.imageInput = document.getElementById('image');
        this.messageElement = document.getElementById('message');
    }

    displayFoods(foods) {
        this.foodList.innerHTML = ''; // Limpiar la lista actual
        foods.forEach(food => {
            const foodElement = document.createElement('div');
            foodElement.className = 'food-item';
            foodElement.innerHTML = `
                <h3>${food.name}</h3>
                <img src="${food.image}" alt="${food.name}">
                <p>${food.description}</p>
                <p><strong>Ingredientes:</strong> ${food.ingredients.join(', ')}</p>
            `;
            this.foodList.appendChild(foodElement);
        });
    }

    clearForm() {
        this.nameInput.value = '';
        this.descriptionInput.value = '';
        this.ingredientsInput.value = '';
        this.imageInput.value = '';
    }

    showMessage(message, isSuccess) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.className = isSuccess ? 'success' : 'error';
        this.messageElement.innerHTML = ''; // Limpiar mensajes anteriores
        this.messageElement.appendChild(messageElement);
    }
}
