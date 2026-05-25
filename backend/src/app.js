import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import authRoutes from './routes/auth.js';
import mealRoutes from './routes/meals.js';
import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';
import { errorHandler } from './middleware/errorHandler.js';
import { successResponse } from './utils/responseHandler.js';

const app = express();

const localOrigins = ['http://localhost:5173', 'http://localhost:3000'];
const configuredOrigins = (process.env.FRONTEND_ORIGIN || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);
const allowedOrigins = new Set([...localOrigins, ...configuredOrigins]);

app.use(helmet());
app.use(cors({
	origin(origin, callback) {
		if (!origin || allowedOrigins.has(origin)) {
			return callback(null, true);
		}

		return callback(new Error(`CORS blocked for origin: ${origin}`));
	}
}));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => successResponse(res, 'OK', { status: 'running' }));
app.get('/api/health', (req, res) => successResponse(res, 'OK', { status: 'healthy' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

app.use(errorHandler);

export default app;
