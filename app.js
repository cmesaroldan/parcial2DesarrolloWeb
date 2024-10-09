// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = 'https://bbd7-2800-e2-2780-2479-2417-fe6c-d24e-ecb3.ngrok-free.app/foods'; // URL de la API

    // Función para obtener datos de la API
    async function fetchFoodData() {
        try {
            console.log('Realizando petición a la API...');

            // Realizar la solicitud a la API
            const response = await fetch(baseURL);
            console.log('Respuesta de la API:', response);

            // Verificar que la respuesta sea correcta
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
            }

            // Obtener los datos en formato JSON
            const data = await response.json();
            console.log('Datos recibidos de la API:', data);
        } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    }

    // Llamar a la función para obtener los datos
    fetchFoodData();
});
