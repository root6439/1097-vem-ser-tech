import { useEffect, useState } from "react";
import { User } from "../shared/models/User";
import { UserEvaluation } from "../shared/models/UserEvaluation";
import Storage from "../shared/utils/Storage";

const Evaluation = () => {
  let filmId: number;
  const storage = new Storage();
  const [note, setNote] = useState("");
  const [review, setReview] = useState("");
  const userEvaluation =
    (storage.get("user_evaluation") as UserEvaluation[]) ?? [];
  const userLogged = storage.get("user_logged") as User;
  const userAlreadyEvaluate = userEvaluation.find(
    (aux) => aux.userId == userLogged.id
  );

  useEffect(() => {
    verifyUserAlreadyEvaluate();
  }, []);

  const verifyUserAlreadyEvaluate = () => {
    if (userAlreadyEvaluate) {
      setNote(String(userAlreadyEvaluate.starsRate));
      setReview(userAlreadyEvaluate.comentary);
    }
  };

  const handleClick = () => {
    userAlreadyEvaluate ? updateEvaluation() : createEvaluation();
  };

  const createEvaluation = () => {
    const newEvaluation: UserEvaluation = {
      userId: userLogged.id,
      filmId,
      comentary: review,
      starsRate: Number(note),
    };

    userEvaluation.push(newEvaluation);

    storage.set("user_evaluation", userEvaluation);
  };

  const updateEvaluation = () => {
    const index = userEvaluation.findIndex(
      (aux) => aux.userId == userLogged.id
    );

    userEvaluation[index].comentary = review;
    userEvaluation[index].starsRate = Number(note);

    storage.set("user_evaluation", userEvaluation);
  };

  return (
    <>
      <p>
        <label>
          Dê uma nota
          <select
            title="evaluation"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
      </p>

      <p>
        <label>
          Digite sua avaliação:
          <textarea
            maxLength={255}
            rows={10}
            cols={50}
            onChange={(e) => setReview(e.target.value)}
            value={review}
          ></textarea>
        </label>
      </p>

      <button type="button" onClick={handleClick}>
        Avaliar
      </button>
    </>
  );
};

export default Evaluation;
