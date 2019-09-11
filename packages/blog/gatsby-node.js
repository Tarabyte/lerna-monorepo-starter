const path = require('path')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const { errors, data } = await graphql(`
    {
      allBlogJson {
        edges {
          node {
            id
            title
            author
            dateAdded
            content
            href
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  data.allBlogJson.edges.map(edge => {
    createPage({
      path: `post/${edge.node.id}`,
      component: path.resolve('./src/pages/blogItem.js'),
      context: {
        data: edge.node
      }
    })
  })
}
