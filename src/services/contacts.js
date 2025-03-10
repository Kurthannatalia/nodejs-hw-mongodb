import {
    Contact
}
from '../models/contact.js';

export const getAllContacts = async () => {
    const result = await Contact.find();
    return result;
};
export const getContactById = async (contactId) => {
    const result = await Contact.findById(contactId);
    return result;
};

