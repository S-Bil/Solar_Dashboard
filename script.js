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
        fetch("https://api.paradigma.remoteportal.de/controllers/"+controller_id, requestOptions)
          .then(response => response.json())
          .then(data => {
            const daySolarEarnings = data.configuration.sensor.find(sensor => sensor.type === 'day_solarearnings');
            document.getElementById('result').innerHTML = daySolarEarnings.value;
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
