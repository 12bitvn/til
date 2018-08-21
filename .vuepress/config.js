module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  markdown: {
    toc: {
      includeLevel: [2, 3]
    }
  },
  themeConfig: {
    sidebar: 'auto'
  },
  serviceWorker: {
    updatePopup: true
  }
}
