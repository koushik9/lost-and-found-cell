const form = document.getElementById("lostForm");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.innerHTML
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        const formData = new FormData(form);

        formData.append(
            "_subject",
            "New Lost Item Report - Morigaon College"
        );

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            let result = {};

            try {
                result = await response.json();
            } catch (parseError) {
                console.error(
                    "Could not read server response:",
                    parseError
                );
            }

            if (response.ok) {
                alert(
                    "✅ Lost Item Report Submitted Successfully!"
                );

                form.reset();

            } else {
                console.error(
                    "Formspree response:",
                    response.status,
                    result
                );

                const message = result.errors
                    ? result.errors
                        .map(error => error.message)
                        .join("\n")
                    : "Please check your Formspree form settings.";

                alert(
                    "❌ Report not submitted.\n\n" + message
                );
            }

        } catch (error) {
            console.error("Submission error:", error);

            alert(
                "❌ Submission failed. Check your internet connection and try again."
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }
    });
                    }
