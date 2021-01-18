import React, { useEffect, useState } from 'react'

import styles from './property-filter.module.scss'
import RoofSVG from '../RoofSVG'
import TiltableContainer from '../TiltableContainer'

const PropertyFilter = ({data, filters, setFilters}) => {
  
  const [filterungArray, setFilterungArray] = useState([])
  const [zimmerArray, setZimmerArray] = useState([])
  const [ortArray, setOrtArray] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const filteredArray = data.filter(({node:property}) => {
      if(property.uid != "familienhaus"){
        return true
      }
    })

    setFilteredData(filteredArray)
  }, [])

  const setArrayValues = (e) => {
    const targetName = e.target.name
    const targetValue = e.target.value
    
    if(!filters[targetName]){
      setFilters(prevState => ({
        ...prevState,
        [targetName]:[targetValue]
      }))
    }else{
      if(filters[targetName].findIndex(value => value == targetValue) == -1){
        setFilters(prevState => ({
          ...prevState,
          [targetName]: [...prevState[targetName],targetValue]
        }))
      }else{
        setFilters(prevState => {
          let valueArrayCopy = [...prevState[targetName]];
          return {
            ...prevState,
            [targetName]: [...valueArrayCopy.filter(value => value != targetValue)]
          }
        }
        )
      }
    }
  }

  const setStringValues = (e) => {
    const targetName = e.target.name
    const targetValue = e.target.value

    if(!filters[targetName]){
      setFilters(prevState => ({
        ...prevState,
        [targetName]:targetValue
      }))
    }else{
      setFilters(prevState => ({...prevState,[targetName]: targetValue}))
    }
  }

  useEffect(() => {
    let filterungSet = new Set(filteredData.map(({node:property}) => {
      if(property.data.category){
        return property.data.category
      }
    }))

    setFilterungArray([...filterungSet])
    
    let zimmerSet = new Set(filteredData.map(({node:property}) => {
      if(property.data.zimmer){
        return property.data.zimmer
      }
    }))

    setZimmerArray([...zimmerSet])
    
    let ortSet = new Set(filteredData.map(({node:property}) => {
      if(property.data.ort){
        return property.data.ort
      }
    }))

    setOrtArray([...ortSet])
    
  }, [])

  return(
    <TiltableContainer>
      <form className={styles.propertyFilter}>
        <fieldset>
          <h5>Art</h5>
          {
            filterungArray.map(filter => {
              return <label>
                  <input
                  onChange={setArrayValues}
                  type="checkbox" name="filterung" value={filter} />
                  {filter}
                </label>
            })
          }
        </fieldset>
        <fieldset>
          <h5>Zimmer</h5>
          <select onChange={setStringValues} name='zimmer'>
            <option value=''>Alle</option>
            {zimmerArray.map(zimmer => {
                return <option value={zimmer}>
                  {zimmer}
                </option>
            })}
          </select>
        </fieldset>
        <fieldset>
          <h5>Ort</h5>
          <select onChange={setStringValues} name='ort'>
            <option value=''>Alle</option>
            {ortArray.map(ort => {
                return <option value={ort}>
                  {ort}
                </option>
            })}
          </select>
        </fieldset>
        <fieldset>
          <h5>Preis</h5>
          <div className={styles.rowSpacedBetween}>
            <label>
              Von
              <input onChange={setStringValues} type='text' name='priceFrom' className={styles.shortUnderlineInput}/>
            </label>
            <label>
              Bis
              <input onChange={setStringValues} type='text' name='priceTo' className={styles.shortUnderlineInput}/>
            </label>
          </div>
        </fieldset>
      </form>
    </TiltableContainer>
  )
}

export default PropertyFilter