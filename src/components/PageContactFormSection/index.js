import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import styles from "./page-contact-form-section.module.scss";
import Section from "../Section";
import ContactForm from "../ContactForm";
import ButtonBordered from "../ButtonBordered";

const PageContactFormSection = ({ data }) => {
  return (
    <Section
      fullWidth
      id={
        data.primary && data.primary.section_id ? data.primary.section_id : ""
      }
    >
      <div className={styles.contactFormSection}>
        <div className={styles.illustration}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
            {/* <rect width="100%" height="100%" fill="#334657"></rect> */}
            <circle
              cx="400"
              cy="300"
              r="270"
              fill="#FAEFBE"
              className={styles.sun}
            ></circle>
            {/* <path fill="url(#exampleGradient)" d="M0 400H800V600H0z"></path> */}
            <defs>
              <radialGradient id="exampleGradient">
                <stop offset="30%" stopColor="#7a378b"></stop>
                <stop offset="99%" stopColor="#334657"></stop>
              </radialGradient>
            </defs>
            {/* <path fill="#334657" d="M0 100H800V105H0z"></path> */}
            {/* <path fill="#334657" d="M0 140H800V150H0z"></path> */}
            {/* <path fill="#334657" d="M0 210H800V235H0z"></path> */}
            <path fill="#083A57" d="M0 450H800V475H0z"></path>
            <path fill="#f5e6c4" d="M14 458H24V468H14z"></path>
            <path fill="#199FD9" d="M30 458H110V468H30z"></path>
            <path fill="#f5e6c4" d="M140 458H290V468H140z"></path>
            <path fill="#f5e6c4" d="M300 458H310V468H300z"></path>
            <path fill="#199FD9" d="M330 458H420V468H330z"></path>
            <path fill="#199FD9" d="M425 458H435V468H425z"></path>
            <path fill="#f5e6c4" d="M440 458H450V468H440z"></path>
            <path fill="#199FD9" d="M460 458H580V468H460z"></path>
            <path fill="#f5e6c4" d="M520 458H640V468H520z"></path>
            <path fill="#199FD9" d="M665 458H675V468H665z"></path>
            <path fill="#f5e6c4" d="M680 458H795V468H680z"></path>
            <path fill="#083A57" d="M155 231H225V451H155z"></path>
            <path fill="#083A57" d="M185 151H355V451H185z"></path>
            <path fill="#334657" d="M195 171H280V177H195z"></path>
            <path
              fill="#334657"
              d="M195 191H230V197H195z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M165 251H220V257H165z"></path>
            <path
              fill="#334657"
              d="M205 265H230V271H205z"
              className={styles.lights}
            ></path>
            <path fill="#083A57" d="M15 381H85V451H15z"></path>
            <path fill="#083A57" d="M55 351H95V451H55z"></path>
            <path fill="#083A57" d="M93 361H153V451H93z"></path>
            <path fill="#083A57" d="M690 371H750V451H690z"></path>
            <path fill="#083A57" d="M730 391H790V450H730z"></path>
            <path fill="#199FD9" d="M25 399H80V401H25z"></path>
            <path
              fill="#199FD9"
              d="M65 419H110V421H65z"
              className={styles.lights}
            ></path>
            <path fill="#199FD9" d="M95 378H110V380H95z"></path>
            <path fill="#199FD9" d="M703 399H738V401H703z"></path>
            <path fill="#199FD9" d="M770 409H778V411H770z"></path>
            <path fill="#199FD9" d="M773 402H778V404H773z"></path>
            <path
              fill="#199FD9"
              d="M713 429H778V431H713z"
              className={styles.lights}
            ></path>
            <path fill="#199FD9" d="M95 429H110V431H95z"></path>
            <path fill="#083A57" d="M385 111H505V451H385z"></path>
            <path fill="#334657" d="M397 125H407V131H397z"></path>
            <path fill="#334657" d="M417 125H427V131H417z"></path>
            <path
              fill="#334657"
              d="M437 125H447V131H437z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M457 125H467V131H457z"></path>
            <path fill="#334657" d="M477 125H487V131H477z"></path>
            <path fill="#334657" d="M397 145H407V151H397z"></path>
            <path fill="#334657" d="M417 145H427V151H417z"></path>
            <path fill="#334657" d="M437 145H447V151H437z"></path>
            <path
              fill="#334657"
              d="M457 145H467V151H457z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M477 145H487V151H477z"></path>
            <path fill="#334657" d="M397 165H407V171H397z"></path>
            <path fill="#334657" d="M417 165H427V171H417z"></path>
            <path fill="#334657" d="M437 165H447V171H437z"></path>
            <path fill="#334657" d="M457 165H467V171H457z"></path>
            <path fill="#334657" d="M477 165H487V171H477z"></path>
            <path fill="#334657" d="M397 185H407V191H397z"></path>
            <path fill="#334657" d="M417 185H427V191H417z"></path>
            <path fill="#334657" d="M437 185H447V191H437z"></path>
            <path fill="#334657" d="M457 185H467V191H457z"></path>
            <path fill="#334657" d="M477 185H487V191H477z"></path>
            <path fill="#334657" d="M477 205H487V211H477z"></path>
            <path fill="#083A57" d="M525 151H615V451H525z"></path>
            <path
              fill="#334657"
              d="M555 165H600V171H555z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M535 185H560V191H535z"></path>
            <path fill="#083A57" d="M605 191H645V441H605z"></path>
            <path fill="#334657" d="M605 225H630V231H605z"></path>
            <path fill="#199FD9" d="M245 191H465V451H245z"></path>
            <path fill="#199FD9" d="M120 281H230V451H120z"></path>
            <path fill="#199FD9" d="M470 221H580V451H470z"></path>
            <path fill="#199FD9" d="M590 251H700V451H590z"></path>
            <path fill="#0D72B5" d="M379 191H464V451H379z"></path>
            <path fill="#FAEFBE" d="M245 211H315V219H245z"></path>
            <path fill="#334657" d="M315 211H465V219H315z"></path>
            <path fill="#FAEFBE" d="M245 231H415V239H245z"></path>
            <path fill="#334657" d="M415 231H465V239H415z"></path>
            <path fill="#334657" d="M245 251H285V259H245z"></path>
            <path fill="#faefbe" d="M285 251H325V258H285z"></path>
            <path fill="#334657" d="M315 251H465V259H315z"></path>
            <path fill="#faefbe" d="M385 251H445V258H385z"></path>
            <path fill="#334657" d="M245 271H395V279H245z"></path>
            <path fill="#faefbe" d="M295 271H355V278H295z"></path>
            <path fill="#faefbe" d="M385 271H405V278H385z"></path>
            <path fill="#faefbe" d="M445 271H465V278H445z"></path>
            <path fill="#334657" d="M405 271H455V279H405z"></path>
            <path fill="#334657" d="M215 291H365V299H215z"></path>
            <path fill="#faefbe" d="M315 291H465V298H315z"></path>
            <path fill="#334657" d="M395 291H415V299H395z"></path>
            <path fill="#faefbe" d="M245 311H395V318H245z"></path>
            <path fill="#334657" d="M345 311H405V319H345z"></path>
            <path fill="#faefbe" d="M405 311H465V318H405z"></path>
            <path fill="#faefbe" d="M245 331H395V338H245z"></path>
            <path fill="#334657" d="M305 331H465V339H305z"></path>
            <path fill="#faefbe" d="M365 331H395V338H365z"></path>
            <path fill="#334657" d="M245 351H395V359H245z"></path>
            <path fill="#faefbe" d="M315 351H465V358H315z"></path>
            <path fill="#faefbe" d="M245 371H275V378H245z"></path>
            <path fill="#334657" d="M275 371H365V379H275z"></path>
            <path fill="#faefbe" d="M365 371H435V378H365z"></path>
            <path fill="#334657" d="M435 371H465V379H435z"></path>
            <path fill="#334657" d="M245 391H295V399H245z"></path>
            <path fill="#faefbe" d="M295 391H415V398H295z"></path>
            <path fill="#334657" d="M415 391H435V399H415z"></path>
            <path fill="#faefbe" d="M435 391H465V398H435z"></path>
            <path fill="#334657" d="M245 411H345V419H245z"></path>
            <path fill="#faefbe" d="M345 411H465V418H345z"></path>
            <path fill="#334657" d="M245 431H285V439H245z"></path>
            <path fill="#faefbe" d="M285 431H465V438H285z"></path>
            <path fill="#0D72B5" d="M200 281H235V451H200z"></path>
            <path fill="#334657" d="M123 291H228V293H123z"></path>
            <path fill="#334657" d="M123 299H228V301H123z"></path>
            <path fill="#334657" d="M123 307H228V309H123z"></path>
            <path fill="#334657" d="M123 314H228V316H123z"></path>
            <path fill="#334657" d="M123 321H228V323H123z"></path>
            <path fill="#334657" d="M123 328H228V330H123z"></path>
            <path fill="#334657" d="M123 336H228V338H123z"></path>
            <path fill="#334657" d="M123 344H228V346H123z"></path>
            <path fill="#334657" d="M123 352H228V354H123z"></path>
            <path fill="#334657" d="M123 360H228V362H123z"></path>
            <path fill="#334657" d="M123 368H228V370H123z"></path>
            <path
              fill="#334657"
              d="M123 376H228V378H123z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M123 384H228V386H123z"></path>
            <path fill="#334657" d="M123 392H228V394H123z"></path>
            <path fill="#334657" d="M123 400H228V402H123z"></path>
            <path fill="#334657" d="M123 408H228V410H123z"></path>
            <path
              fill="#334657"
              d="M123 416H228V418H123z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M123 424H228V426H123z"></path>
            <path fill="#334657" d="M123 432H228V434H123z"></path>
            <path fill="#334657" d="M123 440H228V442H123z"></path>
            <path fill="#0D72B5" d="M534 221H579V451H534z"></path>
            <path fill="#faefbe" d="M475 225H480V450H475z"></path>
            <path fill="#083A57" d="M475 285H481V450H475z"></path>
            <path fill="#faefbe" d="M485 225H490V450H485z"></path>
            <path fill="#083A57" d="M485 305H490V450H485z"></path>
            <path fill="#faefbe" d="M495 225H500V450H495z"></path>
            <path fill="#083A57" d="M495 275H501V455H495z"></path>
            <path fill="#faefbe" d="M505 225H510V450H505z"></path>
            <path fill="#083A57" d="M505 325H510V450H505z"></path>
            <path fill="#faefbe" d="M515 225H520V450H515z"></path>
            <path fill="#083A57" d="M515 310H521V450H515z"></path>
            <path fill="#faefbe" d="M525 225H530V450H525z"></path>
            <path fill="#083A57" d="M525 255H531V450H525z"></path>
            <path fill="#faefbe" d="M535 225H540V450H535z"></path>
            <path fill="#083A57" d="M535 345H540V450H535z"></path>
            <path fill="#faefbe" d="M545 225H550V450H545z"></path>
            <path fill="#083A57" d="M545 295H550V450H545z"></path>
            <path fill="#faefbe" d="M555 225H560V450H555z"></path>
            <path fill="#083A57" d="M555 365H560V450H555z"></path>
            <path fill="#faefbe" d="M565 225H570V450H565z"></path>
            <path fill="#083A57" d="M565 305H570V450H565z"></path>
            <path fill="#faefbe" d="M575 225H578V450H575z"></path>
            <path fill="#083A57" d="M575 265H578V450H575z"></path>
            <path fill="#0D72B5" d="M590 251H615V451H590z"></path>
            <path fill="#0D72B5" d="M674 251H699V451H674z"></path>
            <path fill="#334657" d="M592 261H697V264H592z"></path>
            <path fill="#faefbe" d="M592 281H697V284H592z"></path>
            <path fill="#334657" d="M592 301H697V304H592z"></path>
            <path fill="#334657" d="M592 321H697V324H592z"></path>
            <path
              fill="#faefbe"
              d="M592 341H697V344H592z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M592 361H697V364H592z"></path>
            <path fill="#faefbe" d="M592 381H697V384H592z"></path>
            <path
              fill="#faefbe"
              d="M592 401H697V404H592z"
              className={styles.lights}
            ></path>
            <path fill="#334657" d="M592 421H697V424H592z"></path>
            <path fill="#faefbe" d="M592 441H697V444H592z"></path>
            <circle
              cx="40"
              cy="100"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="120"
              cy="150"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="740"
              cy="60"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="240"
              cy="40"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="70"
              cy="240"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="690"
              cy="140"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
            <circle
              cx="790"
              cy="240"
              r="2"
              fill="#fff"
              className={styles.star}
            ></circle>
          </svg>
        </div>
        <div className={styles.contactFormAndInfoWrapper}>
          <div className={styles.contactFormContainer}>
            <ContactForm>
              <h1 className={styles.contactHeading}>KONTAKT</h1>
              <p className={styles.contactDescription}>
                Schreiben Sie uns. Wir freuen uns auf Ihre Anfrage und melden
                uns so schnell wie möglich bei Ihnen zurück.
              </p>
            </ContactForm>
          </div>
          <div className={styles.mobileForm}>
            <ContactForm>
              <h1 className={styles.contactHeading}>KONTAKT</h1>
              <p>
                Wir haben Ihr Interesse geweckt? Unser Team steht Ihnen gerne
                zur Verfügung, um Ihnen die kundengerechte Beratung zu bieten.
              </p>
            </ContactForm>
          </div>
          <div className={styles.infoContent}>
            {data.primary.contact_content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.primary.contact_content.html,
                }}
              ></div>
            )}
            {/* <div className={styles.infoButtons}>
                  {queryData.prismicLayout.data.footer_buttons && 
                  queryData.prismicLayout.data.footer_buttons.length > 0 &&
                  queryData.prismicLayout.data.footer_buttons.map(button => {
                      return <Link to={(button.button_link) && ((button.button_link.document && button.button_link.document[0].data.page_path) ? button.button_link.document[0].data.page_path : button.button_link.url)} className={styles.horizontallyCentered} >
                      <ButtonBordered>
                          {button.button_text}
                      </ButtonBordered>
                  </Link>
                  })}
              </div> */}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PageContactFormSection;
