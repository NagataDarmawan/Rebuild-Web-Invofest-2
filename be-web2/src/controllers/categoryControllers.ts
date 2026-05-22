import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Menampilkan semua kategori
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: "asc" } // Diurutkan berdasarkan ID agar rapi di tabel frontend
        });
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error: error.message });
    }
};

// 2. Menyimpan data kategori baru (Ditambahkan handling unique constraint P2002)
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

        const newCategory = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(newCategory);
    } catch (error: any) {
        // P2002 = Unique constraint failed (Nama kategori duplikat)
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Nama kategori sudah ada, gunakan nama lain!" });
        }
        res.status(500).json({ message: "Gagal membuat kategori", error: error.message });
    }
};

// 3. Menampilkan kategori berdasarkan id
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({ where: { id } });
        
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
};

// 4. Mengupdate data kategori (Ditambahkan handling unique constraint P2002)
export const updateCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        
        if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

        const updated = await prisma.category.update({
            where: { id },
            data: { name }
        });
        res.json({ message: "Kategori berhasil diperbarui", data: updated });
    } catch (error: any) {
        // P2002 = Mengubah nama ke nama yang sudah dipakai kategori lain
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Nama kategori sudah digunakan oleh kategori lain!" });
        }
        // P2025 = Not Found
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Kategori tidak ditemukan untuk diupdate" });
        }
        res.status(500).json({ message: "Gagal update kategori", error: error.message });
    }
};

// 5. Menghapus data kategori
export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        
        await prisma.category.delete({ where: { id } });
        res.json({ message: "Kategori berhasil dihapus" });
    } catch (error: any) {
        // P2003 = Foreign Key Constraint (Kategori masih dipakai oleh Event)
        if (error.code === 'P2003') {
            return res.status(400).json({ 
                message: "Harus hapus event yang menggunakan kategori ini dulu baru bisa hapus kategori!" 
            });
        }
        // P2025 = Not Found
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }
        res.status(500).json({ message: "Gagal menghapus kategori", error: error.message });
    }
};