import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },

    email: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.statics.findContactById = async function (contactId, userId) {
  const contact = await this.findOne({ _id: contactId, userId });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

contactSchema.statics.createNewContact = async function (payload) {
  const newContact = new this(payload);
  await newContact.save();
  return newContact;
};

contactSchema.statics.updateContact = async function (contactId, userId, payload) {
  const updatedContact = await this.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true }
  );
  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return updatedContact;
};

contactSchema.statics.deleteContact = async function (contactId, userId) {
  const deletedContact = await this.findOneAndDelete({ _id: contactId, userId });
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return deletedContact;
};

const Contact = mongoose.model('Contact', contactSchema);

export { Contact };
