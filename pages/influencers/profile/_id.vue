
<template>
  <v-layout column>
    <v-snackbar
      v-if="successMessage"
      v-model="snackbar"
      :timeout="5000"
      color="success">
      {{ successMessage }}
      <v-btn
        color="pink"
        text
        @click="successMessage = null"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-sheet v-if="warningMessage">
      <v-alert type="warning">
        {{ warningMessage }}
      </v-alert>
    </v-sheet>
    <v-sheet v-if="influencerInfo">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <div class="display-2 font-weight-black mb-3">
                {{ influencerFullName }}
              </div>
              <div class="mb-3">
                <v-chip color="blue" dark v-if="influencerInfo.contractSigned == 1">
                  contract signed
                </v-chip>
                <v-chip color="gray lighten-3" dark>
                  Status: {{ statusLabel }}
                </v-chip>
              </div>
              <div class="mb-3" v-if="influencerInfo.notAccepted === true">
                <v-chip color="red" dark>
                  not accepted
                </v-chip>
              </div>
              <div class="mb-3" v-if="influencerInfo.contractValue">
                Contract Value {{ contractValueFormatted }} <br/>
              </div>
              <div class="mb-3" v-if="influencerInfo.referralValue">
                Referral Value {{ referralValueFormatted }} <br/>
              </div>
              <div class="mb-3" v-if="totalValue">
                Total Referal Value: {{ totalValue }}
              </div>
              <div class="mb-3">
                {{ influencerInfo.email }}
              </div>
              <div class="mb-3">
                {{ influencerInfo.phoneNumber }}
              </div>
              <v-card v-if="influencerInfo.brief">
                <v-card-title>Brief</v-card-title>
                <v-card-text>
                  {{ influencerInfo.brief }}
                </v-card-text>
              </v-card>
              <v-row>
                <v-col>

                  <v-btn small depressed :to="{ name: 'influencers-edit-id', params: { id: influencerInfo.influencerId }}">
                    Edit Influencer Info
                  </v-btn>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <template v-slot:activator="{ on }">
                      <v-btn color="red" small outlined depressed v-on="on">
                        Delete Influencer
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Delete Influencer?</v-card-title>
                      <v-card-text>Are you sure to delete this influencer</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="gray lighten-1" text @click="deleteDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text @click="deleteInfluencer">Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row class="socials">
                <v-col cols="2" class="text-center" v-if="influencerInfo.facebook">
                  <div>
                    <a :href="influencerInfo.facebook" class="sc-link" target="_blank">
                      <i class="fa socicon-facebook" />
                    </a>
                  </div>
                  <div>
                    Facebook
                  </div>
                </v-col>
                <v-col cols="2" class="text-center" v-if="influencerInfo.instagram">
                  <a :href="`https://instagram.com/${influencerInfo.instagram}`" class="sc-link" target="_blank">
                    <i class="fa socicon-instagram" />
                  </a>
                  <div>
                    instagram
                  </div>
                </v-col>
                <v-col cols="2" class="text-center" v-if="influencerInfo.youtube">
                  <a :href="influencerInfo.youtube" class="sc-link" target="_blank">
                    <i class="fa socicon-youtube" />
                  </a>
                  <div>
                    youtube
                  </div>
                </v-col>
                <v-col cols="2" class="text-center" v-if="influencerInfo.twitter">
                  <a :href="`https://twitter.com/${influencerInfo.twitter}`" class="sc-link" target="_blank">
                    <i class="fa socicon-twitter" />
                  </a>
                  <div>
                    twitter
                  </div>
                </v-col>
                <v-col cols="2" class="text-center"
                  v-if="influencerInfo.tiktok">
                  <a :href="`https://www.tiktok.com/@${influencerInfo.tiktok}`" class="sc-link" target="_blank">
                    <i class="fa socicon-tiktok" />
                  </a>
                  <div>
                    TikTok
                  </div>
                </v-col>
              </v-row>
              <v-card>
                <v-card-title>
                  Reference Link
                </v-card-title>
                <v-card-text>
                  <a :href="referenceLink">
                    {{ referenceLink }}
                  </a>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="deep-purple accent-4" @click.prevent="copyToClipboard(referenceLink)">
                    COPY TO CLIPBOARD
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card>
                <v-card-title>
                  Profile Link
                </v-card-title>
                <v-card-text>
                  <a :href="profileLink">
                    {{ profileLink }}
                  </a>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="deep-purple accent-4" @click.prevent="copyToClipboard(profileLink)">
                    COPY TO CLIPBOARD
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>
                Referred Influencers
              </h3>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="selectedInfluencer"
                    :items="foundItems"
                    :loading="isSearching"
                    :search-input.sync="searchQuery"
                    hide-no-data
                    hide-selected
                    clearable
                    item-text="label"
                    item-value="influencerId"
                    placeholder="Influencer name, email or phone number"
                    prepend-icon="mdi-database-search"
                    return-object
                  >
                  </v-autocomplete>
                  <v-btn large block
                    color="primary"
                    @click.prevent="addReferral"
                    v-if="selectedInfluencer">
                    Add {{ selectedInfluencer.firstName }} {{ selectedInfluencer.lastName }} as referral
                  </v-btn>
                </v-col>
              </v-row>
              <v-row >
                <!-- <v-col cols="4">
                  <v-chip large>
                    {{ selectedInfluencer.firstName }} {{ selectedInfluencer.lastName }}
                  </v-chip>
                </v-col> -->
                <v-col>

                </v-col>
              </v-row>
              <div>
                <influencer-list
                  :influencers="referredInfluencers"
                  :page-number="1"
                  no-header
                  no-paging
                  :loading="loading" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </v-layout>
