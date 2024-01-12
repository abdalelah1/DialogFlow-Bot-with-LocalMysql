# Dialogflow Integration with Local MySQL Database

This project demonstrates a simple method to integrate Dialogflow with a local MySQL database without using Google Cloud services. The approach involves using a webhook to handle fulfillment and enabling secure HTTPS connections with ngrok. The entire solution is cost-free.

## Steps to Reproduce:

1. **Setup Local MySQL Database:**
   - Install MySQL locally.
   - Create a database named `bookdb`.
   - Define a user with credentials (user: 'test', password: '1234').

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/abdalelah1/finalbot-with-mySqlAndNode.git
   cd your-repo
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run ngrok to Enable HTTPS:**
   - Download and install ngrok: [ngrok](https://ngrok.com/).
   - Run ngrok to expose your local server:
     ```bash
     ngrok http 3000
     ```
   - Note the generated HTTPS forwarding URL.

5. **Configure Webhook in Dialogflow:**
   - Open your Dialogflow agent.
   - Go to Fulfillment.
   - Enable the Webhook.
   - Set the URL to your ngrok HTTPS URL + '/webhook' (e.g., `https://your-ngrok-url.ngrok.io/webhook`).

6. **Run the Local Server:**
   ```bash
   node your-server-file.js
   ```

7. **Test the Integration:**
   - In Dialogflow, simulate user queries.
   - The server logs and responds based on the MySQL database.

## Code Highlights:

- The Node.js server uses Express and the `dialogflow-fulfillment` library.
- MySQL queries are handled using the `mysql` library.
- ngrok is employed to create a secure HTTPS tunnel for the local server.

Feel free to explore the code and customize it according to your requirements. If you encounter any issues or have suggestions, feel free to open an issue or contribute.

Happy coding! 🚀
