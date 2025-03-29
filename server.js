import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/routes.js';

const app = express();

const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use('/api', dataRoutes);

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
})