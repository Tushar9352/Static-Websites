class FitnessTracker {
    constructor() {
      this.workouts = JSON.parse(localStorage.getItem('workouts')) || [];
      this.form = document.getElementById('workout-form');
      this.workoutsList = document.getElementById('workouts');
      
      this.initializeEventListeners();
      this.updateUI();
    }
  
    initializeEventListeners() {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addWorkout();
      });
    }
  
    addWorkout() {
      const type = document.getElementById('workout-type').value;
      const duration = Number(document.getElementById('duration').value);
      const distance = Number(document.getElementById('distance').value);
  
      const workout = {
        id: Date.now(),
        type,
        duration,
        distance,
        date: new Date().toLocaleDateString()
      };
  
      this.workouts.unshift(workout);
      this.saveWorkouts();
      this.updateUI();
      this.form.reset();
    }
  
    saveWorkouts() {
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }
  
    calculateStats() {
      return {
        totalWorkouts: this.workouts.length,
        totalDistance: this.workouts.reduce((sum, workout) => sum + workout.distance, 0).toFixed(2),
        totalDuration: this.workouts.reduce((sum, workout) => sum + workout.duration, 0)
      };
    }
  
    updateUI() {
      this.updateStats();
      this.renderWorkouts();
    }
  
    updateStats() {
      const stats = this.calculateStats();
      document.getElementById('total-workouts').textContent = stats.totalWorkouts;
      document.getElementById('total-distance').textContent = `${stats.totalDistance} km`;
      document.getElementById('total-duration').textContent = `${stats.totalDuration} min`;
    }
  
    renderWorkouts() {
      this.workoutsList.innerHTML = this.workouts
        .map(workout => `
          <div class="workout-item">
            <span>${workout.date}</span>
            <span>${workout.type}</span>
            <span>${workout.distance} km</span>
            <span>${workout.duration} min</span>
          </div>
        `)
        .join('');
    }
  }
  
  // Initialize the app
  new FitnessTracker();
