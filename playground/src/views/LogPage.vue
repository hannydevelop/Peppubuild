<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideBar />
      <div class="col py-3">
        <div class="dash-content" id="d-cont">
          <div id="i2sw">Projects Overview
          </div>
          <div class="row">
            <div class="col-sm-3">
              <div class="card text-success border-success">
                <div class="card-header">Total visits</div>
                <div class="card-body">
                  <h1 class="card-title">1,000</h1>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="card text-success border-success">
                <div class="card-header">Current Plan</div>
                <div class="card-body">
                  <h1 class="card-title">Community</h1>
                </div>
              </div>
            </div>
            <div class="col-sm-3" v-if="projects">
              <div class="card text-success border-success">
                <div class="card-header">Projects</div>
                <div class="card-body">
                  <h1 class="card-title">{{ projects }}</h1>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="card text-success border-success">
                <div class="card-header">Collaborators</div>
                <div class="card-body">
                  <h1 class="card-title">1</h1>
                </div>
              </div>
            </div>
          </div>
          <div id="i2sw">Total Visits
          </div>
          <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SideBar from '../components/SideBar.vue';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(Title, Filler, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
const serverUrl = 'https://server.peppubuild.com';

export default {
  name: 'LogPage',
  components: { SideBar, Line },
  data() {
    return {
      projects: [],
      chartData: {
        labels: ["1 Dec", "8 Dec", "16 Dec", "31 Dec"],
    datasets: [
      {
        label: "Sales Made",
        data: [3, 7, 4, 5],
        borderColor: ["#90ee90"],
        fill: true,
        backgroundColor: '#F1F2F3'
      },
    ],
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async mounted() {
    let accessToken = localStorage.getItem('oauth')
    let url = `${serverUrl}/projects/${accessToken}`
    await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((response) => {
        this.projects = response.length;
      })
    })
  }
}

</script>