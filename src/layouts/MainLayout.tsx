import Header from "../component/Header";
import { Outlet } from "react-router-dom";
import Partner from "./SponsorPartner";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="py-24 container mx-auto px-4">
        <Outlet />
      </main>

      {/* ── SPONSOR & MEDIA PARTNER ── */}
      <Partner />

      {/* ── FOOTER ── */}
      <footer className="bg-[#fce8ef] pt-12 pb-0">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">

          {/* Logo */}
          <div className="flex items-start">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/Logo.png"
              alt="INVOFEST Logo"
              className="w-36 object-contain"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const div = document.createElement("div");
                div.innerHTML = `<span style="font-size:1.5rem;font-weight:900;color:#7B1D3F">INV<span>O</span>FEST</span><br/><span style="font-size:0.6rem;color:#7B1D3F;letter-spacing:0.05em">INFORMATICS VOCATIONAL FESTIVAL</span>`;
                el.parentNode?.insertBefore(div, el);
              }}
            />
          </div>

          {/* Menu Navigasi */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Menu Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", icon: "" },
                { label: "Seminar", icon: "" },
                { label: "Competition", icon: "" },
                { label: "Workshop", icon: "" },
                { label: "Talkshow", icon: "" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className="text-gray-600 text-sm flex items-center gap-2 hover:text-[#7B1D3F] transition-colors duration-200"
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Ikuti Kami
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm flex items-center gap-2 hover:text-[#7B1D3F] transition-colors duration-200"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                    alt="Instagram" 
                    className="w-5 h-5 object-contain"
                  />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm flex items-center gap-2 hover:text-[#7B1D3F] transition-colors duration-200"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                    alt="YouTube" 
                    className="w-5 h-5 object-contain"
                  />
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Alamat / Map */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 tracking-widest uppercase mb-5">
              Alamat
            </h4>
            <div className="rounded-xl overflow-hidden border border-pink-200 shadow-sm w-full h-36">
              <iframe
                title="Lokasi INVOFEST"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.!2d109.1!3d-6.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb1234567890%3A0xabc!2sPoliteknik+Harapan+Bersama+Tegal!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-200 px-8 py-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} INVOFEST. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              {/* Tombol YouTube */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded bg-[#7B1D3F] hover:bg-[#5a1530] transition-colors duration-200"
                aria-label="YouTube"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                  alt="YouTube" 
                  className="w-4 h-4 object-contain"
                />
              </a>
              {/* Tombol Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded bg-[#7B1D3F] hover:bg-[#5a1530] transition-colors duration-200"
                aria-label="Instagram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="w-4 h-4 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}