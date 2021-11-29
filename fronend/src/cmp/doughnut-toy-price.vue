<script>

import { Doughnut  } from "vue-chartjs";

export default {
  extends: Doughnut ,
  props:{
    getStaticPrice:{
      type: Array
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: 
      [
        "On wheels",
        "Box game",
        "Art",
        "Baby",
        "Doll",
        "Puzzle",
        "Outdoor"]
     ,
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: ["#f87979",'#ecf6ff','#1993ff','#a47fa7','#0fffff','#7f8281','#0f6eff'],
          data: this.getStaticPrice
        },
      ],
    });
  },
};
</script>

<style>
</style>
