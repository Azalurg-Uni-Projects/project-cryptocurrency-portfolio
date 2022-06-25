const config = {
    PORT: 5000,
    authEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/auth",
    tokenEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/token",
    apiProtectedEndpoint: "http://localhost:4000/private",
    apiUnprotectedEndpoint: "http://localhost:4000/public",
    clientId: "webapp",
    clientSecret: "qszmNquBzgL1lEws8A1DcgODqsD2PVGA",
    codeVerifier: "bd330d88a3899331934030a00007ac8d962d4169196b9d58a646b212",
    codeChallenge: "TKsCMm9IxqyWVyCNMZ3x-T4PTlSQyPNVPkR9NzOATp4",
    redirectUri: "http://localhost:5000/redirect"
};

module.exports = config;
