const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type PrismicLayout implements Node {
    prismicLayout: PrismicLayout
  }
  
  type PrismicPage implements Node {
    prismicPage: PrismicPage
  }

  type SliceItems @infer{
    card_link: PrismicPageBodyRegularCardsItemsCard_link
    card_text: String
    card_small_heading: String
    card_link: Url
    card_cover: LocalImageWithAlt
    select_heading_content_body: HTML
    select_heading_content_heading: String
    heading: String
    card_heading: String
    card_body: HTML
    hero_images: [LocalImageWithAlt]
    card_image: LocalImageWithAlt
    heading: String
    small_heading: String
  }

  type SliceItemsArray @infer{
    card_link: PrismicPageBodyRegularCardsItemsCard_link
    card_text: String
    card_small_heading: String
    card_link: Url
    card_cover: LocalImageWithAlt
    select_heading_content_body: HTML
    select_heading_content_heading: String
    heading: String
    card_heading: String
    card_body: HTML
    hero_images: [LocalImageWithAlt]
    card_image: LocalImageWithAlt
    heading: String
    small_heading: String
  }
  
  type Url{
    url: String
      document: [DocumentLink]
    }

    type LinkSublink{
      url: String
      document: DocumentLink
    }

    type Link{
      link: Url
      button_text: String
      sublink: LinkSublink
    }

    type ButtonLink{
      button_link: Url
      button_text: String
    }

    type HTML{
      html: String
    }

    type LeftSideLinks{
      content_background_color:String
      link_content: HTML
    }

    type Fields{
      right_side_links: [Link]
      footer_links: [Link]
      footer_buttons: [ButtonLink]
      left_side_links: [LeftSideLinks]
      link_hover_icons: [Link]
      links: [Link]
      right_side_link_hover_icons: [Link]
      sublinks: [Link]
      logo_text: String
    }

    type PrismicLayout {
      data:Fields
    }

    type PageFields {
      icon: Url
      seo_description: String
      seo_lang_code: String
      seo_title: String
      theme_color: String
      website_url: Url
      page_path: String
    }

    type PagePath{
      page_path: String
    }

    type DocumentLink {
      data: PagePath
    }

    type PrismicPageBodyRegularCardsItemsCard_link implements Node {
      document: [DocumentLink],
      url: String
    }

    type PrismicPageBodyRegularCards implements Node{
      primary: PrismicPageBodyRegularCardsFields
      slice_type: String
      items: SliceItems
    }

    type PrismicPageBodyRegularCardsFields {
      section_heading: String
      section_id: String
    }

    type PrismicPageBodyOffsetCardsItemsCard_link implements Node {
      document: [DocumentLink]
    }

    type PrismicPageBodySimpleOrderSection implements Node{
      slice_type: String
      primary: PrismicPageBodySimpleOrderSectionPrimary
      items: SliceItems
    }


    type PrismicPageBodySimpleOrderSectionPrimary{
      section_id: String
      body1: HTML
      button_link: Url
      button_text: String
      heading: String
      order_number: String
      image: LocalImageWithAlt
    }

    type PrismicPageBodySimpleOrderSectionPrimaryButton_link implements Node {
      document: [DocumentLink]
    }

    type PrismicPageBodyIrregularCardsItemsCard_link implements Node {
      document: [DocumentLink]
    }

    type HeroSliderPrimary{
      section_id: String
      heading: String
      ribbon_text: String
      ribbon_link: Url
    }

    type PrismicPageBodyHeroSlider implements Node{
      slice_type: String
      items: SliceItems
      primary: HeroSliderPrimary
    }

    type PrismicReferenceData{
      body: HTML
      cover_image: LocalImageWithAlt
      heading: String
    }

    type PrismicReference implements Node{
      data:PrismicReferenceData
    }
    
    type PrismicPageBodyHeroSliderPrimaryRibbon_link implements Node{
      document: [DocumentLink]
    }

    type PrismicPage{
      data:PageFields
    }

    type PrismicPageBodyHeroSliderPrimary implements Node{
      section_id: String
    }

    type PrismicPageBodyIntroText implements Node{
      primary: PrismicPageBodyIntroTextPrimary 
    }

    type PrismicPageBodyIntroTextPrimary implements Node{
      section_id: String
      body1: HTML
      heading: HTML
      slice_type: String
    }

    type PrismicPageBodyIrregularCards implements Node{
      items: [SliceItemsArray]
      primary: PrismicPageBodyIrregularCardsPrimary
    }

    type PrismicPageBodyIrregularCardsPrimary implements Node{
      section_id: String
      background_image: LocalImageWithAlt
      section_heading: String
    }

    type PrismicPageBodyRegularCardsFieldsPrimary implements Node{
      section_id: String
    }

    type PrismicPageBodyKaufenPropertySection implements Node{
      section_id: String
      primary: PrimaryForSectionIdOnlySlices
      slice_type: String
    }

    type PrismicPageBodyMietenProperty implements Node{
      section_id: String
      slice_type: String
    }

    type PrismicPageBodyOffsetCards implements Node {
      primary: PrismicPageBodyOffsetCardsPrimary
      items: SliceItems
    }

    type PrismicPageBodyOffsetCardsPrimary implements Node{
      section_id: String
      section_heading: String
    }

    type PrismicPageBodyReferenceSection implements Node{
      section_id: String
      slice_type: String
    }

    type PrismicPageBodyRichTextSection implements Node{
      slice_type: String
      primary: PrismicPageBodyRichTextSectionPrimary
    }

    type PrismicPageBodyRichTextSectionPrimary implements Node{
      section_id: String
      body1: HTML
    }

    type PrismicPageBodySimpleOrderSectionPrimary implements Node{
      section_id: String
    }

    type PrismicPageBodyHeroSliderPrimary implements Node{
      section_id: String
    }

    type PrismicPageBodyReferenceSection{
      primary: PrimaryForSectionIdOnlySlices
    }

    type PrismicPageBodyMietenProperty{
      primary: PrimaryForSectionIdOnlySlices
    }

    type PrismicPageBodyRegularCardsFields{
      primary: PrimaryForSectionIdOnlySlices
    }

    type PrismicPageBodyContactFormSection implements Node{
      primary: PrimaryForSectionIdOnlySlices
      slice_type: String
    }

    type PrimaryForSectionIdOnlySlices{
      section_id: String
    }

    type OtherInformation{
      information_name: String
      information_value: String
    }

    type PropertyGeocode{
      longitude: String
      latitude: String
    }

    type ImportantInformation{
      information_name: String
      information_value: String
    }

    type LocalImageWithAlt @infer{
      alt:String
      localFile: File
    }

    type Image{
      image: LocalImageWithAlt
    }

    type PrismicPropertyData{
      zimmer: String
      wohnflache: String
      property_heading: String
      property_geocode: PropertyGeocode
      property_document_card_text: String
      property_document: Url
      preis: String
      other_information: OtherInformation
      ort: String
      important_information: ImportantInformation
      images: [Image]
      description: HTML
      category: String
      besichtigung_information: HTML
    }
  `
  createTypes(typeDefs)
}

const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = require.resolve('./src/templates/page/index.js')
  const propertyTemplate = require.resolve('./src/templates/property/index.js')
  
  const result = await wrapper(
    graphql(`
      {
        allPrismicPage(filter: {data: {page_path: {ne: "/"}}}) {
          edges {
            node {
              data {
                page_path
              }
            }
          }
        }

        allPrismicProperty{
          edges{
            node{
              data{
                type_of_property
              }
              uid
            }
          }
        }
      }
    `)
  )

  const pages = result.data.allPrismicPage.edges

  pages.forEach((edge) => {
    
    if(edge.node.data.page_path){
      createPage({
        path: `${edge.node.data.page_path}`,
        component: pageTemplate,
        context: {
          page_path: edge.node.data.page_path,
        },
      })
    }
  })

  const properties = result.data.allPrismicProperty.edges
  
  properties.forEach((edge) => {
    if(edge.node.uid){
      createPage({
        path:`/${edge.node.data.type_of_property ? 'mieten' : 'kaufen'}/${edge.node.uid}`,
        component: propertyTemplate,
        context: {
          uid: edge.node.uid
        }
      })
    }
  })



}


exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("build-javascript")) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-spring/,
            sideEffects: true
          }
        ]
      }
    })
  }
}