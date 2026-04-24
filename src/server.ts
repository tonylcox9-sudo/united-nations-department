import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

interface JoinRequest {
  name: string;
  email: string;
  specialty: string;
  hospital?: string;
  message?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/api/join', (req: Request, res: Response) => {
  const { name, email, specialty, hospital, message }: JoinRequest = req.body;

  if (!name || !email || !specialty) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and specialty are required.'
    } as ApiResponse);
  }

  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   NEW DOCTOR JOINED THE DEPARTMENT        ║');
  console.log(`║   Name: ${name.padEnd(37)}║`);
  console.log(`║   Email: ${email.padEnd(36)}║`);
  console.log(`║   Specialty: ${specialty.padEnd(30)}║`);
  console.log('╚═══════════════════════════════════════════╝\n');

  res.status(201).json({
    success: true,
    message: `Welcome to the Department, Dr. ${name}. We will contact you shortly.`,
    data: { name, email, specialty }
  } as ApiResponse);
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'UNITED NATIONS DEPARTMENT is operational.',
    timestamp: new Date().toISOString()
  } as ApiResponse);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found.'
  } as ApiResponse);
});

app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║   UNITED NATIONS DEPARTMENT                          ║`);
  console.log(`║   The Vacation Department for Doctors                ║`);
  console.log(`║   Server running on port ${PORT}                          ║`);
  console.log(`╚══════════════════════════════════════════════════════╝\n`);
  console.log(`   → http://localhost:${PORT}\n`);
});