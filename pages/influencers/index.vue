
<template>
  <v-layout column>
    <h1>Influencers</h1>
    <v-row class="filter">
      <v-col cols="12" md="3">
        <div class="search-wrapper">
          <input type="text" v-model="searchClue" v-on:change="callback" placeholder="Search by name"/>
          <label>Search by name</label>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
        v-model="assignedto"
        :items="assignedToCases"
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
        :page-number="pageNumber"
        :delete-callback="showDeleteDialog"
        :loading="loading"
        :searchBar=true
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
      assignedToCases: config.assignFilterCases,
      assignedto : -1,
      searchClue: '',
      paginateNum: 1,
      totalPageNum: 0,
    };
  },
  async mounted() {
    this.getInfluencers();
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
    callback() {
      this.paginateNum = 1;
      this.getInfluencers();
    },
    async getInfluencers() {
      this.loading = true;
      try {
        const url = `${config.msLandingUrl}/influencer/list`;
        const result = await axios.get(url, {
          params: {
            paginateNum: this.paginateNum,
            searchClue: this.searchClue.toLowerCase(),
            assignedto: this.assignedto,
            filter: 1,
            filter: {
              deneme: "hede"
            }
          }
        });
        if (result && result.data) {
          this.totalPageNum = Math.floor(result.data.count/20) + 1;
          this.influencers = result.data.list;
        }
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
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
