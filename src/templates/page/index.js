import React from 'react'
import {graphql} from 'gatsby'

import PageIntro from '../../components/PageIntro'
import Map from '../../components/Map'
import PageHeroSlider from '../../components/PageHeroSlider'
const LazyPageRegularCardsSection = React.lazy(() => import('../../components/PageRegularCardsSection'))
const LazyPageIrregularCardsSection = React.lazy(() => import('../../components/PageIrregularCardsSection')) 
import PageMapSection from '../../components/PageMapSection'
const LazyPageKaufenPropertySection = React.lazy(() => import('../../components/PageKaufenPropertySection')) 
const LazyPageMietenProperty = React.lazy(() => import('../../components/PageMietenProperty')) 
const LazyPageOrderSection = React.lazy(() => import('../../components/PageOrderSection')) 
const LazyPageReferenceSection = React.lazy(() => import('../../components/PageReferenceSection')) 
const LazyPageOffsetCardsSection = React.lazy(() => import('../../components/PageOffsetCardsSection')) 
import PageRichTextSection from '../../components/PageRichTextSection'
const LazyPageContactFormSection = React.lazy(() => import('../../components/PageContactFormSection')) 


import SEO from '../../components/SEO'

const Page = ({data}) => {

    return(
        <React.Fragment>
            <SEO>
                {
                    data.prismicPage.data.seo_lang_code &&
                    <html lang={data.prismicPage.data.seo_lang_code} />
                }
                {
                    data.prismicPage.data.seo_title &&
                        <title>{data.prismicPage.data.seo_title}</title>
                }
                {
                    data.prismicPage.data.seo_title &&
                        <meta property="og:title" content={data.prismicPage.data.seo_title} />
                }
                {
                    data.prismicPage.data.seo_description &&
                    <meta name="description" content={data.prismicPage.data.seo_description} />
                }
                {
                    data.prismicPage.data.icon && data.prismicPage.data.icon.url &&
                        <link rel="apple-touch-icon" sizes="180x180" href={data.prismicPage.data.icon.url} />}
                {
                    data.prismicPage.data.icon && data.prismicPage.data.icon.url &&
                        <link rel="icon" type="image/png" href={data.prismicPage.data.icon.url} sizes="32x32" />
                    }
                {
                    data.prismicPage.data.icon && data.prismicPage.data.icon.url &&
                        <link rel="icon" type="image/png" href={data.prismicPage.data.icon.url} sizes="16x16" />
                }
                {
                    data.prismicPage.data.icon && data.prismicPage.data.icon.url &&
                        <link rel="mask-icon" href={data.prismicPage.data.icon.url} color="#ff4400" />
                }
                {
                    data.prismicPage.data.icon && data.prismicPage.data.icon.url &&
                        <meta property="og:image" content={data.prismicPage.data.icon.url} />
                }
                {
                    data.prismicPage.data.theme_color &&                    
                    <meta name="theme-color" content={data.prismicPage.data.theme_color} />
                }

                <meta property="og:type" content="business.business" />

                {
                    data.prismicPage.data.website_url && data.prismicPage.data.website_url.url &&
                    <meta property="og:url" content={data.prismicPage.data.website_url.url} />
                }
            </SEO>
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
                        return  <React.Suspense fallback='Loading'>
                            <LazyPageRegularCardsSection data={slice}/>
                          </React.Suspense>
                    case 'irregular_cards':
                      return  <React.Suspense fallback='Loading'>
                          <LazyPageIrregularCardsSection data={slice}/>
                        </React.Suspense> 
                    case 'kaufen_property_section':
                      return  <React.Suspense fallback='Loading'>
                            <LazyPageKaufenPropertySection data={slice}/>
                        </React.Suspense> 
                    case 'mieten_property':
                      return  <React.Suspense fallback='Loading'>
                        <LazyPageMietenProperty data={slice}/>
                        </React.Suspense> 
                    case 'simple_order_section':
                      return  <React.Suspense fallback='Loading'>
                        <LazyPageOrderSection data={slice}/>
                        </React.Suspense> 
                    case 'reference_section':
                      return  <React.Suspense fallback='Loading'>
                          <LazyPageReferenceSection data={slice}/>
                        </React.Suspense> 
                    case 'offset_cards':
                      return  <React.Suspense fallback='Loading'>
                          <LazyPageOffsetCardsSection data={slice}/>
                        </React.Suspense> 
                    case 'rich_text_section':
                      return <PageRichTextSection data={slice}/>
                      case 'contact_form_section':
                        return  <React.Suspense fallback='Loading'>
                          <LazyPageContactFormSection data={slice}/>
                        </React.Suspense> 
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
              section_id
              heading
              ribbon_text
              ribbon_link{
                  url
                  document{
                    data{
                      page_path
                    }
                  }
              }
            }
            slice_type
          }
          ... on PrismicPageBodyIntroText {
            primary {
              section_id
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
                  document{
                    data{
                      page_path
                    }
                  }
              }
            }
            primary {
              section_id
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
            primary{
              section_id
              section_heading
            }
            items {
              card_body {
                html
              }
              card_link{
                  url
                  document{
                    data{
                      page_path
                    }
                  }
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
            primary{
              section_id
            }
          }
          ... on PrismicPageBodyMietenProperty {
            slice_type
            primary{
              section_id
            }
          }
          ... on PrismicPageBodyOffsetCards {
            slice_type
            primary {
              section_id
              section_heading
            }
            items {
              card_text
              card_small_heading
              card_link {
                url
                document{
                  data{
                    page_path
                  }
                }
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
            primary{
              section_id
            }
          }
          ... on PrismicPageBodyRichTextSection {
            slice_type
            primary {
              section_id
              body1 {
                html
              }
            }
          }
          ... on PrismicPageBodySimpleOrderSection {
            slice_type
            primary {
              section_id
              body1 {
                html
              }
              button_link {
                url
                document{
                  data{
                    page_path
                  }
                }
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
          ... on PrismicPageBodyContactFormSection{
            slice_type
            primary{
              section_id
            }
          }
        }
      }
    }
  }
`

export default Page