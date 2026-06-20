const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        username,
        token,
      });
    }

    return res.status(401).json({
      message: 'Invalid username or password',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = { loginAdmin };
