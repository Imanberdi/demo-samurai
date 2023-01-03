import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "4ef41426-5db3-4d91-acb9-7ca237a249c6",
  },
});

export const usersAPI = {
  getUsers(page = 1, pageSize = 5) {
    return instance
      .get(`users?page=${page}&count=${pageSize}`)
      .then((response) => {
        return response;
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => {
      return response;
    });
  },
  unFollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response;
    });
  },
  getProfile(userId) {
    // console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`/profile/status/${userId}`).then((response) => {
      return response;
    });
  },
  updateStatus(status) {
    return instance.put(`/profile/status`, { status: status });
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe) {
    return instance.post(`/auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`/auth/login`);
  },
};
