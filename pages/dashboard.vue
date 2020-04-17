<template>
  <v-layout column>
    <v-row>
      <v-col cols="12" md="4">
        <v-card color="pink" dark v-on:click="chagenFilterType(1)" :class="filterType == 1 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Registered</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.total ? stats.total : 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-users"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="purple" dark v-on:click="chagenFilterType(2)" :class="filterType == 2 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Referred</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.referred ? stats.referred: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-share"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="orange" v-on:click="chagenFilterType(9)" :class="filterType == 9 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Unverified</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.notverified ? stats.notverified: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-exclamation-triangle"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="blue" dark v-on:click="chagenFilterType(3)" :class="filterType == 3 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Waiting to be contacted</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.waiting ? stats.waiting: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="green" dark  v-on:click="chagenFilterType(4)" :class="filterType == 4 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Contacted/pitch booked</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.contacted ? stats.contacted: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-handshake-o" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="red" dark v-on:click="chagenFilterType(5)" :class="filterType == 5 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Didn't attend pitch</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.toRebook ? stats.toRebook: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-bookmark" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="grey" dark v-on:click="chagenFilterType(6)" :class="filterType == 6 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Non Contactable</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.disappeared ? stats.disappeared: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-user-times" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="brown" dark  v-on:click="chagenFilterType(7)" :class="filterType == 7 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Contract Signed</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.signed ? stats.signed: 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="black" dark  v-on:click="chagenFilterType(8)" :class="filterType == 8 ? 'active': ''">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title">Contract Not Signed</v-card-title>
              <v-card-text class="card-count">
                <h1>{{ stats.notSigned ? stats.notSigned : 0 }}</h1>
              </v-card-text>
            </div>
            <div class="card-icon d-flex flex-column justify-center align-tems-center">
              <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
           
          <v-card-title v-if="filterType == 1">{{ stats.total ? stats.total: 'No one' }} Registered</v-card-title>
          <v-card-title v-if="filterType == 2">{{ stats.referred ? 'Top Referrers': 'No one Referred' }}</v-card-title>
          <v-card-title v-if="filterType == 3">{{ stats.waiting ? stats.waiting: 'No one' }} Waiting to be contacted</v-card-title>
          <v-card-title v-if="filterType == 4">{{ stats.contacted ? stats.contacted: 'No one' }} Contacted/pitch booked</v-card-title>
          <v-card-title v-if="filterType == 5">{{ stats.toRebook ? stats.toRebook: 'No one' }} Didn't attend pitch/to be re-booked</v-card-title>
          <v-card-title v-if="filterType == 6">{{ stats.disappeared ? stats.disappeared: 'No one' }} Non contactable/ Disappeared</v-card-title>
          <v-card-title v-if="filterType == 7">{{ stats.signed ? stats.signed: 'No one' }} Contract Signed</v-card-title>
          <v-card-title v-if="filterType == 8">{{ stats.notSigned ? stats.notSigned: 'No one' }} Contract Not Signed</v-card-title>
          <v-card-title v-if="filterType == 9">{{ stats.notverified ? stats.notverified: 'No one' }} Unverified</v-card-title>

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

          <InfluencerList
            :filterType="filterType"
            :loading="loading"
            :influencers="influencers"
            :items-per-page="10"
            v-on:dante="refreshData"
            :page-number='1' no-header />

          <v-pagination
            v-model="paginateNum"
            class="my-4"
            :length="totalPageNum"
            @input="getInfluencers"
          ></v-pagination>

        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<style lang="scss">
  .no-padding {
    padding-top: 0px;
  }
  .active {
    transform: scale(1.04);
  }
  .card-icon {
    width: 25%;
  }
  .card-icon .fa {
    font-size: 4rem;
  }
  .card-count h1 {
    font-size: 3rem
  }
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
import axios from '../utils/create-axios'
import config from '../config'
import InfluencerList from '../components/InfluencerList'
import Paginate from 'vuejs-paginate'
export default {
  components: {
    InfluencerList,
    Paginate
  },
  data() {
    return {
      influencers: [],
      loading: false,
      stats: {},
      filterType: 1,
      paginateNum: 1,
      searchClue: '',
      totalPageNum: 0,
      assignedToCases: config.assignFilterCases,
      assignedto : -1
    }
  },
  async mounted() {
    await this.getDashboardData()
    await this.getInfluencers()
  },
  computed: {
      
    },
  methods: {
    refreshData() {
      this.getDashboardData();
      this.getInfluencers();
      
    },
    callback() {
      this.paginateNum = 1;
      this.getInfluencers();
    },
    chagenFilterType(filter) {
      this.filterType = filter;
      this.paginateNum = 1;
      this.getInfluencers();
    },
    
    async getDashboardData() {
      try {
        const url = `${config.msLandingUrl}/influencer/dashboard`;
        const result = await axios.get(url);
        if (result && result.data) {
          this.stats = result.data;
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getInfluencers() {
      try {
        const url = `${config.msLandingUrl}/influencer/list`;
        let options = {
          params: {
            paginateNum: this.paginateNum,
            filter: this.filterType,
            searchClue: this.searchClue.toLowerCase(),
            assignedto: this.assignedto
          }
        };
        const result = await axios.get(url, options);
        if (result && result.data && result.data.list) {
          this.totalPageNum = Math.floor(result.data.count/20) + 1;
          this.loading = false;
          this.influencers = result.data.list;
        }
      } catch (error) {
        console.log(error);
        this.influencers = [];
      }
    }
  }
}
</script>
