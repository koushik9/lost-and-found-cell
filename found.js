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

        formData.append(
            "_subject",
            "New Found Item Report - Morigaon College"
        );

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                alert("✅ Found Item Report Submitted Successfully!");
                form.reset();
            } else {
                alert("❌ Report not submitted. Try again");
            }
        } catch (error) {
            console.error("Formspree error:", error);
            alert("Check Internet connection and try again.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Report";
            }
        }
    });
                      }
