import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;
