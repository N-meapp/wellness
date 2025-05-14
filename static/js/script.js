

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





  // questions
let quizAnswers = {};
let userSelections = {};
let currentQuestion = 1;

document.getElementById("startQuizBtn").addEventListener("click", function () {
    document.getElementById("quizContainer").classList.remove("hidden");
    showQuestion(1);
});

document.getElementById("closeModal").onclick = function () {
    document.getElementById("questionModal").style.display = "none";
};

function nextQuestion(event) {
    event.preventDefault();

    const input = document.querySelector("#modalBody input, #modalBody select");

    if (input) {
        const id = input.id || input.name;
        if (input.type === "radio" || input.type === "checkbox") {
            if (input.type === "radio") {
                quizAnswers[`q${currentQuestion}`] = document.querySelector(`input[name='${input.name}']:checked`).value;
                userSelections[input.name] = quizAnswers[`q${currentQuestion}`];
            } else {
                quizAnswers[`q${currentQuestion}`] = Array.from(document.querySelectorAll(`input[name='${input.name}']:checked`)).map(i => i.value);
                userSelections[input.name] = quizAnswers[`q${currentQuestion}`];
            }
        } else {
            quizAnswers[`q${currentQuestion}`] = input.value;
            userSelections[id] = input.value;
        }
    }

    if (currentQuestion < 9) {
        showQuestion(currentQuestion + 1);
    } else {
        alert("You have completed the quiz!");
        document.getElementById("questionModal").style.display = "none";
        console.log("Quiz Answers:", quizAnswers);
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        showQuestion(currentQuestion - 1);
    }
}

function showQuestion(questionNumber) {
    let questionHTML = '';
    let backArrowHTML = '';

    if (questionNumber > 1) {
        backArrowHTML = `
            <button type="button" id="backArrow" class="absolute top-4 left-4 text-2xl " onclick="previousQuestion()">
                &#8592;
            </button>
        `;
    }

    switch (questionNumber) {
        case 1:
            questionHTML = `<label>Name:</label>
                <input type="text" id="name" class="w-full p-2 mt-2 border rounded-md" value="${userSelections.name || ''}" required>`;
            break;
        case 2:
            questionHTML = `<label>Goal:</label>
                <div class="space-y-2 mt-2">
                    ${["Weight Gain", "Weight Loss", "Maintain Weight"].map(goal => `
                        <label class="block">
                            <input type="radio" name="goal" value="${goal}" ${userSelections.goal === goal ? "checked" : ""}> ${goal}
                        </label>`).join('')}
                </div>`;
            break;
        case 3:
            questionHTML = `<label>Reasons:</label>
                ${["Sports", "Underweight", "Health"].map(reason => `
                    <label class="block">
                        <input type="checkbox" name="reason" value="${reason}" ${userSelections.reason && userSelections.reason.includes(reason) ? "checked" : ""}> ${reason}
                    </label>`).join('')}`;
            break;
        case 4:
            questionHTML = `<label>Activity Level:</label>
                <select id="activity" class="w-full p-2 mt-2 border rounded-md">
                    ${["Active", "Less Active", "Sedentary"].map(opt => `
                        <option value="${opt}" ${userSelections.activity === opt ? "selected" : ""}>${opt}</option>`).join('')}
                </select>`;
            break;
        case 5:
            questionHTML = `<label>Gender:</label>
                <select id="gender" class="w-full p-2 mt-2 border rounded-md">
                    ${["Male", "Female", "Other"].map(g => `
                        <option value="${g}" ${userSelections.gender === g ? "selected" : ""}>${g}</option>`).join('')}
                </select>`;
            break;
        case 6:
            questionHTML = `<label>Date of Birth:</label>
                <input type="date" id="dob" class="w-full p-2 mt-2 border rounded-md" onchange="calculateAge()" value="${userSelections.dob || ''}">
                <label class="mt-4 block">Age:</label>
                <input type="number" id="age" class="w-full p-2 border rounded-md bg-gray-100" value="${userSelections.age || ''}" readonly>`;
            break;
        case 7:
            questionHTML = `<label>Height (cm):</label>
                <input type="number" id="height" class="w-full p-2 mt-2 border rounded-md" value="${userSelections.height || ''}" required>`;
            break;
        case 8:
            questionHTML = `<label>Current Weight (kg):</label>
                <input type="number" id="currentWeight" class="w-full p-2 mt-2 border rounded-md" value="${userSelections.currentWeight || ''}" required>`;
            break;
        case 9:
            questionHTML = `<label>Goal Weight (kg):</label>
                <input type="number" id="goalWeight" class="w-full p-2 mt-2 border rounded-md bg-gray-100" readonly value="${userSelections.goalWeight || ''}">
                <button type="button" class="mt-4 w-full bg-green-600 text-white py-2 rounded" onclick="calculateGoalWeight()">Calculate Goal Weight</button>
                <button type="button" class="mt-2 w-full bg-blue-600 text-white py-2 rounded" onclick="finishQuiz()">Complete Quiz</button>`;
            break;
    }

    if (questionNumber === 9) {
        document.querySelector("button[type='submit']").classList.add("hidden");
    }

    document.getElementById("modalBody").innerHTML = backArrowHTML + questionHTML;
    currentQuestion = questionNumber;
}

