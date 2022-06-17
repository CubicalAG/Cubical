import React from "react";
import { Link } from "gatsby";

import Section from "../Section";
import TextImageBox from "../TextImageBox";
import boxImage from "../../img/text-image-box-image-1.png";
import ButtonBordered from "../ButtonBordered";
import SelectHeadingContent from "../SelectHeadingContent";

import styles from "./page-order-section.module.scss";

const PageOrderSection = ({ data }) => (
  <Section
    id={
      data && data.primary && data.primary.section_id
        ? data.primary.section_id
        : ""
    }
  >
    <TextImageBox
      image={
        data.primary.image &&
        data.primary.image.localFile &&
        data.primary.image.localFile?.childImageSharp?.fluid
      }
      alt={
        data.primary.image &&
        data.primary.image.localFile &&
        data.primary.image.alt
      }
    >
      <h3>
        {data.primary.order_number && (
          <span className={styles.bigNumber}>{data.primary.order_number}</span>
        )}
        {data.primary.cardHeading && data.primary.cardHeading}
      </h3>
      {data.primary.body1 && (
        <div dangerouslySetInnerHTML={{ __html: data.primary.body1.html }} />
      )}
      {data.items1 && <SelectHeadingContent column data={data.items1} />}
      {data.primary.button_link && (
        <Link
          to={
            data.primary.button_link.document &&
            data.primary.button_link.document[0] &&
            data.primary.button_link.document[0].data.page_path
              ? data.primary.button_link.document[0].data.page_path
              : data.primary.button_link.url
          }
        >
          {data.primary.button_text && (
            <ButtonBordered>{data.primary.button_text}</ButtonBordered>
          )}
        </Link>
      )}
    </TextImageBox>
  </Section>
);

export default PageOrderSection;
