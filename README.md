# Secrets Vault

A simple web app to securely store and retrieve secrets, utilizing encryption to protect sensitive user data.

## App Setup & Run

### Prerequisites
Before running the app, ensure you have the following installed:
- **Node.js v18.20.8**: [Download Node.js](https://nodejs.org/) (v18 or higher)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/) (local or remote instance)

### Step-by-Step Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/phaneendraandukuri/secrets-vault.git
    cd secrets-vault
    ```

2. **Install dependencies for both client and server:**

    Inside the root directory, install the server-side dependencies:
    
    ```bash
    cd server
    npm install
    ```

    And in the **client** folder (for the frontend):
    
    ```bash
    cd ../client
    npm install
    ```

3. **Environment Configuration**

    Create a `.env` file in the **server** directory. It should contain the following environment variables:

    ```plaintext
    ENCRYPTION_KEY=5d55373e3ee1e8a7d7be77f2a8d13ec4
    MONGODB_URI=mongodb://localhost:27017/secrets-vault
    PORT=5001
    ```

    - `ENCRYPTION_KEY`: This is the key used for encrypting and decrypting sensitive data. **Ensure this key is kept secret** and never exposed.
    - `MONGODB_URI`: The connection URI for MongoDB. If you are using a local MongoDB instance, the default is provided.
    - `PORT`: The port on which the server will run. The default is `5001`.

4. **Sample User Credentials**

    If you want to use or test the app with some sample user credentials, you can use the following:

    ```json
    {
      "username": "secret-vault@hyperverge.com",
      "password": "Hyperverge@2014"
    }
    ```

    You can create a new user via the app interface or API by providing a username and password.

5. **Running the Application**

    You can run both the server and client simultaneously using `concurrently`. From the root directory, run the following command:

    ```bash
    npm start
    ```

    This will start both the **server** and **client**:
    - **Server** will run on port `5001` by default.
    - **Client** (React frontend) will run on port `3000` by default.

    **Note**: If the default ports are occupied, you can adjust the ports in the `.env` file.

6. **Accessing the Application**

    - **Frontend**: Open a browser and go to `http://localhost:3000` to interact with the application.
    - **Backend API**: The server's API will be available at `http://localhost:5001`.

7. **Stopping the Application**

    To stop both the server and client, press `CTRL + C` in the terminal.

---


## Security Overview

### Encryption Algorithm: AES-256-CTR

#### Why AES-256?
- **AES (Advanced Encryption Standard)** is a widely used encryption algorithm that is considered secure and fast. The `256` refers to the key size (256 bits), providing strong security and resistance against brute-force attacks.

#### Why CTR Mode?
- **CTR (Counter) Mode** turns the AES block cipher into a stream cipher. It allows for efficient parallel processing, making encryption and decryption faster, especially for larger datasets.

### Salt in Encryption

#### Why Use Salt?
- A **salt** is a random value added to the encryption process. It ensures that even if two pieces of data are identical, their encrypted outputs will be different. This prevents attacks like **rainbow table** attacks and ensures stronger data security.

### Key Management (Environment Variables)

#### Why Environment Variables?
- The **encryption key** is stored in an environment variable to keep it secure. By doing this, the key is not hardcoded in the source code, making it less vulnerable to potential breaches. This also allows the key to be easily rotated in different environments (development, staging, production).

### How Are They Used in the App?

- **AES-256-CTR** is used to encrypt sensitive data, ensuring that the data remains confidential.
- A **salt** is generated for each encryption, guaranteeing that encrypted data is unique, even if the plaintext is the same.
- The **ENCRYPTION_KEY** used for encryption is retrieved from environment variables to ensure it’s stored securely.

### Limitations and Future Improvements

- Currently, the encryption key is stored in an environment variable, which could be further improved with a more secure key management system like **AWS KMS** or **HashiCorp Vault**.
- The current implementation does not provide data integrity checks. Future updates may implement **AES-GCM** (Galois/Counter Mode) for encryption, which provides both confidentiality and data integrity.
