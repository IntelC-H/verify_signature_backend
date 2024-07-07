const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const nacl = require('tweetnacl');
const bs58 = require('bs58');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/verify', async (req, res) => {
  const message = 'hello world';
  const { public_key, signature } = req.body;

  console.log('[ ] message: ', message);
  console.log('[ ] public_key: ', public_key);
  console.log('[ ] signature: ', signature);

  const verified = nacl
    .sign
    .detached
    .verify(
      new TextEncoder().encode(message),
      bs58.default.decode(signature),
      bs58.default.decode(public_key)
    );
  
  console.log('[ ] verified: ', verified);

  res.status(200).json(verified);
});

app.listen(PORT, () => {
  console.log(`[ ] Server is running on http://localhost:${PORT}`);
});
