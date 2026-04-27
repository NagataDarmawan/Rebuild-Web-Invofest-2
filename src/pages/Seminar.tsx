import Button from "../component/UI/Button";
import SpeakerCard from "../component/UI/SpeakerCard";
import Collapse from "../component/UI/Collapse";
import { Calendar, Clock, MapPin, Building } from "lucide-react";

export default function Seminar() {
  const speakers = [
    {
      name: "Dery Agung Triyadi",
      role: "AWS Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png",
    },
    {
      name: "Sowam Habibi",
      role: "Google Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png",
    },
  ];

  // ✅ TAMBAHAN FAQ
  const faqItems = [
    {
      title: "Apa itu Infofest??",
      description:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.",
    },
    {
      title: "Kapan dan dimana INVOFEST dilaksanakan?",
      description:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online.",
    },
    {
      title: "Apakah ada biaya pendaftaran di INVOFEST?",
      description:
        "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
  ];

  return (
    <div className="bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            IT Seminar
          </h1>

          <h2 className="text-xl md:text-2xl text-red-800 mb-6">
            "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif"
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
           Seminar nasional yang membahas strategi dan arsitektur teknologi untuk menciptakan sistem di mana manusia dan 
           AI bekerja sebagai mitra yang sinergis. Yang bertujuan mengubah paradigma dari persaingan menjadi kolaborasi, serta meningkatkan pengetahuan peserta dalam merancang teknologi AI yang 
           berpusat pada manusia
          </p>

          <div className="flex gap-4">
            <Button label="DAFTAR SEKARANG" variant="primary" />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
            alt="seminar"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
          Tentang IT Seminar
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Seminar bertajuk “Human-AI Integration: Merancang Arsitektur Kolaboratif, Di tengah pesatnya kemajuan kecerdasan buatan (AI), narasi yang sering muncul adalah tentang persaingan 
          antara manusia dan mesin. Kekhawatiran akan penggantian peran manusia oleh teknologi cerdas menjadi diskusi utama di berbagai sektor. Namun, bagaimana jika kita mengubah paradigma tersebut?
          Seminar Nasional Teknologi Informasi ini hadir untuk menjawab tantangan itu dengan mengangkat tema "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.” Kami bertujuan untuk 
          menggeser fokus dari ketakutan akan kompetisi menjadi eksporasi peluang kolaborasi Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan lingkungan kerja di mana AI berfungsi 
          sebagai mitra yang memperkuat kecerdasan, kreativitas, dan produktivitas manusia—bukan sebagai pengganti.
        </p>
      </section>

      {/* SPEAKER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Temui Pembicara Khusus Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 justify-items-center">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              role={speaker.role}
              imageUrl={speaker.imageUrl}
            />
          ))}
        </div>
      </section>

      {/* PELAKSANAAN */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Pelaksanaan IT Seminar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Calendar className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Tanggal</p>
              <h3 className="text-lg font-semibold text-red-900">
                Kamis, 27 November 2025
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Clock className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Waktu</p>
              <h3 className="text-lg font-semibold text-red-900">
                08.00 WIB - 12.00 WIB
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <MapPin className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Lokasi</p>
              <h3 className="text-lg font-semibold text-red-900">
                Aula Gedung C
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Building className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Tempat Kampus</p>
              <h3 className="text-lg font-semibold text-red-900">
                Kampus 1 (Mataram) Universitas Harkat Negeri
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* ✅ FAQ (TAMBAHAN) */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-6">
         Punya Pertanyaan? Lihat Disini
        </h2>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => (
            <Collapse
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        &copy; 2026 Invofest. All rights reserved.
      </footer>
    </div>
  );
}