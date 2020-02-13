require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Dragon Mart',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'dragon-mart',
        short_name: 'dr-mart',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: `${__dirname}/src/images/black.png`,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Product', 'Sku'],
        secretKey: process.env.STRIPE_SECRET_KEY
      }
    }
  ],
}
