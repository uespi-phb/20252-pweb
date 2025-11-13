const API_KEY = '91f449635bc74708ecd78e924251b969'

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const show = (node) => (node.hidden = false)
const hide = (node) => (node.hidden = true)

const showStatus = (message, kind = 'info') => {
  const status = $('#status')
  status.textContent = message
  status.style.color = kind === 'error' ? '#ff8383' : '#a8b3c8'
  status.hidden = false
}

const renderWeatherData = (data) => {
  const city = data.name ?? '—'
  const main = data.weather?.[0]?.main ?? '—'
  const desc = data.weather?.[0]?.description ?? '—'
  const temp = data.main?.temp ?? 0
  const feels = data.main?.feels_like ?? 0
  const hum = data.main?.humidity ?? 0
  const wind = data.wind?.speed ?? 0
  const tmin = data.main?.temp_min ?? 0
  const tmax = data.main?.temp_max ?? 0

  $('#city-name').textContent = city
  $('#condition').textContent = desc
  $('#temp-value').textContent = temp
  $('#feels').textContent = `${feels}°C`
  $('#humidity').textContent = `${hum}%`
  $('#wind').textContent = `${wind}km/h`
  $('#tminmax').textContent = `${tmin}°C / ${tmax}°C`
}

const fetchWeather = async (cityName) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const url = `${baseUrl}?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`

  console.log(url)
  const response = await fetch(url, { method: 'GET' })
  return response.json()
}

const getWeather = async (event) => {
  event.preventDefault()

  const cityName = $('#city').value.trim()
  if (!cityName) {
    showStatus('Informe o nome de uma cidade.', 'error')
    return
  }

  const data = await fetchWeather(cityName)
  renderWeatherData(data)
}

window.addEventListener('DOMContentLoaded', () => {
  $('#frm-weather').addEventListener('submit', getWeather)
  $('#city').focus()
})
