import { Request, Response, NextFunction } from 'express';

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authorized = req.headers.authorization === 'local-dev'; // Simples para ambiente local

  if (!authorized) {
    res.status(401).json({ error: 'Acesso não autorizado' });
    return;
  }

  next();
};