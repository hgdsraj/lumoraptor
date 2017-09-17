<template>
  <div>
    <div class="select">
      <label class="label" for="health_status">Select your health status</label>

      <select v-model="health_status" v-on:change="change_health" id="health_status" >
        <option disabled value="">
          Please Select Your Health Status
        </option>
        <option value="anxiety">
          Anxiety
        </option>
        <option value="ocd">
          Obsessive Compulsive Disorder
        </option>
        <option value="insomnia">
          Insomnia
        </option>
        <option value="depression">
          Depression
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  const healthStatus = String(location.href.substr(location.href.lastIndexOf('/') + 1))
  export default {
    data: () => ({
      health_status: healthStatus
    }),

    methods: {
      change_health: function () {
        location.href = '#/chat/' + this.health_status
        window.location.reload(false)
      }
    }

  }

</script>
<style>
  .select {
    margin-bottom: 100px;
  }
</style>
