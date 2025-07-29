import mongoose from 'mongoose';
const sessionSchema = new mongoose.Schema({
  userId: String,
  title: String,
  chat: Array,
  code: {
    jsx: String,
    css: String
  }
}, { timestamps: true });
export const Session = mongoose.model('session', sessionSchema);