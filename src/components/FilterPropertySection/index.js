import React, {useState, useEffect} from 'react'
import {animated, useTransition} from 'react-spring'
import {Link, useStaticQuery, graphql} from 'gatsby'

import PropertyFilter from '../PropertyFilter'
import Section from '../Section'
import TextImageBox from '../TextImageBox'
import BottomBorderedContainer from '../BottomBorderedContainer'
import SpacedItemsContainer from '../SpacedItemsContainer'
import property from '../../img/property.png'
import ButtonBordered from '../ButtonBordered'

import styles from './filter-property-section.module.scss'
import TiltableContainer from '../TiltableContainer'
import PropertySorting from '../PropertySorting'

const FilterPropertySection = ({kaufenProperties, mietenProperties}) => {
  
  const data = useStaticQuery(graphql`
    query FilterPropertyQuery{
      allPrismicProperty(sort: {order: DESC, fields: last_publication_date}){
        edges{
          node{
            data {
              besichtigung_information {
                html
              }
              category
              description {
                html
              }
              images {
                image {
                  alt
                  localFile {
                      childImageSharp {
                          fluid(maxWidth:1000){
                              ...GatsbyImageSharpFluid
                          }
                      }
                  }
                }
              }
              important_information {
                information_name
                information_value
              }
              ort
              other_information {
                information_name
                information_value
              }
              preis
              property_document {
                url
              }
              property_document_card_text
              property_geocode {
                latitude
                longitude
              }
              property_heading
              type_of_property
              wohnflache
              zimmer
            }
            uid
          }
        }
      }
    }
  `)

  const [numOfLoadedItems, setNumOfLoadedItems] = useState(5)
  const [scrollFromTop, setScrollFromTop] = useState(0)
  const [filters, setFilters] = useState({})
  const [sorting, setSorting] = useState({})
  const [filteredData, setFilteredData] = useState([])
  const [properties, setProperties] = useState([])


  const transitions = useTransition(filteredData, {
    from: { maxHeight: '0vh', overflow:'hidden', opacity:0 },
    enter: { maxHeight: '250vh', overflow:'hidden', opacity:1 },
    leave: { maxHeight: '0vh', overflow:'hidden', opacity:0 },
    })

  const setScrollPosition = () => {
      setScrollFromTop(window.pageYOffset)
  }

  useEffect(() => {
    let filteredArray = data.allPrismicProperty.edges.filter(({node:property}) => {
      if(kaufenProperties){
        if(property.data.type_of_property == false){
          return true
        }
      }else if(mietenProperties){
        if(property.data.type_of_property == true){
          return true
        }
      }
    })
    setProperties([...filteredArray])
  }, [])

  useEffect(() => {   
      window.scrollTo(0, scrollFromTop)
  }, [numOfLoadedItems])


  useEffect(() => {
    //filtering function
    
    //filterung filter
    //filter for Prismic lost data that cannot be removed
    let filteredArray = properties.filter(({node:property}) => {
      if(property.uid != "familienhaus"){
        return true
      }
    })

    filteredArray = filteredArray.filter(({node:property}) => {
      if((filters.filterung && (filters.filterung.indexOf(property.data.category) != -1)) || (!filters.filterung || filters.filterung.length <= 0)){
        return true
      }
    })
    
    //zimmer filter
    filteredArray = filteredArray.filter(({node:property}) => {

      let numberOfRooms = Number(property.data.zimmer)

      let zimmerMapping;

      if(numberOfRooms < 2){
        zimmerMapping = 'bis zu Zimmer'
      }else if(numberOfRooms >= 2 && numberOfRooms < 3){
        zimmerMapping = '2-3 Zimmer' 
      }else if(numberOfRooms >= 3 && numberOfRooms < 4){
        zimmerMapping = '3-4 Zimmer' 
      }else if(numberOfRooms >= 4 && numberOfRooms < 5){
        zimmerMapping = '4-5 Zimmer' 
      }else if(numberOfRooms >= 5){
        zimmerMapping = 'über 5 Zimmer'
      }

      if((property.data.zimmer && (filters.zimmer == zimmerMapping)) || !filters.zimmer){
        return true
      }
    })

    //ort filter
    filteredArray = filteredArray.filter(({node:property}) => {
      if((property.data.ort && (filters.ort == property.data.ort)) || !filters.ort){
        return true
      }
    })

    //price from filter
    filteredArray = filteredArray.filter(({node:property}) => {
      if((property.data.preis && (filters.priceFrom <= property.data.preis)) || !filters.priceFrom){
        return true
      }
    })

    //price to filter
    filteredArray = filteredArray.filter(({node:property}) => {
      if((property.data.preis && (filters.priceTo > property.data.preis)) || !filters.priceTo){
        return true
      }
    })

    //sorting functionality

    if(sorting.preis == 'ASC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyA.data.preis - propertyB.data.preis
      })
    }
    if(sorting.preis == 'DESC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyB.data.preis - propertyA.data.preis
      })
    }

    if(sorting.zimmer == 'ASC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyA.data.zimmer - propertyB.data.zimmer
      })
    }
    if(sorting.zimmer == 'DESC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyB.data.zimmer - propertyA.data.zimmer
      })
    }

    if(sorting.wohnflache == 'ASC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyA.data.wohnflache - propertyB.data.wohnflache
      })
    }
    if(sorting.wohnflache == 'DESC'){
      filteredArray = filteredArray.sort(({node:propertyA}, {node:propertyB}) => {
        return propertyB.data.wohnflache - propertyA.data.wohnflache
      })
    }

    setFilteredData(filteredArray || data.allPrismicProperty.edges)
  }, [filters, sorting, properties])

  return(
    <Section>
      <div className={styles.row}>
        <div className={styles.stickyFilterContainer}>
          <div className={styles.filterContainer}>
            <PropertyFilter data={properties} filters={filters} setFilters={setFilters}/>
          </div>
        </div>
        <div className={styles.properties}>
          <div className={`${styles.infoAndSorting} ${styles.rowSpaced}`}>
            <h2>{filteredData.length} Immobilien gefunden</h2>
            {/* <PropertySorting sorting={sorting} setSorting={setSorting}/> */}
          </div>
          {transitions((style, {node:item}, t, index) => {
                if(index < numOfLoadedItems){
                    return <animated.div style={style} className={styles.property}>
                                <TextImageBox image={item.data.images && item.data.images.length > 0 && item.data.images[0].image && item.data.images[0].image.localFile && item.data.images[0].image.localFile.childImageSharp.fluid} alt={item.data.images[0].image.alt}>
                                <h3>{item.data.property_heading}</h3>
                                <BottomBorderedContainer>
                                    <SpacedItemsContainer>
                                        <p>Filterung</p>
                                        <p>{item.data.category}</p>
                                    </SpacedItemsContainer>
                                </BottomBorderedContainer>
                                <BottomBorderedContainer>
                                    <SpacedItemsContainer>
                                        <p>Zimmer</p>
                                        <p>{item.data.zimmer}</p>
                                    </SpacedItemsContainer>
                                </BottomBorderedContainer>
                                <BottomBorderedContainer>
                                    <SpacedItemsContainer>
                                        <p>Ort</p>
                                        <p>{item.data.ort}</p>
                                    </SpacedItemsContainer>
                                </BottomBorderedContainer>
                                <BottomBorderedContainer>
                                    <SpacedItemsContainer>
                                        <p>Preis</p>
                                        <p>CHF {item.data.preis}</p>
                                    </SpacedItemsContainer>
                                </BottomBorderedContainer>
                                <BottomBorderedContainer>
                                    <SpacedItemsContainer>
                                        <p>Wohnfläche</p>
                                        <p>{item.data.wohnflache} m<sup>2</sup></p>
                                    </SpacedItemsContainer>
                                </BottomBorderedContainer>
                                <ButtonBordered>
                                  <Link to={`/${item.data.type_of_property ? 'mieten' : 'kaufen'}/${item.uid}`}>
                                    Weitere Infos
                                  </Link>
                                </ButtonBordered>
                            </TextImageBox> 
                    </animated.div>
                }
            })}
            {
              filteredData.length > numOfLoadedItems &&
          <div className={styles.seeMoreButton}>
              <ButtonBordered onClick={() => {setScrollPosition();setNumOfLoadedItems(prevState => prevState + 5)}}>
                  Mehr Anzeigen
              </ButtonBordered>
          </div>
            }
        </div>
      </div>
    </Section>
  )
}

export default FilterPropertySection