import Button from "../component/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // UNTUK VALIDASI PASSWORD
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama");
      return;
    }

    setError("");

    alert("Registrasi berhasil!");
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-red-900 text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* CONFIRMASI PASSWORD */}
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          {/* PESAN MESSAGE */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button label="Daftar" variant="primary" />

          <p className="text-sm text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-red-900 font-semibold">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}