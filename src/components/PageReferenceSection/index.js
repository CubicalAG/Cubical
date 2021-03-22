import React, {useState, useEffect} from 'react'
import {useStaticQuery, graphql} from 'gatsby'

import Section from '../../components/Section'
import ButtonBordered from '../../components/ButtonBordered'
import Reference from '../../components/Reference'
import referenceImg from '../../img/background1.jpg'

import styles from './page-reference-section.module.scss'

const PageReferenceSection = ({data:sliceData}) => {
  
  const [numOfLoadedItems, setNumOfLoadedItems] = useState(1)
  const [scrollFromTop, setScrollFromTop] = useState(0)
  const [filteredData, setFilteredData] = useState('')

  const data = useStaticQuery(graphql`
    query PrismicSectionQuery {
        references: allPrismicReference(sort: {fields: last_publication_date, order: DESC}) {
        edges {
            node {
                data {
                    body {
                    html
                    }
                    button
                    button_link{
                        url
                        uid
                        document {
                            data {
                              type_of_property
                            }
                        }
                    }
                    reference_tag
                    cover_image {
                        alt
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 940, quality: 100) {
                                  ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                    heading
                }
            }
        }
        }
    }
  `)

  const setScrollPosition = () => {
      setScrollFromTop(window.pageYOffset)
  }

  useEffect(() => {   
      window.scrollTo(0, scrollFromTop)
  }, [numOfLoadedItems])

  useEffect(() => {
    if(data && data.references && data.references.edges && data.references.edges.length > 0){
        setFilteredData(data.references.edges.filter(({node:reference}) => {
            if(reference && reference.data && reference.data.reference_tag && (reference.data.reference_tag == sliceData.primary.reference_by_tag)){
                return true
            }else if(sliceData.primary.reference_by_tag == null){
                return true
            }else{
                return false
            }
        }))
    }
  }, [])

  return(
    filteredData && filteredData.length > 0 &&
    <Section id={(sliceData && sliceData.primary && sliceData.primary.section_id) ? data.primary.section_id : ''} fullWidth>
        {
            sliceData &&
            sliceData.primary &&
            sliceData.primary.section_content &&
            sliceData.primary.section_content.html &&
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{__html:sliceData.primary.section_content.html}}></div>
        }
        {filteredData && filteredData.map(({node:reference}, index) => {
            if(index < numOfLoadedItems){
                return <div className={`${styles.referenceItem} ${styles.visibleItem}`}>
                <Reference button={reference.data.button} buttonLink={reference.data.button_link} image={reference.data.cover_image && reference.data.cover_image.localFile.childImageSharp.fluid} alt={reference.data.cover_image && reference.data.cover_image.alt} quote={reference.data.heading} text={
                    <div dangerouslySetInnerHTML={{__html:reference.data.body && reference.data.body.html}}>
                    </div>
                }/>
                </div>
            }
        })}
        {
            data.references.edges && (data.references.edges.length > numOfLoadedItems) &&
            <div className={styles.seeMoreButton}>
                <ButtonBordered onClick={() => {setScrollPosition();setNumOfLoadedItems(prevState => prevState + 5)}}>
                    Mehr Anzeigen
                </ButtonBordered>
            </div>
        }
    </Section>
  )
}

export default PageReferenceSection