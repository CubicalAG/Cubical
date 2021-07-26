import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import PageIntro from "../components/PageIntro";
import Map from "../components/Map";
import PageHeroSlider from "../components/PageHeroSlider";
const LazyPageRegularCardsSection = React.lazy(() =>
  import("../components/PageRegularCardsSection")
);
const LazyPageIrregularCardsSection = React.lazy(() =>
  import("../components/PageIrregularCardsSection")
);
const LazyPageMapSection = React.lazy(() =>
  import("../components/PageMapSection")
);
const LazyPageTagFilterCardsSection = React.lazy(() =>
  import("../components/PageTagFilterCardsSection")
);
const LazyPageKaufenPropertySection = React.lazy(() =>
  import("../components/PageKaufenPropertySection")
);
const LazyPageMietenProperty = React.lazy(() =>
  import("../components/PageMietenProperty")
);
const LazyPageOrderSection = React.lazy(() =>
  import("../components/PageOrderSection")
);
const LazyPageReferenceSection = React.lazy(() =>
  import("../components/PageReferenceSection")
);
const LazyPageOffsetCardsSection = React.lazy(() =>
  import("../components/PageOffsetCardsSection")
);
import PageRichTextSection from "../components/PageRichTextSection";
const LazyPageContactFormSection = React.lazy(() =>
  import("../components/PageContactFormSection")
);
const LazyPageIconsAndTextSection = React.lazy(() =>
  import("../components/PageIconsAndTextSection")
);
const LazyPageImageSection = React.lazy(() =>
  import("../components/PageImageSection")
);

