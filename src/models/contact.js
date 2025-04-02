import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { nanoid } from 'nanoid';

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['personal', 'business'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
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
