

// welcome page








// toggle

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const closeButton = document.getElementById("close-menu");

  // Open menu
  menuButton.addEventListener("click", function () {
    menu.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden"; // Disable background scroll
  });

  // Close menu on close button
  closeButton.addEventListener("click", function () {
    menu.classList.add("translate-x-full");
    document.body.style.overflow = ""; // Enable scroll again
  });

  // Close menu when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      menu.classList.add("translate-x-full");
      document.body.style.overflow = "";
    }
  });
});





 

// faq

  function toggleFAQ(button) {
      const content = button.nextElementSibling;
      const icon = button.querySelector('svg');

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    }



// workouts

function showCategory(category) {
  // Hide all category content sections
  document.querySelectorAll('.category-content').forEach(section => {
    section.classList.add('hidden');
  });

  // Explicitly hide yourWorkoutPlan
  const planSection = document.getElementById('yourWorkoutPlan');
  if (planSection) {
    planSection.classList.add('hidden');
  }

  // Reset all tab button styles
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('bg-[#18b955]', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-800');
  });

  // Show selected category content only if NOT yourWorkoutPlan
  if (category !== 'yourWorkoutPlan') {
    const content = document.querySelector(`.${category}`);
    if (content) content.classList.remove('hidden');
  }

  // Highlight the active tab
  const activeTab = document.getElementById(`tab-${category}`);
  if (activeTab) {
    activeTab.classList.remove('bg-gray-200', 'text-gray-800');
    activeTab.classList.add('bg-[#18b955]', 'text-white');
  }
}

// On page load, default to warmUp
document.addEventListener("DOMContentLoaded", () => {
  showCategory('warmUp');
});



  let currentIndex = 0;
  const totalDays = 3;

  function scrollPlan(direction) {
    const container = document.getElementById("planScroll");
    if (direction === 'left' && currentIndex > 0) {
      currentIndex--;
    } else if (direction === 'right' && currentIndex < totalDays - 1) {
      currentIndex++;
    }
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

function showPlan() {
  // Hide all category sections
  document.querySelectorAll('.category-content').forEach(section => section.classList.add('hidden'));

  // Reset tab button styles
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('bg-[#18b955]', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-800');
  });

  // Show only the workout plan
  const planSection = document.getElementById('yourWorkoutPlan');
  if (planSection) {
    planSection.classList.remove('hidden');
  }

  // Highlight the workout plan tab
  const planTab = document.getElementById('tab-yourWorkoutPlan');
  if (planTab) {
    planTab.classList.remove('bg-gray-200', 'text-gray-800');
    planTab.classList.add('bg-[#18b955]', 'text-white');
  }
}


  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.complete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = "✓ Completed";
        btn.classList.remove('bg-green-500');
        btn.classList.add('bg-gray-400');
        btn.disabled = true;
      });
    });
  });







// diet


