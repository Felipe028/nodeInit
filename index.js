const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clienteRoutes = require('./src/routes/clienteRoutes')




const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Online');
});

app.use(clienteRoutes)


app.listen(port, () => {
  //console.info(`App rodando em http://localhost:${port}`)
})

