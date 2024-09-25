import axios from "axios";

const instance = axios.create({
  // baseURL: "https://beside-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(
//   async (config) => {
//     try {
//       const user = await AsyncStorage.getItem("user");

//       if (user) {
//         const parsedUser = JSON.parse(user);
//         const accessToken = parsedUser?.token;
//         if (accessToken) {
//           config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//       }
//     } catch (error) {
//       console.error("Error retrieving token from AsyncStorage:", error);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
