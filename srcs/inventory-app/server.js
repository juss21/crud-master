const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/routes.js")(app);

// Start the server
const port = process.env.INVENTORY_PORT;
const ip = process.env.INVENTORY_IP;

app.listen(port, () => {
    console.log(`Server is listening at http://${ip}:${port}`);
});