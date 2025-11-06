const API_KEY = 'any_api_key'

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const show = (node) => (node.hidden = false)
const hide = (node) => (node.hidden = true)

const showStatus = (message, kind = 'info') => {}
