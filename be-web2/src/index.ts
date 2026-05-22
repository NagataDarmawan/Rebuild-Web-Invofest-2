import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoute.js';      
import categoryRoutes from './routes/categoryRoute.js'; 
import pembicaraRoutes from './routes/pembicaraRoute.js'; 

const app = express();
const port = process.env.PORT || 3000; // Menggunakan env port agar cocok dengan Vercel

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API be-web2 is running!');
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Tambahkan ini agar Vercel bisa mengenali handler app