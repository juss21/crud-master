module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {     
        user_id: {
            type: Sequelize.STRING
        },
        number_of_items: {
            type: Sequelize.STRING
        },
        total_amount: {
            type: Sequelize.STRING
        }
    });
    return Order;
};
