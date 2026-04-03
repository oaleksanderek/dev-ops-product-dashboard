const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    {id: 1, name: "Coca Cola", price: 4, quantity: 12},
    {id: 2, name: "Ser", price: 8, quantity: 56},
    {id: 3, name: "Marchewka", price: 1, quantity: 89}
];

//GET /items
app.get("/items", (req, res) => {
    res.json(items);
});

//POST /items
app.post("/items", (req, res) => {
    const {name, price, quantity} = req.body;

    if (name === undefined || name.trim() === "" || price === undefined || quantity === undefined) {
        return res.status(400).json({ error: "There is empty data!" });
    }

    const newItem = {
        id: items.length + 1,
        name: name,
        price: price,
        quantity: quantity
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

//GET /stats
app.get("/stats", (req, res) => {
    res.json({
        total: items.length,
        instance: process.env.HOSTNAME || os.hostname()
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("The server is up!")
});