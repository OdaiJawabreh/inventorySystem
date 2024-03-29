import { requestBuilder } from "../Util/api";

const getProducts = async ({ name, minPrice, maxPrice }) => {
  try {
    console.log("name, minPrice, maxPrice", name, minPrice, maxPrice);
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
        : maxPrice && !name && !minPrice
        ? `?maxPrice=${maxPrice}`
        : "";

    const path = `product${queryName + queryMinPrice + queryMazPrice}`;
    console.log("path", path);
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

const getTransactions = async (userId) => {
  try {
    const { data } = await requestBuilder({
      path: `transaction/${userId}`,
    });
    console.log("data", data);
    console.log("path",`transaction/${userId}`);
    return data;
  } catch (error) {
    console.log("error get getTransactions ", error.message);
    throw error;
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  craeteTransaction,
  getTransactions
};
