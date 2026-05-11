import {request, response} from 'express';
import { Category } from '../types/category';

let categories: Category[] = [];

// 1. Menampilkan semua kategori
export const getAllCategories = (req: request, res: response) => {
    res.json(categories);
};

// 2. Menyimpan data kategori baru
export const createCategory = (req: request, res: response) => {
    try {
        const { name } = req.body;

        // Validasi jika nama kategori belum diisi
        if (!name) {
            return res.status(400).json({ message: "Name harus diisi" });
        }

        // Jika data sudah valid, buat kategori baru
        const newCategory: Category = {
            id: categories.length + 1, // Generate ID sederhana
            name
        };
        // Simpan kategori baru ke array
        categories.push(newCategory);
        // Kirim response dengan kategori baru yang telah dibuat
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat kategori", error });
    }
};

// 3. Menampilkan data kategori berdasarkan id
export const getCategoryById = (req: request, res: response) => {
    const id = Number(req.params.id);
    const category = categories.find((e) => e.id === id);
    if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json(category);
};

// 4. Mengupdate data kategori berdasarkan id
export const updateCategoryById = (req: request, res: response) => {
    const id = Number(req.params.id);
    const category = categories.find((e) => e.id === id);
    if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    category.name = req.body.name?? category.name;
    
    res.json(category);
};

// 5. Menghapus data kategori berdasarkan id
export const deleteCategoryById = (req: request, res: response) => {
    const id = Number(req.params.id);

    const category = categories.find((e) => e.id === id);
    if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    categories = categories.filter((e) => e.id !== id);
    res.json({ message: "Kategori berhasil dihapus" });
};