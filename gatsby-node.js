const _ = require("lodash");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
  type PrismicLayout implements Node {
    prismicLayout: PrismicLayout
  }
  
  type PrismicPage implements Node {
    prismicPage: PrismicPage
  }

  type SliceItems @infer{
    card_link: PrismicPageBodyRegularCardsItemsCard_link @infer
    card_text: String
    card_small_heading: String
    card_link: Url
    card_cover: LocalImageWithAlt
    select_heading_content_body: HTML
    select_heading_content_heading: String
    heading: String
    card_heading: String
    card_body: HTML @infer
    hero_images: [LocalImageWithAlt] @infer
    card_image: LocalImageWithAlt
    heading: String
    small_heading: String
    longitude: String
    latitude: String
    zoom: String
  }

  type SliceItemsArray @infer{
    card_link: PrismicPageBodyRegularCardsItemsCard_link
    card_text: String
    card_small_heading: String
    card_link: Url
    card_cover: LocalImageWithAlt
    select_heading_content_body: HTML @infer
    select_heading_content_heading: String @infer
    heading: String
    card_heading: String
    card_body: HTML
    hero_images: LocalImageWithAlt @infer
    card_image: LocalImageWithAlt
    heading: String
    small_heading: String
  }
  
  type Url{
    url: String
    absolutePath: String
    }

    type LinkSublink implements Node @infer{
      url: String
      document: [DocumentLink] @infer
    }

    type TextImageInfoWithAlt @fileByRelativePath{
      alt: String
      localFile: File
    }

    type Link implements Node @infer{
      link: Url
      button_text: String
      sublink: LinkSublink @infer
      sublink_text: String
      parent_link: String
      link_text: String
      image: TextImageInfoWithAlt @infer
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
      image: TextImageInfoWithAlt @infer
    }

    type NavSublinks @infer{
      parent_link: String
      sublink_text: String
    }

    type PrismicLayoutDataWebsite_url{
      url: String
    }

    type FooterPrimaryContent{
      text: String
      link: Link @infer
      bold: String
    }

    type Fields{
      right_side_links: [Link] @infer
      footer_links: [Link] @infer
      footer_buttons: [ButtonLink] @infer
      footer_primary_content: [FooterPrimaryContent]
      footer_content: HTML
      left_side_links: [LeftSideLinks] @infer
      link_hover_icons: [Link] @infer
      links: [Link] @infer
      right_side_link_hover_icons: [Link] @infer
      logo_text: String
      theme_color: String
      seo_title: String
      seo_lang_code: String
      seo_description: String
      icon: Url
      logo_primary_image: TextImageInfoWithAlt @infer
      background_image: LocalImageWithAlt @infer
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

    type DocumentLink @infer{
      data: PagePath @infer
    }

    type PrismicPageBodyRegularCardsItemsCard_link implements Node {
      document: [DocumentLink] @infer 
      url: String
    }

    type PrismicPageBodyRegularCards implements Node{
      primary: PrismicPageBodyRegularCardsFields
      slice_type: String
      items: [SliceItemsArray]
    }

    type PrismicPageBodyIconsAndTextFields{
      above_icons_text: HTML
    }

    type PrismicPageBodyIconsAndTextItems{
      icon1: LocalImageWithAlt @infer
      below_icon_text: HTML
    }

    type PrismicPageBodyImagePrimary{
      above_image_text: HTML
      image: LocalImageWithAlt @infer
    }

    type PrismicPageBodyImageItems{
      image_poly_coordinates: String
      after_click_content: HTML
    }

    type PrismicPageBodyImage implements Node {
      slice_type: String
      section_id: String
      primary: PrismicPageBodyImagePrimary
      items: [PrismicPageBodyImageItems]
    }
    
    type PrismicPageBodyIconsAndText implements Node {
      slice_type: String
      section_id: String
      primary: PrismicPageBodyIconsAndTextFields
      items: [PrismicPageBodyIconsAndTextItems] @infer
    }

    type PrismicPageBodyRegularCardsFields {
      section_heading: String
      section_id: String
    }

    type PrismicPageBodyOffsetCardsItemsCard_link implements Node {
      document: [DocumentLink] @infer
    }

    type PrismicPageBodySimpleOrderSection implements Node{
      slice_type: String
      primary: PrismicPageBodySimpleOrderSectionPrimary
      items: [SliceItemsArray]
    }


    type PrismicPageBodySimpleOrderSectionPrimary{
      section_id: String
      body1: HTML
      button_link: Url @infer
      button_text: String
      heading: String
      order_number: String
      image: LocalImageWithAlt
    }

    type PrismicPageBodySimpleOrderSectionPrimaryButton_link implements Node {
      document: [DocumentLink] @infer
    }

    type PrismicPageBodyIrregularCardsItemsCard_link implements Node {
      document: [DocumentLink] @infer
    }

    type HeroSliderPrimary{
      section_id: String
      heading: String
      ribbon_text: String
      ribbon_link: Url
    }

    type PrismicPageBodyHeroSlider implements Node{
      slice_type: String
      items: [SliceItemsArray]
      primary: HeroSliderPrimary
    }

    type TypeOfProperty @infer{
      type_of_property: String
      page_path: String
    }

    type TypeOfPropertyData @infer{
      data: TypeOfProperty @infer
    }

    type PrismicReferenceButtonLink{
      url: String
      uid: String
    }

    type PrismicReferenceData{
      body: HTML
      cover_image: LocalImageWithAlt
      heading: String
      button: String
      reference_tag: String
      button_link:PrismicReferenceButtonLink
    }

    type PrismicReference implements Node{
      data:PrismicReferenceData
    }
    
    type PrismicPageBodyHeroSliderPrimaryRibbon_link implements Node{
      document: [DocumentLink] @infer
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
      items: [SliceItemsArray]
    }

    type PrismicPageBodyOffsetCardsPrimary implements Node{
      section_id: String
      section_heading: String
    }

    type PrismicPageBodyReferenceSectionPrimary implements Node{
      section_id: String
      section_content: HTML
      reference_by_tag: String
    }

    type PrismicPageBodyReferenceSection implements Node{
      primary: PrismicPageBodyReferenceSectionPrimary
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

    type PrismicPageBodyMietenProperty{
      primary: PrimaryForSectionIdOnlySlices
    }

    type PrismicPageBodyRegularCardsFields{
      primary: PrimaryForSectionIdOnlySlices
    }

    type PrismicPageBodyContactFormSectionPrimary {
      section_id: String
      contact_content: HTML
    }

    type PrismicPageBodyContactFormSection implements Node{
      primary: PrismicPageBodyContactFormSectionPrimary
      slice_type: String
    }

    type PrismicPageBodyMapPrimary {
      longitude: String
      latitude: String
      zoom: String
    }

    type PrismicPageBodyMap implements Node{
      primary: PrismicPageBodyMapPrimary
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

    type LocalImageWithAlt @fileByRelativePath{
      alt:String
      localFile: File 
    }

    type Image{
      image: LocalImageWithAlt
    }

    type PrismicProperty implements Node{
      data: PrismicPropertyData
    }

    type PrismicPropertyData{
      zimmer: String
      zimmer_from: String
      zimmer_to: String
      abgeschlossenne: String
      verkaufen: String
      wohnflache: String
      wohnflache_from: String
      wohnflache_to: String
      property_heading: String
      property_geocode: PropertyGeocode
      property_document_card_text: String
      property_document: Url
      preis: String
      preis_from: String
      preis_to: String
      other_information: [OtherInformation]
      ort: String
      page_path: String
      important_information: [ImportantInformation]
      images: [Image]
      description: HTML
      category: String
      besichtigung_information: HTML
    }
  `;
  createTypes(typeDefs);
};

const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = require.resolve("./src/templates/page/index.js");
  const propertyTemplate = require.resolve("./src/templates/property/index.js");

  const result = await wrapper(
    graphql(`
      {
        allPrismicPage(filter: { data: { page_path: { ne: "/" } } }) {
          edges {
            node {
              data {
                page_path
              }
            }
          }
        }

        allPrismicProperty {
          edges {
            node {
              data {
                type_of_property
              }
              uid
            }
          }
        }
      }
    `)
  );

  const pages = result.data.allPrismicPage.edges;

  pages.forEach((edge) => {
    if (edge.node.data.page_path) {
      createPage({
        path: `${edge.node.data.page_path}`,
        component: pageTemplate,
        context: {
          page_path: edge.node.data.page_path,
        },
      });
    }
  });

  const properties = result.data.allPrismicProperty.edges;

  properties.forEach((edge) => {
    if (edge.node.uid) {
      createPage({
        path: edge.node.uid,
        component: propertyTemplate,
        context: {
          uid: edge.node.uid,
        },
      });
    }
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("build-javascript")) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-spring/,
            sideEffects: true,
          },
        ],
      },
    });
  }
};
