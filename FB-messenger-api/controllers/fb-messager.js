const Customer = require('../models/customer');


/**
 * Get All Customers
 *
 */
exports.getAllCustomers = async (req, res) => {
    const customers = await Customer.find().select('firstName lastName profilePic updatedAt');
    res.status(200).json({
        method: 'GET',
        path: '/api/v1/customers',
        config: {
            description: 'Get all customer messagers',
            tags: ['api', 'v1', 'messager'],
          },
        customers: customers 
    });
}