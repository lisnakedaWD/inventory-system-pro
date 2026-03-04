import app from './src/app.js';
import { pool } from './src/database/connection.js';

const PORT = 3600;

(async () => {
  try {
    await pool.getConnection();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});