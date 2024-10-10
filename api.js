export class FoodAPI {
    
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchFoods() {
        const response = await fetch(this.baseURL);
        if (!response.ok) {
            throw new Error('Error al obtener los alimentos');
        }
        return await response.json();
    }

    async createFood(food) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });
        if (!response.ok) {
            throw new Error('Error al crear el alimento');
        }
        return await response.json();
    }
}
