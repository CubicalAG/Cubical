import React, { useMemo, useState } from "react";
import Image from "gatsby-image";

import { Link } from "gatsby";
import styles from "./reference.module.scss";
import playCircle from "../../img/play-circle.svg";
import closeCircle from "../../img/close-circle.svg";
import seeMoreIcon from "../../img/eye-outline.svg";
import seeLessIcon from "../../img/eye-off-outline.svg";
import RoofSVG from "../RoofSVG";
import TiltableContainer from "../TiltableContainer";
import AppearOnViewContainer from "../AppearOnViewContainer";
import ButtonBordered from "../ButtonBordered";

const Reference = ({
  videoLink,
  image,
  quote,
  text,
  alt,
  button,
  buttonLink,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const imageNode = useMemo(() => {
    if (buttonLink) {
      return (
        <Link
          to={`${
            buttonLink &&
            (buttonLink.uid
              ? `/${buttonLink.uid}`
              : buttonLink.document && buttonLink.document[0]
              ? buttonLink.document[0].data &&
                buttonLink.document[0].data.page_path
              : buttonLink.url)
          }`}
        >
          <Image fluid={image} alt={alt} />
        </Link>
      );
    }
    return <Image fluid={image} alt={alt} />;
  }, [image, alt]);

  return (
    <article className={styles.reference}>
      <AppearOnViewContainer>
        <figure>
          {showVideo && (
            <div className={styles.referenceVideo}>
              <iframe
                width="100%"
                height="100%"
                src={videoLink}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button onClick={() => setShowVideo(false)}>
                <img src={closeCircle} alt="close" />
              </button>
            </div>
          )}
          <div className={styles.referenceInformation}>
            <div
              className={`${styles.referenceImage} ${
                seeMore ? styles.shrinked : ""
              }`}
            >
              {imageNode}
            </div>
            <figcaption
              className={`${styles.textOverlay} ${
                seeMore ? styles.expanded : ""
              }`}
            >
              <TiltableContainer roundedCorners>
                <div className={styles.overlayStyledContainer}>
                  <blockquote
                    onClick={() => setSeeMore((prevState) => !prevState)}
                  >
                    {quote}
                    {!seeMore && <img src={seeMoreIcon} alt="" />}
                  </blockquote>
                  <div
                    className={`${styles.description} ${
                      seeMore ? styles.visibleDescription : ""
                    }`}
                  >
                    <p>{text}</p>
                    {button && (
                      <div className={styles.propertyButton}>
                        <ButtonBordered>
                          <Link
                            to={`${
                              buttonLink &&
                              (buttonLink.uid
                                ? `/${buttonLink.uid}`
                                : buttonLink.document && buttonLink.document[0]
                                ? buttonLink.document[0].data &&
                                  buttonLink.document[0].data.page_path
                                : buttonLink.url)
                            }`}
                          >
                            {button}
                          </Link>
                        </ButtonBordered>
                      </div>
                    )}
                  </div>
                  {/* <button onClick={() => setShowVideo(true)}>
                                        <img src={playCircle} alt=''/>
                                        ZUM VIDEO
                                    </button> */}
                </div>
              </TiltableContainer>
            </figcaption>
          </div>
        </figure>
      </AppearOnViewContainer>
    </article>
  );
};

export default Reference;
