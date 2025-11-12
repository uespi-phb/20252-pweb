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
  console.log('renderWeatherData')
}

const fetchWeather = async (cityName) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const url = `${baseUrl}?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`

  console.log(url)
  const result = await fetch(url, { method: 'GET' })
  console.log('>>', result.status)
}

const getWeather = async () => {
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
