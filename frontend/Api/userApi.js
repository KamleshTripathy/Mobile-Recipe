import axios from "axios";
import { VITE_API } from "@env";

class UserApiService {
  constructor() {
    this.api = VITE_API;
  }

  async addUSer(user) {
    try {
      const res = await axios.post(`${this.api}/user/signup`, user);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error?.response?.data?.message };
    }
  }

  async loginUser(user) {
    try {
      const res = await axios.post(`${this.api}/user/signin`, user);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error?.response?.data?.message };
    }
  }

  async updateUser(id, user) {
    try {
      const res = await axios.put(`${this.api}/user/${id}`, user);
      console.log(res.data);
      return { status: true, data: res.data };
    } catch (error) {
      console.log(error);
      return { status: false, error };
    }
  }

  async userDetails(id) {
    try {
      const res = await axios.get(`${this.api}/user/${id}`);
      console.log(res.data[0]);
      return { data: res.data[0], status: true };
    } catch (error) {
      console.log(error);
      return { status: false, error };
    }
  }
}

const userApiService = new UserApiService();
export default userApiService;
