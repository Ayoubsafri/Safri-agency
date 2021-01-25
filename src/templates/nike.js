  
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image } from "./templateStyles/artistStyles"

const ArtistTemplate = ({
  data: {
    wpcontent: {
      nike: {
        NikeMeta,
        types: { edges: types },
      },
    },
  },
}) => {

  return (
    <Layout>
      <SEO title="Artist" />
      <Wrapper>
        <div className="artist-container">
          <div className="artist-image">
            <Image
              fluid={NikeMeta.bannerFoto.imageFile.childImageSharp.fluid}
              alt={NikeMeta.bannerFoto.altText}
            />
            <div className="roles">
              {types.map(({ node: type }) => (
                <div key={type.name} className="role">
                  {type.name}
                </div>
              ))}
            </div>
          </div>
          <div className="artist-info">
            <h2>
              {NikeMeta.title} 
            </h2>
              <h1>
               €{NikeMeta.prijs}-{NikeMeta.beoordeling}/5
              </h1><p>{NikeMeta.kleineBeschrijving}</p>
          </div>
          
        </div>
      </Wrapper>
    </Layout>
  )
}

export default ArtistTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
        nike(id: $id, idType: ID) {
          types {
            edges {
              node {
                name
              }
            }
          }
          NikeMeta {
            beoordeling
            prijs
            title
            kleineBeschrijving
            fieldGroupName
            bannerFoto {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
          id
        }
    }
}

`