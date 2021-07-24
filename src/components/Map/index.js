import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { icon } from "leaflet";

import styles from "./map.module.scss";
import iconUrl from "../../img/location.svg";

const CubicalMap = ({ coords, zoom }) => {
    console.log(coords)
  return (
    <div className={styles.map}>
      <Map center={coords} zoom={zoom} >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains={"abcd"}
        />
        {typeof window != "undefined" && (
          <Marker
            position={coords}
            icon={icon({ iconUrl, iconSize: [50, 50] })}
          />
        )}
      </Map>
    </div>
  );
};

export default CubicalMap;
