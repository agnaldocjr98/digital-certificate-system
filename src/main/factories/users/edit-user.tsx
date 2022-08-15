import { EditUser } from "@/presentation/pages/users/edit";
import { User } from "@/data/entities";
import { AxiosHttpAdapter } from "@/infra/http";
import { ValidationComposite } from "@/validation/validators";
import { ValidationBuild as Builder } from "@/validation/validators/builder/validation-builder";

export const MakeEditUser = () => {
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
    ]);
  return <EditUser user={user} validation={validation()} />;
};
