import createError from 'http-errors';
import { 
    getAllContacts, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact 
} from '../services/contacts.js';

export const getAllContactsHandler = async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

        const filter = {};
        if (type) filter.contactType = type;
        if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

        const options = {
            page: Number(page),
            limit: Number(perPage),
            sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
        };

        const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage } = await getAllContacts(filter, options);

        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: {
                data: docs,
                page: options.page,
                perPage: options.limit,
                totalItems: totalDocs,
                totalPages,
                hasPreviousPage: hasPrevPage,
                hasNextPage,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdHandler = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            throw createError(404, 'Contact not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Contact successfully found!',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const createContactHandler = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json({
            status: 201,
            message: 'Contact successfully created!',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const updateContactHandler = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const updatedContact = await updateContact(contactId, req.body);
        if (!updatedContact) {
            throw createError(404, 'Contact not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Contact successfully updated!',
            data: updatedContact,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContactHandler = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const deletedContact = await deleteContact(contactId);
        if (!deletedContact) {
            throw createError(404, 'Contact not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Contact successfully deleted!',
        });
    } catch (error) {
        next(error);
    }
};
