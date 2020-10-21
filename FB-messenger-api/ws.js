const Customer = require('./models/customer');
const messager = require('./services/messager');
const app = require('./app');
const webhook = require('./controllers/fb-webhook');

webhook.getWebhook(app)
module.exports = async (io) => {
    // I WISH THEY WAS A BETTER WAY TO DO THIS?
    app.post('/webhook', (req, res) => {
        const body = req.body;
        if (body.object == 'page') {
            for (const entry of body.entry) {
                // Gets the body of the webhook event
                const webhookEvent = entry.messaging[0];
                const message = webhookEvent.message;
                if (message) {
                    messager.addReceivedMesssageToDb(webhookEvent)
                        .then(messageObj => {
                            io.sockets.emit('message', {
                                message: messageObj
                            });
                        });
                }
            }
            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        }
    });

    io.on('connection', async (socket) => {

        socket.on('getCustomers', async () => {
            const customers = await Customer.find().select('firstName lastName profilePic updatedAt');
            socket.emit('customes', customers)
        });

        socket.on('getCustomerMessages', async (req) => {
            const customer = await Customer.findById(req.customerId).select('firstName lastName messages createdAt')
            socket.emit('customerMessages', customer)
        });

        socket.on('sendMessage', async (data) => {
            await messager.sendMessage(data, socket);
        });

    });
};