import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { graphql, Link, navigate } from "gatsby";
import Image from "gatsby-image";

import styles from "./immobilien-entry.module.scss";
import Section from "../../components/Section";
import MarginContainer from "../../components/MarginContainer";
import RoofSVG from "../../components/RoofSVG";
import Slider from "../../components/Slider";

import SliderController from "../../components/SliderController";
import Map from "../../components/Map";
import SeeMoreContainer from "../../components/SeeMoreContainer";
import ItemAppearOverlay from "../../components/ItemAppearOverlay";
import AppearOnViewContainer from "../../components/AppearOnViewContainer";
import ButtonBordered from "../../components/ButtonBordered";
import numberWithUpperCommas from "../../utils/numberWithUpperCommas";

const ImmobilienEntry = ({ data }) => {
  const [swiper, setSwiper] = useState();
  const [activeSlide, setActiveSlide] = useState();
  const handleContact = () => {
    navigate(
      `/kontakt?grund=${
        data &&
        data.prismicProperty &&
        data.prismicProperty.data &&
        data.prismicProperty.data.property_heading
      }`
    );
  };
  console.log(data.prismicProperty.data);
  return (
    <React.Fragment>
      <MarginContainer />
      {data.prismicProperty.data && (
        <React.Fragment>
          <Section>
            <AppearOnViewContainer>
              <h1 className={styles.propertyTitle}>
                {data.prismicProperty.data.property_heading}
              </h1>
            </AppearOnViewContainer>
            <div className={styles.rowBorderLayout}>
              <AppearOnViewContainer>
                <div>
                  <h5> AUF EINEN BLICK</h5>
                  <div className={styles.infoList}>
                    <span>Preis:</span>
                    {data.prismicProperty.data.preis ? (
                      <span>
                        {numberWithUpperCommas(
                          Number(data.prismicProperty.data.preis)
                        )}{" "}
                        CHF
                      </span>
                    ) : data.prismicProperty.data.preis_from &&
                      data.prismicProperty.data.preis_to ? (
                      <span>
                        Ab{" "}
                        {numberWithUpperCommas(
                          Number(data.prismicProperty.data.preis_from)
                        )}{" "}
                        CHF bis{" "}
                        {numberWithUpperCommas(
                          Number(data.prismicProperty.data.preis_to)
                        )}{" "}
                        CHF
                      </span>
                    ) : data.prismicProperty.data.preis_from ? (
                      <span>
                        Ab{" "}
                        {numberWithUpperCommas(
                          Number(data.prismicProperty.data.preis_from)
                        )}{" "}
                        CHF
                      </span>
                    ) : data.prismicProperty.data.preis_to ? (
                      <span>
                        Bis{" "}
                        {numberWithUpperCommas(
                          Number(data.prismicProperty.data.preis_to)
                        )}{" "}
                        CHF
                      </span>
                    ) : (
                      ""
                    )}
                    <br />
                    <span>Kategorie:</span>
                    <span>
                      {data.prismicProperty.data.categories &&
                        data.prismicProperty.data.categories.length > 0 &&
                        data.prismicProperty.data.categories.map(
                          (categoryNode, index) => {
                            if (index !== 0) {
                              return `, ${categoryNode.category}`;
                            }

                            return `${categoryNode.category}`;
                          }
                        )}
                    </span>
                    <br />
                    <span>Zimmer:</span>
                    {data.prismicProperty.data.zimmer ? (
                      <span>{data.prismicProperty.data.zimmer}</span>
                    ) : data.prismicProperty.data.zimmer_from &&
                      data.prismicProperty.data.zimmer_to ? (
                      <span>
                        Ab {data.prismicProperty.data.zimmer_from} bis{" "}
                        {data.prismicProperty.data.zimmer_to}
                      </span>
                    ) : data.prismicProperty.data.zimmer_from ? (
                      <span>Ab {data.prismicProperty.data.zimmer_from}</span>
                    ) : data.prismicProperty.data.zimmer_to ? (
                      <span>Bis {data.prismicProperty.data.zimmer_to}</span>
                    ) : (
                      ""
                    )}
                    <br />
                    <span>Wohnfläche:</span>
                    {data.prismicProperty.data.wohnflache ? (
                      <span>
                        {data.prismicProperty.data.wohnflache} m<sup>2</sup>
                      </span>
                    ) : data.prismicProperty.data.wohnflache_from &&
                      data.prismicProperty.data.wohnflache_to ? (
                      <span>
                        Ab {data.prismicProperty.data.wohnflache_from} m
                        <sup>2</sup> bis{" "}
                        {data.prismicProperty.data.wohnflache_to} m<sup>2</sup>
                      </span>
                    ) : data.prismicProperty.data.wohnflache_from ? (
                      <span>
                        Ab {data.prismicProperty.data.wohnflache_from} m
                        <sup>2</sup>
                      </span>
                    ) : data.prismicProperty.data.wohnflache_to ? (
                      <span>
                        Bis {data.prismicProperty.data.wohnflache_to} m
                        <sup>2</sup>
                      </span>
                    ) : (
                      ""
                    )}
                    <br />
                    {data.prismicProperty.data.important_information &&
                      data.prismicProperty.data.important_information.length >
                        0 &&
                      data.prismicProperty.data.important_information.map(
                        (info, index) => {
                          return (
                            <React.Fragment key={index}>
                              <span>{info.information_name}</span>
                              <span>{info.information_value}</span>
                              <br />
                            </React.Fragment>
                          );
                        }
                      )}
                  </div>
                </div>
              </AppearOnViewContainer>
              <AppearOnViewContainer>
                <div>
                  <h5> ANGABEN</h5>
                  <div className={styles.infoList}>
                    <span>PLZ/Ort:</span>
                    <span>{data.prismicProperty.data.ort}</span>
                    <br />
                    {data.prismicProperty.data.other_information &&
                      data.prismicProperty.data.other_information.length > 0 &&
                      data.prismicProperty.data.other_information.map(
                        (info, index) => {
                          return (
                            <React.Fragment key={index}>
                              <span>{info.information_name}</span>
                              <span>{info.information_value}</span>
                              <br />
                            </React.Fragment>
                          );
                        }
                      )}
                  </div>
                </div>
              </AppearOnViewContainer>
            </div>
            <AppearOnViewContainer>
              <Slider setSwiper={setSwiper} setActiveSlide={setActiveSlide}>
                {data.prismicProperty.data.images &&
                  data.prismicProperty.data.images.length > 0 &&
                  data.prismicProperty.data.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          fluid={
                            image.image &&
                            image.image.localFile &&
                            image.image.localFile.childImageSharp.fluid
                          }
                          alt={image.image && image.image.alt}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Slider>
            </AppearOnViewContainer>
            <AppearOnViewContainer>
              {data.prismicProperty.data.images &&
                data.prismicProperty.data.images.length > 0 && (
                  <SliderController
                    swiper={swiper}
                    numberOfSlides={data.prismicProperty.data.images.length}
                    activeSlide={activeSlide}
                  />
                )}
            </AppearOnViewContainer>
            <AppearOnViewContainer>
              <div className={styles.content}>
                {data.prismicProperty.data.description &&
                  data.prismicProperty.data.description.html && (
                    <React.Fragment>
                      <h5> BESCHREIBUNG</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.prismicProperty.data.description.html,
                        }}
                      ></div>
                    </React.Fragment>
                  )}
              </div>
            </AppearOnViewContainer>
          </Section>
          <Section>
            {data.prismicProperty.data &&
              data.prismicProperty.data.abgeschlossenne === "false" && (
                <AppearOnViewContainer>
                  <div className={styles.contactButtonWrapper}>
                    <button
                      className={styles.contactButton}
                      onClick={handleContact}
                    >
                      Kontaktieren Sie Uns!
                    </button>
                  </div>
                </AppearOnViewContainer>
              )}
            <div className={styles.rowBorderLayout}>
              <AppearOnViewContainer>
                {data.prismicProperty.data.besichtigung_information &&
                  data.prismicProperty.data.besichtigung_information.html && (
                    <div>
                      <h5> BESICHTIGUNG</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            data.prismicProperty.data.besichtigung_information
                              .html,
                        }}
                      ></div>
                    </div>
                  )}
              </AppearOnViewContainer>
              <div>
                {data.prismicProperty.data.property_document_card_text &&
                  data.prismicProperty.data.property_document &&
                  data.prismicProperty.data.property_document.url && (
                    <div className={styles.box}>
                      <ItemAppearOverlay
                        text={
                          data.prismicProperty.data.property_document_card_text
                        }
                        linkToSee={
                          data.prismicProperty.data.property_document.url
                        }
                        linkToDownload={
                          data.prismicProperty.data.property_document.url
                        }
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className={styles.aktuellesButton}>
              <ButtonBordered>
                <Link to={"/#aktuelles"}>Aktuelles</Link>
              </ButtonBordered>
            </div>
          </Section>
          {data.prismicProperty.data.property_geocode &&
            data.prismicProperty.data.property_geocode.latitude &&
            data.prismicProperty.data.property_geocode.longitude && (
              <Section>
                <h5> LAGE</h5>
                <AppearOnViewContainer>
                  <div className={styles.mapContainer}>
                    <Map
                      coords={[
                        data.prismicProperty.data.property_geocode.latitude,
                        data.prismicProperty.data.property_geocode.longitude,
                      ]}
                      zoom={17}
                    />
                  </div>
                </AppearOnViewContainer>
              </Section>
            )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export const ImmobilienQuery = graphql`
  query ImmobilienQuery($uid: String!) {
    prismicProperty(uid: { eq: $uid }) {
      data {
        besichtigung_information {
          html
        }
        categories {
          category
        }
        description {
          html
        }
        images {
          image {
            alt
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        important_information {
          information_name
          information_value
        }
        ort
        other_information {
          information_name
          information_value
        }
        preis
        preis_from
        preis_to
        property_document {
          url
        }
        property_document_card_text
        property_geocode {
          latitude
          longitude
        }
        property_heading
        type_of_property
        wohnflache
        wohnflache_from
        wohnflache_to
        zimmer
        zimmer_from
        zimmer_to
        abgeschlossenne
      }
    }
  }
`;

export default ImmobilienEntry;
