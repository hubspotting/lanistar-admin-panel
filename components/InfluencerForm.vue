<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.firstName.$model"
            :error="$v.firstName.$error"
            :error-messages="firstNameErrors"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.lastName.$model"
            :error="$v.lastName.$error"
            :error-messages="lastNameErrors"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.email.$model"
            :error="$v.email.$error"
            :error-messages="emailErrors"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="$v.phoneNumber.$model"
            :error="$v.phoneNumber.$error"
            :error-messages="phoneErrors"
            label="Phone number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <!-- <v-text-field
            v-model="this.createdAt"
            label="Created Date"
            disabled="true"
          ></v-text-field> -->
        <v-datetime-picker label="Select Datetime" v-model="createdAt"
          dateFormat="dd-MM-yyyy"
        ></v-datetime-picker>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="assignedto"
            :items="assignedToCases"
            item-text="label"
            item-value="value"
            auto-select-first
            label="Assigned To"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea v-model="brief" label="Brief" required counter="500"></v-textarea>
        </v-col>
      </v-row>

      <v-row mt-4>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <h3>Status</h3>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-checkbox
            v-model="contractSigned"
            :false-value="false"
            :true-value="true"
            class="mx-2" label="Contract Signed"></v-checkbox>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="contractStatus"
            :items="contractStatuses"
            item-text="label"
            item-value="value"
            auto-select-first
            label="Contract status"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-checkbox
            v-model="notAccepted"
            :false-value="false"
            :true-value="true"
            class="mx-2" label="Not Accepted"></v-checkbox>
        </v-col>

      </v-row>

      <v-row mt-4>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <h3>Social media</h3>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="twitter"
            label="Twitter username"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="twitter_followers"
            label="Twitter Followers"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="instagram"
            prefix="@"
            label="Instagram username"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="instagram_followers"
            label="Instagram Followers"
            required
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col  cols="12" md="4">
          <v-text-field
            v-model="$v.facebook.$model"
            :error="$v.facebook.$error"
            :error-messages="facebookErrors"
            label="Facebook profile address"
          ></v-text-field>
        </v-col>
        <v-col  cols="12" md="2">
          <v-text-field
            v-model="fb_followers"
            label="Facebook Followers"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="$v.youtube.$model"
            :error="$v.youtube.$error"
            :error-messages="youtubeErrors"
            label="Youtube channel URL"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="youtube_followers"
            label="Youtube Followers"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="tiktok"
            prefix="@"
            label="TikTok username"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="tiktok_followers"
            label="Tiktok Followers"
            required
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row mt-4>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <h3>Other</h3>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            label="Referred By"
            v-model="referredByInfo"
            :items="foundItems"
            :loading="isSearching"
            :search-input.sync="searchQuery"
            hide-no-data
            hide-selected
            clearable
            item-text="label"
            item-value="influencerId"
            placeholder="Influencer name, surname or email"
            prepend-icon="mdi-database-search"
            return-object
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="6" v-if="referredByInfo">
          <v-card color="#385F73" dark>
            <v-btn text class="float-right">
              <v-icon @click.stop="referredByInfo = null">mdi-window-close</v-icon>
            </v-btn>
            <v-card-title class="headline">{{ referredByInfo.firstName }} {{ referredByInfo.lastName }}</v-card-title>
            <v-card-subtitle>{{ referredByInfo.email }} - {{ referredByInfo.phoneNumber }}</v-card-subtitle>
            <v-card-actions>
              <v-btn @click.stop="referredByInfo = null"
                small color="primary">un-refer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="contractValue"
            label="Contract Value"
            required
            prepend-icon="£"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="referralValue"
            label="Referral Value"
            required
            prepend-icon="£"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn large
            type="submit"
            color="primary"
            :disabled="loading || $v.$invalid"
            :loading="loading">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Vue from 'vue'
import Vuelidate, { validationMixin } from 'vuelidate'
import { email, required, url } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import DatetimePicker from 'vuetify-datetime-picker';
// const phoneNumberValidator = helpers.regex('phone', /^\+?([0-9]{2})\)?[- ]?([0-9- ]{10,})$/)
const phoneNumberValidator = helpers.regex('phone', /^\+?[- ]?([0-9- ]{10,})$/)

Vue.use(Vuelidate)
Vue.use(DatetimePicker);

import axios from '../utils/create-axios'
import config from '../config'

