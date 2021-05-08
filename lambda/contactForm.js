require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_TO_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports.handler = async function (event, context) {
  const data = event.queryStringParameters;

  const msg = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_TO_EMAIL,
    subject: "Cubical Kontakt",
    html: `
        <h1 style='color: #1995D2;'>Cubical Kontakt Form</h1>
            <table style='margin-bottom:15px; border:1px solid #1995D2;border-collapse: collapse'>
                <tr>
                  <th style='padding:2.5px; border:1px solid #1995D2; text-align:center;background: #1995D2; color: white'>Name</th>
                  <td style='padding:2.5px; border:1px solid #1995D2; text-align:center; color: #1995D2;'>${data.name}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #1995D2; text-align:center;background: #1995D2; color: white'>Vorname</th>
                  <td style='padding:2.5px; border:1px solid #1995D2; text-align:center; color: #1995D2;'>${data.vorname}</td>
                </tr>       
                <tr>
                  <th style='padding:2.5px; border:1px solid #1995D2; text-align:center;background: #1995D2; color: white'>Email</th>
                  <td style='padding:2.5px; border:1px solid #1995D2; text-align:center; color: #1995D2;'>${data.email}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #1995D2; text-align:center;background: #1995D2; color: white'>Telefonnummer</th>
                  <td style='padding:2.5px; border:1px solid #1995D2; text-align:center; color: #1995D2;'>${data.tel}</td>
                </tr>
                <tr>
                  <th style='padding:2.5px; border:1px solid #1995D2; text-align:center;background: #1995D2; color: white'>Grund für die Kontaktaufnahme</th>
                  <td style='padding:2.5px; border:1px solid #1995D2; text-align:center; color: #1995D2;'>${data.reasonOfContact}</td>
                </tr>       
            </table>         
        <p style='color: #1995D2;'>Message: ${data.msg}</p>
        `,
  };
  try {
    await sgMail.send(msg);
    let successBody = JSON.stringify({
      status: "success",
      message: "Your message has been sent!",
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
