const username = "2CBE97003EBB";
const password = "vZpmxxwUw";
const authString = `${username}:${password}`;
const authHeader = "Basic " + btoa(authString);
const sensorNames = ['temp_collectormax', 'solar_power', 'day_solarearnings', 'total_solarearnings', 'last_seen'];
const textIds = ['text1', 'text2', 'text3', 'text4', 'text5'];

const myHeaders = new Headers();
myHeaders.append("Authorization", authHeader);
myHeaders.append("HTTP_ACCEPT", "application/json");
myHeaders.append("Accept", "api/v1");
myHeaders.append("Debug-user-agent", "Paradigma/DBG");

const requestOptions = {
  method: 'GET',   
  headers: myHeaders,
  redirect: 'follow'
};

let lastSeen = "";

function fetchData() {
  fetch("https://api.paradigma.remoteportal.de/controllers", requestOptions)
    .then(response => response.json())
    .then(result => {
      const controller_id = result[0]["controller_id"];
      fetch(`https://api.paradigma.remoteportal.de/controllers/${controller_id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            
          // Zugriff auf last_seen
          lastSeen = new Date(result.last_seen);
          lastSeen.setHours(lastSeen.getHours() + 2);
          document.getElementById("text5").value = lastSeen.toLocaleString();

          // Zugriff auf die Sensordaten
          const sensorData = result.sensor;
          for (let i = 0; i < sensorData.length; i++) {
            const sensorType = sensorData[i].type;
            let sensorValue = sensorData[i].value;
            let unit = '';

            if (sensorType === 'day_solarearnings') {
              sensorValue = sensorValue.toFixed(1);
              unit = ' kWh';
              document.getElementById(textIds[2]).value = `${sensorValue}${unit}`;
            } else if (sensorType === 'solar_power') {
              sensorValue = sensorValue.toFixed(1);
              unit = ' kW';
              document.getElementById(textIds[1]).value = `${sensorValue}${unit}`;
            } else if (sensorType === 'temp_collectormax') {
              sensorValue = sensorValue.toFixed(1);
              unit = ' C°';
              document.getElementById(textIds[0]).value = `${sensorValue}${unit}`;
            } else if (sensorType === 'total_solarearnings') {
              sensorValue = sensorValue.toFixed(1);
              unit = ' kWh';
              document.getElementById(textIds[3]).value = `${sensorValue}${unit}`;
            }
          }
        })
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log('error', error));
}

// fetchData einmal ausführen, um die Seite zu laden
fetchData();

// fetchData alle 1 Minute aufrufen
setInterval(fetchData, 1 * 60 * 1000);
