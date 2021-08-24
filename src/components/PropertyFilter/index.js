import React, { useEffect, useState } from "react";

import styles from "./property-filter.module.scss";
import RoofSVG from "../RoofSVG";
import TiltableContainer from "../TiltableContainer";

const PropertyFilter = ({ data, filters, setFilters }) => {
  const [filterungArray, setFilterungArray] = useState([]);
  const [zimmerArray, setZimmerArray] = useState([]);
  const [ortArray, setOrtArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredArray = data.filter(({ node: property }) => {
      if (property.uid != "familienhaus") {
        return true;
      }
    });

    setFilteredData(filteredArray);
  }, [data]);

  const setArrayValues = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (!filters[targetName]) {
      setFilters((prevState) => ({
        ...prevState,
        [targetName]: [targetValue],
      }));
    } else {
      if (
        filters[targetName].findIndex((value) => value == targetValue) == -1
      ) {
        setFilters((prevState) => ({
          ...prevState,
          [targetName]: [...prevState[targetName], targetValue],
        }));
      } else {
        setFilters((prevState) => {
          let valueArrayCopy = [...prevState[targetName]];
          return {
            ...prevState,
            [targetName]: [
              ...valueArrayCopy.filter((value) => value != targetValue),
            ],
          };
        });
      }
    }
  };

  const setStringValues = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (!filters[targetName]) {
      setFilters((prevState) => ({
        ...prevState,
        [targetName]: targetValue,
      }));
    } else {
      setFilters((prevState) => ({ ...prevState, [targetName]: targetValue }));
    }
  };

  useEffect(() => {
    let propertyCategories = [];

    filteredData.forEach(({ node: property }) => {
      if (property.data.categories && property.data.categories.length > 0) {
        property.data.categories.forEach((categoryNode) => {
          if (categoryNode.category !== null) {
            return propertyCategories.push(categoryNode.category);
          }
        });
      }
    });

    let filterungSet = new Set(propertyCategories);

    setFilterungArray([...filterungSet]);

    const zimmerArr = filteredData.map(({ node: property }) => {
      let numberOfRooms = Number(property.data.zimmer);
      let numberOfRoomsFrom;
      let numberOfRoomsTo;

      if (property.data.zimmer_from != undefined) {
        numberOfRoomsFrom = Number(property.data.zimmer_from);
      }
      if (property.data.zimmer_to != undefined) {
        numberOfRoomsTo = Number(property.data.zimmer_to);
      }

      let zimmerMapping = [];

      if (
        (numberOfRooms && numberOfRooms < 2) ||
        (numberOfRoomsTo != undefined && numberOfRoomsTo < 2)
      ) {
        zimmerMapping.push("1-2 Zimmer");
      }
      if ((numberOfRooms >= 2 && numberOfRooms < 3) || numberOfRoomsTo >= 3) {
        zimmerMapping.push("2-3 Zimmer");
      }
      if ((numberOfRooms >= 3 && numberOfRooms < 4) || numberOfRoomsTo >= 4) {
        zimmerMapping.push("3-4 Zimmer");
      }
      if ((numberOfRooms >= 4 && numberOfRooms < 5) || numberOfRoomsTo >= 5) {
        zimmerMapping.push("4-5 Zimmer");
      }
      if (numberOfRooms >= 5 || numberOfRoomsTo > 5) {
        zimmerMapping.push("über 5 Zimmer");
      }

      if (zimmerMapping) {
        return zimmerMapping;
      }
    });

    const zimmerArrShallow = [];

    zimmerArr.forEach((arr) => {
      arr.forEach((value) => {
        zimmerArrShallow.push(value);
      });
    });

    let zimmerSet = new Set(zimmerArrShallow);

    let createZimmerOrderedArray = (zimmerSet) => {
      let zimmerValues = [];
      if ([...zimmerSet].includes("1-2 Zimmer")) {
        zimmerValues.push("1-2 Zimmer");
      }
      if ([...zimmerSet].includes("2-3 Zimmer")) {
        zimmerValues.push("2-3 Zimmer");
      }
      if ([...zimmerSet].includes("3-4 Zimmer")) {
        zimmerValues.push("3-4 Zimmer");
      }
      if ([...zimmerSet].includes("4-5 Zimmer")) {
        zimmerValues.push("4-5 Zimmer");
      }
      if ([...zimmerSet].includes("über 5 Zimmer")) {
        zimmerValues.push("über 5 Zimmer");
      }

      return zimmerValues;
    };

    setZimmerArray(createZimmerOrderedArray(zimmerSet));

    let ortSet = new Set(
      filteredData.map(({ node: property }) => {
        if (property.data.ort) {
          return property.data.ort;
        }
      })
    );

    setOrtArray([...ortSet]);
  }, [filteredData]);

  return (
    <TiltableContainer>
      <form className={styles.propertyFilter}>
        <fieldset>
          <h5>Art</h5>
          {filterungArray.map((filter) => {
            return (
              <label>
                <input
                  onChange={setArrayValues}
                  type="checkbox"
                  name="filterung"
                  value={filter}
                />
                {filter}
              </label>
            );
          })}
        </fieldset>
        <fieldset>
          <h5>Zimmer</h5>
          <select onChange={setStringValues} name="zimmer">
            <option value="">Alle</option>
            {zimmerArray.map((zimmer) => {
              return <option value={zimmer}>{zimmer}</option>;
            })}
          </select>
        </fieldset>
        <fieldset>
          <h5>Verfügbare Orte</h5>
          <select onChange={setStringValues} name="ort">
            <option value="">Alle</option>
            {ortArray.map((ort) => {
              return <option value={ort}>{ort}</option>;
            })}
          </select>
        </fieldset>
        <fieldset>
          <h5>Preis</h5>
          <div className={styles.rowSpacedBetween}>
            <label>
              Von
              <input
                onChange={setStringValues}
                type="text"
                name="priceFrom"
                className={styles.shortUnderlineInput}
              />
            </label>
            <label>
              Bis
              <input
                onChange={setStringValues}
                type="text"
                name="priceTo"
                className={styles.shortUnderlineInput}
              />
            </label>
          </div>
        </fieldset>
      </form>
    </TiltableContainer>
  );
};

export default PropertyFilter;
