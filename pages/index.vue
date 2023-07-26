<template>
  <div class="container-fluid pt-3">
    <div class="content">
      <b-card>
        <div class="pt-3">
          <button @click="$router.push('/item')" type="button" class="btn btn-primary">
            <font-awesome-icon class="ml-2" icon="plus" size="sm" />ثبت نرم افزار
          </button>
        </div>
        <b-tabs
          class="mt-3"
          active-nav-item-class="font-weight-bold "
          active-tab-class="font-weight-bold"
          content-class="mt-3"
        >
          <b-tab title="نرم افزار های فعال" active>
            <div class="row d-flex flex-row-reverse">
              <div class="col-1">
                <b-form-input v-model="perPage" type="number" value="10" min="1" max="999"></b-form-input>
              </div>
            </div>
            <div class="pt-3">
              <b-table
                striped
                hover
                :fields="fields"
                :items="loadItemList"
                :per-page="perPage"
                :current-page="currentPage"
              >
                <template v-slot:cell(edit)="row">
                  <span v-b-tooltip.hover title="ویرایش">
                    <font-awesome-icon
                      @click="editItem(row.item._id)"
                      icon="edit"
                      size="lg"
                      class="m-1 cursor"
                    />
                  </span>
                </template>
                <template v-slot:cell(delete)="row">
                  <span v-b-tooltip.hover title="حذف">
                    <font-awesome-icon
                      @click="confirmDialog(row.item._id)"
                      icon="trash"
                      size="lg"
                      class="text-danger m-1 cursor"
                    />
                  </span>
                </template>
                <template v-slot:cell(isDeleted)="row">
                  <span v-b-tooltip.hover>
                    <ToggleButton
                      :options="{...options, isActive: true}"
                      @setIsActive="toggleBtn($event,row.item._id)"
                    ></ToggleButton>
                  </span>
                </template>
                <template v-slot:cell(isGeneral)="row">
                  <span v-b-tooltip.hover>
                    <span v-if="row.item.isGeneral" v-b-tooltip.hover title="عمومی">
                      <font-awesome-icon icon="check" size="lg" class="text-success m-1 cursor" />
                    </span>
                    <span v-else v-b-tooltip.hover>
                      <font-awesome-icon icon="times" size="lg" class="text-danger m-1 cursor" />
                    </span>
                  </span>
                </template>
              </b-table>
              <div class="col-md-12 justify-content-center">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  class="pagination justify-content-center"
                ></b-pagination>
              </div>
            </div>
          </b-tab>
          <b-tab title="نرم افزار های غیر فعال">
            <div class="row d-flex flex-row-reverse">
              <div class="col-1">
                <b-form-input v-model="inActivePerPage" type="number" value="10" min="1" max="999"></b-form-input>
              </div>
            </div>
            <div class="pt-3">
              <b-table
                striped
                hover
                :fields="inActiveields"
                :items="loadInActiveItemList"
                :per-page="inActivePerPage"
                :current-page="inActiveCurrentPage"
              >
                <template v-slot:cell(isDeleted)="row">
                  <span v-b-tooltip.hover>
                    <ToggleButton
                      :options="{...options, isActive: false}"
                      @setIsActive="toggleBtn($event,row.item._id)"
                    ></ToggleButton>
                  </span>
                </template>
                <template v-slot:cell(isGeneral)="row">
                  <span v-b-tooltip.hover>
                    <span v-if="row.item.isGeneral" v-b-tooltip.hover title="عمومی">
                      <font-awesome-icon icon="check" size="lg" class="text-success m-1 cursor" />
                    </span>
                    <span v-else v-b-tooltip.hover>
                      <font-awesome-icon icon="times" size="lg" class="text-danger m-1 cursor" />
                    </span>
                  </span>
                </template>
              </b-table>
              <div class="col-md-12 justify-content-center">
                <b-pagination
                  v-model="inActiveCurrentPage"
                  :total-rows="inActiveTotalRows"
                  :per-page="inActivePerPage"
                  class="pagination justify-content-center"
                ></b-pagination>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import ToggleButton from "~/components/ToggleButton.vue";
import axios from "axios";

export default {
  fetch(context) {
    return {};
  },
  data() {
    return {
      options: {
        isDeleted: ""
      },
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      inActiveCurrentPage: 1,
      inActivePerPage: 10,
      inActivePageOptions: [5, 10, 15],
      isToggled: false,
      fields: [
        { key: "name", label: "نام" },
        { key: "title", label: "عنوان" },
        { key: "url", label: "url" },
        { key: "description", label: "توضیحات" },
        { key: "isGeneral", label: "عمومی" },
        { key: "edit", label: "ویرایش" },
        { key: "isDeleted", label: "فعال" },
        { key: "delete", label: "حذف" }
      ],
      inActiveields: [
        { key: "name", label: "نام" },
        { key: "title", label: "عنوان" },
        { key: "url", label: "url" },
        { key: "description", label: "توضیحات" },
        { key: "isGeneral", label: "عمومی" },
        { key: "isDeleted", label: "فعال" }
      ]
    };
  },
  components: {
    ToggleButton
  },
  methods: {
    deleteItem(itemId) {
      this.$store.dispatch("deleteItem", itemId).then(res => {
        this.$router.push("/");
      });
    },
    editItem(itemId) {
      this.$router.push(`/item/${itemId}`);
    },
    toggleBtn(event, itemId) {
      this.$store.dispatch("toggleButton", {
        itemId,
        isDeleted: !!event
      });
    },
    confirmDialog(itemId) {
      this.$bvModal
        .msgBoxConfirm("آیا از حذف این مورد اطمینان دارید؟", {
          title: "تایید حذف",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "تایید",
          cancelTitle: "انصراف",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) this.deleteItem(itemId);
        })
        .catch(err => {
          // An error occurred
          console.log("confirmDialog -> err", err);
        });
    }
  },
  computed: {
    loadItemList() {
      return this.$store.getters.loadedItems;
    },
    loadInActiveItemList() {
      return this.$store.getters.loadedInActiveItems;
    },
    totalRows() {
      return this.$store.getters.getActiveItemsCount;
    },
    inActiveTotalRows() {
      return this.$store.getters.getInActiveItemsCount;
    }
  }
};
</script>

<style scoped>
.content {
  direction: rtl;
  text-align: right;
}
input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
