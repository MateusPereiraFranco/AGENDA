import express from 'express'
import enterpriseRoutes from './routes/enterpriseRoutes.js';
import userRoutes from './routes/userRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'

const app = express();
app.use(express.json())

// Usando as rotas definidas em 'userRoutes'
app.use('/enterprises', enterpriseRoutes);
app.use('/users', userRoutes);
app.use('/schedules', scheduleRoutes);


// Inicia o servidor na porta do dotenv
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
