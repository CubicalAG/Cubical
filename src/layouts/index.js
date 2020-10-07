import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import NavMenuContainer from '../components/NavMenuContainer'
import NavLink from '../components/NavLink'
import styles from './layout.module.scss'
import Logo from '../components/Logo'
import FooterContainer from '../components/FooterContainer'
import BackgroundImage from '../components/BackgroundImage'
import flagImg from '../img/flag.svg'
import NewsletterForm from '../components/NewsletterForm'
import AsideNavContainer from '../components/AsideNavContainer'
import NavLinkVertical from '../components/NavLinkVertical'
import footerImg from '../img/footer-background.png'
import ContactForm from '../components/ContactForm'
import closeWhite from '../img/close-white.svg'
import facebookLogo from '../img/logo-facebook.svg'
import instagramLogo from '../img/logo-instagram.svg'

const Layout = ({children, location}) => {

    const [contactButtonClicked, setContactButtonClicked] = useState(false)

    const toggleChat = () => {
        Tawk_API.toggle()
    }

    return(
        <div className={styles.layout}>
            <NavMenuContainer>
                <ul>
                    <NavLink link={{href:'/immobilien/', text: 'immobilien'}}/>
                    <NavLink link={{href:false, text: 'dienstleistungen'}} subLinks={[
                        {href:'/dienstleistungen/verkaufen/', text: 'verkaufen'},
                        {href:'/dienstleistungen/vermieten/', text: 'vermieten'},
                        {href:'/dienstleistungen/investieren-begleiten/', text: 'investieren & begleiten'}
                    ]}/>
                    <NavLink link={{href:'/gut-zu-wissen/', text: 'gut zu wissen'}}/>
                    <NavLink link={{href:'/referenzen/', text: 'referenzen'}}/>
                    <NavLink link={{href:'/ueber-uns/', text: 'über uns'}} subLinks={[
                        {href:'/ueber-uns/team/', text: 'team'},
                        {href:'/ueber-uns/medien/', text: 'medien'},
                        {href:'/ueber-uns/soziales-engagement/', text: 'soziales engagement'},
                        {href:'/ueber-uns/partner/', text: 'partner'},
                        {href:'/ueber-uns/stellen/', text: 'stellen'},
                    ]}/>
                </ul>
                <div className={styles.logoContainer}>
                    <Logo/>
                </div>
            </NavMenuContainer>
            <main>
                <div className={styles.mainContent}>
                    {children}
                </div>
                <div className={styles.mainContentNavigation}>
                    <div className={styles.navigationStickyContainer}>
                        <AsideNavContainer>
                            <NavLinkVertical link={{href:false, text:'Folge uns'}}>
                                <div className={styles.socialIcons}>
                                    <a href='https://facebook.com'>
                                        <img src={facebookLogo} alt='facebook'/>
                                    </a>
                                    <a href='https://instagram.com'>
                                        <img src={instagramLogo} alt='instagram'/>
                                    </a>
                                </div>
                            </NavLinkVertical>
                            <NavLinkVertical link={{href:false, text:'Chat'}} onClick={() => toggleChat()}>
                            </NavLinkVertical>
                            <NavLinkVertical active={contactButtonClicked} link={{href:false, text:'Kontakt'}} onClick={() => setContactButtonClicked(prevState => !prevState)}>
                                <div style={{display: contactButtonClicked ? 'flex' : 'none'}} className={styles.contactFormContainer}>
                                    <ContactForm>
                                        <img style={{alignSelf:'flex-start', width:40, marginBottom:15, cursor:'pointer'}} src={closeWhite} alt='close' onClick={() => setContactButtonClicked(false)}/>
                                    </ContactForm>
                                </div>
                            </NavLinkVertical>
                        </AsideNavContainer>
                    </div>
                </div>
            </main>
            <FooterContainer>
                <BackgroundImage image={footerImg}/>
                <div className={styles.footerInfoContent}>
                    <img src={flagImg} alt=''/>
                    <h2>NOBIL IMMO GMBH</h2>
                    <p>
                        <span>
                            Baslerstrasse 30, 8048 Zürich
                        </span>
                        <br/>
                        <span>Tel +41 44 202 01 05</span> , <span>info@nobilimmo.ch</span>
                    </p>
                    <p>
                        <span>
                            Baslerstrasse 30, 8048 Zürich
                        </span>
                        <br/>
                        <span>Tel +41 44 202 01 05</span> , <span>info@nobilimmo.ch</span>
                    </p>
                    <h2>NEWSLETTER</h2>
                    <NewsletterForm/>
                </div>
                <div className={styles.footerNavigation}>
                    <AsideNavContainer>
                        <NavLinkVertical link={{href:'/datenschutz/', text:'DATENSCHUTZ'}}>
                            
                        </NavLinkVertical>
                        <NavLinkVertical link={{href:'/impressum/', text:'IMPRESSUM'}}>
                            
                        </NavLinkVertical>
                        <NavLinkVertical link={{href:false, text:'Folge uns'}}>
                            <div className={styles.socialIcons}>
                                <a href='https://facebook.com'>
                                    <img src={facebookLogo} alt='facebook'/>
                                </a>
                                <a href='https://instagram.com'>
                                    <img src={instagramLogo} alt='instagram'/>
                                </a>
                            </div>
                        </NavLinkVertical>
                    </AsideNavContainer>
                </div>
            </FooterContainer>
        </div>
    )
}

export default Layout