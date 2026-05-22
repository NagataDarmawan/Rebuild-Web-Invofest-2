import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

interface Speaker {
  id: number;
  name: string;
  topik: string;
}

export default function EventEdit() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State untuk menyimpan daftar master data dropdown
  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  // State Form (dateEvent hanya menyimpan string tanggal "YYYY-MM-DD")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dateEvent: "",
    description: "",
    categoryId: "",
    pembicaraId: ""
  });

  // 1. Ambil data master dropdown & detail event saat halaman dimuat
  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Fetch daftar kategori untuk dropdown
        const resCat = await fetch("http://localhost:3000/categories");
        const dataCat = await resCat.json();
        setCategories(dataCat);

        // Fetch daftar pembicara untuk dropdown
        const resSpeaker = await fetch("http://localhost:3000/pembicara");
        const dataSpeaker = await resSpeaker.json();
        setSpeakers(dataSpeaker);

        // Fetch detail data event yang mau diedit
        const resEvent = await fetch(`http://localhost:3000/events/${id}`);
        const dataEvent = await resEvent.json();

        // Format tanggal ISO dari backend agar pas dibaca oleh type="date" (YYYY-MM-DD)
        let formattedDate = "";
        if (dataEvent.dateEvent) {
          const date = new Date(dataEvent.dateEvent);
          // Menghasilkan format murni tanggal sepanjang 10 karakter: YYYY-MM-DD
          formattedDate = date.toISOString().slice(0, 10);
        }

        setFormData({
          name: dataEvent.name || "",
          location: dataEvent.location || "",
          dateEvent: formattedDate,
          description: dataEvent.description || "",
          categoryId: dataEvent.categoryId ? String(dataEvent.categoryId) : "",
          pembicaraId: dataEvent.pembicaraId ? String(dataEvent.pembicaraId) : ""
        });

      } catch (err) {
        console.error("Gagal mengambil data komponen edit:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [id]);

  // 2. Fungsi simpan perubahan (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Satukan kembali string tanggal pilihan dengan waktu default (misal 07:00 pagi)
      const fullDateTimeString = `${formData.dateEvent}T07:00:00.000Z`;

      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          description: formData.description,
          categoryId: Number(formData.categoryId),
          pembicaraId: Number(formData.pembicaraId),
          dateEvent: new Date(fullDateTimeString).toISOString() // Dikirim kembali sebagai ISO String ke backend
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Event berhasil diperbarui!");
        navigate("/dashboard/event"); // Balik ke halaman daftar event
      } else {
        alert(result.message || "Gagal memperbarui data event.");
      }
    } catch (error) {
      console.error("Gagal update:", error);
      alert("Gagal terhubung ke server. Pastikan server backend sudah dinyalakan!");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Memuat data event...</div>;

  return (
    <div className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-2 text-[#1a0a10]">Edit Event</h1>
      <p className="text-sm text-gray-400 mb-6">Ubah data event yang diperlukan di bawah ini</p>
      
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl space-y-4">
        {/* Input Nama Event */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Event</label>
          <input 
            type="text"
            className="border p-2.5 w-full rounded-xl text-sm"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Dropdown Dinamis Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kategori</label>
            <select 
              className="border p-2.5 w-full rounded-xl text-sm bg-white"
              value={formData.categoryId}
              onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Dropdown Dinamis Pembicara */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Pembicara</label>
            <select 
              className="border p-2.5 w-full rounded-xl text-sm bg-white"
              value={formData.pembicaraId}
              onChange={(e) => setFormData({...formData, pembicaraId: e.target.value})}
              required
            >
              <option value="">-- Pilih Pembicara --</option>
              {speakers.map((spk) => (
                <option key={spk.id} value={spk.id}>{spk.name} ({spk.topik})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Input Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input 
              type="text"
              className="border p-2.5 w-full rounded-xl text-sm"
              value={formData.location} 
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          {/* Input Tanggal (Hanya Tanggal/Bulan/Tahun) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Event</label>
            <input 
              type="date" // Diubah dari datetime-local menjadi date murni
              className="border p-2.5 w-full rounded-xl text-sm"
              value={formData.dateEvent || ""} 
              onChange={(e) => setFormData({...formData, dateEvent: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Input Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea 
            rows={4}
            className="border p-2.5 w-full rounded-xl text-sm"
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex justify-end gap-2 pt-2">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-5 py-2.5 border border-gray-200 text-sm font-semibold rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button type="submit" className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}