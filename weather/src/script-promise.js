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
  console.log('D1: renderWeatherData')
  console.log('DATA:', data)
}

const fetchWeather = async (cityName) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const url = `${baseUrl}?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`

  console.log('D2:', url)

  return fetch(url, { method: 'GET' }).then((response) => {
    console.log('D3:', response)
    return response.json()
  })
}

const getWeather = (event) => {
  event.preventDefault()

  const cityName = $('#city').value.trim()
  if (!cityName) {
    showStatus('Informe o nome de uma cidade.', 'error')
    return
  }

  console.log('D5: getWeather')
  fetchWeather(cityName).then((data) => renderWeatherData(data))
  console.log('D6: getWeather')
}

console.log('>> Before DOMContentLoaded')
window.addEventListener('DOMContentLoaded', () => {
  console.log('>> After DOMContentLoaded')
  $('#frm-weather').addEventListener('submit', getWeather)
  $('#city').focus()
})
