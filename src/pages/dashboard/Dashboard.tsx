type Stat = {
  title: string;
  value: number;
  icon: string;
};

type EventItem = {
  name: string;
  category: string;
  date: string;
};

type SpeakerItem = {
  name: string;
  job: string;
};

const stats: Stat[] = [
  { title: "Kategori", value: 10, icon: "🗂️" },
  { title: "Event", value: 25, icon: "📅" },
  { title: "Pembicara", value: 8, icon: "🎤" },
  { title: "Event Aktif", value: 5, icon: "✅" },
];

const latestEvents: EventItem[] = [
  { name: "Seminar AI 2025", category: "Seminar", date: "10 Jan 2026" },
  { name: "Workshop UI/UX", category: "Workshop", date: "15 Feb 2026" },
  { name: "Talkshow Startup", category: "Talkshow", date: "20 Mar 2026" },
];

const latestSpeakers: SpeakerItem[] = [
  { name: "Danang Avan M", job: "UI/UX Designer" },
  { name: "Lhuqita Fazry", job: "Software Engineer" },
  { name: "M. Dendi Purwanto", job: "Product Manager" },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {stat.title}
        </span>
        <span className="text-xl">{stat.icon}</span>
      </div>
      <p className="text-3xl font-bold text-[#1a0a10] tracking-tight">{stat.value}</p>
      <div className="h-1 w-8 bg-[#7B1D3F] rounded-full" />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-3 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
      <h2 className="text-sm font-bold text-[#1a0a10] tracking-tight">{title}</h2>
    </div>
  );
}

function EventListItem({ item, isLast }: { item: EventItem; isLast: boolean }) {
  return (
    <li className={`flex items-center justify-between py-3 ${isLast ? "" : "border-b border-gray-50"}`}>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
        <span className="text-xs text-gray-400">{item.date}</span>
      </div>
      <span className="text-xs font-medium bg-rose-50 text-[#7B1D3F] px-2.5 py-1 rounded-full">
        {item.category}
      </span>
    </li>
  );
}

function SpeakerListItem({ item, index, isLast }: { item: SpeakerItem; index: number; isLast: boolean }) {
  const initials = item.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colors = [
    "from-[#7B1D3F] to-[#c9395e]",
    "from-[#1a4f7B] to-[#3982c9]",
    "from-[#1a7B3F] to-[#39c970]",
  ];

  return (
    <li className={`flex items-center gap-3 py-3 ${isLast ? "" : "border-b border-gray-50"}`}>
      <div className={`w-9 h-9 rounded-full  ${colors[index % colors.length]} text-white text-xs font-bold flex items-center justify-center `}>
        {initials}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
        <span className="text-xs text-gray-400">{item.job}</span>
      </div>
    </li>
  );
}

export default function Dashboard() {
  return (
    <div className="px-7 py-8 max-w-5xl mx-auto space-y-8">

      {/* PAGE TITLE */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
          <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
            Overview
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Ringkasan data Invofest hari ini</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Event Terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Event Terbaru" />
          <ul>
            {latestEvents.map((item, i) => (
              <EventListItem
                key={item.name}
                item={item}
                isLast={i === latestEvents.length - 1}
              />
            ))}
          </ul>
        </div>

        {/* Pembicara Terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Pembicara Terbaru" />
          <ul>
            {latestSpeakers.map((item, i) => (
              <SpeakerListItem
                key={item.name}
                item={item}
                index={i}
                isLast={i === latestSpeakers.length - 1}
              />
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}