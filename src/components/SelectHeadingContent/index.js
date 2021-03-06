import React, {useState} from 'react'
import RoofSVG from '../RoofSVG'

import styles from './select-heading-content.module.scss'

const SelectHeadingContent = ({column, data}) => {


    const [activeHeading, setActiveHeading] = useState(0)

    if(data.some(item => item.select_heading_content_heading != null)){
        return(
            <article className={`${styles.selectHeadingContent} ${column && styles.columnDirection}`}>
                <div className={styles.headings}>
                    {data.map((item, index) => {
                        if(item.select_heading_content_heading){
                            return <h5 onClick={() => setActiveHeading(index)} class={activeHeading === index && styles.activeHeading}>
                                
                                {item.select_heading_content_heading}
                            </h5>
                        }
                    })}
                </div>
                <div className={styles.content}>
                    {data.map((item, index) => {
                        if(item.select_heading_content_body){
                            return <div style={{display:activeHeading === index ? 'block':'none'}} 
                                dangerouslySetInnerHTML={{__html:item.select_heading_content_body && item.select_heading_content_body.html}}
                            >
                            </div>
                        }
                    })}
                </div>
            </article>
        )
    }else{
        return <></>
    }
}

export default SelectHeadingContent