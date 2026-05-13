import { healthCheack } from "../controllers/healthCheck.controllers.js";

import { Router } from "express";

const router = Router()


router.route("/").get(healthCheack);

export default router 