function calculateAge() {
    const dob = document.getElementById("dob").value;
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    document.getElementById("age").value = age;
    quizAnswers.q6 = dob;
    userSelections.dob = dob;
    userSelections.age = age;
}

function calculateGoalWeight() {
    const heightInput = document.getElementById("height");
    const height = heightInput ? parseFloat(heightInput.value) : parseFloat(userSelections.height);

    const dob = userSelections.dob;
    const goal = userSelections.goal || "Maintain Weight";

    if (isNaN(height) || height < 50 || height > 300) {
        alert("Enter valid height (50–300 cm)");
        return;
    }

    if (!dob) {
        alert("Date of birth missing.");
        return;
    }

    userSelections.height = height;

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    if (age < 5 || age > 120) {
        alert("Enter valid age (5–120 years)");
        return;
    }

    let goalWeight = height - 100;
    if (goal === "Weight Gain") goalWeight *= 1.10;
    else if (goal === "Weight Loss") goalWeight *= 0.90;

    goalWeight = Math.round(goalWeight);
    document.getElementById("goalWeight").value = goalWeight;
    userSelections.goalWeight = goalWeight;
    quizAnswers.goalWeight = goalWeight;
}

function finishQuiz() {
    const currentWeight = parseFloat(userSelections.currentWeight);
    const goalWeight = parseFloat(userSelections.goalWeight);
    const ratePerDay = parseFloat(userSelections.rate); // This value must be assigned before calling finishQuiz()

    const weightDiff = Math.abs(goalWeight - currentWeight);
    const daysToGoal = Math.ceil(weightDiff / ratePerDay);
    const today = new Date();
    const goalDate = new Date(today.getTime() + (daysToGoal * 24 * 60 * 60 * 1000));

    const formattedDate = goalDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const calorieGoal = 2330; // Placeholder
    let action = goalWeight > currentWeight ? "Gain" : "Lose";

    document.getElementById("questionModal").style.display = "none";

    // Display the Create Account modal
    document.getElementById("createAccountModal").classList.remove("hidden");

    // Store result data temporarily
    const resultData = {
        calorieGoal: calorieGoal,
        action: action,
        weightDiff: weightDiff,
        formattedDate: formattedDate
    };

    // Once the account is created, show the result modal
    window.resultData = resultData;
}

function createAccount(event) {
    event.preventDefault();
    
    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // You can send the data to the server here (for example, save it in the database)

        // Close the Create Account modal
        document.getElementById("createAccountModal").classList.add("hidden");

        // Show the Result Modal
        showResult();
    }
}

