import { apiPath } from "../../Constants";
import axios from "axios";
class TimerService {
  async getTimeLineDetails(val) {
    const temp = {
      userId: val,
    };
    const response = await axios.post(`${apiPath}/getSession`, temp);
    return response.data;
  }
}

export default TimerService;
