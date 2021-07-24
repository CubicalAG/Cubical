import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring, useTransition } from "react-spring";
import { useStaticQuery, graphql, Link } from "gatsby";

import NavMenuContainer from "../components/NavMenuContainer";
import NavLink from "../components/NavLink";
import styles from "./layout.module.scss";
import Logo from "../components/Logo";
import FooterContainer from "../components/FooterContainer";
import BackgroundImage from "../components/BackgroundImage";
import AsideNavContainer from "../components/AsideNavContainer";
import NavLinkVertical from "../components/NavLinkVertical";
import ContactForm from "../components/ContactForm";
import close from "../img/close.svg";
import closeBlue from "../img/closeBlue.svg";
import ButtonBordered from "../components/ButtonBordered";
import MobileMenuLink from "../components/MobileMenuLink";
import SEO from "../components/SEO";
import menuIcon from "../img/menu-outline.svg";

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      prismicLayout {
        data {
          background_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          footer_primary_content {
            text
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            bold
          }
          footer_content {
            html
          }
          footer_buttons {
            button_text
            button_link {
              url
              document {
                data {
                  page_path
                }
              }
            }
          }
          footer_links {
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            link_text
          }
          left_side_links {
            content_background_color
            link_content {
              html
            }
            image {
              localFile {
                url
              }
              alt
            }
          }
          link_hover_icons {
            image {
              alt
              localFile {
                url
              }
            }
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            parent_link
          }
          links {
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            link_text
          }
          logo_primary_image {
            alt
            localFile {
              absolutePath
            }
          }
          right_side_link_hover_icons {
            image {
              alt
              localFile {
                url
              }
            }
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            parent_link
          }
          right_side_links {
            link {
              url
              document {
                data {
                  page_path
                }
              }
            }
            link_text
          }
          sublinks {
            parent_link
            sublink_text
            sublink {
              url
              document {
                data {
                  page_path
                }
              }
            }
          }
          icon {
            url
          }
          seo_description
          seo_lang_code
          seo_title
          theme_color
          title
          website_url {
            url
          }
        }
      }
    }
  `);

  const dispatch = useDispatch();

  const logoPropsRef = useRef();
  const linkListPropsRef = useRef();

  let contactButtonClicked = useSelector((state) => state.contactFormOpened);

  const [showNavIcons, setShowNavIcons] = useState(false);
  const navMenuContainerAnimationRef = useRef();

  const vhToPixel = (value) =>
    `${typeof window != "undefined" && (window.innerHeight * value) / 100}`;

  useEffect(() => {
    dispatch({ type: "PAGE_LOADED" });

    setTimeout(() => {
      dispatch({ type: "PAGE_LOADED_MINIMAL" });
    }, 1500);
  }, []);

  const navIconsTransition = useTransition(showNavIcons, {
    from: { transform: "translate(-100%, -50%)" },
    enter: { transform: "translate(0%, -50%)" },
    leave: { transform: "translate(-100%, -50%)" },
  });

  const rightNavIconsTransition = useTransition(showNavIcons, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const contactFormTransition = useTransition(contactButtonClicked, {
    from: { opacity: "0" },
    enter: { opacity: "1" },
    leave: { opacity: "0" },
  });

  useEffect(() => {
    if (typeof window != "undefined") {
      window.addEventListener("scroll", () => {
        let scrolledPixels = vhToPixel(65);
        if (window.scrollY > Number(scrolledPixels)) {
          setShowNavIcons(true);
        } else if (location.pathname === "/kontakt") {
          setShowNavIcons(true);
        } else {
          setShowNavIcons(false);
        }
      });
    }
  });

  const pageLoaded = useSelector((state) => state.pageLoaded);
  const pageLoadedMinimal = useSelector((state) => state.pageLoadedMinimal);

  const linkListProps = useSpring({
    opacity: pageLoaded ? 1 : 0,
    config: {
      duration: 0,
    },
    ref: linkListPropsRef,
  });

  const logoProps = useSpring({
    position: "absolute",
    top: pageLoaded ? "0%" : "-50%",
    right: pageLoaded ? "0%" : "50%",
    transform: pageLoaded ? "translateX(0%)" : "translateX(50%)",
    config: {
      duration: 200,
    },
    ref: logoPropsRef,
  });

  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return (
    <div className={styles.layout}>
      <SEO>
        {data.prismicLayout.data.seo_lang_code && (
          <html lang={data.prismicLayout.data.seo_lang_code} />
        )}
        {data.prismicLayout.data.seo_title && (
          <title>{data.prismicLayout.data.seo_title}</title>
        )}
        {data.prismicLayout.data.seo_title && (
          <meta
            property="og:title"
            content={data.prismicLayout.data.seo_title}
          />
        )}
        {data.prismicLayout.data.seo_description && (
          <meta
            name="description"
            content={data.prismicLayout.data.seo_description}
          />
        )}
        {data.prismicLayout.data.icon && data.prismicLayout.data.icon.url && (
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={data.prismicLayout.data.icon.url}
          />
        )}
        {data.prismicLayout.data.icon && data.prismicLayout.data.icon.url && (
          <link
            rel="icon"
            type="image/png"
            href={data.prismicLayout.data.icon.url}
            sizes="32x32"
          />
        )}
        {data.prismicLayout.data.icon && data.prismicLayout.data.icon.url && (
          <link
            rel="icon"
            type="image/png"
            href={data.prismicLayout.data.icon.url}
            sizes="16x16"
          />
        )}
        {data.prismicLayout.data.icon && data.prismicLayout.data.icon.url && (
          <link
            rel="mask-icon"
            href={data.prismicLayout.data.icon.url}
            color="#f04d23"
          />
        )}
        {data.prismicLayout.data.icon && data.prismicLayout.data.icon.url && (
          <meta
            property="og:image"
            content={data.prismicLayout.data.icon.url}
          />
        )}
        {data.prismicLayout.data.theme_color && (
          <meta
            name="theme-color"
            content={data.prismicLayout.data.theme_color}
          />
        )}

        <meta property="og:type" content="business.business" />

        {data.prismicLayout.data.website_url &&
          data.prismicLayout.data.website_url.url && (
            <meta
              property="og:url"
              content={data.prismicLayout.data.website_url.url}
            />
          )}
      </SEO>
      <NavMenuContainer
        navMenuContainerAnimationRef={navMenuContainerAnimationRef}
      >
        <animated.ul style={linkListProps}>
          {data.prismicLayout.data.links &&
            data.prismicLayout.data.links.length > 0 &&
            data.prismicLayout.data.links.map((link, index) => {
              let sublinks =
                data.prismicLayout.data.sublinks &&
                data.prismicLayout.data.sublinks.length > 0 &&
                data.prismicLayout.data.sublinks
                  .filter((sublink) => sublink.parent_link == index + 1)
                  .map((sublink) => ({
                    href:
                      sublink.sublink &&
                      (sublink.sublink.document &&
                      sublink.sublink.document[0] &&
                      sublink.sublink.document[0].data.page_path
                        ? sublink.sublink.document[0].data.page_path
                        : sublink.sublink.url),
                    text: sublink.sublink_text,
                  }));

              return (
                <NavLink
                  link={{
                    href:
                      link.link &&
                      (link.link.document &&
                      link.link.document[0].data.page_path
                        ? link.link.document[0].data.page_path
                        : link.link.url),
                    text: link.link_text,
                  }}
                  subLinks={sublinks}
                />
              );
            })}
        </animated.ul>
        <animated.div style={linkListProps} className={styles.mobile}>
          <button onClick={() => setMobileMenuActive(true)}>
            <img src={menuIcon} alt="menu" />
          </button>
          <div
            className={`${styles.mobileMenu} ${
              mobileMenuActive && styles.mobileMenuActive
            }`}
          >
            <img
              className={styles.closeMobileMenuButton}
              style={{
                alignSelf: "flex-start",
                width: 40,
                marginBottom: 15,
                cursor: "pointer",
              }}
              src={close}
              alt="close"
              onClick={() => setMobileMenuActive(false)}
            />
            {/* <MobileMenuLink link={{href:'/kaufen/', text: 'kaufen'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/dienstleistungen/mieten/', text: 'mieten'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/dienstleistungen/verkaufen/', text: 'verkaufen'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/referenzen/', text: 'referenzen'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/kontakt/', text: 'kontakt'}} button deactivated onClick={() => {setMobileMenuActive(false); dispatch({type:'toggle_contact_form'})}}/> */}
            {data.prismicLayout.data.links &&
              data.prismicLayout.data.links.length > 0 &&
              data.prismicLayout.data.links.map((link, index) => {
                let sublinks =
                  data.prismicLayout.data.sublinks &&
                  data.prismicLayout.data.sublinks.length > 0 &&
                  data.prismicLayout.data.sublinks
                    .filter((sublink) => sublink.parent_link == index + 1)
                    .map((sublink) => ({
                      href:
                        sublink.sublink &&
                        (sublink.sublink.document &&
                        sublink.sublink.document[0] &&
                        sublink.sublink.document[0].data.page_path
                          ? sublink.sublink.document[0].data.page_path
                          : sublink.sublink.url),
                      text: sublink.sublink_text,
                    }));

                return (
                  <MobileMenuLink
                    link={{
                      href:
                        link.link &&
                        (link.link.document &&
                        link.link.document[0] &&
                        link.link.document[0].data.page_path
                          ? link.link.document[0].data.page_path
                          : link.link.url),
                      text: link.link_text,
                    }}
                    subLinks={sublinks}
                    onClick={() => setMobileMenuActive(false)}
                  />
                );
              })}
            {/* <MobileMenuLink link={{href:'/kontakt/', text: 'kontakt'}} button onClick={() => {dispatch({type:'toggle_contact_form'});setMobileMenuActive(false); console.log('activated')}}/> */}
            {/* <MobileMenuLink link={{href:'/immobilien/', text: 'immobilien'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/blog/', text: 'blog'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink deactivated link={{href:'/dienstleistungen/', text: 'dienstleistungen'}} subLinks={[
                            {href:'/dienstleistungen/verkaufen/', text: 'verkaufen'},
                            {href:'/dienstleistungen/vermieten/', text: 'vermieten'},
                            {href:'/dienstleistungen/investieren-begleiten/', text: 'investieren & begleiten'}
                        ]}
                        onClick={() => setMobileMenuActive(false)}
                        />
                        <MobileMenuLink link={{href:'/gut-zu-wissen/', text: 'gut zu wissen'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/referenzen/', text: 'referenzen'}} onClick={() => setMobileMenuActive(false)}/>
                        <MobileMenuLink link={{href:'/ueber-uns/', text: 'über uns'}} subLinks={[
                            {href:'/ueber-uns/team/', text: 'team'},
                            {href:'/ueber-uns/medien/', text: 'medien'},
                            {href:'/ueber-uns/soziales-engagement/', text: 'soziales engagement'},
                            {href:'/ueber-uns/partner/', text: 'partner'},
                            {href:'/ueber-uns/stellen/', text: 'stellen'},
                        ]}
                        onClick={() => setMobileMenuActive(false)}
                        /> */}
          </div>
        </animated.div>
        <animated.div style={logoProps} className={styles.logoContainer}>
          <Logo
            afterLogoAnimations={[
              logoPropsRef,
              linkListPropsRef,
              navMenuContainerAnimationRef,
            ]}
          />
        </animated.div>
        <div
          style={{
            visibility: "hidden",
            opacity: 0,
          }}
          className={styles.logoContainer}
        >
          <Logo />
        </div>
      </NavMenuContainer>
      <main>
        <div className={`${styles.mainContentNavigation}`}>
          {navIconsTransition(
            (style, item) =>
              item && (
                <animated.div
                  style={style}
                  className={`${styles.navigationStickyContainer} ${styles.navigationStickyContainerLeft}`}
                >
                  {data.prismicLayout.data.left_side_links &&
                    data.prismicLayout.data.left_side_links.length > 0 && (
                      <AsideNavContainer
                        className={styles.leftSideNavContainer}
                      >
                        {data.prismicLayout.data.left_side_links.map((link) => {
                          if (link.link_content && link.link_content.html) {
                            return (
                              <li
                                className={styles.leftSideLink}
                                href={
                                  link.link &&
                                  (link.link.document &&
                                  link.link.document[0] &&
                                  link.link.document[0].data.page_path
                                    ? link.link.document[0].data.page_path
                                    : link.link.url)
                                }
                              >
                                <div
                                  style={{
                                    backgroundColor:
                                      link.content_background_color,
                                  }}
                                  className={styles.linkContent}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      link.link_content &&
                                      link.link_content.html,
                                  }}
                                ></div>
                                {link.image && link.image.localFile && (
                                  <img
                                    src={link.image.localFile.url}
                                    alt={link.image.alt}
                                  />
                                )}
                              </li>
                            );
                          }
                        })}
                      </AsideNavContainer>
                    )}
                </animated.div>
              )
          )}
        </div>
        <div className={styles.mainContent}>{children}</div>
        <div className={styles.mainContentNavigation}>
          {rightNavIconsTransition(
            (style, item) =>
              item && (
                <animated.div
                  style={style}
                  className={styles.navigationStickyContainer}
                >
                  <AsideNavContainer rotated>
                    {data.prismicLayout.data.right_side_links &&
                      data.prismicLayout.data.right_side_links.length > 0 &&
                      data.prismicLayout.data.right_side_links.map(
                        (link, index) => {
                          return (
                            <NavLinkVertical
                              link={{
                                href:
                                  link.link &&
                                  (link.link.document &&
                                  link.link.document[0] &&
                                  link.link.document[0].data.page_path
                                    ? link.link.document[0].data.page_path
                                    : link.link.url),
                                text: link.link_text,
                              }}
                            >
                              <div className={styles.socialIcons}>
                                {data.prismicLayout.data
                                  .right_side_link_hover_icons &&
                                  data.prismicLayout.data
                                    .right_side_link_hover_icons.length > 0 &&
                                  data.prismicLayout.data.right_side_link_hover_icons
                                    .filter(
                                      (link) => link.parent_link == index + 1
                                    )
                                    .map((sublink) => {
                                      return (
                                        <a
                                          href={
                                            sublink.link &&
                                            (sublink.link.document &&
                                            sublink.link.document[0] &&
                                            sublink.link.document[0].data
                                              .page_path
                                              ? sublink.link.document[0].data
                                                  .page_path
                                              : sublink.link.url)
                                          }
                                        >
                                          {sublink.image &&
                                            sublink.image.localFile && (
                                              <img
                                                src={
                                                  sublink.image.localFile.url
                                                }
                                                alt={sublink.image.alt}
                                              />
                                            )}
                                        </a>
                                      );
                                    })}
                              </div>
                            </NavLinkVertical>
                          );
                        }
                      )}
                  </AsideNavContainer>
                </animated.div>
              )
          )}
        </div>
      </main>
      <FooterContainer>
        {data.prismicLayout.data.background_image && (
          <BackgroundImage
            image={
              data.prismicLayout.data.background_image &&
              data.prismicLayout.data.background_image.localFile &&
              data.prismicLayout.data.background_image.localFile.childImageSharp
                .fluid
            }
          />
        )}
        <div className={styles.footerContent}>
          {/* <div className={styles.footerIconContainer}>
                        {!isSSR && (
                            <React.Suspense fallback={'Loading'}>
                                <LazyFooterIcon/>
                            </React.Suspense>
                        )}
                    </div> */}
          {data.prismicLayout.data.footer_primary_content &&
            data.prismicLayout.data.footer_primary_content.length > 0 && (
              <div
                className={`${styles.footerInfoContent} ${styles.footerPrimaryContent}`}
              >
                {data.prismicLayout.data.footer_primary_content.map((item) => {
                  return (
                    <p>
                      {item.bold == "true" ? (
                        <Link
                          to={
                            item.link &&
                            (item.link.document &&
                            item.link.document[0] &&
                            item.link.document[0].data.page_path
                              ? item.link.document[0].data.page_path
                              : item.link.url)
                          }
                        >
                          <b>{item.text}</b>
                        </Link>
                      ) : (
                        <Link
                          to={
                            item.link &&
                            (item.link.document &&
                            item.link.document[0] &&
                            item.link.document[0].data.page_path
                              ? item.link.document[0].data.page_path
                              : item.link.url)
                          }
                        >
                          {item.text}
                        </Link>
                      )}
                    </p>
                  );
                })}
                <div
                  className={`${styles.footerInfoContent} ${styles.footerContact}`}
                >
                  {data.prismicLayout.data.footer_content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.prismicLayout.data.footer_content.html,
                      }}
                    ></div>
                  )}
                  <div className={styles.footerButtons}>
                    {data.prismicLayout.data.footer_buttons &&
                      data.prismicLayout.data.footer_buttons.length > 0 &&
                      data.prismicLayout.data.footer_buttons.map((button) => {
                        return (
                          <Link
                            to={
                              button.button_link &&
                              (button.button_link.document &&
                              button.button_link.document[0] &&
                              button.button_link.document[0].data.page_path
                                ? button.button_link.document[0].data.page_path
                                : button.button_link.url)
                            }
                            className={styles.horizontallyCentered}
                          >
                            <ButtonBordered>
                              {button.button_text}
                            </ButtonBordered>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
        </div>
        {data.prismicLayout.data.footer_links &&
          data.prismicLayout.data.footer_links.length > 0 &&
          data.prismicLayout.data.footer_links[0].link_text && (
            <div className={styles.footerNavigation}>
              <AsideNavContainer rotated>
                {data.prismicLayout.data.footer_links &&
                  data.prismicLayout.data.footer_links.length > 0 &&
                  data.prismicLayout.data.footer_links.map((link, index) => {
                    return (
                      <NavLinkVertical
                        link={{
                          href:
                            link.link &&
                            (link.link.document &&
                            link.link.document[0] &&
                            link.link.document[0].data.page_path
                              ? link.link.document[0].data.page_path
                              : link.link.url),
                          text: link.link_text,
                        }}
                      >
                        <div className={styles.socialIcons}>
                          {data.prismicLayout.data.link_hover_icons &&
                            data.prismicLayout.data.link_hover_icons.length >
                              0 &&
                            data.prismicLayout.data.link_hover_icons
                              .filter((link) => link.parent_link == index + 1)
                              .map((sublink) => {
                                return (
                                  <a
                                    href={
                                      sublink.link &&
                                      (sublink.link.document &&
                                      sublink.link.document[0] &&
                                      sublink.link.document[0].data.page_path
                                        ? sublink.link.document[0].data
                                            .page_path
                                        : sublink.link.url)
                                    }
                                  >
                                    {sublink.image &&
                                      sublink.image.localFile && (
                                        <img
                                          src={sublink.image.localFile.url}
                                          alt={sublink.image.alt}
                                        />
                                      )}
                                  </a>
                                );
                              })}
                        </div>
                      </NavLinkVertical>
                    );
                  })}
                {/* <NavLinkVertical link={{href:'/impressum/', text:'IMPRESSUM'}}>
                            
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
                        </NavLinkVertical> */}
              </AsideNavContainer>
            </div>
          )}
      </FooterContainer>
      {contactFormTransition(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles.contactFormContainer}>
              <ContactForm>
                <img
                  style={{
                    alignSelf: "flex-start",
                    width: 40,
                    marginBottom: 15,
                    cursor: "pointer",
                  }}
                  src={closeBlue}
                  alt="close"
                  onClick={() => dispatch({ type: "toggle_contact_form" })}
                />
              </ContactForm>
            </animated.div>
          )
      )}
      {contactFormTransition(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles.mobileForm}>
              <ContactForm>
                <img
                  style={{
                    alignSelf: "flex-start",
                    width: 40,
                    marginBottom: 15,
                    cursor: "pointer",
                  }}
                  src={closeBlue}
                  alt="close"
                  onClick={() => dispatch({ type: "toggle_contact_form" })}
                />
              </ContactForm>
            </animated.div>
          )
      )}
    </div>
  );
};

export default Layout;
