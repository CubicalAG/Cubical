import React from "react";

import styles from "./page-document-list-section.module.scss";
import Section from "../Section";
import { Link } from "gatsby";
import forwardArrowImg from "../../img/arrow-forward-blue.svg";

const PageDocumentListSection = ({ data }) => {
  console.log(data);

  return (
    <Section
      id={
        data.primary && data.primary.section_id ? data.primary.section_id : ""
      }
    >
      {data.primary && data.primary.start_content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data.primary.start_content.html }}
        />
      )}
      {data.items && data.items.length > 0 && (
        <ul className={styles.documentList}>
          {data.items.map((item) => {
            return (
              <li className={styles.documentListItem}>
                <Link to={item.document.url}>
                  {item.document_name}
                  <img src={forwardArrowImg} alt="see document" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {data.primary && data.primary.end_content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data.primary.end_content.html }}
        />
      )}
    </Section>
  );
};

export default PageDocumentListSection;
