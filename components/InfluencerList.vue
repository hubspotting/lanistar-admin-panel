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
                  <th width="150">Assigned To</th>
                  <th width="200">Status</th>
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
                  <!-- <td>{{ item.assignedto }}</td> -->
                  <td>
                    <v-select
                      v-model="item.assignedto"
                      :items="assignedToCases"
                      item-text="label"
                      item-value="value"
                      auto-select-first
                      v-on:change="changeStatusById(item.id, item.assignedto,'assignedto')"
                    ></v-select>
                  </td>
                  <td>
                    <v-select
                      v-model="item.contractStatus"
                      :items="contractStatuses"
                      item-text="label"
                      item-value="value"
                      auto-select-first
                      v-on:change="changeStatusById(item.id, item.contractStatus,'contractStatus')"
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
                        <v-btn v-if="deleteCallback"
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
      max-width="290"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          Are you going to set {{ tempItem.firstName + ' ' + tempItem.lastName }} status to {{ contractStatuses[tempItem.contractStatus]['label'] }}?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="changeStatusById(tempItem.id, tempItem.contractStatus, 'contractStatus')"
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
import config from '../config'
import SocialLinks from './SocialLinks'
import axios from '../utils/create-axios';

export default {
  components: { SocialLinks },
  props: {
    searchBar: Boolean,
    loading: Boolean,
    influencers: Array,
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
    }
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
      config,
      search: '',
      contractStatuses: config.contractStatuses,
      assignedToCases: config.assignedToCases,
      dialog: false,
      tempItem: {
        firstName: '',
        lastName: '',
        contractStatus: 0

      }
    }
  },
  methods: {
    confirm(item, beforeItem) {
      console.log(item, beforeItem);
      this.tempItem = item;
      this.dialog = true;
    },
    convertCreatedAt(createdAt) {
      let temp = new Date(createdAt);
      return `${temp.getDate()}-${temp.getMonth() + 1}-${temp.getFullYear()} ${temp.getHours()}:${temp.getMinutes()}`;
    },
    async changeStatusById(id, changedValue, changeFilter) {
      if (this.dialog) {
        this.dialog = false;
      }
      const url = `${config.msLandingUrl}/influencer/statusChange`;
      axios.post(url, {
        userId: id,
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
