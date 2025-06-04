import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import companyRoutes from './routes/companyRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas principais
app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
