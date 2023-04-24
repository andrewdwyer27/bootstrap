const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export default function handler(req, res) {
  const {email} = req.query;

  client.messages
      .create({
         body: `${email} just signed up for a free session!`,
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