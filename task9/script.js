$(document).ready(function () {

    let formStructure = {
        fields: [
            { type: "text", label: "Full Name", id: "name" },
            { type: "email", label: "Email", id: "email" },
            { type: "password", label: "Password", id: "password" },
            { type: "password", label: "Confirm Password", id: "confirmPassword" },
            { type: "date", label: "Date of Birth", id: "dob" },
            { type: "text", label: "Phone Number", id: "phone" },
            { type: "select", label: "Country", id: "country", options: ["USA", "India", "Other"] },
            { type: "select", label: "User Type", id: "userType", options: ["Student", "Working Professional"] }
        ]
    };

    let form = $("#dynamicForm");

    formStructure.fields.forEach(field => {

        form.append(`<label>${field.label}</label>`);

        if (field.type === "select") {
            let select = $(`<select id="${field.id}"></select>`);
            select.append(`<option value="">Select</option>`);
            field.options.forEach(option => {
                select.append(`<option value="${option}">${option}</option>`);
            });
            form.append(select);
        } else {
            form.append(`<input type="${field.type}" id="${field.id}">`);
        }

        form.append(`<div class="error" id="${field.id}Error"></div>`);
    });

    form.append(`<div id="countryFields"></div>`);
    form.append(`<div id="userTypeFields"></div>`);
    form.append(`<button type="submit">Register</button>`);
    form.append(`<div id="successMessage"></div>`);

    $("#country").change(function () {

        let value = $(this).val();
        $("#countryFields").empty();

        if (value === "USA") {
            $("#countryFields").append(`
                <label>State</label>
                <select id="state">
                    <option value="">Select</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>New York</option>
                    <option>Florida</option>
                </select>
                <div class="error" id="stateError"></div>
            `);
        }

        else if (value === "India") {
            $("#countryFields").append(`
                <label>State</label>
                <select id="state">
                    <option value="">Select</option>
                    <option>Gujarat</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Telangana</option>
                    <option>Delhi</option>
                    <option>Tamil Nadu</option>
                    <option>Rajasthan</option>
                    <option>Uttar Pradesh</option>
                    <option>Madhya Pradesh</option>
                    <option>West Bengal</option>
                    <option>Punjab</option>
                    <option>Haryana</option>
                    <option>Bihar</option>
                    <option>Kerala</option>
                    <option>Andhra Pradesh</option>
                </select>
                <div class="error" id="stateError"></div>
            `);
        }

        else if (value === "Other") {
            $("#countryFields").append(`
                <label>City</label>
                <input type="text" id="city">
                <div class="error" id="cityError"></div>
            `);
        }
    });

    $("#userType").change(function () {

        let value = $(this).val();
        $("#userTypeFields").empty();

        if (value === "Student") {
            $("#userTypeFields").append(`
                <label>University</label>
                <input type="text" id="university">
                <div class="error" id="universityError"></div>
            `);
        }

        else if (value === "Working Professional") {
            $("#userTypeFields").append(`
                <label>Company</label>
                <input type="text" id="company">
                <div class="error" id="companyError"></div>
            `);
        }
    });

    form.submit(function (e) {

        e.preventDefault();
        $(".error").text("");
        $("#successMessage").text("");

        let valid = true;

        if ($("#name").val() === "") {
            $("#nameError").text("Name is required");
            valid = false;
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test($("#email").val())) {
            $("#emailError").text("Enter valid email");
            valid = false;
        }

        if ($("#password").val().length < 8) {
            $("#passwordError").text("Password must be at least 8 characters");
            valid = false;
        }

        if ($("#password").val() !== $("#confirmPassword").val()) {
            $("#confirmPasswordError").text("Passwords do not match");
            valid = false;
        }

        let phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test($("#phone").val())) {
            $("#phoneError").text("Enter valid 10-digit phone number");
            valid = false;
        }

        if ($("#country").val() === "") {
            $("#countryError").text("Select country");
            valid = false;
        }

        if ($("#userType").val() === "") {
            $("#userTypeError").text("Select user type");
            valid = false;
        }

        if ($("#state").length && $("#state").val() === "") {
            $("#stateError").text("Select state");
            valid = false;
        }

        if ($("#city").length && $("#city").val() === "") {
            $("#cityError").text("Enter city");
            valid = false;
        }

        if ($("#university").length && $("#university").val() === "") {
            $("#universityError").text("Enter university");
            valid = false;
        }

        if ($("#company").length && $("#company").val() === "") {
            $("#companyError").text("Enter company");
            valid = false;
        }

        if (valid) {

            $("#successMessage").html("<div class='success'>Form Submitted Successfully!</div>");

            $("#dynamicForm")[0].reset();
            $("#countryFields").empty();
            $("#userTypeFields").empty();

            setTimeout(function () {
                $("#successMessage").fadeOut(function () {
                    $(this).html("").show();
                });
            }, 3000);
        }
    });

});