function generateDiet() {
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const dietType = document.getElementById("dietType").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const goalWeight = parseFloat(document.getElementById("goalWeight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = document.getElementById("activity").value;
  const goal = document.getElementById("goal").value;
  const medical = document.getElementById("medical").value.toLowerCase();
  const mealCount = parseInt(document.getElementById("mealCount").value);

  const scheduleList = document.getElementById("dietSchedule");
  const tipsList = document.getElementById("dietTips");
  const outputDiv = document.getElementById("outputDiet");

  scheduleList.innerHTML = "";
  tipsList.innerHTML = "";

  const calorieMap = {
    3: [500, 700, 500],     // Breakfast, Lunch, Dinner
    4: [400, 600, 400, 300],// + Snack
    5: [350, 550, 350, 200, 200] // + Snack 1, Snack 2
  };

  const meals = {
  "Weight Loss": {
    Vegetarian: [
      "Oats porridge with chia seeds",
      "Grilled veggie salad with lemon dressing",
      "Moong dal + stir-fried greens",
      "Cucumber sticks + hummus",
      "Fruit-infused water + nuts"
    ],
    "Non-Vegetarian": [
      "Boiled eggs + 1 slice whole grain toast",
      "Grilled chicken salad with olive oil",
      "Steamed fish + sautéed vegetables",
      "Boiled egg whites",
      "Greek yogurt (low fat)"
    ],
    Vegan: [
      "Green smoothie (spinach, almond milk, banana)",
      "Tofu salad with lemon vinaigrette",
      "Lentils + brown rice + veggies",
      "Mixed seeds + dates",
      "Coconut water + fruit"
    ]
  },
  "Weight Gain": {
    Vegetarian: [
      "Banana smoothie with peanut butter",
      "Paneer wrap with whole wheat",
      "Dal + ghee rice + veggies",
      "Boiled potato + nuts",
      "Milk with dry fruits"
    ],
    "Non-Vegetarian": [
      "Omelette + cheese sandwich",
      "Chicken curry + rice",
      "Egg bhurji + paratha",
      "Meat soup + toast",
      "Milkshake with dates"
    ],
    Vegan: [
      "Nut butter toast + banana",
      "Tofu stir-fry + quinoa",
      "Chickpea curry + rice",
      "Trail mix + banana",
      "Coconut milk smoothie"
    ]
  },
  "Muscle Gain": {
    Vegetarian: [
      "Oats + whey + fruits",
      "Soya chunks curry + chapati",
      "Paneer bhurji + rice",
      "Peanut butter + toast",
      "Protein bar / milk"
    ],
    "Non-Vegetarian": [
      "Eggs + toast + protein shake",
      "Grilled chicken + sweet potato",
      "Beef steak + salad",
      "Boiled egg + banana",
      "Protein shake"
    ],
    Vegan: [
      "Oats + almond milk + flaxseeds",
      "Lentil soup + quinoa",
      "Tofu tikka + rice",
      "Nuts + banana",
      "Soy milk smoothie"
    ]
  }
};


  const mealLabels = ["Breakfast", "Lunch", "Dinner", "Snack 1", "Snack 2"];
  const selectedMeals = meals[goal][dietType].slice(0, mealCount);
  const selectedCalories = calorieMap[mealCount];

  for (let i = 0; i < mealCount; i++) {
scheduleList.innerHTML += `<li><strong>${mealLabels[i]}:</strong> ${selectedMeals[i]} <span class="text-sm text-gray-500">(${selectedCalories[i]} kcal)</span></li>`;
  }

  const suggestions = {
    "Weight Loss": [
      "Avoid sugary snacks and drinks",
      "Stay hydrated with 2–3 liters of water",
      "Eat fiber-rich veggies",
      "Use smaller plates to manage portion sizes"
    ],
    "Weight Gain": [
      "Eat more calorie-dense snacks like nuts",
      "Add healthy fats (avocado, olive oil)",
      "Include protein-rich food (eggs, paneer, tofu)"
    ],
    "Muscle Gain": [
      "Have protein post workout (eggs, whey, tofu)",
      "Eat every 3 hours",
      "Strength training is essential"
    ]
  };

  // Add tips based on goal
  suggestions[goal].forEach(tip => {
    tipsList.innerHTML += `<li>${tip}</li>`;
  });

  // Medical tips
  if (medical.includes("diabetes")) {
    tipsList.innerHTML += `<li class="font-semibold mt-2">Special Tips for Diabetes:</li>`;
    [
      "Avoid refined carbs and sugary foods",
      "Eat low GI foods (oats, barley, quinoa)",
      "Add fiber-rich vegetables"
    ].forEach(tip => {
      tipsList.innerHTML += `<li>${tip}</li>`;
    });
  }

  // Add goal summary
  const diff = Math.abs(goalWeight - weight);
  const dir = goalWeight > weight ? "gain" : "lose";
  tipsList.innerHTML += `<li class="mt-2"><p>Goal:</p> You aim to ${dir} ${diff} kg to reach ${goalWeight} kg.</li>`;

  outputDiv.classList.remove("hidden");
  document.getElementById("downloadBtnContainer").classList.remove("hidden");
}






// routine





let currentRoutine = [];

function generateRoutine() {
    const goal = document.getElementById('goal').value;
    const profession = document.getElementById('profession').value;
    const learnStart = document.getElementById('learn_start').value;
    const learnEnd = document.getElementById('learn_end').value;
    const startDate = new Date(document.getElementById('start_date').value);
    const endDate = new Date(document.getElementById('end_date').value);

    if (startDate > endDate) {
        alert("Start date cannot be after end date.");
        return;
    }

    let routine = [];
    if (goal === "weight_gain") {
        routine = [
            { activity: "Breakfast", time: "7:00 AM" },
            { activity: "Workout", time: "9:00 AM" },
            { activity: "Lunch", time: "12:00 PM" },
            { activity: profession === "student" ? "Study" : "Work", time: learnStart + " - " + learnEnd },
            { activity: "Snack", time: "3:00 PM" },
            { activity: "Dinner", time: "7:00 PM" },
            { activity: "Sleep", time: "10:00 PM" }
        ];
    } else if (goal === "weight_loss") {
        routine = [
            { activity: "Morning Walk", time: "6:30 AM" },
            { activity: "Breakfast", time: "7:30 AM" },
            { activity: "Lunch", time: "12:30 PM" },
            { activity: profession === "student" ? "Study" : "Work", time: learnStart + " - " + learnEnd },
            { activity: "Workout", time: "5:30 PM" },
            { activity: "Dinner", time: "7:00 PM" },
            { activity: "Sleep", time: "10:00 PM" }
        ];
    } else {
        routine = [
            { activity: "Breakfast", time: "8:00 AM" },
            { activity: profession === "student" ? "Study" : "Work", time: learnStart + " - " + learnEnd },
            { activity: "Lunch", time: "1:00 PM" },
            { activity: "Relax", time: "6:00 PM" },
            { activity: "Dinner", time: "8:00 PM" },
            { activity: "Sleep", time: "10:00 PM" }
        ];
    }

    currentRoutine = routine.map(item => ({ ...item }));
    displayEditableRoutine(currentRoutine);
    generateCalendar(startDate, endDate);
}

function generateCalendar(startDate, endDate) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    let current = new Date(startDate);

    while (current <= endDate) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day', 'border', 'rounded-lg', 'p-4', 'w-16', 'text-sm', 'bg-white', 'cursor-pointer', 'transition-all', 'duration-200');
        dayDiv.innerText = `${current.getDate()}/${current.getMonth() + 1}`;
        dayDiv.title = current.toDateString();

        dayDiv.addEventListener('click', () => {
            dayDiv.classList.toggle('bg-green-200');
            dayDiv.classList.toggle('line-through');
        });

        calendar.appendChild(dayDiv);
        current.setDate(current.getDate() + 1);
    }
}

