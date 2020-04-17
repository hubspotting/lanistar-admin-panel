<template>
  <v-app v-resize="onResize">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
      permanent
    >
      <v-list v-on:refresh="getSocialData">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, key) in cards"
          :key="key"
          :class="key"
        >
          <v-list-item-action>
            <v-icon class="color-white">{{ icons[key] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <div class="d-flex flex-column justify-center align-tems-center">
              <div class="color-white">Total: {{ item.total ? item.total: 0 }}</div>
              <div class="color-white">Avg: {{ item.avg ? item.avg : 0 }}</div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
      dark
    >
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-icon>fa-user</v-icon>
      <v-btn class="fullname">
        {{ $auth.user.fullname }}
      </v-btn>
      <v-btn @click.prevent="logoff">
        <v-icon>fa-sign-out</v-icon>&nbsp; logout
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.twitter {
  background-color: #2196F3 !important;
  border-color: #2196F3 !important;
}
.youtube {
  background-color: #F44336 !important;
  border-color: #F44336 !important;
}
.facebook {
  background-color: #303f9f !important;
  border-color: #303f9f !important;
}
.tiktok {
  background-color: #1E1E1E;
  border-color: #1E1E1E;
  
}
.instagram {
  background-color: #e91e63 !important;
  border-color: #e91e63 !important;
}
.color-white {
  color: white !important;
}
</style>

<script>
import axios from '../utils/create-axios';
import config from '../config';
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Influencers',
          to: '/influencers'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Add New Influencer',
          to: '/influencers/new'
        },
        {
          icon: 'mdi-account-switch',
          title: 'Invite Influencer',
          to: '/influencers/invite'
        }
      ],
      icons: {
        instagram: 'mdi-instagram',
        facebook: 'mdi-facebook',
        twitter: 'mdi-twitter',
        youtube: 'mdi-youtube',
        tiktok: 'mdi-at'
      },

      cards: {
        instagram: {
          total: 0,
          avg: 0,
        },
        facebook: {
          total: 0,
          avg: 0,
        },
        twitter: {
          total: 0,
          avg: 0,
        },
        youtube: {
          total: 0,
          avg: 0,
        },
        tiktok: {
          total: 0,
          avg: 0,
        }
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lanistar Influencers',
    }
  },
  mounted() {
    this.$bus.$on('refresh', () => {
      this.getSocialData();
    })
    this.getSocialData();
    this.miniVariant = this.$vuetify.breakpoint.mdAndDown
  },
  methods: {
    async getSocialData() {
      try {
          const url = `${config.msLandingUrl}/influencer/socialfollowers`;
          const result = await axios.get(url);
          if (result && result.data) {
            console.log(result.data);
            this.cards = result.data;
          }
        } catch (error) {
          console.log(error)
        }
    },
    onResize() {
      // this.miniVariant = this.$vuetify.breakpoint.mdAndDown
    },
    logoff() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

.fullname {
  overflow: hidden;
  max-width: 50%;
}

</style>