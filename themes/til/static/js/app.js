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

search.on('render', function () {
  resultPanel.appendChild(algoliaLogo)
})

search.start();

const searchBox = document.querySelector('#search-box input')

const hideResultPanel = function () {
  resultPanel.style.display = 'none'
}

const showResultPanel = function () {
  resultPanel.style.display = 'block'
}

document.addEventListener('click', function (e) {
  if (!resultPanel.contains(e.target) && e.target !== searchBox) {
    hideResultPanel()
  }
})

searchBox.addEventListener('focus', hideResultPanel)

searchBox.addEventListener('input', function (e) {
  searchBox.value.trim() === '' ? hideResultPanel() : showResultPanel()
})