import React from "react";
import Image from "gatsby-image";

import styles from "./page-icons-and-text-section.module.scss";
import AppearOnViewContainer from "../AppearOnViewContainer";

const PageIconsAndTextSection = ({ data }) =>
  data && (
    <AppearOnViewContainer>
      <div
        className={styles.container}
        id={
          data && data.primary && data.primary.section_id
            ? data.primary.section_id
            : ""
        }
      >
        {data.primary &&
          data.primary.above_icons_text &&
          data.primary.above_icons_text.html && (
            <div
              className={styles.aboveIconsContainer}
              dangerouslySetInnerHTML={{
                __html: data.primary.above_icons_text.html,
              }}
            />
          )}
        <div className={styles.iconsContainer}>
          {data.items &&
            data.items.map((item) => (
              <div className={styles.iconCard}>
                {item.icon1 &&
                  item.icon1.localFile &&
                  item.icon1.localFile?.childImageSharp &&
                  item.icon1.localFile.childImageSharp?.fixed && (
                    <Image
                      fixed={item.icon1.localFile.childImageSharp.fixed}
                      alt={item.icon1.alt}
                    />
                  )}
                {item.below_icon_text && item.below_icon_text.html && (
                  <div
                    className={styles.cardContent}
                    dangerouslySetInnerHTML={{
                      __html: item.below_icon_text.html,
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </AppearOnViewContainer>
  );

export default PageIconsAndTextSection;
