import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import connectToDb from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
const port = 5000;
dotenv.config();

connectToDb();

const app = express();

// Enable CORS for localhost:3000
app.use(cors({
  origin: ['http://localhost:3000',"https://ecart-main-1.onrender.com"],
  credentials: true // If you're using cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: "AZra4XxHWmkPeznpQeY0NNLwhDZ-qoRIzUe4FFCPmdnDe8il-TyXrOByJwlX5jCSLWnTTPHYqU_ASubf" })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // set static folder 
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on ${port}`));
