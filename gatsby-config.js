require("dotenv").config({
  path: `.env`,
});

const prismicHtmlSerializer = require("./src/gatsby/htmlSerializer");

process.env.GATSBY_CONCURRENT_DOWNLOAD = 1;

module.exports = {
  /* Plugins */
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          `${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, // Google Analytics
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/lambda`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-lodash",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-prismic",
      options: {
        // repositoryName: 'mladenovic',
        repositoryName: "cubical",
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        schemas: {
          page: require("./src/schemas/page.json"),
          layout: require("./src/schemas/layout.json"),
          reference: require("./src/schemas/reference.json"),
          property: require("./src/schemas/property.json"),
        },
        shouldNormalizeImage: ({ node, key, value }) => {
          return true;
        },
        // Get the correct URLs in blog posts
        // linkResolver: () => (doc) => {
        //   if (doc.type == 'page') {
        //     return `/${doc.page_path}`
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
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "config/typography.js",
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito:wght@100;200;300;400;600;800;900`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-tidio-chat`,
      options: {
        tidioKey: process.env.TIDIO_ID,
        enableDuringDevelop: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/createStore/index.js",
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
        windowKey: "__PRELOADED_STATE__",
      },
    },
    // Must be placed at the end
    "gatsby-plugin-remove-serviceworker",
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/public/**/*.html": [
            "cache-control: public",
            "cache-control:  max-age=0",
            "cache-control: must-revalidate",
          ],
          "/public/page-data/*": [
            "cache-control: public",
            "cache-control:  max-age=0",
            "cache-control: must-revalidate",
          ],
        },
      },
    }, // make sure to keep it last in the array
  ],
};
