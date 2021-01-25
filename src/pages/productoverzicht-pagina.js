import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Artist,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const Nikepage = () => {
  const {
    wpcontent: {
      page: {
        productoverzichtMeta: { kleineBeschrijving, bannerFoto,picturePromo },
      },
      nikes: { edges: nikes },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "Productoverzicht pagina", idType: URI) {
            productoverzichtMeta {
              kleineBeschrijving
              fieldGroupName
              picturePromo {
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 50) {
                          ...GatsbyImageSharpFluid_withWebp
                   }
                  }
                }
                altText
              }
              bannerFoto {
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 50) {
                          ...GatsbyImageSharpFluid_withWebp
                   }
                  }
                }
                altText
              }
            }
          }
          nikes {
            edges {
              node {
                NikeMeta {
                  title
                  fieldGroupName
                  beoordeling
                  kleineBeschrijving
                  prijs
                  bannerFoto {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 50){
                              ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
                slug
              }
            }
         }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="nike" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={bannerFoto.imageFile.childImageSharp.fluid}
            alt={bannerFoto.altText}
          />
            <BottomEdgeDown color={COLORS.BLACK} />
        <BottomEdgeUp color={COLORS.BLACK} />
        </div>
      
        <div className="banner">
          <Image
            fluid={picturePromo.imageFile.childImageSharp.fluid}
            alt={picturePromo.altText}
          />
        
        </div>
       
        <div className="artists">
          <h2>Shoes collection</h2>
          <div className="artist-items">
            {nikes.map(({ node: { NikeMeta, slug } }) => (
              <Artist to={`/${slug}`} key={slug}>
                <Image
                  fluid={NikeMeta.bannerFoto.imageFile.childImageSharp.fluid}
                  alt={NikeMeta.bannerFoto.altText}
                />
                <div className="artist-info">
                  <p>
                    {NikeMeta.title} 
                  </p>
                </div>
              </Artist>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default Nikepage