const app = require("./routes/routes.js")
const express = require("express");

const port = process.env.INVENTORY_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/routes.js")(app);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});