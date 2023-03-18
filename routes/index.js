const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

// app.get('/', (req, res) => {
//     res.send(
//       `<p>API - An application programming interface, is a computing interface that defines interactions between multiple software intermediaries</p>`
//     );
//   });


module.exports = router;