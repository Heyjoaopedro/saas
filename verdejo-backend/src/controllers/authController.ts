import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email e senha são obrigatórios' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ message: 'Login bem-sucedido', user: userWithoutPassword });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar login', detail: err });
  }
};
