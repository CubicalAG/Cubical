import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import queryString from "query-string";

import styles from "./contact-form.module.scss";
import TextInputField from "../TextInputField";
import TextareaField from "../TextareaField";
import sendBlueImg from "../../img/sendContactForm.svg";

const FORM_NAME = "contact";
const EMAIL_SUBJECT = "Neue Kontaktanfrage";
const SUCCESS_MESSAGE =
  "Vielen Dank. Wir haben Ihre Anfrage erhalten. Unser Team wird schnellstmöglich innerhalb der nächsten Tagen mit den notwendigen Informationen auf Sie zurückkommen. Für Ihr Verständnis und Ihre Geduld bedanken wir uns im Voraus.";
const SERVER_ERROR_MESSAGE =
  "Leider konnte Ihre Anfrage gerade nicht versendet werden. Bitte versuchen Sie es später erneut.";

const encodeFormData = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const getReasonOfContact = (query) => {
  const fallback = "";

  if (query) {
    const queriedReasonOfContact = queryString.parse(query);
    const { grund } = queriedReasonOfContact;

    // Ensure a valid expected value is passed
    return grund;
  }

  return fallback;
};

const ContactForm = ({ children }) => {
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");
  const [reasonOfContact, setReasonOfContact] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    if (
      !reasonOfContact ||
      !name ||
      !tel ||
      !vorname ||
      !(
        email &&
        email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    ) {
      setErrorMessage(
        "Leider konnten wir Ihre Anfrage nicht erhalten. Bitte füllen Sie hierfür alle notwendigen Felder vollständig aus."
      );
    } else {
      setErrorMessage(undefined);
      setFetching(true);
      const formData = {
        "form-name": FORM_NAME,
        "bot-field": "",
        subject: EMAIL_SUBJECT,
        name,
        vorname,
        tel,
        reasonOfContact,
        email,
        msg,
      };

      try {
        const response = await fetch("/", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: encodeFormData(formData),
        });

        if (!response.ok) {
          throw new Error("Netlify form submission failed");
        }

        setSuccessMessage(SUCCESS_MESSAGE);
        setName("");
        setVorname("");
        setEmail("");
        setTel("");
        setMsg("");
        setReasonOfContact("");
      } catch (error) {
        console.log(error);
        setErrorMessage(SERVER_ERROR_MESSAGE);
      } finally {
        setFetching(false);
      }
    }
  };

  const location = useLocation();

  useEffect(() => {
    const reasonOfContactQuery =
      (location.search && getReasonOfContact(location.search)) || "";
    setReasonOfContact(reasonOfContactQuery);
  }, []);

  return (
    <form
      className={styles.contactForm}
      name={FORM_NAME}
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="bot-field" />
      <input
        type="hidden"
        name="subject"
        data-remove-prefix="true"
        value={EMAIL_SUBJECT}
      />
      <div className={styles.childContainer}>{children}</div>
      <div className={styles.inputs}>
        <label>
          Name*
          <TextInputField name="name" value={name} onChange={setName} />
        </label>
        <label>
          Vorname*
          <TextInputField
            name="vorname"
            value={vorname}
            onChange={setVorname}
          />
        </label>
        <label>
          Telefon*
          <TextInputField
            name="tel"
            type="number"
            value={tel}
            onChange={setTel}
          />
        </label>
        <label>
          Grund für die Kontaktaufnahme*
          <TextInputField
            name="reasonOfContact"
            value={reasonOfContact}
            onChange={setReasonOfContact}
          />
        </label>
        <label>
          E-Mail*
          <TextInputField
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
          />
        </label>
        <label className={styles.textareaInput}>
          Nachricht/Bemerkung
          <TextareaField name="msg" value={msg} onChange={setMsg} />
        </label>
      </div>
       <button className={styles.sendButton} type="submit">
        <img src={sendBlueImg} alt="send" />
      </button>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {fetching && (
        <div className={styles.loadingIndicatorContainer}>
          <div className={styles.loadingIndicator}></div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
