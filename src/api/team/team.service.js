import { apiPath } from "../../Constants";
import axios from "axios";
class TeamService {
  async getTeamDetails(id) {
    try {
      const response = await axios.get(`${apiPath}/team/${id}`);
      return response.data.team;
    } catch (error) {
      console.log("Error in getTeamDetails() at TeamService", error);
    }
  }
}

export default TeamService;
