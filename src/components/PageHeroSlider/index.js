import React from "react";
import { SwiperSlide } from "swiper/react";

import styles from "./page-hero-slider.module.scss";
import imgSlide1 from "../../img/home-page.png";
import BackgroundImage from "../../components/BackgroundImage";
import LinkRibbons from "../../components/LinkRibbons";
import ScrollScreenButton from "../../components/ScrollScreenButton";
import downArrowImg from "../../img/chevron-down-outline.svg";
import TiltableContainer from "../../components/TiltableContainer";
import MotoText from "../../components/MotoText";
import Slider from "../../components/Slider";

const PageHeroSlider = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.heroSlider}>
      {data && (
        <>
          <Slider
            id={
              data.fields && data.fields.section_id
                ? data.fields.section_id
                : ""
            }
          >
            {data.hero_images &&
              data.hero_images.length > 0 &&
              data.hero_images.map((image) => {
                return (
                  <SwiperSlide className={styles.desktopSlide}>
                    <div style={{ height: "100vh" }}>
                      {image &&
                        image.hero_images &&
                        image.hero_images.localFile.childImageSharp && (
                          <BackgroundImage
                            image={
                              image.hero_images.localFile.childImageSharp.fluid
                            }
                          />
                        )}
                    </div>
                  </SwiperSlide>
                );
              })}
            {data.hero_images &&
              data.hero_images.length > 0 &&
              data.hero_images.map((image) => {
                return (
                  <SwiperSlide className={styles.mobileSlide}>
                    <div style={{ height: "100vh" }}>
                      {image &&
                        image.hero_images_mobile &&
                        image.hero_images_mobile.localFile && (
                          <BackgroundImage
                            image={
                              image.hero_images_mobile.localFile.childImageSharp
                                .fluid
                            }
                          />
                        )}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Slider>
          {data.fields.heading && (
            <MotoText heading text={data.fields.heading} />
          )}
          {data.fields.ribbon_text && data.fields.ribbon_link && (
            <LinkRibbons
              links={[
                {
                  href:
                    data.fields.ribbon_link.document &&
                    data.fields.ribbon_link.document[0] &&
                    data.fields.ribbon_link.document[0].data.page_path
                      ? data.fields.ribbon_link.document[0].data.page_path
                      : data.fields.ribbon_link.url,
                  text: data.fields.ribbon_text,
                },
              ]}
            />
          )}
          <ScrollScreenButton>
            <img src={downArrowImg} alt="scroll down" />
          </ScrollScreenButton>
        </>
      )}
    </div>
  );
};

export default PageHeroSlider;