let timer = null
export default {
  mixins: { validationMixin },
  props: {
    'submitCallback': {
      type: Function,
      default: function (formData) {
        console.log(formData)
      }
    },
    'cancelCallback': {
      type: Function,
      default: function () {
        console.log('cancel clicked')
      }
    },
    'loading': Boolean,
    'influencerInfo': Object
  },
  data() {
    return {
      datetime: new Date(),
      isSearching: false,
      searchResults: [],
      searchQuery: null,
      contractStatuses: config.contractStatuses,
      assignedToCases: config.assignedToCases,
      referredByInfo: null,
      influencerId: null,
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      brief: null,
      facebook: null,
      twitter: null,
      instagram: null,
      tiktok: null,
      youtube: null,
      referredBy: null,
      contractStatus: config.contractStatuses[0],
      contractSigned: false,
      notAccepted: false,
      contractValue: 0,
      referralValue: 0,
      createdAt: new Date(),
      updateAt: null,
      fb_followers: 0,
      instagram_followers: 0,
      twitter_followers: 0,
      youtube_followers: 0,
      tiktok_followers: 0,
      assignedto: 0
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      required,
      phoneNumberValidator
    },
    youtube: {
      url
    },
    facebook: {
      url
    },
  },
  mounted() {
    if(this.$props.influencerInfo && this.$props.influencerInfo.influencerId) {
      console.log(this.$props.influencerInfo);
      this.influencerId = this.$props.influencerInfo.influencerId
      this.firstName = this.$props.influencerInfo.firstName
      this.lastName = this.$props.influencerInfo.lastName
      this.email = this.$props.influencerInfo.email
      this.phoneNumber = this.$props.influencerInfo.phoneNumber
      this.brief = this.$props.influencerInfo.brief
      this.facebook = this.$props.influencerInfo.facebook
      this.twitter = this.$props.influencerInfo.twitter
      this.instagram = this.$props.influencerInfo.instagram
      this.youtube = this.$props.influencerInfo.youtube
      this.tiktok = this.$props.influencerInfo.tiktok
      this.referredBy = this.$props.influencerInfo.referredBy
      this.contractSigned = Boolean(this.$props.influencerInfo.contractSigned)
      this.contractStatus = this.$props.influencerInfo.contractStatus
      const referralVal = Number(this.$props.influencerInfo.referralValue)
      const contractVal = Number(this.$props.influencerInfo.contractValue)
      this.referralValue = Number.isNaN(referralVal) ? 0 : referralVal
      this.contractValue = Number.isNaN(contractVal) ? 0 : contractVal
      this.notAccepted = Boolean(this.$props.influencerInfo.notAccepted)
      this.createdAt = new Date(this.$props.influencerInfo.createdAt);
      this.updateAt = this.$props.influencerInfo.updateAt;
      this.fb_followers = this.$props.influencerInfo.fb_followers;
      this.instagram_followers = this.$props.influencerInfo.instagram_followers;
      this.twitter_followers = this.$props.influencerInfo.twitter_followers;
      this.youtube_followers = this.$props.influencerInfo.youtube_followers;
      this.tiktok_followers = this.$props.influencerInfo.tiktok_followers;
      this.assignedto = this.$props.influencerInfo.assignedto;
      this.getReferredBy()
    }
  },
  methods: {
    convertCreatedAt(createdAt) {
      let temp = createdAt.split('T');
      let tempDate = temp[0].split('-');
      let tempTime = temp[1].split(':');
      return tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0] + ' ' + tempTime[0] + ':' + tempTime[1];
    },

    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.referredByInfo) {
        this.referredBy = this.referredByInfo.id
      } else {
        this.referredBy = null
      }
      const valueNumber = Number(this.value)
      this.submitCallback({
        influencerId: this.$props.influencerInfo.influencerId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        brief: this.brief,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        youtube: this.youtube,
        tiktok: this.tiktok,
        status: this.status,
        contractSigned: this.contractSigned,
        contractStatus: this.contractStatus,
        contractValue: Number(this.contractValue),
        referralValue: Number(this.referralValue),
        referredBy: this.referredBy,
        notAccepted: this.notAccepted,
        createdAt:  this.createdAt,
        // updateAt: this.updateAt.toISOString(),
        fb_followers: Number(this.fb_followers),
        instagram_followers: Number(this.instagram_followers),
        twitter_followers: Number(this.twitter_followers),
        youtube_followers: Number(this.youtube_followers),
        tiktok_followers: Number(this.tiktok_followers),
        assignedto: Number(this.assignedto)
      });
    },
    handleCancel() {
      this.cancelCallback()
    },
    async getReferredBy() {
      if (!this.referredBy) {
        return null;
      }
      this.isSearching = true;
      try {
        const url = `${config.msLandingUrl}/influencer/info/${this.referredBy}`;
        const result = await axios.get(url);
        if (result && result.data) {
          this.referredByInfo = result.data.profileInfo;
        }
      } catch (error) {
        console.log(error)
      }
      this.isSearching = false;
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
              searchClue: val,
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
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('First name is required')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Last name is required')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be a valid e-mail')
      !this.$v.email.required && errors.push('Phone number is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.phoneNumberValidator && errors.push('Please enter valid phone number')
      !this.$v.phoneNumber.required && errors.push('Phone number is required')
      return errors
    },
    facebookErrors() {
      const errors = []
      if (!this.$v.facebook.$dirty) return errors
      !this.$v.facebook.url && errors.push('Must be valid url')
      return errors
    },
    youtubeErrors() {
      const errors = []
      if (!this.$v.youtube.$dirty) return errors
      !this.$v.youtube.url && errors.push('Must be valid url')
      return errors
    },
    foundItems() {
      return this.searchResults.map((item) => {
        return {
          label: `${item.firstName} ${item.lastName} < ${item.email} >`,
          ...item
        }
      })
    }
  }
}
</script>
