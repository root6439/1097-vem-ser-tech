import { User } from "../shared/models/User";
import { Field, Form, Formik } from "formik";
import Storage from "../shared/utils/Storage";

const CreateUserForm = () => {
  const storage = new Storage();
  let userId: number;

  const handleSubmit = (e: User) => {
    userId ? updateUser(e) : createUser(e);
  };

  const createUser = (user: User) => {
    const users: User[] = (storage.get("users") as User[]) ?? [];
    user.id = users.length + 1;
    users.push(user);
    storage.set("users", users);
  };

  const updateUser = (user: User) => {
    const users: User[] = storage.get("users") as User[];
    let userFound = users.find((value) => value.id == userId);
    userFound = user;
    storage.set("users", users);
  };

  return (
    <>
      <div className="create_user_form">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            birth: "",
            state: "",
            country: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <h3>Cadastro de usuário</h3>

            <Field type="text" name="name" placeholder="name" />

            <Field type="email" name="email" placeholder="email" />

            <Field type="password" name="password" placeholder="password" />

            <Field type="date" name="birth" placeholder="birth" />

            <Field type="text" name="state" placeholder="state" />

            <Field type="text" name="country" placeholder="country" />

            <button type="submit">Cadastrar</button>
            <button type="reset">Limpar</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateUserForm;
