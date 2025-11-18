const API_KEY = '9ee8bbfa29617285f3faee067ee2e39e'

const formatter = new Intl.NumberFormat('pt-br', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const conditionIcons = {
  Thunderstorm: '⛈️', // Tempestade
  Drizzle: '🌦️', // Garoa
  Rain: '🌧️', // Chuva
  Snow: '❄️', // Neve
  Mist: '🌫️', // Névoa
  Smoke: '🌫️', // Fumaça
  Haze: '🌫️', // Neblina
  Dust: '🌪️', // Poeira
  Fog: '🌫️', // Nevoeiro
  Sand: '🌪️', // Areia
  Ash: '🌫️', // Cinzas
  Squall: '🌬️', // Rajada de vento
  Tornado: '🌪️', // Tornado
  Clear: '☀️', // Céu limpo
  Clouds: '⛅', // Nuvens
}

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const show = (node, displayValue) => (node.style.display = displayValue ?? '')
const hide = (node) => (node.style.display = 'none')

const setStatusMessage = (message, kind = 'info') => {
  const status = $('#status')
  status.textContent = message
  status.style.color = kind === 'error' ? '#ff8383' : '#a8b3c8'
}

const msToKmH = (ms) => ms * 3.6

const numberFormat = (value) => formatter.format(value)

const restoreLastCity = () => {
  const lastCity = localStorage.getItem('city_name')
  if (lastCity) {
    $('#city').value = lastCity
    // $('#frm-weather').dispatchEvent(new Event('submit'))
    $('#btn-search').click()
  }
}

const renderWeatherData = (data) => {
  const city = data.name ?? '—'
  const icon = conditionIcons[data.weather?.[0]?.main] ?? '—'
  const desc = data.weather?.[0]?.description ?? '—'
  const temp = numberFormat(data.main?.temp ?? 0)
  const feels = numberFormat(data.main?.feels_like ?? 0)
  const hum = data.main?.humidity ?? 0
  const wind = numberFormat(msToKmH(data.wind?.speed) ?? 0)
  const tmin = numberFormat(data.main?.temp_min ?? 0)
  const tmax = numberFormat(data.main?.temp_max ?? 0)

  $('#city-name').textContent = city
  $('#icon').textContent = icon
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

  const response = await fetch(url, { method: 'GET' })
  return response.json()
}

const getWeather = async (event) => {
  event.preventDefault()

  const cityName = $('#city').value.trim()
  if (!cityName) {
    setStatusMessage('Informe uma cidade.', 'error')
    return
  }
  localStorage.setItem('city_name', cityName)

  hide($('#result'))
  show($('#status'))

  try {
    const data = await fetchWeather(cityName)
    renderWeatherData(data)
    hide($('#status'))
    show($('#result'))
  } catch (error) {
    console.error(error)
    setStatusMessage(
      `Não foi possível obter dados para esta localidade: ${cityName}`,
      'error',
    )
    show($('#status'))
    hide($('#result'))
  }
}

window.addEventListener('DOMContentLoaded', () => {
  $('#frm-weather').addEventListener('submit', getWeather)
  $('#city').focus()
  restoreLastCity()
})