function displayEditableRoutine(routine) {
    const previewContent = document.getElementById('routinePreviewContent');

    previewContent.innerHTML = `
        <form id="editRoutineForm" class="routine-card mb-4 p-6 bg-green-50 border-l-4 border-green-600 rounded-lg">
            <h3 class="text-xl font-bold text-green-600 mb-4">Edit Your Routine</h3>
            <div id="routineItems" class="space-y-4 mb-4">
                ${routine.map((item, idx) => `
                    <div class="flex items-center gap-4">
                        <input
                            type="text"
                            name="activity"
                            value="${item.activity}"
                            data-index="${idx}"
                            placeholder="Activity"
                            class="flex-1 p-2 border border-gray-300 rounded-md text-lg"
                            required
                        />
                        <input
                            type="text"
                            name="time"
                            value="${item.time}"
                            data-index="${idx}"
                            placeholder="Time (e.g. 7:00 AM or 9:00 AM - 5:00 PM)"
                            class="w-48 p-2 border border-gray-300 rounded-md text-lg text-center"
                            required
                        />
                        <button type="button" class="remove-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-index="${idx}" title="Remove Activity">×</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" id="addActivityBtn" class="mb-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">+ Add New Activity</button>
            <button type="submit" class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Save Routine</button>
        </form>
    `;

    // Remove activity event
    const removeButtons = previewContent.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index, 10);
            currentRoutine.splice(idx, 1);
            displayEditableRoutine(currentRoutine);  // re-render form
        });
    });

    // Add new activity event
    document.getElementById('addActivityBtn').onclick = () => {
        currentRoutine.push({ activity: "", time: "" });
        displayEditableRoutine(currentRoutine);
    };

    // Form submit event
    document.getElementById('editRoutineForm').onsubmit = function(e) {
        e.preventDefault();

        const activities = this.querySelectorAll('input[name="activity"]');
        const times = this.querySelectorAll('input[name="time"]');

        currentRoutine = [];
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i].value.trim();
            const time = times[i].value.trim();
            if (act && time) {
                currentRoutine.push({ activity: act, time: time });
            }
        }

        displayRoutineSummary(currentRoutine);
    }
}


function displayRoutineSummary(routine) {
    const previewContent = document.getElementById('routinePreviewContent');
    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

    // Find current activity index
    let currentIndex = routine.findIndex((item, i) => {
        const current = getTimeInMinutes(item.time);
        const prev = i > 0 ? getTimeInMinutes(routine[i - 1].time) : 0;
        return currentTimeMinutes >= prev && currentTimeMinutes < current;
    });

    if (currentIndex === -1 && routine.length > 0 && currentTimeMinutes >= getTimeInMinutes(routine[routine.length - 1].time)) {
        currentIndex = routine.length - 1; // last one
    }

    previewContent.innerHTML = `
        <div class="routine-card mb-4 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="text-xl font-bold text-green-600 mb-4">Your Updated Routine</h3>
            <div class="relative ml-6">
                <div class="absolute left-3 top-0 bottom-0 w-1 bg-green-300 rounded-full z-0"></div>
                ${routine.map((item, index) => {
                    const time = item.time;
                    const isCurrent = index === currentIndex;
                    const isPast = index < currentIndex;

                    return `
                        <div class="relative pl-10 mb-8">
                            <!-- Dot -->
                            <div class="absolute left-[6px] top-1 w-4 h-4 rounded-full z-10
                                ${isCurrent ? 'bg-red-600' : isPast ? 'bg-green-600' : 'bg-green-300'}">
                            </div>

                            <!-- Line above the dot if it's filled -->
                            ${isPast ? `<div class="absolute left-3 top-0 h-4 w-1 bg-green-600 z-0"></div>` : ''}

                            <!-- Content -->
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-semibold text-gray-800">${item.activity}</span>
                                <span class="text-sm text-green-700 font-mono">${time}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button onclick="displayEditableRoutine(currentRoutine)" class="mt-6 w-full bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500">Edit Routine Again</button>
        </div>
    `;
}


function saveRoutine() {
    const activityInputs = document.querySelectorAll('.activityInput');
    const timeInputs = document.querySelectorAll('.timeInput');
    const routine = [];

    for (let i = 0; i < activityInputs.length; i++) {
        const activity = activityInputs[i].value.trim();
        const time = timeInputs[i].value.trim();
        if (activity && time) {
            routine.push({ activity, time });
        }
    }

    // Save and display
    currentRoutine = routine;
    displayRoutineSummary(routine);
}

function getTimeInMinutes(timeString) {
    const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (!match) return 0;

    let [_, hour, minute, period] = match;
    hour = parseInt(hour);
    minute = parseInt(minute);
    if (period && period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period && period.toUpperCase() === "AM" && hour === 12) hour = 0;

    return hour * 60 + parseInt(minute);
}














    // profile 

    function logout() {
            alert("You have been logged out.");
            window.location.href = "login.html"; // Redirect to the login page (replace with actual URL)
        }






        // progress

        document.querySelectorAll('.progress-summary').forEach(section => {
  const startingWeight = parseFloat(section.dataset.startingWeight);
  const goalWeight = parseFloat(section.dataset.goalWeight);

  // Update the starting and goal weights text from data attributes (in case they differ)
  section.querySelector('.starting-weight').textContent = startingWeight.toFixed(1);
  section.querySelector('.goal-weight').textContent = goalWeight.toFixed(1);

  const currentWeightInput = section.querySelector('.current-weight-input');
  const totalchangeElem = section.querySelector('.total-change');

  function updateTotalchange() {
    let currentWeight = parseFloat(currentWeightInput.value);
    if (isNaN(currentWeight) || currentWeight < 0) {
      currentWeight = startingWeight;
    }
    let change = startingWeight - currentWeight;
    if (change < 0) change = 0;

    totalchangeElem.textContent = change.toFixed(1);
  }

  // Initial update
  updateTotalchange();

  // Update on input change
  currentWeightInput.addEventListener('input', updateTotalchange);
});
