/* =====================================
   LOST AND FOUND CELL
   Morigaon College (Autonomous)
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Current year in footer
    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Search form
    const searchForm = document.getElementById("searchForm");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const itemName = document
                .getElementById("itemName")
                .value.trim();

            const category = document
                .getElementById("category")
                .value;

            const status = document
                .getElementById("status")
                .value;

            // Save search filters temporarily
            const searchData = {
                itemName: itemName,
                category: category,
                status: status
            };

            sessionStorage.setItem(
                "lostFoundSearch",
                JSON.stringify(searchData)
            );

            // Show a message
            const results = document.getElementById("results");

            if (results) {
                results.innerHTML = `
                    <div class="icon">🔎</div>
                    <h3>Search Filters Saved</h3>
                    <p>Item: ${escapeHTML(itemName || "All Items")}</p>
                    <p>Category: ${escapeHTML(category || "All Categories")}</p>
                    <p>Status: ${escapeHTML(status || "All Items")}</p>
                    <p>Firebase connection is the next step.</p>
                `;
            }
        });
    }

    // Form submission notice
    const lostForm = document.getElementById("lostForm");
    const foundForm = document.getElementById("foundForm");

    function prepareForm(form) {
        if (!form) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            alert(
                "The form is ready for Firebase integration. " +
                "Your information has not been uploaded yet."
            );
        });
    }

    prepareForm(lostForm);
    prepareForm(foundForm);

});

// Prevent user text from being interpreted as HTML
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}