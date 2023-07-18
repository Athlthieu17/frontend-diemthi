import axios from "../utils/axiosCustomize";

const getScoreAPI = (sbd ) =>{
    return axios.get(`api/v1/score/sbd=${sbd}`);
}

export {getScoreAPI}