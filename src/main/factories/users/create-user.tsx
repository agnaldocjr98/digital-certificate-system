import { CreateUser } from "@/presentation/pages/users/create";
import { User } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeCreateUser = () => {
  const httpClient = new AxiosHttpAdapter();
  const user = new User(httpClient);

  const validation = (): ValidationComposite =>
    new ValidationComposite([
      ...Builder.field({
        fieldName: "nome",
        fieldLabel: "Nome",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "email",
        fieldLabel: "E-mail",
      })
        .required()
        .email()
        .build(),
      ...Builder.field({
        fieldName: "tipo",
        fieldLabel: "Tipo de usuário",
      })
        .required()
        .build(),
      ...Builder.field({
        fieldName: "senha",
        fieldLabel: "Senha",
      })
        .required()
        .build(),
    ]);
  return <CreateUser user={user} validation={validation()} />;
};
