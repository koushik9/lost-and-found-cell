import {
db,
authReady,
collection,
addDoc
} from "firebase.js";

const form = document.getElementById("foundForm");

if (form) {
form.addEventListener("submit", async function (event) {
event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    try {
        if (button) {
            button.disabled = true;
            button.textContent = "Submitting...";
        }

        await authReady;

        const formData = new FormData(form);

        const item = {
            itemName: formData.get("item_name").trim(),
            status: "found",
            category: formData.get("category"),
            location: formData.get("found_location"),
            description: formData.get("description") || "",
            createdAt: new Date().toISOString()
        };

        await addDoc(collection(db, "items"), item);

        alert("✅ Found Item Submitted Successfully!");

        form.reset();

    } catch (error) {
        console.error("Firebase Error:", error);

        alert("❌ Submission Failed: " + error.message);

    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = "Submit Found Item →";
        }
    }
});

}
