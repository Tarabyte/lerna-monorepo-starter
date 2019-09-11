const path = require('path')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const { errors, data } = await graphql(`
    {
      allShoppingJson {
        edges {
          node {
            id
            title
            price
            dateAdded
            description
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  data.allShoppingJson.edges.map(edge => {
    createPage({
      path: `item/${edge.node.id}`,
      component: path.resolve('./src/pages/shoppingItem.js'),
      context: {
        data: edge.node
      }
    })
  })
}
