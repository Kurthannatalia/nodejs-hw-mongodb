import { Router } from 'express';
import { 
  getAllContactsHandler, 
  getContactByIdHandler, 
  createContactHandler, 
  updateContactHandler, 
  deleteContactHandler 
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as contactsSchemas from '../validation/contactsValidation.js';

const router = Router();

router.use(authenticate);

router.get('/', getAllContactsHandler);
router.get('/:contactId', isValidId, getContactByIdHandler);
router.post(
  '/',
  validateBody(contactsSchemas.createContactSchema),
  createContactHandler
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsSchemas.updateContactSchema),
  updateContactHandler
);
router.delete('/:contactId', isValidId, deleteContactHandler);

export default router;
