
<template>
  <v-layout column>
    <h1>Influencers</h1>
    <v-row class="filter">
      <v-col cols="12" md="6">
        <div class="search-wrapper">
          <input type="text" v-model="searchClue" v-on:change="callback" placeholder="Search by name, email or phone number"/>
          <label>Search by name</label>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
        v-model="assignedto"
        :items="assignFilterCases"
        item-text="label"
        item-value="value"
        auto-select-first
        v-on:change="callback"
        class="no-padding"
      ></v-select>
      </v-col>
    </v-row>

    <v-pagination
      v-model="paginateNum"
      class="my-4"
      :length="totalPageNum"
      @input="getInfluencers"
    ></v-pagination>

    <v-sheet>
      <InfluencerList
        :influencers="influencers"
        :assignedToCases="assignedToCases"
        :page-number="pageNumber"
        :delete-callback="showDeleteDialog"
        :loading="loading"
        :searchBar=true
        v-on:dante="refreshData"
      />
      <v-pagination
        v-model="paginateNum"
        class="my-4"
        :length="totalPageNum"
        @input="getInfluencers"
      ></v-pagination>
    </v-sheet>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete influencer?</v-card-title>
        <v-card-text>Are you sure to delete this influencer</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" text @click="deleteId = null">Cancel</v-btn>
          <v-btn color="red darken-1" text @click.stop="deleteInfluencer">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<style lang="scss" scoped>
.search-wrapper {
    position: relative;
    text-align: center;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
    input {
      width: 80%;
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      border-radius: 4px;
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
  }
</style>
<script>
import axios from "../../utils/create-axios";
import config from "../../config";
import Paginate from 'vuejs-paginate'
import InfluencerList from "../../components/InfluencerList";

export default {
  components: {
    InfluencerList,
    Paginate
  },
  data() {
    return {
      loading: false,
      influencers: [],
      pageNumber: 1,
      deleteId: null,
      assignFilterCases: config.assignFilterCases,
      assignedToCases: config.assignedToCases,
      assignedto : -1,
      searchClue: '',
      paginateNum: 1,
      totalPageNum: 0,
    };
  },
  async mounted() {
    await this.getAssignUsers();
    await this.getInfluencers();
  },
  computed: {
    deleteDialog: {
      get() {
        return this.deleteId !== null;
      },
      set(val) {
        if (!val) {
          this.deleteId = null;
        }
      }
    }
  },
  methods: {
    refreshData() {
      this.getInfluencers();
    },
    callback() {
      this.paginateNum = 1;
      this.getInfluencers();
    },
    async getAssignUsers() {
      const url = `${config.msLandingUrl}/user/getassginusers`;
      const result = await axios.get(url);
      if (result) {
        this.assignedToCases = config.assignedToCases.concat(result.data);
        this.assignFilterCases = config.assignFilterCases.concat(result.data);
      }
    },
    async getInfluencers() {
      try {
        const url = `${config.msLandingUrl}/influencer/list`;
        const result = await axios.post(url, {
            paginateNum: this.paginateNum,
            searchClue: this.searchClue.toLowerCase(),
            assignedto: this.assignedto,
            filter: 1,
            role: this.$auth.user.role,
            user_id: this.$auth.user.id
        });
        if (result && result.data) { 
          this.totalPageNum = Math.floor(result.data.count/20) + 1;
          this.influencers = result.data.list;
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    showDeleteDialog(id) {
      this.deleteId = id;
    },
    async deleteInfluencer() {
      this.loading = true;
      try {
        const url = `${config.msLandingUrl}/influencer/${this.deleteId}`;
        const result = await axios.delete(url);
        if (result && result.data && result.data.success) {
          const deletedItemIndex = this.influencers.findIndex(item => {
            return item.id === this.deleteId;
          });
          this.influencers.splice(deletedItemIndex, 1);
          this.deleteDialog = false;
        }
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
    }
  }
};
</script>
