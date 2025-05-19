import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/context/utils/api";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    novaSenha: "",
    imagem: "",
    username: "",
  });

  const userId = 2;

  useEffect(() => {
    api.get(`auth/users/${userId}`).then((res) => {
      setUser(res.data);
      setForm({
        nome_completo: res.data.nome_completo || "",
        email: res.data.email || "",
        telefone: res.data.telefone || "",
        cpf: res.data.cpf || "",
        senha: "",
        novaSenha: "",
        imagem: res.data.imagem || "",
        username: res.data.username || res.data.nome_completo || "",
      });
    });
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implemente a chamada para atualizar o usuário aqui
    // api.put(`/users/${userId}`, form)
  };

  if (!user) return <div>Carregando...</div>;

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6 bg-background border-primary border-2">
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary mb-2">
            <img
              src={form.imagem || "/default-avatar.png"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 text-xl font-bold">
            {form.username}
            <span className="text-xs cursor-pointer">✎</span>
          </div>
          <div className="text-muted-foreground text-sm flex gap-2 items-center">
            {form.email} <span className="text-xs cursor-pointer">✎</span>
            {form.cpf && <span className="ml-2">{form.cpf}</span>}
            {form.telefone && <span className="ml-2">{form.telefone}</span>}
          </div>
          <div className="text-muted-foreground text-sm">{form.nome_completo}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Usuário"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
            <div className="relative">
              <Input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
            <div className="relative">
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
            <div className="relative">
              <Input
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="CPF"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
            <div className="relative">
              <Input
                name="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="Senha atual"
                type="password"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
            <div className="relative">
              <Input
                name="novaSenha"
                value={form.novaSenha}
                onChange={handleChange}
                placeholder="Nova senha"
                type="password"
                className="pr-8"
              />
              <span className="absolute right-2 top-2 text-muted-foreground cursor-pointer">✎</span>
            </div>
          </div>
          <Button type="submit" className="w-full bg-sky-400 text-white hover:bg-sky-500">
            Alterar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile; 