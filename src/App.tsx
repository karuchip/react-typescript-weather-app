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

      const response = await fetch(`/netlify/functions/weather?city=${city}`);
      const data = await response.json();

      if (response.status !== 200) {
        setError(data.error || "エラーが発生しました");
      }
      setCountry(data.location);
      setResults(data.weather);
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
