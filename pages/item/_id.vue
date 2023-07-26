<template>
  <div class="container pt-3">
    <div class="content">
      <b-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSave)">
            <p class="h4 mb-4 text-center">ثبت جدید</p>
            <b-form-group class="text-right">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-input
                  v-model="loadSelectedItem.name"
                  id="input-1"
                  type="text"
                  required
                  placeholder="نام"
                ></b-form-input>
                <span class="mb-2 error text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>

            <b-form-group class="text-right">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <b-form-input
                  v-model="loadSelectedItem.title"
                  id="input-2"
                  type="text"
                  required
                  placeholder="عنوان"
                ></b-form-input>
                <span class="mb-2 error text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>

            <b-form-group class="text-right" style="border-right: 1px #dadada solid;">
              <date-picker
                v-model="loadSelectedItem.date"
                :clearable="true"
                input-format="YYYY-MM-DD"
                format="jYYYY/jMM/jDD"
              />
            </b-form-group>

            <b-form-group class="pt-3 text-right">
              <ValidationProvider rules="url" v-slot="{ errors }">
                <b-form-input
                  v-model="loadSelectedItem.url"
                  id="input-3"
                  type="text"
                  placeholder="url"
                ></b-form-input>
                <span class="mb-2 error text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <b-form-group class="mb-0 pt-2 text-right">
              <b-form-checkbox
                class="checkbox"
                id="checkbox-1"
                v-model="loadSelectedItem.isGeneral"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
              >عمومی</b-form-checkbox>
            </b-form-group>

            <b-button type="submit" variant="primary">ثبت</b-button>
            <b-button @click="onCancel" type="reset" variant="danger">انصراف</b-button>
          </form>
        </ValidationObserver>
      </b-card>
    </div>
  </div>
</template>

<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";

export default {
  asyncData(context) {
    if (!!context.params.id) {
      return axios
        .create({
          baseURL: process.env.BASE_URL,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.TOKEN
          }
        })
        .post("getinfo", { appId: context.params.id })
        .then(result => {
          return {
            loadSelectedItem: result.data.result.app
          };
        })
        .catch(e => {
          console.log("addItem -> e", e);
        });
    } else {
      return {
        loadSelectedItem: {
          name: "",
          title: "",
          url: "",
          isGeneral: false,
          description: "test"
        }
      };
    }
  },
  components: {
    datePicker: VuePersianDatetimePicker,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submitNewOperation() {
      this.onSave();
    },
    onSave() {
      if (!!this.$route.params.id) {
        this.editItme();
      } else {
        this.addItem();
      }
    },
    addItem() {
      this.$store.dispatch("addItem", this.loadSelectedItem).then(() => {
        this.$router.push("/");
      });
    },
    editItme() {
      this.$store
        .dispatch("editItem", {
          ...this.loadSelectedItem,
          appId: this.$route.params.id
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    onCancel() {
      this.$router.push("/");
    }
  },
  computed: {}
};
</script>
<style scoped>
input[type="text"],
.txtarea {
  margin-bottom: 10px;
  text-align: right;
}
.checkbox {
  text-align: right;
}
</style>