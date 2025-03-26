
type FormProps = {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  getWeather: (e:React.FormEvent<HTMLFormElement>) => void
  error: string
}

const Form = (props: FormProps) => {

  return (
    <div className="formWrapper">
      <form onSubmit={props.getWeather}>
        <input type="text"
          name="city"
          placeholder="都市名を入力"
          onChange={e => props.setCity(e.target.value)}
          value={props.city}
          />
        <button type="submit">
          Get Weather</button>
      </form>
      <div className="errorMsg">{props.error}</div>
    </div>
  )
}

export default Form