</template>

<style>
.socials .fa {
  font-size: 4rem
}
</style>

<script>
import Vue from 'vue'
import Vuelidate, { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

import InfluencerList from "../../../components/InfluencerList"
import axios from '../../../utils/create-axios'
import config from "../../../config";
import parseApiError from '../../../utils/parse-api-error'
import { copyToClipboard } from '../../../utils/copy-text-clipboard'

let timer = null;
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  notation: 'standard',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default {
  mixins: { validationMixin },
  components: { InfluencerList },
  data() {
    return {
      loading: false,
      isSearching: false,
      searchResults: [],
      searchQuery: null,
      selectedInfluencer: null,
      warningMessage: null,
      successMessage: null,
      verifyDialog: false,
      deleteDialog: false,
      id: null,
      influencerInfo: null,
      referredInfluencers: []
    };
  },
  // validations: {
  //   emailAddress: {
  //     required,
  //     email
  //   }
  // },
  async mounted() {
    const { id } = this.$route.params
    if (!id) {
      this.warningMessage = 'Influencer id is missing'
      return
    }
    this.id = id
    this.getInfluencerInfo()
  },
  methods: {
    async getInfluencerInfo() {
      this.loading = true;
      try {
        const url = `${config.msLandingUrl}/influencer/info/${this.id}`;
        const result = await axios.get(url);
        if (result && result.data) {
          this.influencerInfo = result.data.profileInfo
          await this.getReferrals()
        }
      } catch (error) {
        this.warningMessage = parseApiError(error)
      }
      this.loading = false;
    },
    async getReferrals() {
      try {
        const url = `${config.msLandingUrl}/influencer/list`;
        const result = await axios.get(url, {
          params: {
            referredBy: this.influencerInfo.influencerId
          }
        });
        if (result && result.data) {
          this.referredInfluencers = result.data.list;
          console.log(this.referredInfluencers.length);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    async addReferral() {
      if (!this.selectedInfluencer) {
        return
      }
      this.loading = true;
      try {
        const url = `${config.msLandingUrl}/influencer/add-referral`;
        const result = await axios.post(url, {
          influencerId: this.id,
          referralId: this.selectedInfluencer.id
        });
        if (result && result.data) {
          if (!result.data.success) {
            this.warningMessage = parseApiError(error)
            return;
          }
          this.selectedInfluencer = null
          this.referredInfluencers.push({
            ...result.data.profileInfo,
            id: result.data.profileInfo.influencerId
          })
        }
      } catch (error) {
        this.warningMessage = parseApiError(error)
      }
      this.loading = false;
    },
    copyToClipboard(str) {
      copyToClipboard(str);
    },
    async deleteInfluencer() {
      try {
        this.$vuetify.goTo(0, {})
        const url = `${config.msLandingUrl}/influencer/${this.id}`;
        const result = await axios.delete(url);
        if (result && result.data && result.data.success) {
          this.successMessage = 'Influencer has been deleted'
          this.deleteDialog = false
          setTimeout(() => {
            this.successMessage = null
            this.$nuxt.$router.replace('/influencers')
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
      this.verifyDialog = false;
    }
  },
  watch: {
    searchQuery (val) {
      // Items have already been loaded
      // if (this.foundItems.length > 0) return
      clearTimeout(timer)
      timer = setTimeout(async () => {
        // Items have already been requested
        if (this.isSearching) return

        this.isSearching = true

        try {
          const url = `${config.msLandingUrl}/influencer/list`;
          const result = await axios.get(url, {
            params: {
              searchClue: val.toLowerCase(),
              autoComplete: true
            }
          });
          if (result && result.data) {
            this.searchResults = result.data.list;
          }
        } catch (error) {
          console.log(error)
        }
        this.isSearching = false
      }, 500)
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.emailAddress.$dirty) return errors
      !this.$v.emailAddress.email && errors.push('Must be a valid e-mail')
      !this.$v.emailAddress.required && errors.push('Phone number is required')
      return errors
    },
    snackbar() {
      return Boolean(this.successMessage)
    },
    influencerFullName() {
      if (!this.influencerInfo) {
        return null;
      }
      return `${this.influencerInfo.firstName} ${this.influencerInfo.lastName}`
    },
    referenceLink() {
      if (!this.influencerInfo) {
        return null;
      }
      return `https://inf.iamlanistar.com/register?ref=${this.influencerInfo.referralCode}`
    },
    profileLink() {
      if (!this.influencerInfo) {
        return null;
      }
      return `https://inf.iamlanistar.com/profile/${this.influencerInfo.token}`
      // return `http://localhost:3000/profile/${this.influencerInfo.token}`
    },
    foundItems() {
      return this.searchResults.map((item) => {
        return {
          label: `${item.firstName} ${item.lastName} < ${item.email} >`,
          ...item
        }
      })
    },
    statusLabel() {
      const result =  config.contractStatuses.find((item) => {
        return item.value == this.influencerInfo.contractStatus
      })
      if (result) {
        return result.label
      }
      return ''
    },
    totalValue() {
      if (!this.referredInfluencers || !this.referredInfluencers.length) {
        return '';
      }
      const total = this.referredInfluencers.reduce((sum, user) => {
        if (!user || !user.referralValue || user.notAccepted === true) {
          return sum;
        }
        const val = Number(user.referralValue);
        if (!val || Number.isNaN(val)) {
          return sum;
        }
        return sum + val;
      }, 0);
      return formatter.format(total) ;
    },
    contractValueFormatted() {
      return formatter.format(this.influencerInfo.contractValue)
    },
    referralValueFormatted() {
      return formatter.format(this.influencerInfo.referralValue)
    }
  }
};
</script>
