import { apiPath } from "../../Constants";
import axios from "axios";
class HelpMessageService {
  async getHelpMessage(id) {
    try {
      const response = await axios.get(`${apiPath}/helpMessage/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error in getHelpMessage() at HelpMessageService", error);
    }
  }

  async deleteMessage(id) {
    try {
      await axios.delete(`${apiPath}/helpMessage/${id}`);
    } catch (error) {
      console.log("Error in deleteMessage() at HelpMessageService", error);
    }
  }
}

export default HelpMessageService;
