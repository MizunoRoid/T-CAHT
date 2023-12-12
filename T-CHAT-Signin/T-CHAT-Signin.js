document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // ダミーのユーザー情報
    const dummyUsername = "user";
    const dummyPassword = "password";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === dummyUsername && password === dummyPassword) {
        // ログイン成功時の処理
        document.getElementById("error-message").textContent = "Login successful!";
    } else {
        // ログイン失敗時の処理
        document.getElementById("error-message").textContent = "Invalid username or password";
    }
});
