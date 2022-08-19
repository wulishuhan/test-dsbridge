import axios from "axios";
export async function getFileData(id) {
  try {
    let res = await axios.get(`/dev-api/library/resource/download/${id}`, {
      responseType: "blob",
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    res = res.data;
    return new Promise((resolve) => {
      if (res.code === 0) {
        resolve(res);
      } else {
        resolve(res);
      }
    });
  } catch (err) {
    alert("服务器出错");
    console.log(err);
  }
}
