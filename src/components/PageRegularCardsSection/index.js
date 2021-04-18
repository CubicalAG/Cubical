import React from "react";

import styles from "./page-regular-cards-section.module.scss";

import Section from "../../components/Section";
import ImageInfoItem from "../../components/ImageInfoItem";
import popularSectionImg from "../../img/popular-section1.png";

const PageRegularCardsSection = ({ data }) => {
  return (
    <Section
      id={
        data && data.primary && data.primary.section_id
          ? data.primary.section_id
          : ""
      }
    >
      {data.primary.section_heading && (
        <h2 className={styles.sectionHeading}>
          {data.primary.section_heading}
        </h2>
      )}
      <ul className={styles.popularSectionsContainer}>
        {data.items &&
          data.items.length > 0 &&
          data.items.map((card) => {
            return <ImageInfoItem data={card} />;
          })}
      </ul>
    </Section>
  );
};

export default PageRegularCardsSection;
