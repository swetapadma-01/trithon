<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "yourpassword";  // Replace with your MySQL root password
$dbname = "userdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$email = $_POST['email'];
$pass = $_POST['psw'];

// Hash the password before storing it (for registration purposes)
$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

// Check if user exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User exists, verify the password
    $row = $result->fetch_assoc();
    if (password_verify($pass, $row['password'])) {
        echo "Login successful!";
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "No account found with that email.";
}

// Close connection
$stmt->close();
$conn->close();
?>
