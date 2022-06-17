import React, { useState, useRef, useEffect } from "react";
import Image from "gatsby-image";

import styles from "./page-image-section.module.scss";
import Section from "../Section";
import AppearOnViewContainer from "../AppearOnViewContainer";

const PageImageSection = ({ data }) => {
  const imageRef = useRef(null);

  const [imageWidth, setImageWidth] = useState(null);
  const [openContentIndex, setOpenContentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (imageRef && imageRef.current) {
      timeout = setTimeout(() => {
        setImageWidth(imageRef.current.getBoundingClientRect().width);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [imageRef.current]);

  return (
    <Section>
      <AppearOnViewContainer>
        <div
          className={styles.sectionContainer}
          id={
            data && data.primary && data.primary.section_id
              ? data.primary.section_id
              : ""
          }
        >
          {data &&
            data.primary &&
            data.primary.above_image_text &&
            data.primary.above_image_text.html && (
              <div
                className={styles.textContent}
                dangerouslySetInnerHTML={{
                  __html: data.primary.above_image_text.html,
                }}
              />
            )}
          {data &&
            data.primary &&
            data.primary.image &&
            data.primary.image.localFile &&
            data.primary.image.localFile?.childImageSharp &&
            data.primary.image.localFile.childImageSharp?.fluid && (
              <div
                className={`${styles.image} ${
                  data.items.length !== 4 && styles.fullWidthImage
                }`}
              >
                <img
                  ref={imageRef}
                  src={data.primary.image.localFile.url}
                  alt={data.primary.image.alt}
                  useMap="#imagemap"
                />
                {data && data.items && data.items.length === 4 && (
                  <div className={styles.overlays}>
                    <div
                      onClick={() => setOpenContentIndex(0)}
                      className={`${
                        openContentIndex === 0 && styles.activeOverlay
                      }`}
                    />
                    <div
                      onClick={() => setOpenContentIndex(1)}
                      className={`${
                        openContentIndex === 1 && styles.activeOverlay
                      }`}
                    />
                    <div
                      onClick={() => setOpenContentIndex(2)}
                      className={`${
                        openContentIndex === 2 && styles.activeOverlay
                      }`}
                    />
                    <div
                      onClick={() => setOpenContentIndex(3)}
                      className={`${
                        openContentIndex === 3 && styles.activeOverlay
                      }`}
                    />
                  </div>
                )}
                <map name="imagemap">
                  {data &&
                    data.items &&
                    data.items.length > 0 &&
                    data.items.map((item, index) => {
                      if (item.image_poly_coordinates) {
                        const pixelDensity =
                          imageWidth / data.primary.image.dimensions.width;

                        let trueCoords = item.image_poly_coordinates.split(",");

                        trueCoords = trueCoords.map(
                          (coord) => coord * pixelDensity
                        );

                        trueCoords = trueCoords.join(",");

                        return (
                          <area
                            shape="poly"
                            coords={trueCoords}
                            onClick={() => setOpenContentIndex(index)}
                          />
                        );
                      }
                    })}
                </map>
              </div>
            )}
          {data &&
            data.items &&
            data.items.length > 0 &&
            data.items.map((item, index) => (
              <div
                className={`${styles.content} ${
                  index === openContentIndex && styles.activeContent
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    item.after_click_content && item.after_click_content.html,
                }}
              />
            ))}
        </div>
      </AppearOnViewContainer>
    </Section>
  );
};

export default PageImageSection;
