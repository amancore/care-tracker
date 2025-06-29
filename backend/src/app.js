const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
const preRoutes = require('./routes/preanalysis.routes.js');
const repRoutes = require('./routes/reportanalysis.routes.js');
const histRoutes = require('./routes/history.routes.js');
const { errorHandler } = require('./middlewares/error.middleware.js');

const app = express();
app.use(cors(), express.json());

app.use('/api/auth', authRoutes);
app.use('/api/preanalysis', preRoutes);
app.use('/api/reportanalysis', repRoutes);
app.use('/api/history', histRoutes);

app.use(errorHandler);

module.exports = app;
