const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

const app = express();
const PORT = process.env.PORT || 3000;

// Create a directory for storing CSV files if it doesn't exist
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// API URLs
const API_1 = "https://jsonplaceholder.typicode.com/users";
const API_2 = "https://jsonplaceholder.typicode.com/posts";
const API_3 = "https://jsonplaceholder.typicode.com/comments";

// Function to fetch data from all APIs
const fetchData = async () => {
    try {
        const API_1 = "https://jsonplaceholder.typicode.com/users";
        const API_2 = "https://jsonplaceholder.typicode.com/posts";
        const API_3 = "https://jsonplaceholder.typicode.com/comments";

        // Fetch data from all three APIs concurrently
        const [usersRes, postsRes, commentsRes] = await Promise.all([
            axios.get(API_1),
            axios.get(API_2),
            axios.get(API_3),
        ]);

        // Extract relevant fields
        const users = usersRes.data;
        const posts = postsRes.data;
        const comments = commentsRes.data;

        // Check if data is available
        if (!users.length || !posts.length || !comments.length) {
            throw new Error("One or more API responses are empty");
        }

        // Create a mapping by ID
        const dataMap = new Map();
        users.forEach(user => dataMap.set(user.id, { name: user.name }));

        posts.forEach(post => {
            if (dataMap.has(post.id)) {
                dataMap.get(post.id).title = post.title;
            }
        });

        comments.forEach(comment => {
            if (dataMap.has(comment.id)) {
                dataMap.get(comment.id).body = comment.body;
            }
        });
        // Convert Map to an array
        const finalData = Array.from(dataMap.values());

        console.log("Final Data Processed:", finalData.length, "records");

        return finalData;

    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw new Error("Failed to fetch data from APIs");
    }
};
// Route: GET /generate-csv
    app.get("/generate-csv", async (req, res) => {
        try {
            console.log("Received request to generate CSV...");
    
            // Call fetchData() to get the API data
            const data = await fetchData();
    
            // If no data, return an error
            if (!data.length) {
                console.error("Error: No data available for CSV");
                return res.status(500).json({ error: "No data available for CSV" });
            }
    
            // Convert data to CSV format
            const json2csvParser = new Parser({ fields: ["name", "title", "body"] });
            const csv = json2csvParser.parse(data);

    
            // Define file path
            const filePath = path.join(__dirname, "output.csv");
    
            // Write to file
            fs.writeFileSync(filePath, csv);
            console.log("CSV file generated at:", filePath);
    
            // Send response
            res.json({ filePath });
    
        } catch (error) {
            console.error("Error generating CSV:", error.message);
            res.status(500).json({ error: "Failed to generate CSV file" });
        }
    
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
