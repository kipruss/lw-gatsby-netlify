const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const PostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allContentfulPost(limit: $limit) {
        nodes {
          slug
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allContentfulPost.nodes.forEach(({ slug }) => {
      createPage({
        path: `/blog/${slug}/`,
        component: PostTemplate,
        context: {
          slug,
        },
      })
    })
  })
}
