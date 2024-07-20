Digital Coin Tracker
Welcome to the Digital Coin Tracker project! This application allows you to track real-time cryptocurrency prices, filter and paginate data, and manage fetching statuses. The frontend is built using Next.js and TypeScript with state management via Redux Toolkit. The backend is powered by Node.js, Express, MongoDB, and Socket.io for real-time updates. Let's get you started with installing and running the project!

Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14 or higher)
npm (v6 or higher)
MongoDB (You can use a local instance or a cloud-based service like MongoDB Atlas)
Installation
1. Clone the Repository
First, you'll need to clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/digital-coin-tracker.git
cd digital-coin-tracker
2. Install Dependencies
Navigate to the root directory of the project and install the necessary dependencies for both the frontend and backend:

bash
Copy code
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
Configuration
3. Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code
MONGO_URI=your_mongo_connection_string
LIVECOINWATCH_API_KEY=your_livecoinwatch_api_key
PORT=5000
Running the Project
4. Start the Backend Server
In the root directory, start the backend server:

bash
Copy code
npm start
This will start the server on port 5000 (or the port you specified in the .env file).

5. Start the Frontend Server
Navigate to the client directory and start the frontend server:

bash
Copy code
cd client
npm run dev
This will start the Next.js development server on port 3000.

Usage
Open your browser and navigate to http://localhost:3000. You should see the Digital Coin Tracker interface where you can:

View real-time cryptocurrency prices.
Filter which columns to display.
Paginate through the data.
Toggle data fetching on and off.
Project Structure
Here's a brief overview of the project's structure:

Frontend (client directory)
Components: Reusable UI components (e.g., CoinTable, ProductRow, Pagination).
Redux: State management using Redux Toolkit (slices and store).
Pages: Next.js pages for routing.
Backend
Server Setup: Express server configuration.
Routes: API endpoints for fetching status and toggling data fetching.
Socket.io: Real-time updates.
Database: MongoDB for storing price data and fetching status.
Cron Job: Automated tasks to toggle data fetching status.
Contributing
We welcome contributions! Feel free to submit issues or pull requests.

License
This project is licensed under the MIT License.

That's it! You now have the Digital Coin Tracker up and running. If you run into any issues, feel free to open an issue on the GitHub repository. Happy tracking! 🚀
