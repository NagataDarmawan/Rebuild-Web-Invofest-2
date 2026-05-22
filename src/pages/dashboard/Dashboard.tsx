export default function Dashboard() {
  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
        {/* Foto Profil (Placeholder) */}
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-400">
          <span className="text-4xl">👤</span>
        </div>

        {/* Nama & Identitas */}
        <h1 className="text-2xl font-bold text-[#1a0a10]">
          Nagata Darmawan
        </h1>
        <p className="text-[#7B1D3F] font-semibold mt-1">NIM: 24090032</p>

        <hr className="my-6" />

        {/* Detail Biodata */}
        <div className="text-left space-y-4 text-sm text-gray-600">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-400">Program Studi</span>
            <span className="text-gray-800">Teknik Informatika</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-400">Universitas</span>
            <span className="text-gray-800">Universitas Harkat Negeri</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-400">Email</span>
            <span className="text-gray-800">nagata.2140@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
