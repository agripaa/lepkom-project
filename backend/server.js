const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const routes = require('./routes/routeApp');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// (async () => {
//     try {
//         await sequelize.sync({ alter: true });
//         console.log('Database synchronized!');
//     } catch (err) {
//         console.error('Failed to synchronize database:', err);
//     }
// })();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
