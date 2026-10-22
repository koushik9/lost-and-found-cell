const form = document.getElementById("foundForm");

if (form) {
form.addEventListener("submit", async function (event) {
event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
    }

    const formData = new FormData(form);
    formData.set(
        "_subject",
        "New Found Item Report - Morigaon College"
    );

    try {
        const response = await fetch(
            "https://formspree.io/f/mljgqvdj",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const result = await response.json();

        if (response.ok && result.ok !== false) {
            alert("✅ Found Item Report Submitted Successfully!");
            form.reset();
        } else {
            console.error("Formspree response:", result);

            const details = result.errors
                ? result.errors.map(error => error.message).join("\n")
                : (result.error || "Unknown submission error");

            alert("❌ Report not submitted.\n" + details);
        }

    } catch (error) {
        console.error("Submission error:", error);
        alert("❌ Network error. Please check your internet and try again.");
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Report";
        }
    }
});

                }
