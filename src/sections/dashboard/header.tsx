import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface HeaderProps {
  currentDate: string;
}

export function Header({ currentDate }: HeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2 mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">Visão geral</h2>
        <h3 className="text-muted-foreground">{currentDate}</h3>
      </div>
      <div className="hidden items-center space-x-2 md:flex">
        <Button variant="destructive" className="font-bold">
          <Icons.parar className="mr-2" />
          PARAR
        </Button>
      </div>
    </div>
  );
}
