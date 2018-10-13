# Passport.js-Oauth
Practice with Passport.js authentication

# Features
- Sign in with Google+
- Sign in with Github

# Upcoming Features
- Sign in with Facebook
- Visual improvements


# IMPORTANT
- create a file named keys.js in config directory
- add the following into the file:

  ```sh
  module.exports = {
    google: {
        clientID:'your_google_client_id',
        clientSecret:'your_google_client_secret'
    },
    github: {
        clientID:'your_github_client_id',
        clientSecret:'your_github_client_secret'
    },
    mongoDB: {
        dbURI: 'your_mongodb_uri'
    },
    session:{
        cookieKey:'your_random_key_for_encryption'
    }
}
  ```
