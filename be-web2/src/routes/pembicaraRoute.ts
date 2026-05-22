import express from 'express';

import {
    getAllPembicara,
    createPembicara,
    getPembicaraById,
    updatePembicaraById,
    deletePembicaraById
} from "../controllers/pembicaraControllers.js";

const router = express.Router();
router.get("/", getAllPembicara);
router.post("/", createPembicara);
router.get("/:id", getPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;