import { Formik, Form, Field } from "formik";
import { Film } from "../shared/models/Film";
import Storage from "../shared/utils/Storage";
import { categories } from "../shared/models/Category";
import { useState } from "react";

const CreateFilmForm = () => {
  const storage = new Storage();
  const [newCategory, setNewCategory] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = (data: Film) => {
    const films = (storage.get("films") as Film[]) ?? [];
    data.id = films.length + 1;
    films.push(data);
    storage.set("films", films);
  };

  const changeNewCategory = (e: any) => {
    const value = e.target.value;

    if (value == "nova categoria") {
      setNewCategory(true);
    }
  };

  const createCategory = () => {
    setNewCategory(false);

    categories.push({
      id: categories.length + 1,
      name: category,
    });
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            name: "",
            category: "",
            url: "",
            videoUrl: "",
            description: "",
            illustrativeImg: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <h3>Cadastro de usuário</h3>

            <Field type="text" name="name" placeholder="name" />

            {!newCategory && (
              <>
                <select
                  name=""
                  id=""
                  title="category"
                  onChange={changeNewCategory}
                >
                  {categories.map((value) => (
                    <option key={value.id} value={value.name}>
                      {value.id} - {value.name}
                    </option>
                  ))}
                  <option value="nova categoria">+ Nova categoria</option>
                </select>
              </>
            )}

            {/* {!newCategory && (
              <Field
                component="select"
                id="category"
                name="category"
                onChange={changeNewCategory}
              >
                {categories.map((value) => (
                  <option key={value.id} value={value.name}>
                    {value.id} - {value.name}
                  </option>
                ))}
                <option value="nova categoria">+ Nova categoria</option>
              </Field>
            )} */}

            {newCategory && (
              <>
                <input
                  type="text"
                  placeholder="Nome da categoria"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button type="button" onClick={createCategory}>
                  +
                </button>
              </>
            )}

            <Field type="text" name="url" placeholder="url" />

            <Field type="text" name="videoUrl" placeholder="videoUrl" />

            <Field type="text" name="description" placeholder="description" />

            <Field
              type="text"
              name="illustrativeImg"
              placeholder="illustrativeImg"
            />

            <button type="submit">Cadastrar</button>
            <button type="reset">Limpar</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateFilmForm;
