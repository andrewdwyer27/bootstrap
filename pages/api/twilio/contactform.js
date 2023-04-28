const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export default function handler(req, res) {
  const { firstName, lastName, email, phoneNumber, message } = req.query;

  client.messages
      .create({
         body: `${firstName} ${lastName}, with the email address @${email} and phone number ${phoneNumber}, has this message: ${message}`,
         from: `${process.env.TWILIO_PHONE_NUMBER}`,
         statusCallback: 'http://postb.in/1234abcd',
         to: '+18627773893'
       })
      .then(message => console.log(message.sid))
      .catch((error) => {
        console.error('Twilio error:', error);
        return res.status(500).json({ error: error.message });
      })
    
  return res.status(200).json({ email: email });
}