type ResultsProps = {
  results: {
    weather:string;
    icon:string;
    temp:number;
    humidity:string;
  };
  country: {
    name: string;
    lat: number;
    lon: number;
    country: string;
  }
}


const Result = ({results, country}: ResultsProps) => {
  return(
    <div>
      <div>
        {results.weather &&
          <div className="resultContainer">
            <div className="country">
              <div>{country.country}</div>
              <div>{country.name}</div>
            </div>
            <h1>{results.weather}</h1>
            <div className="description">
              <img src={`https://openweathermap.org/img/wn/${results.icon}@2x.png`} alt="アイコン画像" />
              <div>
                <div className="temp">{(results.temp - 273.15).toFixed(1)} ℃</div>
                <div className="humid"><span>Humidity:</span> {results.humidity} %</div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>

  )
}

export default Result
