import { CenterBox } from "@/components/ui/CenterBox";
import { RiBugFill } from "react-icons/ri";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PreMandeScans = () => {
  return (
    <CenterBox>
      <div className="w-full h-full flex flex-col gap-8 p-6">
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <RiBugFill className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Vulnerabilidades</CardTitle>
              <CardDescription>Detecção de vulnerabilidades comuns</CardDescription>
            </CardHeader> 
            <CardContent>
              <ul className="list-disc pl-4 space-y-2 mb-4 justify-start">
                <li>SQL Injection</li>
                <li>XSS (Cross-Site Scripting)</li>
                <li>CSRF (Cross-Site Request Forgery)</li>
                <li>Injeção de Comandos</li>
              </ul>
              <Input 
                placeholder="Configurar parâmetros..." 
                className="w-full mb-2"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <RiBugFill className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Portas</CardTitle>
              <CardDescription>Scan de portas e serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2 mb-4">
                <li>Portas TCP/UDP</li>
                <li>Serviços em execução</li>
                <li>Versões de serviços</li>
                <li>Firewall e filtros</li>
              </ul>
              <Input 
                placeholder="Configurar portas..." 
                className="w-full mb-2"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <RiBugFill className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Informações</CardTitle>
              <CardDescription>Coleta de informações do alvo</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2 mb-4">
                <li>DNS e subdomínios</li>
                <li>Diretórios e arquivos</li>
                <li>Headers HTTP</li>
                <li>Certificados SSL/TLS</li>
              </ul>
              <Input 
                placeholder="Configurar opções..." 
                className="w-full mb-2"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CenterBox>
  );
};

export default PreMandeScans; 