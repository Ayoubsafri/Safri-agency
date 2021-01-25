import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image, Artist,} from "../pageStyles/pageStyles"
const IndexPage = () => {
  const{
    wpcontent: {
      page: {
        HomeMeta: {
          bannerFoto,
          featuredProducts,
          kleineBeschrijving,
          title,
        },
      },
    },
  } = useStaticQuery(graphql`
query {
  wpcontent {
    page(id: "Home Pagina", idType: URI) {
      HomeMeta {
        fieldGroupName
        kleineBeschrijving
        title
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
        featuredProducts {
          ... on WPGraphql_Nike {
            slug
            NikeMeta {
              title
              kleineBeschrijving
              fieldGroupName
              prijs
              beoordeling
              bannerFoto {
                altText
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality: 50, grayscale: true){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`)
  return(
    <Layout>
    <SEO title="Home Pagina" />
    <Wrapper>
      <div className="banner">
        <div className="inner-div"></div>
        <Image
          fluid={bannerFoto.imageFile.childImageSharp.fluid}
          alt={bannerFoto.altText}
        />
        <div className="inner-div">
          <p className="header-title">{title}</p>
        </div>
        
       </div>
       <div className="promo">
         <h1>EXTRA 15% OFF SALE</h1>
        <p>Just use code NIKE2021</p>
  </div>
      <div className="description">
        <p>{kleineBeschrijving}</p>
  </div>
      <div className="artists">
        <h2>Featured Shoes</h2>
        <div className="artist-items">
          {featuredProducts.map(({ NikeMeta, slug }) => (
            <Artist key={slug} to={`/${slug}`}>
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

export default IndexPage
