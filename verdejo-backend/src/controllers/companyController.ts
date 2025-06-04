import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listCompanies: RequestHandler = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar empresas', detail: error });
  }
};

export const createCompany: RequestHandler = async (req, res) => {
  const { name, email, domain, logo, primaryColor } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    return;
  }

  try {
    const company = await prisma.company.create({
      data: {
        name,
        email,
        domain,
        logo,
        primaryColor,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empresa', detail: error });
  }
};

// ✅ NOVO - Atualizar empresa
export const updateCompany: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email, domain, logo, primaryColor } = req.body;

  try {
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        name,
        email,
        domain,
        logo,
        primaryColor
      },
    });

    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar empresa', detail: error });
  }
};

// ✅ NOVO - Deletar empresa
export const deleteCompany: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.company.delete({ where: { id } });
    res.json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir empresa', detail: error });
  }
};
