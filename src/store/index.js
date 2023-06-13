import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("Token"),
    },
    messages: {
      data: {},
    },
    histories: {
      data: {},
    },
  },
  getters: {},
  actions: {
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        if (data.status === 200) {
          commit("setUser", data);
        }
        console.log("login");
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient
        .post("/logout")
        .then(({ data }) => {
          commit("logout");
          console.log("logout");
          return data;
        })
        .catch((error) => {
          commit("logout");
          return error;
        });
    },
    SaveMessage({ commit }, ModelMessage) {
      return axiosClient.post("/messages", ModelMessage).then(({ data }) => {
        if (data.status === 200) {
          return data;
        }
        return data;
      });
    },
    GetMessages({ commit }) {
      return axiosClient.get(`/messages`).then((res) => {
        commit("setMessages", res.data.data);
        return res;
      });
    },
    GetMessageById({ commit }, id) {
      return axiosClient.get(`/messages/${id}`).then((res) => {
        return res.data;
      }).catch((error) => {
        throw error;
      });
    },
    EditMessage({ commit }, message) {
      return axiosClient.put(`/messages/${message.id}`, message).then((res) => {
        return res.data;
      }).catch((error) => {
        throw error;
      });
    },
    DeleteMessage({ commit }, id) {
      return axiosClient.delete(`/messages/${id}`).then((res) => {
        return res.data;
      }).catch((error) => {
        throw error;
      });
    },
    GetHistories({ commit }) {
      return axiosClient.get(`/history`).then((res) => {
        commit("setHistories", res.data.data);
        return res;
      });
    },
  },
  mutations: {
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.usuario;
      sessionStorage.setItem("Token", userData.token);
      sessionStorage.setItem("id", userData.usuario.rol_id);
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("id");
    },
    setMessages: (state, Message) => {
      state.messages.data = Message;
    },
    setHistories: (state, Histories) => {
      state.histories.data = Histories;
    },
  },
  modules: {},
});

export default store;