function showResult() {
    const resultData = window.resultData; // Get stored result data

    const resultHTML = `
        <div class="text-center mt-6 p-6 border rounded-lg shadow">
            <h2 class="text-2xl font-bold text-[#18b955]">Congratulations!</h2>
            <p class="mt-2">Your daily net calorie goal is:</p>
            <h1 class="text-4xl font-bold mt-2">${resultData.calorieGoal}</h1>
            <div class="mt-1">calories</div>
            <p class="mt-4 font-semibold">With this plan, you should:</p>
            <p class="text-lg font-bold">${resultData.action} ${resultData.weightDiff} kg by ${resultData.formattedDate}</p>
          <button class="mt-6 bg-[#18b955] text-white px-4 py-2 rounded" onclick="goToServices()">
            Explore MyFitnessPlan
          </button>
        </div>
    `;

    document.getElementById("resultContent").innerHTML = resultHTML;
    document.getElementById("resultModal").classList.remove("hidden");

    console.log("Final Answers:", quizAnswers);
}



function goToServices() {
    document.getElementById("resultModal").classList.add("hidden");
    setTimeout(() => {
        window.location.href = 'index.html#services';
    }, 300); // Wait a bit so modal closes smoothly
}



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
  // Hide all sections
  document.querySelectorAll('.category-content').forEach(section => section.classList.add('hidden'));

  // Remove active background from all tabs
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('bg-[#18b955]', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-800');
  });

  // Show selected section
  document.querySelector(`.${category}`).classList.remove('hidden');

  // Highlight active tab
  document.getElementById(`tab-${category}`).classList.add('bg-[#18b955]', 'text-white');
  document.getElementById(`tab-${category}`).classList.remove('bg-gray-200', 'text-gray-800');
}

