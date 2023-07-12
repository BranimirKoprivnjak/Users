import { Router } from 'express';
import {
  getUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/users/usersController';

const router = Router();

router.route('/').get(getUsers).post(createNewUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
