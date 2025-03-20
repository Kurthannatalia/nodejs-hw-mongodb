import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    getAllContactsHandler,
    getContactByIdHandler,
    createContactHandler,
    updateContactHandler,
    deleteContactHandler,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
    createContactSchema,
    updateContactSchema,
} from '../validation/contactsValidation.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsHandler));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdHandler));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactHandler));
router.patch(
    '/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrlWrapper(updateContactHandler)
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactHandler));

export default router; 
