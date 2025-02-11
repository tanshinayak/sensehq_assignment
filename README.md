# sensehq_assignment

## **🛠 Installation**  
1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/tanshinayak/sensehq_assignment.git
cd sensehq_assignment
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Start the Server**  
```sh
node server.js
```
or  
```sh
npm start
```

---

## **📩 API Usage**  
### **🔹 Generate CSV**  
- **URL**: `http://localhost:3000/generate-csv`  
- **Method**: `GET`  
- **Response**:  
  - `200 OK`: `{ "filePath": "/path/to/generated.csv" }`  
  - `500 Internal Server Error`: `{ "error": "Failed to generate CSV file" }`  

---

## **🛠 Testing the API**  
1️⃣ Open **Postman** or your browser.  
2️⃣ Send a `GET` request to:  
   ```
   http://localhost:3000/generate-csv
   ```
3️⃣ You will receive a JSON response with the CSV file path.

---





