import express from 'express';
import { Session } from '../models/session.models.js';
const router = express.Router();


function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.sendStatus(403);
  }
}


router.post('/', authMiddleware, async (req, res) => {
  const session = await Session.create({ userId: req.userId, ...req.body });
  res.json(session);
});

router.get('/', authMiddleware, async (req, res) => {
  const sessions = await Session.find({ userId: req.userId }).sort({ updatedAt: -1 });
  res.json(sessions);
});

router.get('/:id', authMiddleware, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, userId: req.userId });
  if (!session) return res.sendStatus(404);
  res.json(session);
});

export default router;