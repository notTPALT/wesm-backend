// async function fetchOldElectric(node_id, sensor_id) {
//     const params = new URLSearchParams();
//     params.append('node_id', node_id);
//     params.append('sensor_id', sensor_id);
//     const response = await fetch(`http://localhost:3000/getOldElectric?${params.toString()}`);
//     const data = await response.json();
//     return data[0];
// }

// //Fetch old Water
// async function fetchOldWater(node_id, sensor_id) {
//     const params = new URLSearchParams();
//     params.append('node_id', node_id);
//     params.append('sensor_id', sensor_id);
//     const response = await fetch(`http://localhost:3000/api/get?${params.toString()}`);
//     const data = await response.json();
//     return data[0];
// }
//Fetch old Water
async function fetchData(type, node_id, sensor_id, date = 32, rows = 1) {
    const params = new URLSearchParams();
    params.append('type', type);
    params.append('node_id', node_id);
    params.append('sensor_id', sensor_id);
    if (date !== 32) {
        params.append('date', date);
    }
    params.append('rows', rows);
    console.log(params.toString());
    const response = await fetch(`http://localhost:50000/api/get?${params.toString()}`);
    console.log(response);
    const data = await response.json();
    return data;
}
async function main() {
    var oldWater1 = await fetchData('water', 'node_1', 'water1', 1, 1);
    var newestRecord = await fetchData('water', 'node_1', 'water1', 32, 1);
    document.getElementById('total-water').textContent = oldWater1[0].water;
    document.getElementById('total-electric').textContent = newestRecord[0].water;
}

main();