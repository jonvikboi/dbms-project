import { Router } from 'express';
import {
    getDashboardStats,
    updateStock,
    registerFace,
    checkFaceStatus,
    resetFaceData,
    getCategoryReport,
    updateOrderStatus
} from '../controllers/admin.controller';

const router = Router();

// Dashboard & Reports
router.get('/dashboard', getDashboardStats);
router.get('/reports', getCategoryReport);

// Inventory
router.post('/stock', updateStock);

// Face Auth
router.post('/face/register', registerFace);
router.get('/face/:userId', checkFaceStatus);
router.post('/face/reset', resetFaceData);

// Orders
// Using POST instead of PATCH for better compatibility
router.post('/orders/:orderId/status', updateOrderStatus);

export default router;
