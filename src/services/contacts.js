import Contact from '../models/contact.js';

export const getAllContacts = async (filter, options) => {
    const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = options;

    const query = {};
    if (type) query.contactType = type;
    if (isFavourite !== undefined) query.isFavourite = isFavourite;

    const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const result = await Contact.paginate(query, {
        page,
        limit: perPage,
        sort: sortOptions,
    });

    return result;
};

export const getContactById = async (id) => {
    return await Contact.findById(id);
};

export const createContact = async (data) => {
    return await Contact.create(data);
};

export const updateContact = async (id, data) => {
    return await Contact.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContact = async (id) => {
    return await Contact.findByIdAndDelete(id);
};
