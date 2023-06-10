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
    logout: (state) => {
      console.log(state)
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("id");
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
      return axiosClient
        .get(`/messages`)
        .then((res) => {
          commit("setMessages", res.data.data);
          return res;
        })
    },
    GetHistories({ commit }) {
      return axiosClient
        .get(`/history`)
        .then((res) => {
          commit("setHistories", res.data.data);
          return res;
        })
    }
  },
  mutations: {
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.usuario;
      sessionStorage.setItem("Token", userData.token);
      sessionStorage.setItem("id", userData.usuario.rol_id);
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
