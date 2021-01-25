const { graphql } = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      wpcontent {
        nikes {
          edges {
            node {
              slug
              id
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const nikes = result.data.wpcontent.nikes.edges
    nikes.forEach(nike => {
      const { id, slug } = nike.node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/nike.js`),
        context: {
          id,
          slug,
        },
      })
    })
  })
}

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}