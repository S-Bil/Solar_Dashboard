
    var textbox1 = document.getElementById("text1");
    var textbox2 = document.getElementById("text2");
    var textbox3 = document.getElementById("text3");
    var textbox4 = document.getElementById("text4");
    const values = [];

    document.getElementById('connect').onclick = function () {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic MkNCRTk3MDAzRUJCOnZacG14eHdVdw==");
      myHeaders.append("HTTP_ACCEPT", "application/json");
      myHeaders.append("Accept", "api/v1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.paradigma.remoteportal.de/controllers/49735/variable/589/value", requestOptions)
        .then(response => savethis = response.json())
        .then(result => {
          values.push(result);
          // textbox1.value = values[0].value * 0.1 + " °C";
          textbox1.value = result.value * 0.1 + " °C";
        })
        .catch(error => console.log('error', error));


      // 2nd. Call


      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic MkNCRTk3MDAzRUJCOnZacG14eHdVdw==");
      myHeaders.append("HTTP_ACCEPT", "application/json");
      myHeaders.append("Accept", "api/v1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.paradigma.remoteportal.de/controllers/49735/variable/568/value", requestOptions)
        .then(response => response.json())
        .then(result => {
          textbox2.value = result.value * 0.1 + " kW";
        })
        .catch(error => console.log('error', error));




      // 3rd. Call

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic MkNCRTk3MDAzRUJCOnZacG14eHdVdw==");
      myHeaders.append("HTTP_ACCEPT", "application/json");
      myHeaders.append("Accept", "api/v1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.paradigma.remoteportal.de/controllers/49735/variable/573/value", requestOptions)
        .then(response => response.json())
        .then(result => {
          textbox3.value = result.value * 0.1 + " kWh";
        })
        .catch(error => console.log('error', error));



      // 4th Call


      var myHeaders = new Headers();
      myHeaders.append("Authorization", "MkNCRTk3MDAzRUJCOnZacG14eHdVdw==");
      myHeaders.append("HTTP_ACCEPT", "application/json");
      myHeaders.append("Accept", "api/v1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.paradigma.remoteportal.de/controllers/49735/variable/574/value", requestOptions)
        .then(response => response.json())
        .then(result => {
          textbox4.value = Math.round(((result.value * 0.1)*10)/10) + " kWh";
        })
        .catch(error => console.log('error', error));


    }


    // document.getElementById("connect2").onclick = function () {

