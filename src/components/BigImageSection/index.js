import React from 'react'

import styles from './big-image-section.module.scss'
import BackgroundImage from '../BackgroundImage'

const BigImageSection = ({image, children, title, ...rest}) => {
    return(
        <section {...rest} className={styles.bigImageSection}>
            <BackgroundImage image={image}/>
            <h3>{title}</h3>
            {children}
        </section>
    )
}

export default BigImageSection