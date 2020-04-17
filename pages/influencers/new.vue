<template>
  <v-layout column>
    <v-snackbar color="success" bottom
      :timeout="5000"
      v-model="successMessage"
    >
      Influencer has been created successfully
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <h1>Add New Influencer</h1>
    <v-sheet>
      <v-alert type="error" v-if="errorSummary" >
        {{ errorSummary }}
      </v-alert>
    </v-sheet>
    <v-sheet v-if="influencerInfo">
      <influencer-form
        :submit-callback="submitCallback"
        :cancel-callback="cancelCallback"
        :loading="loading"
        :influencer-info="influencerInfo" />
    </v-sheet>
  </v-layout>
</template>

<script>
import axios from '../../utils/create-axios'

import parseApiError from '../../utils/parse-api-error'
import config from "../../config";
import InfluencerForm from '../../components/InfluencerForm'

export default {
  components: {
    InfluencerForm
  },
  data() {
    return {
      loading: false,
      influencerInfo: null,
      errorSummary: null,
      successMessage: false
    }
  },
  mounted() {
    const { referredBy } = this.$route.params
    this.influencerInfo = {
      referredBy
    }
  },
  methods: {
    async submitCallback(formData) {
      this.loading = true
      try {
        this.errorSummary = null
        const url = `${config.msLandingUrl}/influencer/create`;
        const result = await axios.post(url, {
          ...formData
        });
        if (result && result.data) {
          this.$vuetify.goTo(0, {})
          if (result.data.errors) {
            this.errorSummary = parseApiError(result)
            this.loading = false
            return;
          }
          this.successMessage = true
          setTimeout(() => {
            this.$nuxt.$router.replace(`/influencers/edit/${result.data.profileInfo.influencerId}`)
          }, 1000)
        }
      } catch (error) {
        this.errorSummary = parseApiError(error)
      }
      this.loading = false
    },
    cancelCallback() {
      this.$nuxt.$router.replace('/influencers')
    }
  }
};
</script>
