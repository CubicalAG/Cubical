import React from "react";

import Section from "../../components/Section";
import MarginContainer from "../../components/MarginContainer";
import styles from "./page-rich-text-section.module.scss";

const PageRichTextSection = ({ data }) => {
  return (
    <Section
      id={
        data && data.primary && data.primary.section_id
          ? data.primary.section_id
          : ""
      }
    >
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: data.primary.body1 && data.primary.body1.html,
        }}
      ></div>
    </Section>
  );
};

export default PageRichTextSection;
