import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, "1234", {
    expiresIn: '30d',
  });

  console.log("JWT_SECRET",process.env.JWT_SECRET)
  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge:30 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
};

export default generateToken;