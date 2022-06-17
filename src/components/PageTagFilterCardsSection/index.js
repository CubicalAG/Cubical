import React, { useMemo, useState } from "react";

import { Link } from "gatsby";
import Image from "gatsby-image";
import styles from "./page-tag-filter-cards-section.module.scss";
import Section from "../Section";
import ButtonBordered from "../ButtonBordered";

const PageDocumentListSection = ({ data }) => {
  const [activeTag, setActiveTag] = useState("All");

  const uniqueTags = useMemo(() => {
    if (data.items && data.items.length > 0) {
      const tags = data.items.map((item) => item.tag);

      return [...new Set(tags)];
    }
  }, []);

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
        <>
          <div className={styles.tagsContainer}>
            <ButtonBordered
              onClick={() => setActiveTag("All")}
              className={`${styles.tagButton} ${
                activeTag === "All" && styles.tagButtonActive
              }`}
            >
              All
            </ButtonBordered>
            {uniqueTags.map((tag) => (
              <ButtonBordered
                onClick={() => setActiveTag(tag)}
                className={`${styles.tagButton} ${
                  tag === activeTag && styles.tagButtonActive
                }`}
              >
                {tag}
              </ButtonBordered>
            ))}
          </div>
          <div className={styles.cardsContainer}>
            {data.items
              .filter((item) => item.tag === activeTag || activeTag === "All")
              .map((item) => (
                <div className={styles.card}>
                  {item.tag_card_image &&
                    item.tag_card_image.localFile &&
                    item.tag_card_image.localFile?.childImageSharp && (
                      <Image
                        fluid={
                          item.tag_card_image.localFile.childImageSharp?.fluid
                        }
                        alt={item.tag_card_image.alt}
                      />
                    )}
                  <div className={styles.cardContent}>
                    {item.card_title && (
                      <h2 className={styles.cardTitle}>{item.card_title}</h2>
                    )}
                    {item.email && (
                      <a href={item.email} className={styles.email}>
                        Send e-mail
                      </a>
                    )}
                    {item.card_body && item.card_body.html && (
                      <div
                        className={styles.cardBody}
                        dangerouslySetInnerHTML={{
                          __html: item.card_body.html,
                        }}
                      />
                    )}
                    <div className={styles.socialIcons}>
                      {item.social_icon_1 && item.social_link_1 && (
                        <Link to={item.social_link_1}>
                          <Image
                            fluid={
                              item.social_icon_1.localFile?.childImageSharp
                                ?.fluid
                            }
                            alt={item.social_icon_1.alt}
                          />
                        </Link>
                      )}
                      {item.social_icon_2 && item.social_link_2 && (
                        <Link to={item.social_link_2}>
                          <Image
                            fluid={
                              item.social_icon_2.localFile?.childImageSharp
                                ?.fluid
                            }
                            alt={item.social_icon_2.alt}
                          />
                        </Link>
                      )}
                      {item.social_icon_3 && item.social_link_3 && (
                        <Link to={item.social_link_3}>
                          <Image
                            fluid={
                              item.social_icon_3.localFile?.childImageSharp
                                ?.fluid
                            }
                            alt={item.social_icon_3.alt}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </Section>
  );
};

export default PageDocumentListSection;
