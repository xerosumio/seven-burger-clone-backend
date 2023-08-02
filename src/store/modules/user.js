export default {
  namespaced: true,
  state: {
    userId: "",
  },
  mutations: {
    updateUserId(state, payload) {
      state.userId = payload;
    },
  },
  actions: {},
};
