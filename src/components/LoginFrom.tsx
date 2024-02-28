import { Formik, Form, Field } from "formik";
import { Login } from "../shared/models/Login";
import Storage from "../shared/utils/Storage";
import { User } from "../shared/models/User";

const LoginForm = () => {
  const storage = new Storage();

  const login = (data: Login) => {
    console.log(data);
    const users = storage.get("users") as User[];

    const user = users.find(
      (value) => value.email == data.email && value.password == data.password
    );

    if (user) {
      // TODO implementar redirect
    } else {
      // TODO implementar mensagem de erro
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={login}
    >
      <Form>
        <h3>Login</h3>

        <Field type="email" name="email" placeholder="email" />
        <Field type="text" name="password" placeholder="password" />

        <button type="submit">Cadastrar</button>
        <button type="reset">Limpar</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
