const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'K',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'K',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\Users\\83613\\Desktop\\easy-react',
          templates:
            'C:\\Users\\83613\\Desktop\\easy-react\\node_modules\\docz-core\\dist\\templates',
          docz: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz',
          cache: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\.cache',
          app: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app',
          appPackageJson: 'C:\\Users\\83613\\Desktop\\easy-react\\package.json',
          gatsbyConfig:
            'C:\\Users\\83613\\Desktop\\easy-react\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\83613\\Desktop\\easy-react\\gatsby-browser.js',
          gatsbyNode: 'C:\\Users\\83613\\Desktop\\easy-react\\gatsby-node.js',
          gatsbySSR: 'C:\\Users\\83613\\Desktop\\easy-react\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app\\imports.js',
          rootJs: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app\\index.html',
          db: 'C:\\Users\\83613\\Desktop\\easy-react\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
