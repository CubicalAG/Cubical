import React from 'react'
import {graphql} from 'gatsby'

import PageIntro from '../../components/PageIntro'
import Map from '../../components/Map'
import PageHeroSlider from '../../components/PageHeroSlider'
import PageRegularCardsSection from '../../components/PageRegularCardsSection'
import PageIrregularCardsSection from '../../components/PageIrregularCardsSection'
import PageMapSection from '../../components/PageMapSection'
import PageKaufenPropertySection from '../../components/PageKaufenPropertySection'
import PageMietenProperty from '../../components/PageMietenProperty'
import PageOrderSection from '../../components/PageOrderSection'
import PageReferenceSection from '../../components/PageReferenceSection'
import PageOffsetCardsSection from '../../components/PageOffsetCardsSection'
import PageRichTextSection from '../../components/PageRichTextSection'

const Page = ({data}) => {

    return(
        <React.Fragment>
            {   
                data.prismicPage.data.body &&
                data.prismicPage.data.body.length > 0 &&
                data.prismicPage.data.body.map(slice => {
                    switch(slice.slice_type){
                        case 'hero_slider':
                            return <PageHeroSlider data={slice}/>
                        case 'intro_text':
                            return <PageIntro data={slice} />
                        case 'regular_cards':
                            return  <PageRegularCardsSection data={slice}/>
                        case 'irregular_cards':
                            return <PageIrregularCardsSection data={slice}/>
                        case 'kaufen_property_section':
                            return <PageKaufenPropertySection/>
                        case 'mieten_property':
                            return <PageMietenProperty/>
                        case 'simple_order_section':
                            return <PageOrderSection data={slice}/>
                        case 'reference_section':
                            return <PageReferenceSection/>
                        case 'offset_cards':
                            return <PageOffsetCardsSection data={slice}/>
                        case 'rich_text_section':
                            return <PageRichTextSection data={slice}/>
                        default:
                            return
                    }
                })
            }
          </React.Fragment>
    )
  }

export const PageQuery = graphql`
  query PageQuery($page_path: String!) {
    prismicPage(data: {page_path: {eq: $page_path}}){
      data {
        body {
          ... on PrismicPageBodyHeroSlider {
            id
            items {
              hero_images {
                localFile {
                  childImageSharp {
                      fluid(maxWidth: 1920, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                  }
                }
              }
            }
            fields: primary {
              heading
              ribbon_text
              ribbon_link{
                  url
              }
            }
            slice_type
          }
          ... on PrismicPageBodyIntroText {
            primary {
              body1 {
                html
              }
              heading {
                html
              }
            }
            slice_type
          }
          ... on PrismicPageBodyIrregularCards {
            id
            items {
              card_heading
              card_body {
                html
              }
              card_link{
                  url
              }
            }
            primary {
              background_image {
                localFile {
                  childImageSharp {
                      fluid(maxWidth: 1920, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                  }
                }
                alt
              }
              section_heading
            }
            slice_type
          }
          ... on PrismicPageBodyRegularCards {
            id
            items {
              card_body {
                html
              }
              card_link{
                  url
              }
              card_image {
                localFile {
                  childImageSharp {
                      fluid(maxWidth: 460, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                  }
                }
                alt
              }
              cardHeading:heading
              small_heading
            }
            slice_type
          }
          ... on PrismicPageBodyKaufenPropertySection {
            slice_type
          }
          ... on PrismicPageBodyMietenProperty {
            slice_type
          }
          ... on PrismicPageBodyOffsetCards {
            slice_type
            primary {
              section_heading
            }
            items {
              card_text
              card_small_heading
              card_link {
                url
              }
              card_cover {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 450, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                alt
              }
            }
          }
          ... on PrismicPageBodyReferenceSection {
            slice_type
          }
          ... on PrismicPageBodyRichTextSection {
            slice_type
            primary {
              body1 {
                html
              }
            }
          }
          ... on PrismicPageBodySimpleOrderSection {
            slice_type
            primary {
              body1 {
                html
              }
              button_link {
                url
              }
              button_text
              cardHeading:heading
              order_number
              image {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 460, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            items {
              select_heading_content_body {
                html
              }
              select_heading_content_heading
            }
          }
        }
      }
    }
  }
`

export default Page