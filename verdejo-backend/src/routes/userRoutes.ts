import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUsersByCompany,
  updateUser,
  deleteUser,
} from '../controllers/userController';

import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();

// Rotas protegidas por autenticação local
router.post('/', ensureAuth, createUser);
router.get('/', ensureAuth, getUsers);
router.get('/by-company/:companyId', ensureAuth, getUsersByCompany);
router.put('/:id', ensureAuth, updateUser);
router.delete('/:id', ensureAuth, deleteUser);

export default router;
