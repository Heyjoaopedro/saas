import { Router } from 'express';
import {
  listCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers/companyController';
import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();

router.get('/', listCompanies);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);
router.get('/', ensureAuth, listCompanies);
router.post('/', ensureAuth, createCompany);
router.put('/:id', ensureAuth, updateCompany);
router.delete('/:id', ensureAuth, deleteCompany);

export default router;
