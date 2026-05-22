import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Menampilkan semua event (Ikut menampilkan info Kategori dan Pembicara)
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const allevents = await prisma.event.findMany({
            include: {
                category: true,
                pembicara: true // Mengambil data nama pembicara secara otomatis
            },
            orderBy: { createdAt: "desc" }
        });
        res.json(allevents);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data event", error: error.message });
    }
};
    
// 2. Menyimpan data event baru (Wajib menyertakan categoryId dan pembicaraId)
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, pembicaraId, location, dateEvent, description } = req.body;
         
        if (!name || !categoryId || !pembicaraId || !location || !dateEvent || !description) {
            return res.status(400).json({ message: "Nama, kategori, pembicara, lokasi, tanggal, dan deskripsi harus diisi" });
        }

        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId), 
                pembicaraId: Number(pembicaraId), // Menyimpan relasi ID Pembicara
                location,
                dateEvent: new Date(dateEvent), 
                description
            }
        });

        res.status(201).json(newEvent);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat event", error: error.message });
    }
};

// 3. Menampilkan data event berdasarkan ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({ 
            where: { id },
            include: {
                category: true,
                pembicara: true
            }
        });

        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        res.json(event);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil detail event", error: error.message });
    }
};

// 4. Mengupdate data event berdasarkan ID
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, dateEvent, location, categoryId, pembicaraId, description } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name,
                location,
                description,
                categoryId: categoryId ? Number(categoryId) : undefined,
                pembicaraId: pembicaraId ? Number(pembicaraId) : undefined, // Memperbarui pembicara jika ada perubahan
                dateEvent: dateEvent ? new Date(dateEvent) : undefined,
            }
        });

        res.json({ message: "Event berhasil diperbarui", data: updatedEvent });
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: "Event tidak ditemukan" });
        res.status(500).json({ message: "Terjadi kesalahan saat mengupdate data event", error: error.message });
    }
};

// 5. Menghapus data event berdasarkan ID
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await prisma.event.delete({
            where: { id }
        });

        res.json({ message: "Event berhasil dihapus" });
    } catch (error: any) {
        // P2025 = Record not found
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus data event", error: error.message });
    }
};