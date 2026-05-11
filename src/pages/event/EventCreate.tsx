import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../component/UI/Button";
import Input from "../../component/UI/Input";


type FormData = {
  name: string;
  tanggal: Date;
  lokasi: string;
};

const schema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
  tanggal: z.coerce.date({message: "Tanggal event harus berupa tanggal yang valid"}),
  lokasi: z.string().min(3, "Lokasi event minimal 3 karakter"),
});


export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({resolver: zodResolver(schema),});

  const onsubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Kategori Event</h1>
      <p>Form untuk menambahkan kategori event baru.</p>

      <form onSubmit={handleSubmit(onsubmit)}>
        <Input
          label="Nama Kategori"
          name="name"
          register={register}
          error={errors.name?.message}
        />

          <Input
          label="Tanggal Event"
          name="tanggal"
          type="date"
          register={register}
          error={errors.tanggal?.message}
        />

          <Input
          label="Lokasi Event"
          name="lokasi"
          register={register}
          error={errors.lokasi?.message}
        />

        <Button label="Simpan" variant="primary" />
      </form>
    </div>
  );
}