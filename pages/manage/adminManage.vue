<template>
  <v-app>
    <h3>Admin Management Page</h3>
    <adminslist
      :admins="admins"
      v-on:refreshAdminList="getAdminList"
    ></adminslist>
  </v-app>
</template>
<style lang="scss">
 h3 {
   margin: 30px;
 }
</style>
<script>
import adminslist from '../../components/adminslist';
import axios from '../../utils/create-axios';
import config from '../../config';
export default {
  components: {
    adminslist
  },
  data() {
    return {
      admins: []
    }
  },
  async mounted() {
    await this.getAdminList()
  },
  methods: {
    getAdminList() {
        const url = `${config.msLandingUrl}/user/adminList`;
        axios.get(url).then((result) => {
          if (result && result.data) {
            console.log('admin list here: ........', result.data);
            this.admins = result.data;
          }
        });
    }
  }
}
</script>