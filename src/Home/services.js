import { requestBuilder } from "../Util/api";

const getProducts = async ({ name, minPrice, maxPrice }) => {
  try {
    const queryName = name ? `?name=${name}` : "";
    const queryMinPrice =
      minPrice && name
        ? `&minPrice=${minPrice}`
        : minPrice && !name
        ? `?minPrice=${minPrice}`
        : "";
    const queryMazPrice =
      maxPrice && (name || minPrice)
        ? `&maxPrice=${maxPrice}`
        : maxPrice && !name && minPrice
        ? `?minPrice=${maxPrice}`
        : "";

    const path = `product${queryName + queryMinPrice + queryMazPrice}`;
    const { data } = await requestBuilder({
      path,
    });
    return data;
  } catch (error) {
    console.log("error get getProducts ", error.message);
    throw error;
  }
};
const createProduct = async (createProductDto) => {
  try {
    const { data } = await requestBuilder({
      path: `product`,
      method: "POST",
      data: createProductDto,
    });
    return data;
  } catch (error) {
    console.log("error get createProduct ", error.message);
    throw error;
  }
};
const updateProduct = async ({id,name,price,stockQuantity}) => {
  try {
    const { data } = await requestBuilder({
      path: `product/${id}`,
      method: "PUT",
      data: {name,price,stockQuantity},
    });
    return data;
  } catch (error) {
    console.log("error get updateProduct ", error.message);
    throw error;
  }
};
const deleteProduct = async (id) => {
  try {
    const { data } = await requestBuilder({
      path: `product/${id}`,
      method: "DELETE",
      
    });
    return data;
  } catch (error) {
    console.log("error get deleteProduct ", error.message);
    throw error;
  }
};

const craeteTransaction = async (transactionDto) => {
  try {
    const { data } = await requestBuilder({
      path: `transaction`,
      method: "POST",
      data: transactionDto
    });
    return data;
  } catch (error) {
    console.log("error get craeteTransaction ", error.message);
    throw error;
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  craeteTransaction
};
