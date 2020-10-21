const Customer = require('../models/customer');
const FbHandler = require('../services/fb-handler');
const { FACEBOOK_PAGE_ACCESS_TOKEN } = require('../configuration')
const fb = new FbHandler(FACEBOOK_PAGE_ACCESS_TOKEN)


exports.addReceivedMesssageToDb = async (webhookEvent) => {

    const senderPsid = webhookEvent.sender.id;
    const recipientId = webhookEvent.recipient.id;
    const message = webhookEvent.message;
    const timestamp = webhookEvent.timestamp;
    const customerPsid = webhookEvent.message.is_echo ?  recipientId : senderPsid;

    // Get User Profile
    const userProfile = await fb.getUserProfile(customerPsid);
    if (!userProfile.last_name) {
        throw new Error(userProfile)
    }
    const { id, last_name, first_name , profile_pic } = userProfile;
    const messageObj = {
        ...message,  timestamp,
        isAgent: webhookEvent.message.is_echo || false,
    }

    await Customer.findOneAndUpdate({customerPsid: id}, {
        firstName: first_name,
        lastName: last_name,
        profilePic: profile_pic,
        customerPsid: id,
        $addToSet: {
            messages: messageObj
        }
    }, {
        new: true,
        upsert: true,
        runValidators: true
    });
    return messageObj;
}

exports.sendMessage = async (data) => {

    const { customerId, message } = data;
    const customer = await Customer.findById(customerId);
    if (!customer) {
        throw new Error('Customer not Found')
    }
    fb.sendMessage(customer.customerPsid, message);
}