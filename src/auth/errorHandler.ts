type ToastVariant = "default" | "destructive" | null | undefined;

export const handleAuthError = (errorType: string) => {
  let variant: ToastVariant = "default";

  switch (errorType) {
    case "AccessDenied":
      variant = "destructive";
      return {
        title: "Acesso Negado",
        description: "Você não tem permissão para fazer login.",
        variant,
      };
    case "OAuthAccountNotLinked":
      variant = "default";
      return {
        title: "Conta Não Vinculada",
        description:
          "Por favor, use o mesmo provedor que você usou para se inscrever.",
        variant,
      };
    case "Configuration":
      variant = "destructive";
      return {
        title: "Erro de Configuração",
        description: "Houve um erro na comunicação externa.",
        variant,
      };
    default:
      variant = "destructive";
      return {
        title: "Erro Desconhecido",
        description: "Algo deu errado. Tente novamente.",
        variant,
      };
  }
};
