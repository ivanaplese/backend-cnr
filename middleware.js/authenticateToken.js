// import jwt from "jsonwebtoken";
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authenticated-user'];
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthenticated' });
//     }

//     jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden' });
//         }
//         req.user = user;
//         next();
//     });
// };
// export { authenticateToken }