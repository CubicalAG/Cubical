import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import queryString from "query-string";

import styles from "./contact-form.module.scss";
import TextInputField from "../TextInputField";
import TextareaField from "../TextareaField";
import sendBlueImg from "../../img/sendContactForm.svg";

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
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [callTime, setCallTime] = useState("");
  const [msg, setMsg] = useState("");
  const [reasonOfContact, setReasonOfContact] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (
      !reasonOfContact ||
      !name ||
      !tel ||
      !callTime ||
      !(
        email &&
        email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    ) {
      setErrorMessage("Required fields not filled!");
    } else {
      setErrorMessage(undefined);
      setFetching(true);
      fetch(
        `/.netlify/functions/contactForm?name=${name}&email=${email}&tel=${tel}&callTime=${callTime}&reasonOfContact=${reasonOfContact}&msg=${msg}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFetching(false);
          if (data.status == "success") {
            return setSuccessMessage(data.message);
          } else if (data.status == "error") {
            return setErrorMessage(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setFetching(false);
          setErrorMessage(
            "There was some error while trying to send your email. Try later!"
          );
        });
    }
  };

  const location = useLocation();

  useEffect(() => {
    const reasonOfContactQuery =
      (location.search && getReasonOfContact(location.search)) || "";
    setReasonOfContact(reasonOfContactQuery);
  }, []);

  return (
    <form className={styles.contactForm}>
      <div className={styles.childContainer}>{children}</div>
      <div className={styles.inputs}>
        <label>
          Name*
          <TextInputField name="name" value={name} onChange={setName} />
        </label>
        <label>
          Telefon*
          <TextInputField name="tel" value={tel} onChange={setTel} />
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
        <label>
          Grund für die Kontaktaufnahme*
          <TextInputField
            name="reasonOfContact"
            value={reasonOfContact}
            onChange={setReasonOfContact}
          />
        </label>
        <label>
          Gewünschte Anrufzeit*
          <TextInputField
            name="callTime"
            value={callTime}
            onChange={setCallTime}
          />
        </label>
        <label className={styles.textareaInput}>
          Nachricht
          <TextareaField name="msg" value={msg} onChange={setMsg} />
        </label>
      </div>
      <button className={styles.sendButton} onClick={(e) => handleSubmit(e)}>
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
