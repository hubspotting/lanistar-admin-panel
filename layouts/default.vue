<template>
  <v-app v-resize="onResize">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
      permanent
    >
      <v-list>
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

<script>
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lanistar Influencers'
    }
  },
  mounted() {
    this.miniVariant = this.$vuetify.breakpoint.mdAndDown
  },
  methods: {
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