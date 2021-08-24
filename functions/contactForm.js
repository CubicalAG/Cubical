"use strict";

// require('dotenv').config()
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports.handler = async function (event, context) {
  const data = event.queryStringParameters;
  const msg = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_TO_EMAIL,
    subject: "Fiducia Kontakt",
    html: `
        <h1 style='color: #f04d23;'>Fiducia Kontakt Form</h1>
            <table style='margin-bottom:15px; border:1px solid #f04d23;border-collapse: collapse'>
                <tr>
                  <th style='padding:2.5px; border:1px solid #f04d23; text-align:center;background: #f04d23; color: white'>Name</th>
                  <td style='padding:2.5px; border:1px solid #f04d23; text-align:center; color: #f04d23;'>${data.name}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #f04d23; text-align:center;background: #f04d23; color: white'>Vorname</th>
                  <td style='padding:2.5px; border:1px solid #f04d23; text-align:center; color: #f04d23;'>${data.vorname}</td>
                </tr>       
                <tr>
                  <th style='padding:2.5px; border:1px solid #f04d23; text-align:center;background: #f04d23; color: white'>Email</th>
                  <td style='padding:2.5px; border:1px solid #f04d23; text-align:center; color: #f04d23;'>${data.email}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #f04d23; text-align:center;background: #f04d23; color: white'>Telefonnummer</th>
                  <td style='padding:2.5px; border:1px solid #f04d23; text-align:center; color: #f04d23;'>${data.tel}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #f04d23; text-align:center;background: #f04d23; color: white'>Grund für die Kontaktaufnahme</th>
                  <td style='padding:2.5px; border:1px solid #f04d23; text-align:center; color: #f04d23;'>${data.reasonOfContact}</td>
                </tr>             
            </table>         
        <p style='color: #f04d23;'>Message: ${data.msg}</p>
        `,
  };

  try {
    await sgMail.send(msg);
    let successBody = JSON.stringify({
      status: "success",
      message:
        "Vielen Dank. Wir haben Ihre Anfrage erhalten. Unser Team wird schnellstmöglich innerhalb der nächsten Tagen mit den notwendigen Informationen auf Sie zurückkommen. Für Ihr Verständnis und Ihre Geduld bedanken wir uns im Voraus.",
    });
    return {
      statusCode: 200,
      body: successBody,
    };
  } catch (error) {
    let errorBody = JSON.stringify({
      status: "error",
      message: "There was some error with our servers. Try later!",
    });
    return {
      statusCode: 500,
      body: errorBody,
    };
  }
};
