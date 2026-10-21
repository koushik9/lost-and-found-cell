import {
    db,
    collection,
    getDocs
} from "firebase.js";

const searchForm = document.getElementById("searchForm");
const filterForm = document.getElementById("filterForm");
const results = document.getElementById("results");
const resultsCount = document.getElementById("resultsCount");

async function searchItems() {
    if (!results) return;

    results.innerHTML = `
        <div class="empty-icon">⏳</div>
        <h3>Searching Items...</h3>
        <p>Please wait</p>
    `;

    try {
        const snapshot = await getDocs(collection(db, "items"));

        const itemName =
            document.getElementById("itemName").value.trim().toLowerCase();

        const category =
            document.getElementById("category").value;

        const status =
            document.getElementById("status").value.toLowerCase();

        const items = [];

        snapshot.forEach((doc) => {
            const item = doc.data();

            const nameMatch = !itemName ||
                (item.itemName || "").toLowerCase().includes(itemName);

            const categoryMatch = !category ||
                item.category === category;

            const statusMatch = !status ||
                (item.status || "").toLowerCase() === status;

            if (nameMatch && categoryMatch && statusMatch) {
                items.push(item);
            }
        });

        if (resultsCount) {
            resultsCount.textContent = `${items.length} Items`;
        }

        if (items.length === 0) {
            results.innerHTML = `
                <div class="empty-icon">🔎</div>
                <h3>No Matching Items</h3>
                <p>No Item matching your Search was found yet</p>
            `;
            return;
        }

        results.innerHTML = items.map((item) => `
            <article class="item-card">
                <span class="status ${
                    item.status === "found" ? "status-found" : "status-lost"
                }">
                    ${item.status === "found" ? "FOUND ITEM" : "LOST ITEM"}
                </span>

                <h3>${escapeHTML(item.itemName || "Unnamed Item")}</h3>

                <p><strong>Category:</strong> ${escapeHTML(item.category || "Other")}</p>

                <p><strong>Location:</strong> ${
                    escapeHTML(item.lostLocation || item.foundLocation || "Not provided")
                }</p>

                <p><strong>Description:</strong> ${
                    escapeHTML(item.description || "No description")
                }</p>
            </article>
        `).join("");

    } catch (error) {
        console.error("Search error:", error);

        results.innerHTML = `
            <div class="empty-icon">⚠️</div>
            <h3>Unable to Load Items</h3>
            <p>Firebase connection or Database Rules need to be checked.</p>
        `;
    }
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        searchItems();
    });
}

if (filterForm) {
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        searchItems();
    });
}