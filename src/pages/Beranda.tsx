import Button from "../component/UI/Button";
import Collapse from "../component/UI/Collapse";
import SpeakerCard from "../component/UI/SpeakerCard";
import Card from "../component/UI/Card";

export default function Beranda() {
  const speakers = [
    {
      name: "Dery Agung Triyadi",
      role: "Aws Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png",
    },
    {
      name: "Sowam Habibi",
      role: "Google Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png",
    },
    {
      name: "Lhuqita Fazry",
      role: "Mobile Development Developer, Founder Rumah Coding Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png",
    },
  ];

  const collapseItems = [
    {
      title: "Apa itu Invofest?",
      description:
        'Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.',
    },
    {
      title: "Kapan dan dimana Invofest akan diselenggarakan?",
      description:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online.",
    },
    {
      title: "Apakah ada biaya pendaftaran di INVOFEST?",
      description:
        "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
  ];

  const cardItems = [
    {
      title: "IT Seminar",
      description:
        'Seminar nasional ini membahas "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif".',
    },
    {
      title: "IT Talkshow",
      description:
        'Talkshow "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan".',
    },
    {
      title: "IT Competition",
      description:
        'Kompetisi "From Creation to Innovation" untuk generasi muda.',
    },
    {
      title: "IT Workshop",
      description:
        "Workshop AI untuk Gen Z menciptakan solusi berkelanjutan.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* HERO */}
      <section
        id="hero"
        className="py-10 flex gap-10 justify-between items-center"
      >
        <div className="w-2/3 flex flex-col gap-6">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
            alt=""
            className="w-96"
          />

          <p>
            Invofest (Informatics Vocational Festival) adalah festival tahunan
            yang bertujuan untuk menginspirasi dan memberdayakan generasi muda
            Indonesia dalam menghadapi era digital. Dengan mengusung tema
            "Beyond Limits, Beyond Intelligence: Innovate for a Smarter
            Tomorrow".
          </p>

          <div className="flex gap-3">
            <Button label="Info Selengkapnya" variant="primary" />
            <Button label="Hubungi Panitia" variant="outline" />
          </div>
        </div>

        <div className="w-1/3">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
            alt=""
          />
        </div>
      </section>

      {/* SPEAKER */}
      <h2 className="text-3xl md:text-4xl text-center font-bold text-red-900">
        Narasumber Kami
      </h2>

      <section id="speaker" className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-3">
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

      {/* CARDS */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-red-900">
          Tentang Invofest
        </h2>
      </div>

      <section
        id="cards"
        className="py-24 grid grid-cols-1 md:grid-cols-2 gap-10 px-3"
      >
        {cardItems.map((item, index) => (
          <Card key={index} className="w-full">
            <h3 className="text-2xl text-red-900 mb-4">{item.title}</h3>
            <p>{item.description}</p>
            <Button
              label="Info Selengkapnya"
              variant="primary"
              className="mt-4"
            />
          </Card>
        ))}
      </section>

      {/* FAQ */}
      <section id="collapse" className="py-24 flex flex-col gap-2 px-3">
        <h2 className="text-3xl font-bold text-center text-red-900 mb-6">
          Punya Pertanyaan? Lihat Disini
        </h2>

        {collapseItems.map((item, index) => (
          <Collapse
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        &copy; 2026 Invofest. All rights reserved.
      </footer>
    </div>
  );
}