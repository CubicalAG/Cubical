import React from "react";
import { Link } from "gatsby";

import styles from "./our-services-item.module.scss";
import arrowRightImg from "../../img/arrow-forward.svg";
import AppearOnViewContainer from "../AppearOnViewContainer";

const OurServicesItem = ({ children, data }) => {
  return (
    <li
      style={{
        width: `${Math.floor(Math.random() * (45 - 30 + 1) + 30)}%`,
      }}
    >
      <AppearOnViewContainer>
        <div className={styles.randomWidthItem}>
          <Link
            to={
              data.card_link &&
              (data.card_link.document &&
              data.card_link.document[0] &&
              data.card_link.document[0].data.page_path
                ? data.card_link.document[0].data.page_path
                : data.card_link.url)
            }
          >
            {data.card_heading && <h3>{data.card_heading}</h3>}
            {data.card_body && (
              <div
                dangerouslySetInnerHTML={{ __html: data.card_body.html }}
              ></div>
            )}
            {data.card_link && (
              <img
                src={arrowRightImg}
                className={styles.openServiceIcon}
                alt="see more"
              />
            )}
          </Link>
        </div>
      </AppearOnViewContainer>
    </li>
  );
};

export default OurServicesItem;
