const URL = process.env.URL || "http://localhost:5000";
module.exports = {
  facebook_api_key: "2602243379852179",
  facebook_api_secret: "9ea700aabcc043a8705e03882b4a07e7",
  callback_url: `${URL}/api/user/auth/facebook/callback`,
  use_database: true,
  host: "localhost",
  username: "root",
  password: "",
  database: "login_passport"
};
