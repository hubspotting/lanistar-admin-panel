<template>
    <div>
    <v-btn class="primary" @click="launchDialog(1, null)">
            Add New User<v-icon>fa-pencil-square-o</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog_one"
      max-width="290"
    >
        <v-form @submit.prevent="latterTreatment()">
            <v-card>
                <v-card-title>New User Info</v-card-title>
                <v-card-text>
                    <v-text-field label="Full Name" v-model="$v.fullname.$model" :error="$v.fullname.$error" required></v-text-field>
                    <v-text-field label="Email Address" v-model="$v.email.$model" :error="$v.email.$error"></v-text-field>
                    <v-text-field label="Password" v-model="$v.raw_password.$model" :error="$v.raw_password.$error"></v-text-field>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog_one = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    type="submit"
                    color="green darken-1"
                    text
                    :disabled="$v.$invalid"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    <v-dialog
        v-model="dialog_two"
        max-width="290"
    >
        <v-card>
            <v-card-title>Remove User</v-card-title>
            <v-card-text>
                Are you sure to remove <b>{{ fullname }}</b> ?
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog_two = false"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="latterTreatment()"
          >
            Yes
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-data-iterator
        :items="admins"
        hide-default-footer
    >
        <template v-slot:header>
        </template>
        <template v-slot:no-data>
            <v-alert color="warning" class="pa-3" dense text>
                No admin users has been found
            </v-alert>
        </template>
        <template v-slot:default="props">
            <v-progress-circular v-if="loading" :indeterminate="true"></v-progress-circular>
            <v-simple-table
                :dense="$vuetify.breakpoint.smAndDown"
                v-if="!loading && props.items"
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Current Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in admins" :key="item.id + '_vue'">
                                <td>
                                    {{ item.fullname }}
                                </td>
                                <td>
                                    {{ item.email }}
                                </td>
                                <td>
                                    {{ item.raw_password }}
                                </td>
                                <td>
                                    <v-btn icon @click="launchDialog(2, item)">
                                        <v-icon>fa-pencil-square-o</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="launchDialog(3, item)">
                                        <v-icon>fa-trash-o</v-icon>
                                    </v-btn>
                                </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </template>
    </v-data-iterator>
    </div>
</template>
<style lang="scss">
 p {
     &.alert {
         color: red;
     }
 }
</style>
<script>
import Vue from 'vue'
import Vuelidate, { validationMixin } from 'vuelidate'
import { email, required, url } from 'vuelidate/lib/validators'
import config from '../config';
import axios from '../utils/create-axios';
Vue.use(Vuelidate)
export default {
    mixins: { validationMixin },
    props: {
        admins: Array,
    },
    validations: {
        fullname: {
            required
        },
        raw_password: {
            required
        },
        email: {
            required,
            email
        },
    },
    data() {
        return {
            fullname: null,
            email: null,
            raw_password: null,
            loading: false,
            dialog_one: false,
            dialog_two: false,
            saveAvailable: true,
            flag: 0,
            user_id: ''
        }
    },
    methods: {
        latterTreatment() {
            // this.$v.$touch();
            // if (this.$v.$invalid) {
            //     return
            // }
            const url = `${config.msLandingUrl}/user/crudUser`;
            let bodydata = {
                email: this.email,
                fullname: this.fullname,
                password: this.raw_password,
                id: this.user_id,
                flag: this.flag
            };
            axios.post(url, bodydata).then((result) => {
                if (result) {
                    console.log(result);
                    this.dialog_one = false;
                    this.dialog_two = false;
                    this.resetValues();
                    this.$emit("refreshAdminList");
                }
            });
        },
        async launchDialog(flag, item) {
            await this.resetValues();
            this.flag = flag;
            let temp = Object.assign({}, item);
            console.log(temp);
            if (this.flag === 3) {
                this.user_id = temp.id;
                this.dialog_two = true;
            } else if (this.flag === 2) {
                this.user_id = temp.id;
                this.fullname = temp.fullname;
                this.email = temp.email;
                this.raw_password = temp.raw_password;
                this.dialog_one = true;
            } else {
                this.dialog_one = true;
            }
        },
        saveUserInfo() {

        },
        resetValues() {
            this.fullname = null,
            this.email = null,
            this.raw_password = null;
        }
    }
}
</script>