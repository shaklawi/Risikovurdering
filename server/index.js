
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/api/save', (req, res) => {
  console.log('Modtaget data:', req.body);
  res.status(200).send({ message: 'Data modtaget' });
});

app.listen(PORT, () => {
  console.log(`Serveren kører på http://localhost:${PORT}`);
});
