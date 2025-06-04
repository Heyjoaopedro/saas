import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, companyId } = req.body;
  if (!name || !email || !password || !companyId) {
    res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, companyId },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário', detail: err });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({ include: { company: true } });
    const usersWithoutPasswords = users.map((user: any) => {
      const { password, ...rest } = user;
      return rest;
    });
    res.json(usersWithoutPasswords);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar usuários', detail: err });
  }
};

export const getUsersByCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  try {
    const users = await prisma.user.findMany({
      where: { companyId }, 
      include: { company: true },
    });

    const usersWithoutPasswords = users.map((user: typeof users[number]) => {
      const { password, ...rest } = user;
      return rest;
    });
    res.json(usersWithoutPasswords);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários por empresa', detail: err });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    const { password, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', detail: err });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário', detail: err });
  }
};
