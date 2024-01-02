import { requestBuilder } from "../Util/api";

const getProducts = async ({ name, minPrice, maxPrice }) => {
  try {
    const queryName = name ? `?name=${name}` : "";
    const queryMinPrice = minPrice ? `?minPrice=${minPrice}` : "";
    const queryMazPrice = name ? `?maxPrice=${maxPrice}` : "";

    const path = `product${queryName + queryMinPrice + queryMazPrice}`;
    const { data } = await requestBuilder({
      path,
    });
    return data;
  } catch (error) {
    console.log("error get getAllUsers ", error.message);
    throw error;
  }
};

module.exports = {
  getProducts,
};
