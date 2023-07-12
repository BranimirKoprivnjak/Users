import { RequestHandler } from 'express';
import User from '../../models/User';
import { phoneNumberIsValid } from '../../helpers/helpers';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string) : 1;
    const limitNumber = limit ? parseInt(limit as string) : 50;

    const skip = (pageNumber - 1) * limitNumber;

    const users = await User.find().skip(skip).limit(limitNumber);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const missingFields: string[] = [];

    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!phoneNumber) missingFields.push('phoneNumber');

    if (missingFields.length > 0) {
      const errorMsg = `Missing required fileds: ${missingFields.join(', ')}`;
      return res.status(400).json({ msg: errorMsg });
    }

    if (!phoneNumberIsValid(phoneNumber)) {
      return res.status(400).json({ msg: 'Invalid phone number format.' });
    }

    const user = new User(req.body);
    await user.save();

    return res.status(201).json({ msg: 'User successfully created.' });
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ msg: 'Invalid id.' });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    if (phoneNumber && !phoneNumberIsValid(phoneNumber)) {
      return res.status(400).json({ msg: 'Invalid phone number format.' });
    }

    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!user) return res.status(400).json({ msg: 'Invalid id.' });

    return res.status(204).json({ msg: 'User successfully updated.' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).json({ msg: 'Invalid id.' });

    return res.status(204).json({ msg: 'User successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
