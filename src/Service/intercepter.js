import { localStorageGetItem } from "../constance/LocalStorageManagement";

export const httpGET = async (url) => {
  let token = await localStorageGetItem("access_token");
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `+token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return {
        status: responseJson["error"] ? 500 : 200,
        data: responseJson,
      };
    })
    .catch((error) => {
      return {
        status: 500,
        data: error,
      };
    });
};

export const httpPOST = async (url, body, requestOptions,contentTypeParam) => {
  let token = await localStorageGetItem("access_token");
  // let contentType = "application/json";
  let contentType = !contentTypeParam?"application/json":contentTypeParam;
  return fetch(
    url,
    requestOptions
      ? { ...requestOptions }
      : {
          method: "POST",
          headers: {
            "Content-Type": contentType,
            Authorization: `Bearer `+token,
          },
          body: JSON.stringify(body),
        }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("-------------------------");
      console.log(responseJson);
      console.log("-------------------------");
      return {
        status: responseJson["error"] ? 500 : 200,
        data: responseJson,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        data: error,
      };
    });
};
// export const httpPOSTFile = async (url, body, requestOptions) => {
//   let token = await localStorageGetItem("access_token");
//   return fetch(
//     url,
//     requestOptions
//       ? { ...requestOptions }
//       : {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer `+token,
//           },
//           body: JSON.stringify(body),
//         }
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log("-------------------------");
//       console.log(responseJson);
//       console.log("-------------------------");
//       return {
//         status: responseJson["error"] ? 500 : 200,
//         data: responseJson,
//       };
//     })
//     .catch((error) => {
//       console.log(error);
//       return {
//         status: 500,
//         data: error,
//       };
//     });
// };

export const httpPUT = async (url, body, requestOptions) => {
  let token = await localStorageGetItem("access_token");
  return fetch(
    url,
    requestOptions
      ? { ...requestOptions }
      : {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `+token,
          },
          body: JSON.stringify(body),
        }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("-------------------------");
      console.log(responseJson);
      console.log("-------------------------");
      return {
        status: responseJson["error"] ? 500 : 200,
        data: responseJson,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        data: error,
      };
    });
};
export const httpDelete = async (url, requestOptions) => {
  let token = await localStorageGetItem("access_token");
  return fetch(
    url,
    requestOptions
      ? { ...requestOptions }
      : {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `+token,
          },
        }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("-------------------------");
      console.log(responseJson);
      console.log("-------------------------");
      return {
        status: responseJson["error"] ? 500 : 200,
        data: responseJson,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 500,
        data: error,
      };
    });
};
