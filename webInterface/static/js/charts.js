let sensorsData = [[0], [0], [0], [0], [0]];
let second = 0;
let myCharts = [];
let isFirstTime = true;
let threshold = 0;
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




for (let i = 0; i < 5; i++) {

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

    $.ajax({
        url: 'requestSample',
        data: [],
        success: data => {
            let sum = 0;
            let variationSum = 0;

            for (let i = 0; i < 5; i++) {
                sum += data.data[i];
                if (data.data[i] < threshold) {
                    variationSum += threshold - data.data[i];
                }
                addData(myCharts[i], second, data.data[i]);
            }
            if (isFirstTime) {
                threshold = sum / 5;
                document.getElementById('threshold').innerHTML = threshold;
                isFirstTime = false;
           
            } else if (!isFirstTime) {
                let meanSum =(variationSum / 5);
                let level= ''
                document.getElementById('mean').innerHTML = meanSum.toFixed(2);

                if(meanSum<20)
                { 
                    level='LOW';
                }
                else if (meanSum<60){
                    level='MEDIUM';
                } else{
                    level='HIGH';
                }
                document.getElementById('tremorLevel').innerHTML=level;
            }
        }
    })

    second += 1;
}, 1000)