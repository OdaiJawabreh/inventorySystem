import { requestBuilder } from "../Util/api";

const creteNewUser = async (userDTO) => {
  try {
    const { data } = await requestBuilder({
      path: `user`,
      method: "POST",
      data: userDTO
    });
    return data;
  } catch (error) {
    console.log("error get getAllUsers ", error.message);
    throw error;
  }
};

const login = async (loginDto) => {
  try {
    const { data } = await requestBuilder({
      path: `auth/login`,
      method: "POST",
      data: loginDto
    });
    return data;
  } catch (error) {
    console.log("error get getAllUsers ", error.message);
    throw error;
  }
}

module.exports = {
    creteNewUser,
    login
  };
