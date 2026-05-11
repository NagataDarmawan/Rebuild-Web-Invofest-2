import { Link } from "react-router-dom";

export default function EventIndex() {
  return (
    <div className="px-7 py-8 max-w-5xl mx-auto font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
              Manajemen
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a0a10] tracking-tight">Event</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola dan pantau semua daftar event</p>
        </div>

        {/* TOMBOL TAMBAH EVENT */}
        <Link
          to="/dashboard/event/create"
          className="flex items-center gap-2 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-rose-100 transition-all active:scale-95"
        >
          <span className="text-lg leading-none">+</span>
          Tambah Event
        </Link>
      </div>

      {/* BOX KONTEN (Tabel nantinya di sini) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <p className="text-gray-400 text-sm">Daftar event akan muncul di sini.</p>
      </div>
      
    </div>
  );
}