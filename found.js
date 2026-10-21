import {
    db,
    collection,
    addDoc
} from "firebase.js";

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

        const item = {
            itemName: formData.get("item_name")?.trim() || "",
            category: formData.get("category") || "",
            foundDate: formData.get("found_date") || "",
            foundLocation: formData.get("found_location")?.trim() || "",
            description: formData.get("description")?.trim() || "",
            finderName: formData.get("finder_name")?.trim() || "",
            phone: formData.get("phone")?.trim() || "",
            status: "found",
            createdAt: new Date().toISOString()
        };

        if (
            !item.itemName ||
            !item.category ||
            !item.foundDate ||
            !item.foundLocation ||
            !item.finderName ||
            !item.phone
        ) {
            alert("Please fill in all required information");

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Report";
            }

            return;
        }

        try {
            await addDoc(collection(db, "items"), item);

            alert("Found Item Report Successfully submitted!");
            form.reset();

        } catch (error) {
            console.error("Firebase error:", error);

            alert(
                "Report Not submitted Firebase Security Rules and Website Hosting check"
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Report";
            }
        }
    });
}