const HomePage = () => {
  const isSSR = typeof window === "undefined";

  const data = useStaticQuery(graphql`
    query HomePageQuery {
      prismicPage(data: { page_path: { eq: "/" } }) {
        data {
          body {
            ... on PrismicPageBodyHeroSlider {
              id
              hero_images: items {
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
                ribbon_link {
                  url
                  document {
                    data {
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
              items1: items {
                card_heading
                card_body {
                  html
                }
                card_link {
                  url
                  uid
                  document {
                    data {
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
              primary {
                section_id
                section_heading
              }
              items {
                card_body {
                  html
                }
                card_link {
                  url
                  uid
                  document {
                    data {
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
                cardHeading: heading
                small_heading
              }
              slice_type
            }
            ... on PrismicPageBodyKaufenPropertySection {
              slice_type
              primary {
                section_id
              }
            }
            ... on PrismicPageBodyMietenProperty {
              slice_type
              primary {
                section_id
              }
            }
            ... on PrismicPageBodyMap {
              slice_type
              primary {
                longitude
                latitude
                zoom
              }
            }
            ... on PrismicPageBodyTagFilterCards {
              slice_type
              primary {
                section_id
                start_content {
                  html
                }
              }
              items {
                tag_card_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                }
                tag
                card_title
                card_body{
                  html
                }
                email
                social_link_1
                social_link_2
                social_link_3
                social_icon_1 {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 80, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                }
                social_icon_2 {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 80, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                }
                social_icon_3 {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 80, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                  alt
                }
              }
            }
            ... on PrismicPageBodyDocumentList {
              slice_type
              primary {
                section_id
                start_content {
                  html
                }
                end_content {
                  html
                }
              }
              items {
                document_name
                document {
                  url
                }
              }
            }
            ... on PrismicPageBodyOffsetCards {
              slice_type
              primary {
                section_id
                section_heading
              }
              offset_cards: items {
                card_text
                card_small_heading
                card_link {
                  url
                  document {
                    data {
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
              primary {
                section_id
                section_content {
                  html
                }
                reference_by_tag
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
                  document {
                    data {
                      page_path
                    }
                  }
                }
                button_text
                cardHeading: heading
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
              items1: items {
                select_heading_content_body {
                  html
                }
                select_heading_content_heading
              }
            }
            ... on PrismicPageBodyContactFormSection {
              slice_type
              primary {
                section_id
                contact_content {
                  html
                }
              }
            }
            ... on PrismicPageBodyIconsAndText {
              slice_type
              section_id
              items {
                below_icon_text {
                  html
                }
                icon1 {
                  alt
                  localFile {
                    childImageSharp {
                      fixed(height: 250) {
                        ...GatsbyImageSharpFixed_withWebp
                      }
                    }
                  }
                }
              }
              primary {
                above_icons_text {
                  html
                }
              }
            }
            ... on PrismicPageBodyImage {
              slice_type
              section_id
              primary {
                above_image_text {
                  html
                }
                image {
                  alt
                  dimensions {
                    width
                  }
                  localFile {
                    url
                    childImageSharp {
                      fluid(maxWidth: 1500, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              items {
                after_click_content {
                  html
                }
                image_poly_coordinates
              }
            }
          }
        }
      }
    }
  `);

  return (
    <React.Fragment>
      {data &&
        data.prismicPage &&
        data.prismicPage.data &&
        !isSSR &&
        data.prismicPage.data.body &&
        data.prismicPage.data.body.length > 0 &&
        data.prismicPage.data.body.map((slice) => {
          switch (slice.slice_type) {
            case "hero_slider":
              return <PageHeroSlider data={slice} />;
            case "intro_text":
              return <PageIntro data={slice} />;
            case "regular_cards":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageRegularCardsSection data={slice} />
                </React.Suspense>
              );
            case "irregular_cards":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageIrregularCardsSection data={slice} />
                </React.Suspense>
              );
            case "kaufen_property_section":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageKaufenPropertySection data={slice} />
                </React.Suspense>
              );
            case "mieten_property":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageMietenProperty data={slice} />
                </React.Suspense>
              );
            case "simple_order_section":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageOrderSection data={slice} />
                </React.Suspense>
              );
            case "reference_section":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageReferenceSection data={slice} />
                </React.Suspense>
              );
            case "offset_cards":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageOffsetCardsSection data={slice} />
                </React.Suspense>
              );
            case "rich_text_section":
              return <PageRichTextSection data={slice} />;
            case "contact_form_section":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageContactFormSection data={slice} />
                </React.Suspense>
              );
            case "icons_and_text":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageIconsAndTextSection data={slice} />
                </React.Suspense>
              );
            case "image":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageImageSection data={slice} />
                </React.Suspense>
              );
            case "map":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageMapSection data={slice} />
                </React.Suspense>
              );
            case "document_list":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageDocumentListSection data={slice} />
                </React.Suspense>
              );
            case "tag_filter_cards":
              return (
                <React.Suspense fallback="Loading">
                  <LazyPageTagFilterCardsSection data={slice} />
                </React.Suspense>
              );
            default:
              return;
          }
        })}
      {/* <PageMapSection/> */}
      {/* <Section>
                <h2>AKTUELLE IMMOBILIEN</h2>
                <OffsetItemContainer>
                    <RealEstateItem 
                        link='/immobilien-entry'
                        title={'Für Gross und Klein, schöne und barrierefreie Wohnoase im Grünen'}
                        image={realEstateItemImage}
                        heading={'Leuggern'}
                    >
                        <span>4,5 Zimmer</span>
                        <span>CHF 500'000</span>
                        <span>5316 Leuggern</span>
                    </RealEstateItem>
                    <RealEstateItem 
                        title={'Für Gross und Klein, schöne und barrierefreie Wohnoase im Grünen'}
                        image={realEstateItemImage}
                        heading={'Leuggern'}
                    >
                        <span>4,5 Zimmer</span>
                        <span>CHF 500'000</span>
                        <span>5316 Leuggern</span>
                    </RealEstateItem>
                    <RealEstateItem 
                        title={'Für Gross und Klein, schöne und barrierefreie Wohnoase im Grünen'}
                        image={realEstateItemImage}
                        heading={'Leuggern'}
                    >
                        <span>4,5 Zimmer</span>
                        <span>CHF 500'000</span>
                        <span>5316 Leuggern</span>
                    </RealEstateItem>
                </OffsetItemContainer>
            </Section>
            <BigImageSection image={background3} title={'IMMOBILIEN SIND VOLLER TRÄUME. LASSEN WIR SIE WAHR WERDEN.'}>
                <LinkRibbons links={[{href:'/', text:'Dienstleistungen'}, {href:'/', text:'Dienstleistungen'}]}/>
            </BigImageSection>
            <Section>
                <h2>REFERENZEN</h2>
                <Reference videoLink={'https://www.youtube.com/embed/ZK9wtYOcChQ'} image={referenceImg} quote={'Es gibt nur eine – und das ist Cristina Cotoia.'}/>
                <Reference videoLink={'https://www.youtube.com/embed/ZK9wtYOcChQ'} image={referenceImg} quote={'Es gibt nur eine – und das ist Cristina Cotoia.'}/>
                <div class={styles.referenceButtonContainer}>
                    <ButtonBordered>
                        <Link to='/referenzen'>
                            Zu allen Referenzen
                        </Link>
                    </ButtonBordered>
                </div>
            </Section> */}
    </React.Fragment>
  );
};

export default HomePage;
