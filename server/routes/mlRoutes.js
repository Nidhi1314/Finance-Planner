import axios from "axios";
 const sendToML= async(fileUrl)=>{
  try{
    const response=await axios.post("http://localhost:6001/api/ml/predict",{
      fileUrl:fileUrl,
    });
    return response.data;
  }catch(error){
    console.log("ML prediction error:",error.response?.data || error.message);
    throw error;
  }
  };
  export default sendToML;
