import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../component/UI/Input";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z.string().min(2, "Username harus diisi").max(100),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data Register:", data);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-2xl shadow-xl p-8 flex flex-col gap-7 transition-all duration-300">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#7B1D3F] tracking-wider">
            <span className="rounded-full" />
            Invofest 2025
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Buat Akun
          </h1>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Bergabung dan jadilah bagian dari festival inovasi
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-4">
            <Input
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
              />
              <Input
                label="Konfirmasi Password"
                name="confirmPassword"
                type="password"
                register={register}
                error={errors.confirmPassword?.message}
              />
            </div>

            <p className="text-xs text-gray-400 -mt-1 font-medium">
              Minimal 8 karakter, kombinasikan huruf dan angka
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a1530] active:scale-[0.98] text-white font-bold text-[15px] py-3.5 rounded-xl transition-all duration-200 tracking-wide shadow-md shadow-pink-900/10 hover:shadow-lg hover:shadow-pink-900/20 mt-2"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-gray-400 text-xs font-medium px-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="uppercase tracking-wider">atau</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600 font-medium">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#7B1D3F] font-bold hover:text-[#5a1530] hover:underline transition-colors duration-200">
            Login sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}