// Show default tab (Weight Gain)
document.addEventListener("DOMContentLoaded", () => {
  showCategory('weightGain');
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

  const outputDiv = document.getElementById("outputDiet");
  const outputList = document.getElementById("dietResults");
  outputList.innerHTML = "";

  const weightDiff = Math.abs(goalWeight - weight);
  const weightDirection = goalWeight > weight ? "gain" : "lose";

  const meals = {
    Vegetarian: ["Oats with banana & nuts", "Paneer salad wrap", "Dal + brown rice + veggies", "Fruit bowl or sprouts"],
    "Non-Vegetarian": ["Egg white omelette + toast", "Grilled chicken wrap", "Chicken curry + rice + salad", "Boiled eggs or yogurt"],
    Vegan: ["Smoothie with almond milk", "Tofu wrap", "Lentils + quinoa + greens", "Dry fruits or hummus with carrots"]
  };

  const suggestions = {
    "Weight Loss": [
      "Avoid sugary drinks and snacks",
      "Stay hydrated",
      "Eat small, frequent meals with vegetables and fiber",
      "Track calories and portion sizes"
    ],
    "Weight Gain": [
      "Add calorie-dense snacks like nuts and dried fruits",
      "Include healthy fats like peanut butter, avocado, olive oil",
      "Eat protein-rich foods like eggs, paneer, or tofu"
    ],
    "Muscle Gain": [
      "Consume protein post workout (e.g., eggs, whey, tofu)",
      "Eat every 3 hours including high-carb and high-protein meals",
      "Strength training is essential with adequate sleep"
    ]
  };

  if (medical.includes("diabetes")) {
    suggestions["Special"] = [
      "Avoid high sugar foods and refined carbs",
      "Include fiber-rich veggies and whole grains",
      "Choose low glycemic index foods like oats, quinoa, and barley"
    ];
  }

  // Show Meals
  const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  meals[dietType].forEach((meal, i) => {
    outputList.innerHTML += `<li><strong>${mealTimes[i]}:</strong> ${meal}</li>`;
  });

  // Show custom tips based on goal
  suggestions[goal].forEach(tip => {
    outputList.innerHTML += `<li><strong>Tip:</strong> ${tip}</li>`;
  });

  // Add goal weight info
  if (weight !== goalWeight) {
    outputList.innerHTML += `<li><strong>Goal:</strong> You want to ${weightDirection} ${weightDiff} kg to reach ${goalWeight} kg.</li>`;
  } else {
    outputList.innerHTML += `<li><strong>Goal:</strong> You're already at your goal weight!</li>`;
  }

// Special conditions
if (suggestions["Special"]) {
  suggestions["Special"].forEach(tip => {
    outputList.innerHTML += `<li><strong>Health Tip:</strong> ${tip}</li>`;
  });
}

outputDiv.classList.remove("hidden");

// ✅ SHOW DOWNLOAD BUTTON
document.getElementById("downloadBtnContainer").classList.remove("hidden");

}
function downloadPDF() {
  const element = document.getElementById("outputDiet");
  const opt = {
    margin:       0.5,
    filename:     'Diet_Plan.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}







// routine


    function generateRoutine() {
        // Form Inputs
        const goal = document.getElementById('goal').value;
        const workStart = document.getElementById('work_start').value;
        const workEnd = document.getElementById('work_end').value;
        const duration = document.getElementById('duration').value;

        // Generate Routine Based on Goal
        let routine = [];
        if (goal === "weight_gain") {
            routine = [
                { activity: "Breakfast", time: "7:00 AM" },
                { activity: "Workout", time: "9:00 AM" },
                { activity: "Lunch", time: "12:00 PM" },
                { activity: "Snack", time: "3:00 PM" },
                { activity: "Dinner", time: "7:00 PM" },
                { activity: "Sleep", time: "10:00 PM" }
            ];
        } else if (goal === "weight_loss") {
            routine = [
                { activity: "Breakfast", time: "7:00 AM" },
                { activity: "Morning Walk", time: "8:00 AM" },
                { activity: "Lunch", time: "12:00 PM" },
                { activity: "Workout", time: "4:00 PM" },
                { activity: "Dinner", time: "7:00 PM" },
                { activity: "Sleep", time: "10:00 PM" }
            ];
        } else {
            routine = [
                { activity: "Breakfast", time: "7:00 AM" },
                { activity: "Work", time: "9:00 AM" },
                { activity: "Lunch", time: "12:00 PM" },
                { activity: "Work", time: "1:00 PM" },
                { activity: "Dinner", time: "6:00 PM" },
                { activity: "Relax", time: "8:00 PM" },
                { activity: "Sleep", time: "10:00 PM" }
            ];
        }

        // Display Routine Preview
        const previewContent = document.getElementById('routinePreviewContent');
        previewContent.innerHTML = `
            <div class="routine-card mb-4 p-6 bg-green-50 border-l-4 border-green-600  rounded-lg">
                <h3 class="text-xl font-bold text-green-600">Goal: ${goal.replace('_', ' ').toUpperCase()}</h3>
                <p class="text-lg text-gray-700 mt-2">Work Time: ${workStart} - ${workEnd}</p>
                <p class="text-lg text-gray-700 mt-2">Routine Duration: ${duration} Month(s)</p>
                <h4 class="mt-6 text-lg font-semibold text-green-700">Your Routine:</h4>
                <ul class="mt-4 space-y-3">
                    ${routine.map(item => `
                        <li class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover: hover:bg-green-100">
                            <span class="text-lg text-gray-800 font-semibold">${item.activity}</span> at <span class="text-green-600">${item.time}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // Generate Calendar Based on Routine Duration (1 or 2 months)
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        const daysInMonth = duration === '1' ? 30 : 60; // Rough approximation for simplicity

        let currentDate = 1;
        const daysInWeek = 7;

        for (let i = 0; i < Math.ceil(daysInMonth / daysInWeek); i++) {
            const weekDiv = document.createElement('div');
            weekDiv.classList.add('calendar-week', 'flex', 'gap-2', 'mb-2');

            for (let j = 0; j < daysInWeek; j++) {
                if (currentDate <= daysInMonth) {
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('calendar-day', 'border', 'rounded-lg', 'p-4', 'flex', 'justify-center', 'items-center', 'bg-white', 'cursor-pointer', 'transition-all', 'duration-200');
                    dayDiv.innerHTML = `${currentDate}`;
                    currentDate++;

                    // Add Event Listener for marking as completed
                    dayDiv.addEventListener('click', () => {
                        dayDiv.classList.toggle('completed');
                    });

                    weekDiv.appendChild(dayDiv);
                }
            }

            calendar.appendChild(weekDiv);
        }
    }


    // profile 

    function logout() {
            alert("You have been logged out.");
            window.location.href = "login.html"; // Redirect to the login page (replace with actual URL)
        }