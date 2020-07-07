<template>
  <v-layout column>
    <v-row>
      <v-col cols='12' md='12'>
        <v-pagination
            v-model="paginateNum"
            class="my-4"
            :length="totalPageNum"
            @input="getMissingInfluencers"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols='12' md='12'>
        <v-card>
          <InfluencerList
            :filterType=10
            :loading="loading"
            :influencers="influencers"
            :items-per-page="10"
            :page-number='1'
            no-header />
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="paginateNum"
      class="my-4"
      :length="totalPageNum"
      @input="getMissingInfluencers"
    ></v-pagination>
  </v-layout>
</template>

<style lang="scss">

</style>
<script>
import InfluencerList from '../../components/InfluencerList';
import config from '../../config';
import Paginate from 'vuejs-paginate';
import axios from '../../utils/create-axios';

export default {
  components: {
    InfluencerList,
    Paginate
  },
  data() {
    return {
      influencers: [],
      loading: false,
      paginateNum: 1,
      totalPageNum: 0
    }
  },
  async mounted() {
    await this.getMissingInfluencers();
  },
  methods: {
    async getMissingInfluencers() {
      const url = `${config.msLandingUrl}/influencer/list`;
      let options = {
          paginateNum: this.paginateNum,
          filter: 10,
          role: this.$auth.user.role,
          user_id: this.$auth.user.id
      };
      const result = await axios.post(url, options);
      if (result && result.data && result.data.list) {
        this.totalPageNum = Math.floor(result.data.count/20) + 1;
        this.influencers = result.data.list;
        console.log(this.influencers);
      }
    }
  }
}
</script>
