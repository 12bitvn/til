// Loading webfont.
WebFont.load({
  google: {
    families: ['Roboto+Mono:400,700']
  }
});

// Algolia instant search
const resultPanel = document.getElementById('hits')

const search = instantsearch({
  appId: 'P3HLF1KE43',
  apiKey: 'f4276c1eacc7a75de89e5352d42a070a',
  indexName: 'prod_TIL_12BITVN',
  routing: true,
  searchParameters: {
    hitsPerPage: 5
  },
  searchFunction (helper) {
    if (helper.state.query.trim() !== '') {
      helper.search()
    }
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search',
    reset: false,
    autofocus: false
  })
);

const itemTemplate = `
<a class="search-result-item-{{ type }} search-result-item" href="{{ relpermalink }}">
  <h3 class="title">{{ title }}</h3>
  {{ #summary }}
  <p class="summary">{{{_highlightResult.summary.value}}}</p>
  {{ /summary }}
</a>
`

search.addWidget(
  instantsearch.widgets.hits({
    container: resultPanel,
    templates: {
      empty: '<span class="na">No results</span>',
      item: itemTemplate
    }
  })
)

const algoliaLogo = document.createElement('img')
algoliaLogo.src = 'https://www.algolia.com/static_assets/images/pricing/pricing_new/algolia-powered-by-14773f38.svg'
algoliaLogo.classList.add('algolia-logo')

search.on('render', () => {
  resultPanel.appendChild(algoliaLogo)

  // Format date as dd/mm/yyyy
  let itemTitle = document.querySelectorAll('#hits .title')
  itemTitle.forEach((item) => {
    let text = item.textContent
    let date = text.split('-')
    if (date.length !== 3) {
      return
    }
    let d = date[2]
    let m = date[1]
    let y = date[0]
    item.textContent = `${d}/${m}/${y}`
  })
})

search.start();

const searchBox = document.querySelector('#search-box input')

const hideResultPanel = () => resultPanel.style.display = 'none'

const showResultPanel = () => resultPanel.style.display = 'block'

document.addEventListener('click', (e) => {
  if (!resultPanel.contains(e.target) && e.target !== searchBox) {
    hideResultPanel()
  }
})

searchBox.addEventListener('focus', hideResultPanel)

searchBox.addEventListener('input', (e) => {
  searchBox.value.trim() === '' ? hideResultPanel() : showResultPanel()
})

// Switch Theme
const switchThemeItem = document.querySelectorAll('.switch-theme-item')
const body = document.querySelector('body')
const themes = ['light', 'dark']

let theme = localStorage.getItem('theme')
if (themes.indexOf(theme) === -1) {
  theme = 'light'
}

window.addEventListener('DOMContentLoaded', () => {
  body.className = theme
})

switchThemeItem.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    let target = e.currentTarget
    let theme = target.dataset.theme
    localStorage.setItem('theme', theme)
    body.className = theme
  })
})