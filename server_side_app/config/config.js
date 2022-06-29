const config = {
    PORT: 5000,
    authEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/auth",
    tokenEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/token",
    apiProtectedEndpoint: "http://localhost:4000/private",
    apiUnprotectedEndpoint: "http://localhost:4000/public",
    clientId: "webapp",
    clientSecret: "9draBjo5QWVMyh4IRaybWFi0pe7eTi9c",
    codeVerifier: "bd330d88a3899331934030a00007ac8d962d4169196b9d58a646b212",
    codeChallenge: "TKsCMm9IxqyWVyCNMZ3x-T4PTlSQyPNVPkR9NzOATp4",
    redirectUriLogin: "http://localhost:5000",
    redirectUriWallet: "http://localhost:5000/wallet"
};

module.exports = config;
