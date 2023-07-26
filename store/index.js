import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedItems: [],
      loadedInActiveItems: [],
      activeItemsCount: 0,
      activeItemsCurrentPage: 1,
      activeItemsPerPage: 10,
      inActiveItemsCount: 0,
      inActiveItemsCurrentPage: 1,
      inActiveItemsPerPage: 10,
      token: process.env.TOKEN
    },
    mutations: {
      setItems(state, items) {
        state.loadedItems = items;
      },
      setInActiveItems(state, items) {
        state.loadedInActiveItems = items;
      },
      addItem(state, item) {
        state.loadedItems.push(item);
      },
      editItem(state, editedItem) {
        const itemIndex = state.loadedItems.findIndex(
          item => item._id === editedItem._id
        );
        state.loadedItems[itemIndex] = editedItem;
      },
      setToken(state, token) {},
      setActiveItemsCount(state, count) {
        state.activeItemsCount = count;
      },
      setActiveItemsCurrentpage(state, currentPage) {
        state.activeItemsCurrentPage = currentPage;
      },
      setActiveItemsPerpage(state, perPage) {
        state.activeItemsPerPage = perPage;
      },
      setInActiveItemsCount(state, count) {
        state.inActiveItemsCount = count;
      },
      setInActiveItemsCurrentpage(state, currentPage) {
        state.inActiveItemsCurrentPage = currentPage;
      },
      setInActiveItemsPerpage(state, perPage) {
        state.inActiveItemsPerPage = perPage;
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        await vuexContext.dispatch("loadActiveItems");
        await vuexContext.dispatch("loadInActiveItems");
      },
      async loadActiveItems(vuexContext) {
        const body = { pageNum: 0, count: 10 };
        await axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + vuexContext.state.token
            }
          })
          .post("getall", body)
          .then(res => {
            vuexContext.commit("setActiveItemsCount", res.data.result.count);
            vuexContext.commit("setItems", res.data.result.apps);
          })
          .catch(e => console.log("nuxtServerInit -> e", e));
      },
      async loadInActiveItems(vuexContext) {
        const body = { pageNum: 0, count: 10 };
        await axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + vuexContext.state.token
            }
          })
          .post("getall/disabled", body)
          .then(res => {
            vuexContext.commit("setInActiveItemsCount", res.data.result.count);
            vuexContext.commit("setInActiveItems", res.data.result.apps);
          })
          .catch(e => console.log("nuxtServerInit -> e", e));
      },
      setItems(vuexContext, items) {
        vuexContext.commit("setItems", items);
      },
      setInActiveItems(vuexContext, items) {
        vuexContext.commit("setInActiveItems", items);
      },
      addItem(vuexContext, item) {
        return axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TOKEN
            }
          })
          .post("create", item)
          .then(res => {
            vuexContext.commit("addItem", {
              ...item,
              _id: res.data.result.appId
            });
          })
          .catch(e => {
            console.log("addItem -> e", e);
          });
      },
      deleteItem(vuexContext, itemId) {
        return axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TOKEN
            }
          })
          .post("delete", { appId: itemId })
          .then(result => {
            const newState = Object.assign({}, vuexContext.state);
            const itemIndex = newState.loadedItems.findIndex(
              item => item._id === itemId
            );
            if (itemIndex === -1) {
              return;
            }
            newState.loadedItems.splice(itemIndex, 1);
            vuexContext.commit("setItems", newState.loadedItems);
          })
          .catch(e => {
            console.log("deleteItem -> e", e);
          });
      },
      editItem(vuexContext, editedItem) {
        return axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TOKEN
            }
          })
          .post("update", editedItem)
          .then(result => {
            vuexContext.commit("editItem", editedItem);
          })
          .catch(e => {
            console.log("addItem -> e", e);
          });
      },

      toggleButton(vuexContext, { itemId, isDeleted }) {
        axios
          .create({
            baseURL: process.env.BASE_URL,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.TOKEN
            }
          })
          .post("status/change", { appId: itemId })
          .then(result => {
            console.log("toggleButton -> isDeleted", isDeleted);
            const items = [...vuexContext.state.loadedItems];
            const inActiveitems = [...vuexContext.state.loadedInActiveItems];
            if (!isDeleted) {
              console.log("toggleButton -> if");
              const item = items.find(item => item._id === itemId);
              const itemIndex = items.findIndex(item => item._id === itemId);

              items.splice(itemIndex, 1);
              item.isDeleted = !isDeleted;
              inActiveitems.push(item);
            } else {
              console.log("toggleButton -> else");
              const item = inActiveitems.find(item => item._id === itemId);
              const itemIndex = inActiveitems.findIndex(
                item => item._id === itemId
              );

              inActiveitems.splice(itemIndex, 1);
              item.isDeleted = !isDeleted;
              items.push(item);
            }

            vuexContext.commit("setItems", items);
            vuexContext.commit("setInActiveItems", inActiveitems);
          })
          .catch(e => {
            console.log("deleteItem -> e", e);
          });
      }
    },
    getters: {
      loadedItems(state) {
        return state.loadedItems;
      },
      loadedInActiveItems(state) {
        return state.loadedInActiveItems;
      },
      getSelectedItem(state) {
        return itemId =>
          state.loadedItems.find(item => {
            return item.id === itemId;
          });
      },
      getActiveItemsCount(state) {
        return state.activeItemsCount;
      },
      getActiveItemsCurrentPage(state) {
        return state.activeItemsCurrentPage;
      },
      getActiveItemsPerPage(state) {
        return state.activeItemsPerPage;
      },
      getInActiveItemsCount(state) {
        return state.inActiveItemsCount;
      },
      getInActiveItemsCurrentPage(state) {
        return state.inActiveItemsCurrentPage;
      },
      getInActiveItemsPerPage(state) {
        return state.inActiveItemsPerPage;
      },
    }
  });
};

export default createStore;
