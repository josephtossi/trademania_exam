## Trademania exam Backend

User registration and authentication through sign-up and sign-in functionalities, granting access to a chat feature where users can interact and exchange messages securely.

### Installation

To install the chat API's, follow these steps:

1. **Clone the Repository**:
   git clone https://github.com/josephtossi/trademania_exam.git

2. **Install Dependencies**:
   npm install

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory of the project and add your MongoDB connection URI. For example:
   MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/your-database

4. **Start the Server**:
   npm run serve or npm run dev

### Usage

Once the server is running, you can interact with the API using HTTP requests. Here are the available endpoints:

- **POST /register**: Sign up to new account.
- **POST /login**: Log in.
- **GET /logout**: log out from account.
- **GET /logout**: log out from account.
- **Post /send-message**: send message to user
- **GET /chat-history/:userId**: get chat history of a certain user

### Authors

Joseph F. Tossy

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
