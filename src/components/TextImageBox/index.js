import React, { useMemo } from "react";
import Image from "gatsby-image";

import styles from "./text-image-box.module.scss";
import TiltableContainer from "../../components/TiltableContainer";
import AppearOnViewContainer from "../AppearOnViewContainer";
import { Link } from "gatsby";

const TextImageBox = ({ children, reverse, image, alt, imageHref }) => {
  const imageNode = useMemo(() => {
    if (image.src) {
      if (imageHref) {
        return (
          <Link to={imageHref}>
            <Image fluid={image} alt={alt} className={styles.image} />
          </Link>
        );
      }
      return <Image fluid={image} alt={alt} className={styles.image} />;
    } else {
      if (imageHref) {
        return (
          <Link to={imageHref}>
            <img src={image} alt={alt} className={styles.image} />
          </Link>
        );
      }
      return <img src={image} alt={alt} className={styles.image} />;
    }
  }, [image, alt, styles, imageHref]);

  return (
    <article
      className={`${styles.textImageBox} ${
        reverse && styles.reverseDirection
      }  ${!image ? styles.fullWidthContent : ""}`}
    >
      {image && (
        <AppearOnViewContainer>
          <TiltableContainer>{imageNode}</TiltableContainer>
        </AppearOnViewContainer>
      )}
      <AppearOnViewContainer>
        <div className={styles.content}>{children}</div>
      </AppearOnViewContainer>
    </article>
  );
};

export default TextImageBox;
