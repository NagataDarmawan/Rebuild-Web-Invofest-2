import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Input from "../component/UI/Input";
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Username harus diisi").max(100),
  password: z.string().min(8, "Minimal 8 karakter").max(100),
});

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data Login:", data);

    if (data.username === "Nagata Darmawan" && data.password === "24090032") {
      alert("Login berhasil!");
      login(data.username);
      navigate("/dashboard");
    } else {
      alert("Login gagal! Pastikan username dan password benar.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-transparent">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-2xl shadow-xl p-8 flex flex-col gap-7 transition-all duration-300">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#7B1D3F] tracking-wider">
            <span className="rounded-full" />
            Invofest 2025
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Selamat Datang
          </h1>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Masuk untuk melanjutkan ke dashboard kamu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
          <div className="flex flex-col gap-4">
            <Input
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <div className="flex flex-col gap-2">
              <Input
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
              />
              <div className="flex justify-end">
                <span className="text-xs text-[#7B1D3F] font-semibold cursor-pointer hover:text-[#5a1530] hover:underline transition-colors duration-200">
                  Lupa password?
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a1530] active:scale-[0.98] text-white font-bold text-[15px] py-3.5 rounded-xl transition-all duration-200 tracking-wide shadow-md shadow-pink-900/10 hover:shadow-lg hover:shadow-pink-900/20 mt-2"
          >
            Masuk
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-gray-400 text-xs font-medium px-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="uppercase tracking-wider">atau</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Register link */}
        <p className="text-sm text-center text-gray-600 font-medium">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#7B1D3F] font-bold hover:text-[#5a1530] hover:underline transition-colors duration-200">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}