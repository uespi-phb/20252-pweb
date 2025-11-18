
const API_KEY = '9ee8bbfa29617285f3faee067ee2e39e' 

const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => document.querySelectorAll(sel)

const UI = {
  form: $('#weather-form'),
  input: $('#city'),
  status: $('#status'),
  result: $('#result'),
  cityName: $('#city-name'),
  condition: $('#condition'),
  temp: $('#temp'),
  feels: $('#feels'),
  humidity: $('#humidity'),
  wind: $('#wind'),
  minmax: $('#minmax'),
  icon: $('#icon')
}

const ICONS = {
  Thunderstorm: '⛈️',   // Tempestade
  Drizzle: '🌦️',        // Garoa
  Rain: '🌧️',           // Chuva
  Snow: '❄️',           // Neve
  Mist: '🌫️',           // Névoa
  Smoke: '🌫️',          // Fumaça
  Haze: '🌫️',           // Neblina
  Dust: '🌪️',           // Poeira
  Fog: '🌫️',            // Nevoeiro
  Sand: '🌪️',           // Areia
  Ash: '🌫️',            // Cinzas
  Squall: '🌬️',         // Rajada de vento
  Tornado: '🌪️',        // Tornado
  Clear: '☀️',          // Céu limpo
  Clouds: '⛅',         // Nuvens
}

function show(node) { node.hidden = false }
function hide(node) { node.hidden = true }

function showStatus(msg, kind = 'info') {
  UI.status.textContent = msg
  UI.status.style.color = kind === 'error' ? '#ff8383' : '#a8b3c8'
  show(UI.status)
}

function setLoading(on) {
  if (on) showStatus('Carregando…')
  else hide(UI.status)
}

function MStoKmH(ms) {
  return Math.round(ms * 3.6)
}

function pickIcon(weatherMain) {
  return ICONS[weatherMain] ?? '🌡️'
}

function render(data) {
  const city = `${data.name}, ${data.sys?.country ?? ''}`.trim().replace(/,\s*$/, '')
  const main = data.weather?.[0]?.main ?? '—'
  const desc = data.weather?.[0]?.description ?? '—'
  const temp = Math.round(data.main?.temp ?? 0)
  const feels = Math.round(data.main?.feels_like ?? 0)
  const hum = Math.round(data.main?.humidity ?? 0)
  const wind = MStoKmH(data.wind?.speed ?? 0)
  const tmin = Math.round(data.main?.temp_min ?? 0)
  const tmax = Math.round(data.main?.temp_max ?? 0)

  UI.cityName.textContent = city || '—'
  UI.condition.textContent = desc || '—'
  UI.temp.textContent = isNaN(temp) ? '—' : String(temp)
  UI.feels.textContent = isNaN(feels) ? '— °C' : `${feels} °C`
  UI.humidity.textContent = isNaN(hum) ? '— %' : `${hum} %`
  UI.wind.textContent = isNaN(wind) ? '— km/h' : `${wind} km/h`
  UI.minmax.textContent = isNaN(tmin) || isNaN(tmax) ? '— / — °C' : `${tmin} / ${tmax} °C`
  UI.icon.textContent = pickIcon(main)

  hide(UI.status)
  show(UI.result)
}

async function fetchWeather(city) {
  const base = 'https://api.openweathermap.org/data/2.5/weather'
  const url = `${base}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`

  const res = await fetch(url, { method: 'GET' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Falha na consulta (${res.status}). ${text.slice(0, 120)}`)
  }
  return res.json()
}

function restoreLastCity() {
  const last = localStorage.getItem('last_city')
  if (last) {
    UI.input.value = last
    UI.form.dispatchEvent(new Event('submit'))
  }
}

UI.form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  const city = UI.input.value.trim()
  if (!city) {
    showStatus('Informe uma cidade.', 'error')
    return
  }

  localStorage.setItem('last_city', city)
  setLoading(true)
  hide(UI.result)

  try {
    const data = await fetchWeather(city)
    render(data)
  } catch (err) {
    console.error(err)
    showStatus('Não foi possível obter o clima. Verifique o nome da cidade.', 'error')
  } finally {
    setLoading(false)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  // Acessibilidade: focar o campo ao carregar
  UI.input.focus()
  restoreLastCity()
})

