const db = require("../models/index.js");
const Order = db.orders;

exports.create = (data) => {
    const order = {
        user_id: data.user_id,
        number_of_items: data.number_of_items,
        total_amount: data.total_amount
    }
    Order.create(order)
        .then(data => {
            console.log("Order created.")
        })
        .catch(err => {
            console.error(err.message)
        });
}