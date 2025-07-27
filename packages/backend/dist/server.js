"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
// Root route for health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running.' });
});
// API route with error handling
app.get('/api/samples', async (req, res) => {
    try {
        const samples = await prisma.sample.findMany();
        res.json(samples);
    }
    catch (error) {
        console.error('Error fetching samples:', error);
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});
const PORT = process.env.PORT || 4000;
try {
    app.listen(PORT, () => {
        console.log(`Backend running on http://localhost:${PORT}`);
    });
}
catch (err) {
    console.error('Failed to start server:', err);
}
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
