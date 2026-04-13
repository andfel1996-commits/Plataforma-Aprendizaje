// Usamos 'async' para indicar que la función manejará procesos asíncronos
async function getWeatherFetch() {
    const city = document.getElementById("city").value;
    const apiKey = "bf639f4b252906586a25063452c5f540";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = "Cargando..."; // Feedback para el usuario

    try {
        // 'await' pausa la ejecución hasta que la petición responda
        const response = await fetch(url);

        // Cambia el chequeo de la respuesta por esto:
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("API Key no activa o inválida. Espera unos minutos.");
            }
            throw new Error("Ciudad no encontrada");
        }
        const data = await response.json(); // Convertimos la respuesta a JSON

        // Extraemos los datos de forma más limpia
        const { main, weather, name } = data;
        const temp = main.temp;
        const desc = weather[0].description;

        resultDiv.innerHTML = `
            <h3>Clima en ${name}</h3>
            <p>Temperatura: ${temp}°C</p>
            <p>Estado: ${desc}</p>
        `;

    } catch (error) {
        // Si algo falla (internet, nombre de ciudad mal, etc.), cae aquí
        resultDiv.innerHTML = `Error: ${error.message}`;
        console.error("Hubo un problema:", error);
    }
}