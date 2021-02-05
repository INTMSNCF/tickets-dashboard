import { Bar } from "vue-chartjs";

export default {
    name: "stackedChart",
    extends: Bar,
    props: {
        chartData: {
            labels: [
                "Janv",
                "Févr",
                "Mars",
                "Avr",
                "Mai",
                "Juin",
                "Juil",
                "Août",
                "Sept",
                "Oct",
                "Nov",
                "Déc"
            ],
            datasets: [{
                    label: "Anomalie Bloquante",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#00b050"
                },
                {
                    label: "Anomalie Non Bloquante",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#002060"
                },
                {
                    label: "Demande d'Information",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#ffff00"
                },
                {
                    label: "Demande Administrative",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#7030a0"
                },
                {
                    label: "Ne pas prendre en compte",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#c00000"
                },
                {
                    label: "Reste",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: "#0070c0"
                }
            ]
        },
        chartOptions: {
            responsive: false,
            legend: {
                position: "right"
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    }
};