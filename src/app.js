import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import solicitudRoutes from './routes/solicitud.routes.js';
import adminRoutes from './routes/admin.routes.js';
import controladorRoutes from './routes/controlador.routes.js'; 

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/cliente', solicitudRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/controlador', controladorRoutes); 

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});