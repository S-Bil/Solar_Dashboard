      const username = "2CBE97003EBB";
      const password = "vZpmxxwUw";
      const authString = `${username}:${password}`;
      const authHeader = "Basic " + btoa(authString);

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

      fetch("https://api.paradigma.remoteportal.de/controllers", requestOptions)
        .then(response => response.json())
        .then(result => {
          const controller_id = result[0]["controller_id"];
          fetch(`https://api.paradigma.remoteportal.de/controllers/${controller_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              // Zugriff auf last_seen
              const lastSeen = result.last_seen;
              document.getElementById("lastSeen").textContent = `Letzter Kontakt zur Anlage: ${lastSeen}`;

              // Zugriff auf die Sensordaten
              const sensorData = result.sensor;
              const sensorList = document.getElementById("sensorData");
              for (let i = 0; i < sensorData.length; i++) {
                const sensorType = sensorData[i].type;
                const sensorValue = sensorData[i].value;
                const listItem = document.createElement("li");
                listItem.textContent = `${sensorType} ${sensorValue}`;
                sensorList.appendChild(listItem);
              }
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
