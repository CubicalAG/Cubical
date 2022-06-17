import React from "react";

import styles from "./page-irregular-cards-section.module.scss";
import background4 from "../../img/dienstleistungen.png";
import BigImageSection from "../BigImageSection";
import RandomWidthItem from "../RandomWidthItem";

const PageIrregularCardsSection = ({ data }) => {
  if (data) {
    return (
      <BigImageSection
        id={
          data && data.primary && data.primary.section_id
            ? data.primary.section_id
            : ""
        }
        image={
          data.primary.background_image &&
          data.primary.background_image.localFile?.childImageSharp?.fluid
        }
      >
        {data.primary.section_heading && (
          <h2>{data.primary.section_heading}</h2>
        )}
        {data.items1 && data.items1.length > 0 && (
          <ul className={styles.ourServicesContainer}>
            {data.items1.map((card) => (
              <RandomWidthItem
                data={card}
                link="/dienstleistungen/verkaufen/"
              />
            ))}
          </ul>
        )}
      </BigImageSection>
    );
  }
  return <></>;
};

export default PageIrregularCardsSection;
