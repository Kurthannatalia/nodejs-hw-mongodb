import Contact from '../models/contact.js';

export const getAllContacts = async (filter, options) => {
    const result = await Contact.paginate(filter, options);
    return result;
};

export const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
};

export const createContact = async (data) => {
    const contact = await Contact.create(data);
    return contact;
};

export const updateContact = async (id, data) => {
    const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
    return updatedContact;
};

export const deleteContact = async (id) => {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
};