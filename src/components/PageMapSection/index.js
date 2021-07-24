import React from "react";

import styles from "./page-map-section.module.scss";
import Map from "../../components/Map";
import AppearOnViewContainer from "../../components/AppearOnViewContainer";

const PageMapSection = ({ data }) => {

  return (
    <section>
      <AppearOnViewContainer>
        <div className={styles.mapContainer}>
          <Map
            coords={[
              data && data.primary && data.primary.longitude,
              data && data.primary && data.primary.latitude,
            ]}
            zoom={data && data.primary && data.primary.zoom}
          />
        </div>
      </AppearOnViewContainer>
    </section>
  );
};

export default PageMapSection;
