<template>
  <div>
    <v-data-iterator
      :items="influencers"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer>
      <template v-slot:header>
      </template>
      <template v-slot:no-data>
        <v-alert color="warning" class="pa-3" dense text>
          No influencer has been found
        </v-alert>
      </template>
      <template v-slot:default="props">
        <v-progress-circular v-if="loading" :indeterminate="true"></v-progress-circular>

        <v-simple-table
          :dense="$vuetify.breakpoint.smAndDown"
          v-if="!loading && props.items">
          <template v-slot:default>
            <thead>
              <tr>
                <template v-if="$vuetify.breakpoint.smAndDown">
                  <th>
                    Influencer
                  </th>
                </template>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <th class="text-left" width="250">Fullname</th>
                  <th class="text-left" width="150" v-if="filterType == 2">Influencers</th>
                  <th width="150">Created Date</th>
                  <th width="150" v-if="filterType !== 10 && $auth.user.role === 1">Assigned To</th>
                  <th width="200" v-if="filterType !== 10">Status</th>
                  <th width="150" v-if="filterType === 10">Email</th>
                  <th width="200" v-if="filterType === 10">PhoneNumber</th>
                  <th width="100">Actions</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in influencers" :key="item.influencerId">
                <template v-if="$vuetify.breakpoint.smAndDown">
                  <td style="height: 100px">
                      <div>
                        <nuxt-link
                          :to="{ name: 'influencers-profile-id', params: { id: item.id }}"
                        >{{ item.firstName }} {{ item.lastName }}
                        </nuxt-link>
                      </div>
                      <div>
                        Status: {{ config.contractStatuses[item.contractStatus].label }}
                      </div>
                  </td>
                </template>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <td>
                    <nuxt-link
                      :to="{ name: 'influencers-profile-id', params: { id: item.id }}"
                    >{{ item.firstName }} {{ item.lastName }}
                    </nuxt-link>
                  </td>
                  <td v-if="filterType == 2">{{ item.influencerCount }} influencers</td>

                  <td>{{ convertCreatedAt(item.createdAt) }}</td>
                  <td v-if="filterType === 10">
                    {{ item.email ? item.email : 'No email' }}
                  </td>
                  <td v-if="filterType === 10">
                    {{ item.phoneNumber ? item.phoneNumber :  'No Phone Number' }}
                  </td>
                  <td v-if="filterType !== 10 && $auth.user.role === 1">
                    <v-select
                      v-model="item.assignedto"
                      :items="assignedToCases"
                      item-text="label"
                      item-value="value"
                      auto-select-first
                      @change="changeStatusById(item.id, item.email, item.assignedto,'assignedto')"
                    ></v-select>
                  </td>
                  <td v-if="filterType !== 10">
                    <v-select
                      v-model="item.contractStatus"
                      :items="contractStatuses"
                      item-text="label"
                      item-value="value"
                      auto-select-first
                      @change="changeStatusById(item.id, item.email, item.contractStatus,'contractStatus')"
                    ></v-select>
                  </td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon link v-on="on"
                          :to="{ name: 'influencers-edit-id', params: { id: item.id }}">
                          <v-icon>fa-pencil-square-o</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn v-if="deleteCallback && $auth.user.role === 1"
                          color="red" v-on="on"
                          icon
                          @click.stop="deleteCallback(item.id)">
                          <v-icon>fa-trash-o</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-data-iterator>
    <v-dialog
      v-model="dialog"
      max-width="490"
    >
      <v-card>
        <v-card-title>{{ tempItem.label }}</v-card-title>
        <v-card-text>
          <v-datetime-picker label="Select Datetime"
            dateFormat="dd-MM-yyyy" timeFormat="HH:mm"
            v-model="tempDateTime"
          ></v-datetime-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="resetTempItem()"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
             @click="goAheadToStatusChange()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped  lang="scss" >
.social-links > a + a {
  margin-left: 0.5rem;
}
.social-links fa {
  font-size: 2rem;
}
tbody tr:nth-of-type(even) {
    background-color: rgba(236, 237, 237);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(250 ,250, 250);
  }

</style>

<script>
import Vue from 'vue'
import config from '../config'
import SocialLinks from './SocialLinks'
import axios from '../utils/create-axios';
import DatetimePicker from 'vuetify-datetime-picker';
Vue.use(DatetimePicker);
export default {
  components: { SocialLinks },
  props: {
    searchBar: Boolean,
    loading: Boolean,
    influencers: Array,
    assignedToCases: Array,
    filterType: Number,
    itemsPerPage: {
      type: Number,
      default: 500
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    noHeader: Boolean,
    noSort: Boolean,
    deleteCallback: {
      type: Function,
      default: null
    },
  },
  async mounted() {
  },
  computed: {
    sumUpInstaFollowers() {
      let temp = 0;
      for(let i = 0; i < this.influencers.length; i++) {
        temp = temp + this.influencers[i].instagram_followers;
      }
      return temp;
    },
    averageInstaFollowers() {
      let temp = 0;
      for(let i = 0; i < this.influencers.length; i++) {
        temp = temp + this.influencers[i].instagram_followers;
      }
      return Math.round(temp/this.influencers.length);
    }
  },
  data() {
    return {
      tempDateTime: new Date(),
      config,
      search: '',
      contractStatuses: config.contractStatuses,
      dialog: false,
      tempItem: {
        id: null,
        emailAddress: null,
        changedValue: null,
        changeFilter: null,
        label: null
      }
    }
  },
  methods: {
    convertCreatedAt(createdAt) {
      let temp = new Date(createdAt);
      return `${temp.getDate()}-${temp.getMonth() + 1}-${temp.getFullYear()} ${temp.getHours()}:${temp.getMinutes()}`;
    },
    async goAheadToStatusChange() {
      const url = `${config.msLandingUrl}/influencer/statusChange`;
      await axios.post(url, {
        userId: this.tempItem.id,
        contract: this.tempItem.changedValue,
        filter: this.tempItem.changeFilter,
        datetime: this.tempDateTime,
        email: this.tempItem.emailAddress,
      });
      this.resetTempItem();
    },
    resetTempItem() {
      this.dialog = false;
      this.tempItem.id = null;
      this.tempItem.emailAddress = null;
      this.tempItem.changedValue = null;
      this.tempItem.changeFilter = null;
      this.tempItem.label = null;
      this.$emit("dante");
    },
    async changeStatusById(id, emailAddress, changedValue,changeFilter) {
      if (changeFilter === 'contractStatus') {
        this.tempItem.id = id;
        this.tempItem.emailAddress = emailAddress;
        this.tempItem.changedValue = changedValue;
        this.tempItem.changeFilter = changeFilter;
        if (changedValue === 1 || changedValue === 7 || changedValue === 8) {
          this.tempItem.label = 'Please confirm the meeting date and time.';
          this.dialog = true;
          return;
        } else if (changedValue === 2) {
          this.tempItem.label = 'Please confirm the appointment date and time.';
          this.dialog = true;
          return;
        }
        
      }
      const url = `${config.msLandingUrl}/influencer/statusChange`;
      await axios.post(url, {
        userId: id,
        email: emailAddress,
        contract: changedValue,
        filter: changeFilter
      });
      if (changeFilter === 'contractStatus') {
        this.$emit("dante");
      }
    }
  }
};
</script>
