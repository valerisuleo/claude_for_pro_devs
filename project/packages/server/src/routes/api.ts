import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.get("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Express + Bun!" });
});

export default router;
