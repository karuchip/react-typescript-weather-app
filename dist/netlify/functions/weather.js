const API_KEY = process.env.VITE_WEATHER_API_KEY;
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
export const handler = async (event) => {
    try {
        const city = event.queryStringParameters?.city;
        if (!city) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "都市名を指定してください" }),
            };
        }
        //位置情報を取得
        const geoResponse = await fetch(`${GEO_API_URL}?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "都市が見つかりません" }),
            };
        }
        const { name, lat, lon, country } = geoData[0];
        //天気情報を取得
        const weatherResponse = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const weatherData = await weatherResponse.json();
        return {
            statusCode: 200,
            body: JSON.stringify({
                location: { name, lat, lon, country },
                weather: {
                    main: weatherData.weather[0].main,
                    icon: weatherData.weather[0].icon,
                    temp: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                },
            }),
        };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("Unexpected error", error);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "サーバーエラーが発生しました" })
        };
    }
};
