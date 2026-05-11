import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../component/UI/Button";
import Input from "../../component/UI/Input";


type FormData = {
  name: string;
  topik: string;
};

const schema = z.object({
  name: z.string().min(3, "Nama pembicara minimal 3 karakter"),
  topik: z.string().min(3, "Topik pembicara minimal 3 karakter"),
});


export default function PembicaraCreate() {
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
      <h1 className="text-2xl font-bold mb-4">Tambah Pembicara Event</h1>
      <p>Form untuk menambahkan pembicara event baru.</p>

      <form onSubmit={handleSubmit(onsubmit)}>
        <Input
          label="Nama Pembicara"
          name="name"
          register={register}
          error={errors.name?.message}
        />

         <Input
          label="Topik"
          name="topik"
          register={register}
          error={errors.topik?.message}
        />

        <Button label="Simpan" variant="primary" />
      </form>
    </div>
  );
}