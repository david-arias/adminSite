
// requires
var express = require('express');

// Vars Init
var app = express();

// ================================================
// GET BASE
// ================================================
app.get( '/', (req, res, next) => {

     res.status( 200 ).json( {
          ok: true,
          mssg: 'Get successfully'
     })

})

// export
module.exports = app;