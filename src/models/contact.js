import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'personal'],
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.statics.paginate = async function (filter = {}, options = { page: 1, limit: 10 }) {
  const skip = (options.page - 1) * options.limit;
  const contacts = await this.find(filter)
    .skip(skip)
    .limit(options.limit)
    .sort(options.sort || { name: 1 });

  const totalContacts = await this.countDocuments(filter);

  return {
    docs: contacts,
    totalDocs: totalContacts,
    totalPages: Math.ceil(totalContacts / options.limit),
    hasNextPage: options.page * options.limit < totalContacts,
    hasPrevPage: options.page > 1,
  };
};

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
