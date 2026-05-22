import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Menampilkan semua pembicara (Ikut menampilkan daftar event yang mereka isi)
export const getAllPembicara = async (req: Request, res: Response) => {
    try {
        const data = await prisma.pembicara.findMany({
            include: { 
                events: true // Menggunakan 'events' (jamak) sesuai skema relasi baru
            },
            orderBy: { id: "asc" }
        });
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: "Gagal mengambil data pembicara", error: error.message });
    }
};

// 2. Menyimpan data pembicara baru
export const createPembicara = async (req: Request, res: Response) => {
    try {
        const { name, topik } = req.body;
        
        if (!name || !topik) {
            return res.status(400).json({ message: "Nama dan topik wajib diisi" });
        }

        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                topik
            }
        });
        
        res.status(201).json(newPembicara);
    } catch (error: any) {
        res.status(500).json({ message: "Gagal membuat pembicara", error: error.message });
    }
};

// 3. Menampilkan pembicara berdasarkan ID
export const getPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID harus berupa angka" });

        const data = await prisma.pembicara.findUnique({ 
            where: { id },
            include: { events: true } // Mengambil daftar event terkait pembicara ini
        });
        
        if (!data) return res.status(404).json({ message: "Data pembicara tidak ditemukan" });
        
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: "Error saat mengambil detail data pembicara", error: error.message });
    }
};

// 4. Mengupdate data pembicara
export const updatePembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID harus berupa angka" });

        const { name, topik } = req.body;

        if (!name || !topik) {
            return res.status(400).json({ message: "Nama dan topik wajib diisi" });
        }

        const updated = await prisma.pembicara.update({
            where: { id },
            data: { 
                name, 
                topik
            }
        });
        res.json({ message: "Data pembicara berhasil diperbarui", data: updated });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Data pembicara tidak ditemukan untuk diupdate" });
        }
        res.status(500).json({ message: "Gagal update data pembicara", error: error.message });
    }
};

// 5. Menghapus pembicara
export const deletePembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID harus berupa angka" });
        
        await prisma.pembicara.delete({ where: { id } });
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error: any) {
        // P2003 = Pembicara masih dipakai di dalam tabel Event
        if (error.code === 'P2003') {
            return res.status(400).json({ 
                message: "Harus hapus event yang diisi oleh pembicara ini dulu baru bisa hapus pembicara!" 
            });
        }
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Data pembicara tidak ditemukan untuk dihapus" });
        }
        res.status(500).json({ message: "Gagal menghapus data pembicara", error: error.message });
    }
};