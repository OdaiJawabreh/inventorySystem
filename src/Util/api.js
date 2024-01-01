import axios from "axios";

export async function requestBuilder({ path, method = "GET", data, ContentType }) {
  try {

    let token = localStorage.getItem("token");
    if (token) token = JSON.parse(token);

    if (!ContentType) {
      ContentType = "application/json";
    }
    let config = {
      method: method,
      url: "http://localhost:8080/" + path,
      headers: {
        "Content-Type": ContentType,
        Authorization: `Bearer ${token}`,
        source:"Inventory System",
      },
      data,
    };
    return await axios(config);
  } catch (error) {
    if (
      error.response?.data?.message === "You are not authorized to access this resource." ||
      error.response?.data?.message === "Access token expired. Failed to refresh access token."
    ) {
      localStorage.clear();
      window.location.reload();
    }
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
}
