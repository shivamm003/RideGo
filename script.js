
// =====================================
// RIDEGO - VEHICLE FILTER AND SEARCH
// =====================================

// 1. Select all vehicle cards and filter buttons
const vehicleCards = document.querySelectorAll(".vehicle-card");
const filterButtons = document.querySelectorAll(".filter");

// 2. Select the search form
const searchForm = document.querySelector(".search-box");

// 3. Select the booking vehicle dropdown
const bookingVehicle = document.querySelector(
    '#booking select[name="vehicle"], #booking select'
);

// Create a message to show search results
const resultMessage = document.createElement("p");
resultMessage.id = "search-result-message";

const filterRow = document.querySelector(".filter-row");

if (filterRow) {
    filterRow.insertAdjacentElement("afterend", resultMessage);
}


// =====================================
// FUNCTION 1: FILTER VEHICLES
// =====================================

function filterVehicles(category) {

    let visibleCount = 0;

    vehicleCards.forEach(function(card) {

        // Get vehicle category
        const vehicleCategory = card
            .querySelector(".category")
            .textContent
            .toLowerCase();

        // Check category
        if (
            category === "all" ||
            vehicleCategory.includes(category)
        ) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    return visibleCount;
}


// =====================================
// FUNCTION 2: FILTER BUTTONS
// =====================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        // Get button text
        const category = button.textContent.trim().toLowerCase();

        // Convert category into correct value
        let selectedCategory = "all";

        if (category.includes("car")) {
            selectedCategory = "car";
        } 
        else if (category.includes("bike")) {
            selectedCategory = "bike";
        } 
        else if (category.includes("scooter")) {
            selectedCategory = "scooter";
        }

        // Filter vehicles
        filterVehicles(selectedCategory);

        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

    });

});


// =====================================
// FUNCTION 3: SEARCH VEHICLES
// =====================================

if (searchForm) {

    searchForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get selected category
        const selectedCategory = searchForm
            .querySelector("select")
            .value
            .toLowerCase();

        // Get date inputs
        const dateInputs = searchForm.querySelectorAll('input[type="date"]');

        const pickupDate = dateInputs[0].value;
        const returnDate = dateInputs[1].value;

        // Check dates
        if ((pickupDate && !returnDate) || (!pickupDate && returnDate)) {
            alert("Please select both pickup and return dates.");
            return;
        }

        // Check return date
        if (pickupDate && returnDate && returnDate < pickupDate) {
            alert("Return date cannot be before pickup date.");
            return;
        }

        // Filter vehicles
        const count = filterVehicles(
            selectedCategory || "all"
        );

        // Show result
        resultMessage.textContent =
            count + " vehicle(s) found.";

        // Scroll to vehicles
        document.querySelector("#vehicles").scrollIntoView({
            behavior: "smooth"
        });

    });

}


// =====================================
// FUNCTION 4: RENT NOW BUTTON
// =====================================

vehicleCards.forEach(function(card) {

    const rentButton = card.querySelector(".btn");

    if (rentButton) {

        rentButton.addEventListener("click", function() {

            // Get vehicle name
            const vehicleName = card.querySelector("h3").textContent.trim();

            // Select vehicle in booking form
            if (bookingVehicle) {
                bookingVehicle.value = vehicleName;
            }

            // Scroll to booking form
            document.querySelector("#booking").scrollIntoView({
                behavior: "smooth"
            });

        });

    }

});


// =====================================
// INITIAL SETUP
// =====================================

// Show all vehicles when website loads
filterVehicles("all");

console.log("RideGo JavaScript loaded successfully!");
