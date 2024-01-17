import { apiPath } from "../../Constants";
import axios from 'axios'
class UserService {
  async getSignupDetails(val) {
    const response = await axios.post(`${apiPath}/auth/signup`, val);
    return response.data;
  }
  async getLoginDetails(val) {
    const response = await axios.post(`${apiPath}/auth/login`, val);
    return response.data;
  }
}

export default UserService;
