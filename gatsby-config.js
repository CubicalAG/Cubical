require('dotenv').config({
  path: `.env`,
})

const prismicHtmlSerializer = require('./src/gatsby/htmlSerializer')

module.exports = {
  /* Plugins */
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-lodash',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'mladenovic',
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        schemas: {
          page: require('./src/schemas/page.json'),
          layout: require('./src/schemas/layout.json'),
          reference: require('./src/schemas/reference.json'),
        },
        shouldDownloadImage: ({ node, key, value }) => {
          return true
        },
        // Get the correct URLs in blog posts
        // linkResolver: () => (doc) => {
        //   if (doc.type == 'product') {
        //     if (doc.data) {
        //       return `/shop/${doc.data.product_category.uid}/${doc.uid}`
        //     }
        //   } else {
        //     return `/${doc.uid}`
        //   }
        // },
        // fetchLinks: ['product.product_category'],
        // PrismJS highlighting for labels and slices
        htmlSerializer: () => prismicHtmlSerializer,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito:wght@100;200;300;400;600;800;900` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-tidio-chat`,
      options: {
        tidioKey:process.env.TIDIO_ID,
        enableDuringDevelop: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/state/createStore/index.js',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
          // otherwise `JSON.parse` is used
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      },
    },
    // Must be placed at the end
    'gatsby-plugin-netlify',
  ],
}
