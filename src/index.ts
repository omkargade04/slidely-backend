import express, { urlencoded } from 'express'
import bodyParser from 'body-parser';
const routes = require("../routes/index.routes")

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 5000;

app.use(routes);

app.get('/', (req, res) => {
    res.status(200).send("Server running...")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});