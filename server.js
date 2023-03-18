const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

               //its working
// app.get('/', (req, res) => {
//     res.send(
//       `<p>API - An application programming interface, is a computing interface that defines interactions between multiple software intermediaries</p>`
//     );
//   });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});