import { prisma } from "../../utils/prisma-service";
import { compareSync, hash } from "bcrypt";

export const register = async (userData) => {
  try {
    const isExists = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });

    if (isExists) {
      throw new Error("Username mavjud");
    }

    const hashPassword = await hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashPassword,
      },
    });

    return user;
  } catch (e) {
    console.log("Register Error: ", e);
    throw e;
  }
};

export const login = async (username, password) => {
  let user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (compareSync(password, user.password)) {
    return user;
  } else {
    return false;
  }
};
