// Loading webfont.
WebFont.load({
  google: {
    families: ['Roboto+Mono:400,700']
  }
})

// Switch Theme
const body = document.querySelector('body')
const themes = ['light', 'dark']

let theme = localStorage.getItem('theme')
if (themes.indexOf(theme) === -1) {
  theme = 'light'
}

window.addEventListener('DOMContentLoaded', () => {
  body.className = theme
  document.getElementById('switch-theme').addEventListener('click', (e) => {
    e.preventDefault()
     theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme)
    body.className = theme
  })
})
