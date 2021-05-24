let sensorsData = [[0], [0], [0], [0], [0], [0]];
let second = 0;
let myCharts=[];
Chart.defaults.color = "white";
const palette = [
    '#0c0c0c',
    '#69dc9e',
    '#ffffff',
    '#e54f6d',
    "#30c5ff",
    '#5d737e'
]

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}




for (let i = 0; i < 6; i++) {

    let labels = [
        0];
    let data = {
        labels: labels,
        datasets: [{
            data: [],
        }]
    };

    let config = {
        type: 'line',
        data,
        options: {
        }
    };
    data.datasets[0].label = `Sensor #${i}`
    data.datasets[0].backgroundColor = palette[i];
    data.datasets[0].borderColor = palette[i];
    

    myCharts.push(new Chart(
        document.getElementById(`chart${i}`),
        config
    ));

}


setInterval(() => {
    for(let i=0;i<6;i++)
    {
        addData(myCharts[i], second, Math.random()*200);
    }
   
    console.log("finished", second);
    second += 1;
}, 1000)