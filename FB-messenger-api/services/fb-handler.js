
const request = require('request');


/**
 * Fabebook Handler Class
 * @param pageAccessToken
 */
module.exports = class FbHandler {
	constructor(pageAccessToken) {
		this.pageAccessToken = pageAccessToken;
		this._url = 'https://graph.facebook.com';
    }
    
    /**
     * Get User Fabebook Profile with PSID
     * @param senderPsid
     */
    async getUserProfile(senderPsid) {
        return new Promise((resolve, reject) => {
            request({
                "uri": `${this._url}/${senderPsid}?fields=first_name,last_name,profile_pic`,
                "qs": { "access_token": this.pageAccessToken },
                "method": "GET",
              }, (err, res, body) => {
                if (!err) {
                    resolve(JSON.parse(body));
                } else {
                    console.log('Error: ', err)
                    reject(err);
                }
              }); 
        });
    }


    /**
     * Send Message User Fabebook Account
     * @params sender_psid, message
     */
    sendMessage(sender_psid, message) {
        return this.callSendAPI(sender_psid, {
            text: message
        });
    }

    /**
     * Call Send API Fabebook Webhook Handler
     * @params ssender_psid, response
     */
    async callSendAPI(sender_psid, response) {
        return new Promise((resolve, reject) => {
                // Send the HTTP request to the Messenger Platform
                request({
                    "uri": `${this._url}/v2.6/me/messages`,
                    "qs": { "access_token": this.pageAccessToken },
                    "method": "POST",
                    "json": {
                        "recipient": {
                        "id": sender_psid
                        },
                        "message": response
                    }
                }, (err, res, body) => {
                    if (!err) {
                        resolve(body)
                    } else {
                        reject("Unable to send message:" + err);
                    }
                }); 
        });
    }
}
