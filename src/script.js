document.addEventListener("DOMContentLoaded", () => {
    const timerButtons = document.querySelectorAll('.timer__button');
    const customForm = document.querySelector('#custom');
    const timeLeftDisplay = document.querySelector('.display__time-left');
    const endTimeDisplay = document.querySelector('.display__end-time');
    const tickAudio = new Audio('tick.mp3');
    let countdown;
  
    function timer(seconds) {
      clearInterval(countdown);
  
      const now = Date.now();
      const then = now + seconds * 1000;
      displayTimeLeft(seconds);
      displayEndTime(then);
  
      countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
          clearInterval(countdown);
          return;
        }
        displayTimeLeft(secondsLeft);
      }, 1000);
  
      tickAudio.currentTime = 0; // Reset audio to start
      tickAudio.play();
    }
  
    function displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
      document.title = display;
      timeLeftDisplay.textContent = display;
    }
  
    function displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hours = end.getHours();
      const minutes = end.getMinutes();
      endTimeDisplay.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
  
    function startTimer() {
      const seconds = parseInt(this.dataset.time);
      timer(seconds);
    }
  
    timerButtons.forEach(button => button.addEventListener('click', startTimer));
    customForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const minutes = this.minutes.value;
      if (minutes) {
        timer(minutes * 60);
        this.reset();
      }
    });
  });
  
