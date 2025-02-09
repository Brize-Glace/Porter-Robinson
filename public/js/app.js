fetch('public/json/concerts.json')
  .then(response =>  {
    if (!response.ok) throw new Error("Erreur HTTP : " + response.status);
    return response.json();
  })
  .then(data => {
    let concerts = data.concerts.filter(concert => new Date(concert.date) > new Date());
    
    if (concerts.length === 0) {
      console.log("Aucun concert à venir");
      const option = document.createElement('option');
        option.value = "Aucun concert à venir";
        option.textContent = "Aucun concert à venir";
        document.querySelector('#citySelector').appendChild(option);
      return;
    }

    const select = document.querySelector('#citySelector');
    concerts.forEach(concert => {
      const option = document.createElement('option');
      option.value = concert.city;
      option.textContent = concert.city;
      select.appendChild(option);
    });

    select.value = concerts[0].city;
    const initCity = select.value;
    const chosenConcert = concerts.find(c => c.city === initCity);
    document.querySelector('.description').textContent = chosenConcert.location;

    updateCountdown(chosenConcert.date);

    
    if (chosenConcert.soldOut) {
      document.querySelector('.description').textContent += " Sold out!";
    }

    select.addEventListener('change', () => {
      const selectedCity = select.value;
      const chosenConcert = concerts.find(c => c.city === selectedCity);
      document.querySelector('.description').textContent = chosenConcert.location;

      if (chosenConcert.soldOut) {
        document.querySelector('.description').innerHTML += "<span>Sold out!</span>";
      }
      updateCountdown(chosenConcert.date);
    });
  })
  .catch(error => {
    console.error("Erreur :", error);
    document.querySelector('.heading').textContent = "Unable to load concerts";
    document.querySelector('.description').innerHTML = `Please try again later -  You can open an issue at <a href="https://github.com/Brize-Glace/Porter-Robinson/issues">here</a>`;
});

let countdownInterval;

function updateCountdown(date) {

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const concertDate = new Date(date);
        const now = new Date();
        const difference = concertDate - now;

        if (difference < 0) {
            clearInterval(countdownInterval);
            document.querySelector('#day').textContent = 0;
            document.querySelector('#hour').textContent = 0;
            document.querySelector('#min').textContent = 0;
            document.querySelector('#sec').textContent = 0;
            return;
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);
    
        document.querySelector('#day').textContent = days;
        document.querySelector('#hour').textContent = hoursLeft;
        document.querySelector('#min').textContent = minutesLeft;
        document.querySelector('#sec').textContent = secondsLeft;
    }, 100)
}
