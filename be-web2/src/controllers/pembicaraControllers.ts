import { Request, Response } from 'express';
import { Pembicara } from '../types/pembicara';

let pembicaraList: Pembicara[] = []; // In-memory array to store pembicara

// 1. Menampilkan semua pembicara
export const getAllPembicara = (req: Request, res: Response) => {
    res.json(pembicaraList);
};

// 2. Menyimpan data pembicara baru
export const createPembicara = (req: Request, res: Response) => {
    try {
        const { name, topik } = req.body;
        // Validasi jika ada data yang belum diisi
        if (!name || !topik) {
            return res.status(400).json({ message: "Name dan topik harus diisi" });
        }
        // Jika data sudah valid, buat pembicara baru
        const newPembicara: Pembicara = {
            id: pembicaraList.length + 1, // Generate ID sederhana
            name,
            topik
        };
        // Simpan pembicara baru ke array
        pembicaraList.push(newPembicara);
        // Kirim response dengan pembicara baru yang telah dibuat
        res.status(201).json(newPembicara);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat pembicara", error });
    }
};

// 3. Menampilkan data pembicara berdasarkan id
export const getPembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicara = pembicaraList.find((e) => e.id === id);
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    res.json(pembicara);
};
// 4. Mengupdate data pembicara berdasarkan id
export const updatePembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicara = pembicaraList.find((e) => e.id === id);
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    pembicara.name = req.body.name ?? pembicara.name;
    pembicara.topik = req.body.topik ?? pembicara.topik;
    res.json(pembicara);
};
// 5. Menghapus data pembicara berdasarkan id
export const deletePembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicara = pembicaraList.find((e) => e.id === id);
    if (!pembicara) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    pembicaraList = pembicaraList.filter((e) => e.id !== id);
    res.json({ message: "Pembicara berhasil dihapus" });
};

