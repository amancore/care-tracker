const dotenv = require('dotenv');
const app = require('./app.js');
const { connectDB } = require('./config/db.js');

dotenv.config();

connectDB()
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB connection error:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
