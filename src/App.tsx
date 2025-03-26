import {useState} from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import Result from "./components/Result"
import Loading from "./components/Loading"

type ResultState = {
  weather:string
  icon:string
  temp:number
  humidity:string
}

type CountryState = {
  name: string
  lat: number
  lon: number
  country: string
}

const App = () => {
  const apikey=import.meta.env.VITE_WEATHER_API_KEY
  const [city, setCity] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<CountryState>({
    name: "",
    lat: 0,
    lon: 0,
    country: "",
  })
  const [results, setResults] = useState<ResultState>({
    weather: "",
    icon: "",
    temp: 0,
    humidity: ""
  })
  const [error, setError]= useState<string>("")

  const getWeather = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!city.trim()) {
      setError("都市名を入力してください");
      return;
    }
    setError("");

    try {
      setLoading(true)
      const geoResponse = await fetch (
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        console.error("都市が見つかりません");
        return;
      }
      const {name, lat, lon, country} = geoData[0]
      setCountry({name, lat, lon, country})

      const weatherResponse = await fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
      );
      const weatherData = await weatherResponse.json();

      setResults({
        weather: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity
      })

      setLoading(false);
      setCity("");

    } catch(error) {
      setError("エラーが発生しました");
      console.log("エラーが発生しました", error);
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Title/>
        <Form
          setCity={setCity}
          getWeather={getWeather}
          error={error}
          city={city}
        />
        {loading ? <Loading/>
          : <Result
            results={results}
            country={country}
          />}
      </div>
    </div>
  )
}

export default App
