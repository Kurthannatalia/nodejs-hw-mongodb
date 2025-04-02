import { Router } from 'express';
// Імпортуємо іменовані функції з контролера
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

// Використовуємо middleware для автентифікації
router.use(authenticate);

// Роут для отримання всіх контактів
router.get('/', getAllContactsHandler);

// Роут для отримання контакту за ID
router.get('/:contactId', isValidId, getContactByIdHandler);

// Роут для створення нового контакту
router.post(
  '/',
  validateBody(contactsSchemas.createContactSchema),
  createContactHandler,
);

// Роут для оновлення контакту за ID
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsSchemas.updateContactSchema),
  updateContactHandler,
);

// Роут для видалення контакту за ID
router.delete('/:contactId', isValidId, deleteContactHandler);

export default router;
