import { Request, Response } from "express";
import { Event } from "../types/event";  

let events: Event[] = []; // In-memory array to store events

//1.menampilkan semua event 
export const getAllEvents = (req: Request, res: Response) => {
    res.json(events);
};
    
//2.menyimpan data event baru
export const createEvent = (req: Request, res: Response) => {
    try {
        const { name, tanggal, lokasi } = req.body;
         
        // Validasi jika ada data yg belum diisi
        if (!name || !tanggal || !lokasi) {
            return res.status(400).json({ message: "Name, tanggal, and lokasi harus di isi" });
        }

        // jika data sudah valid, buat event baru
        const newEvent: Event = {
            id: events.length + 1, // Generate ID sederhana
            name,
            tanggal: new Date(tanggal), // Pastikan tanggal diubah ke format Date
            lokasi
        };

        // simpan event baru ke array
        events.push(newEvent);

        // Kirim response dengan event baru yang telah dibuat
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};

//3.menampilkan data event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json(event);
};

//4.mengupdate data event berdasarkan id
export const updateEventById = (req: Request, res: Response) => {
     const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    event.name = req.body.name?? event.name;
    event.tanggal = req.body.tanggal ? new Date(req.body.tanggal) : event.tanggal;
    event.lokasi = req.body.lokasi?? event.lokasi;
    
    res.json(event);
};

//5.menghapus data event berdasarkan id
export const deleteEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    events = events.filter((e) => e.id !== id);
    res.json({ message: "Event berhasil dihapus" });
};