
// ==========================================
// RIDEGO - JAVASCRIPT FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. SELECT IMPORTANT HTML ELEMENTS
    // ======================================

    const vehicleCards = document.querySelectorAll(".vehicle-card");
    const filterButtons = document.querySelectorAll(".filter");

    const bookingForm = document.querySelector(".form-card");
    const searchForm = document.querySelector(".search-box");

    // ======================================
    // 2. VEHICLE CATEGORY FILTER
    // ======================================

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const category = button.textContent.trim().toLowerCase();

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            vehicleCards.forEach(function (card) {

                const vehicleCategory = card
                    .querySelector(".category")
                    .textContent.toLowerCase();

                if (
                    category === "all vehicles" ||
                    vehicleCategory.includes(category.slice(0, -1))
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    // ======================================
    // 3. VEHICLE SEARCH FUNCTIONALITY
    // ======================================

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const vehicleType = searchForm.querySelector("select").value;

        const inputs = searchForm.querySelectorAll("input");

        const location = inputs[0].value.trim();
        const pickupDate = inputs[1].value;
        const returnDate = inputs[2].value;

        if (!location) {
            alert("Please enter your pickup location.");
            return;
        }

        if (!pickupDate || !returnDate) {
            alert("Please select pickup and return dates.");
            return;
        }

        const pickup = new Date(pickupDate + "T00:00:00");
        const returning = new Date(returnDate + "T00:00:00");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pickup < today) {
            alert("Pickup date cannot be in the past.");
            return;
        }

        if (returning <= pickup) {
            alert("Return date must be after pickup date.");
            return;
        }

        let count = 0;

        vehicleCards.forEach(function (card) {

            const category = card
                .querySelector(".category")
                .textContent.toLowerCase();

            const selectedType = vehicleType.toLowerCase();

            const matches =
                selectedType === "all vehicles" ||
                category.includes(selectedType.slice(0, -1));

            if (matches) {
                card.style.display = "";
                count++;
            } else {
                card.style.display = "none";
            }

        });

        document.querySelector("#vehicles").scrollIntoView({
            behavior: "smooth"
        });

        if (count === 0) {
            alert("No vehicles found.");
        } else {
            alert(count + " vehicles found for your selected category.");
        }

    });


    // ======================================
    // 4. RENT NOW BUTTON
    // ======================================

    document.querySelectorAll(".card-bottom .btn")
        .forEach(function (button) {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                const card = button.closest(".vehicle-card");

                const vehicleName = card.querySelector("h3").textContent;

                const vehicleSelect = bookingForm.querySelector("select");

                vehicleSelect.value = vehicleName;

                document.querySelector("#booking").scrollIntoView({
                    behavior: "smooth"
                });

            });

        });


    // ======================================
    // 5. BOOKING FORM
    // ======================================

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const inputs = bookingForm.querySelectorAll("input");
            const vehicleSelect = bookingForm.querySelector("select");

            const name = inputs[0].value.trim();
            const email = inputs[1].value.trim();
            const vehicle = vehicleSelect.value;
            const location = inputs[2].value.trim();

            const pickupDate = inputs[3].value;
            const returnDate = inputs[4].value;

            const terms = bookingForm.querySelector(
                'input[type="checkbox"]'
            );

            if (!vehicle) {
                alert("Please select a vehicle.");
                return;
            }

            if (new Date(returnDate) <= new Date(pickupDate)) {
                alert("Return date must be after pickup date.");
                return;
            }

            if (!terms.checked) {
                alert("Please accept the terms and conditions.");
                return;
            }

            const start = new Date(pickupDate + "T00:00:00");
            const end = new Date(returnDate + "T00:00:00");

            const days = Math.round(
                (end - start) / (1000 * 60 * 60 * 24)
            );

            const bookingID = "RG" + Date.now().toString().slice(-6);

            alert(
                "BOOKING SUCCESSFUL!\n\n" +
                "Booking ID: " + bookingID + "\n" +
                "Customer: " + name + "\n" +
                "Email: " + email + "\n" +
                "Vehicle: " + vehicle + "\n" +
                "Pickup Location: " + location + "\n" +
                "Rental Duration: " + days + " days\n\n" +
                "This is a demo booking. No actual reservation has been made."
            );

            // Update customer dashboard
            const dashboardStats = document.querySelectorAll(
                "#bookings .stat-card h3"
            );

            const total = dashboardStats[0];

            total.textContent =
                Number(total.textContent) + 1;

            // Add booking to booking history
            const tableBody = document.querySelector(
                "#bookings tbody"
            );

            const newRow = tableBody.insertRow();

            newRow.innerHTML = `
                <td>#${bookingID}</td>
                <td>${vehicle}</td>
                <td>${pickupDate} – ${returnDate}</td>
                <td>Calculated at pickup</td>
                <td>Pending</td>
                <td><span class="status yellow">Pending</span></td>
            `;

            bookingForm.reset();

        });

    }


    // ======================================
    // 6. LOGIN FORM
    // ======================================

    const loginForm = document.querySelector("#login form");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = loginForm.querySelector(
            'input[type="email"]'
        ).value;

        alert(
            "Login demo submitted!\n\n" +
            "Email: " + email +
            "\nAuthentication is not connected to a backend."
        );

        loginForm.reset();

    });


    // ======================================
    // 7. REGISTRATION FORM
    // ======================================

    const registerForm = document.querySelector("#register form");

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = registerForm.querySelector(
            'input[type="text"]'
        ).value;

        alert(
            "REGISTRATION SUCCESSFUL (DEMO)!\n\n" +
            "Welcome to RideGo, " + name + "!\n\n" +
            "No actual account has been created."
        );

        registerForm.reset();

    });


    // ======================================
    // 8. PROVIDER - ADD VEHICLE
    // ======================================

    const providerForms = document.querySelectorAll("#provider .panel form");

    const addVehicleForm = providerForms[0];

    addVehicleForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inputs = addVehicleForm.querySelectorAll("input");

        const selects = addVehicleForm.querySelectorAll("select");

        const vehicleName = inputs[0].value.trim();
        const category = selects[0].value;
        const price = inputs[1].value;
        const imageURL = inputs[2].value.trim();
        const availability = selects[1].value;

        if (!vehicleName || !price || Number(price) <= 0) {
            alert("Please enter valid vehicle details and price.");
            return;
        }

        // Add new vehicle card
        const grid = document.querySelector(".vehicle-grid");

        const newCard = document.createElement("article");

        newCard.className = "vehicle-card";

        const safeImageURL = /^https?:\/\//i.test(imageURL)
            ? imageURL
            : "";

        newCard.innerHTML = `
            <img src="${safeImageURL}"
                 alt="${category} available for rent">

            <div class="card-content">

                <span class="category">
                    ${category.toUpperCase()}
                </span>

                <h3></h3>

                <p class="muted">Provider listed vehicle</p>

                <div class="rating">New Listing</div>

                <div class="card-bottom">
                    <div>
                        <strong>₹${Number(price).toLocaleString("en-IN")}</strong>
                        <small>/ day</small>
                    </div>

                    <a href="#booking" class="btn">Rent Now</a>
                </div>

            </div>
        `;

        newCard.querySelector("h3").textContent = vehicleName;

        grid.appendChild(newCard);

        alert(
            "Vehicle added successfully!\n\n" +
            "Name: " + vehicleName +
            "\nCategory: " + category +
            "\nAvailability: " + availability
        );

        addVehicleForm.reset();

    });


    // ======================================
    // 9. PROVIDER - MAINTENANCE FORM
    // ======================================

    const maintenanceForm = providerForms[1];

    maintenanceForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Maintenance request submitted successfully!\n\n" +
            "This is a demonstration feature."
        );

        maintenanceForm.reset();

    });


    // ======================================
    // 10. CUSTOMER REVIEW FORM
    // ======================================

    const reviewForm = document.querySelector(".review-form form");

    reviewForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inputs = reviewForm.querySelectorAll("input");

        const selects = reviewForm.querySelectorAll("select");

        const textarea = reviewForm.querySelector("textarea");

        const name = inputs[0].value.trim();
        const rating = selects[1].value.split(" - ")[0];
        const review = textarea.value.trim();

        if (!review) {
            alert("Please write your review.");
            return;
        }

        const reviewGrid = document.querySelector(".review-grid");

        const newReview = document.createElement("article");

        newReview.className = "review-card";

        const ratingElement = document.createElement("div");
        ratingElement.className = "rating";
        ratingElement.textContent = rating;

        const reviewText = document.createElement("p");
        reviewText.textContent = review;

        const customerName = document.createElement("h4");
        customerName.textContent = name;

        const label = document.createElement("span");
        label.className = "muted";
        label.textContent = "Customer review";

        newReview.append(
            ratingElement,
            reviewText,
            customerName,
            label
        );

        reviewGrid.appendChild(newReview);

        alert("Thank you for sharing your review!");

        reviewForm.reset();

    });


    // ======================================
    // 11. PAYMENT BUTTON
    // ======================================

    const paymentButton = document.querySelector(
        "#payment button"
    );

    paymentButton.addEventListener("click", function () {

        alert(
            "Welcome to RideGo Checkout!\n\n" +
            "This is a payment demonstration.\n" +
            "No real payment will be processed."
        );

    });


    // ======================================
    // 12. SMOOTH NAVIGATION
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ======================================
    // 13. WELCOME MESSAGE
    // ======================================

    console.log("RideGo JavaScript Loaded Successfully!");

});
