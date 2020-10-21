const {  FACEBOOK_VERIFY_TOKEN } = require('../configuration');

/**
 * get Webhook
 * @param app
 */
exports.getWebhook = (app) => {
    app.get('/webhook', function (req, res) {
        if (req.query['hub.verify_token'] === FACEBOOK_VERIFY_TOKEN) {
            res.send(req.query['hub.challenge']);
            res.send('HTTPS Working')
        } else {
            res.send('Error, wrong validation token');
        }
    })
}