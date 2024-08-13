import { sign } from "../../utils/jwt-service.js";
import { login, register } from "./auth-service.js";

export const registerHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await register(body);
    const token = sign({ userId: user.id });
    res.send({
      token,
    });
  } catch (e) {
    next(e);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let user = await login(username, password);

    if (typeof user == "null") {
      return res.status(404).send({
        message: "User not found",
      });
    }
    if (!user) {
      return res.status(401).send({
        message: "Password is incorrect",
      });
    }
    let token = sign({ userId: user.id });

    res.send({
      token,
    });
  } catch (error) {
    next(error)
  }
};
