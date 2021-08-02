import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";

import styles from "./popular-section-item.module.scss";
import popularSectionImg from "../../img/popular-section1.png";
import RoofSVG from "../RoofSVG";

import forwardArrowImg from "../../img/arrow-forward.svg";
import TiltableContainer from "../TiltableContainer";
import AppearOnViewContainer from "../AppearOnViewContainer";

const ImageInfoItem = ({ heading, title, image, children, link, data }) => {
  console.log(data);
  return (
    <li className={styles.imageInfoItem}>
      {data && (
        <AppearOnViewContainer>
          <TiltableContainer>
            <Link
              to={
                data.card_link &&
                (data.card_link.document &&
                data.card_link.document[0] &&
                data.card_link.document[0].data.page_path
                  ? data.card_link.document[0].data.page_path
                  : data.card_link.uid
                  ? `/${data.card_link.uid}`
                  : data.card_link.url)
              }
            >
              <article>
                {data.small_heading && <h5>{data.small_heading}</h5>}
                {data.card_image && (
                  <Image
                    fluid={data.card_image.localFile && data.card_image.localFile.childImageSharp.fluid}
                    alt={data.card_image.alt}
                  />
                )}
                <div className={styles.textContent}>
                  {data.heading && <h3>{data.heading}</h3>}
                  {data.card_body && (
                    <div
                      dangerouslySetInnerHTML={{ __html: data.card_body.html }}
                    ></div>
                  )}
                  {data.card_link && (
                    <img
                      className={styles.openSectionIcon}
                      src={forwardArrowImg}
                      alt="see more"
                    />
                  )}
                </div>
              </article>
            </Link>
          </TiltableContainer>
        </AppearOnViewContainer>
      )}
    </li>
  );
};

export default ImageInfoItem;
