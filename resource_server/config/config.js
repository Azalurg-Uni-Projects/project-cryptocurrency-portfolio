const config = {
    PORT: 4000,
    introspectionEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/token/introspect",
    userInfoEndpoint: "http://localhost:8080/realms/main/protocol/openid-connect/userinfo",
    clientId: "webapp",
    clientSecret: "9draBjo5QWVMyh4IRaybWFi0pe7eTi9c",
    integrationClientId: "cloud",
    integrationClientSecret: "R3MIpIDeqwO7SAFgOrXjTpeccIJWxjbZ",
    spaClientId: "browserapp",
    realmPemCert: `-----BEGIN CERTIFICATE-----
    MIIClzCCAX8CBgGBqdv7DjANBgkqhkiG9w0BAQsFADAPMQ0wCwYDVQQDDARtYWluMB4XDTIyMDYyODEwMjc1NVoXDTMyMDYyODEwMjkzNVowDzENMAsGA1UEAwwEbWFpbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMm4i+dOv0zb4vgrhNwYGyyyrrUo8rpM+5WEkdf5fqDPRymhmwOxoXsRTasSkbVares+1ohQg0oaWsk2zcWsRFCoZqxIFIZDEj2Fkj9aeCTpzer45p/b2fckhmha5i2D8TAG+NLIeF5ESPM2Klbl1q3zlYvoPHEFf8BGaDVkS4TXmKEbwkq1e6SNHjMZWR/F/OHxLa2Mz06+cUsSpvKhkukbsuiwzqTmiz0NNM4oxxnsrcUHOARjfREaD95Ll/jQ6Ky7Y94AjBa575ar20X7goCDByTjohhjuIXM6FgNPLiE4hGPy0L/r80hGKBs+1Nzq9J5zsuNFPKOAw8BkMRH7LECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAq4modo0dPkg9qCxAKa5PG4YCfAxHK+6GZP+fq+BIIMUU08YFPmKHP9cGHG/hgJdluVZGF2q3mwWNwmsdleQ7O86i78/5fS/TUnPs/YPb2gTg3vNGBUBCMuGNne7hIKDoJ8KquChWTcraCnopf/D0K8hrA50ZyBfE6/qZpivEB0r0N//19uucLfhRwTcjSrIaZVKykuVN5M6h+aRioPqpiJb0kYdIqDnVb3/HH2Mz4xgcxdwasIE6VDdvLLcjEz8SsZSUS46MR/a2cbDakD2yKl8ZTzS7oudLdQtM+OPPDnp376Xit2mPv4sXp/xwhs3p7NOsn5+Yr5xCzEaVZrEi8Q==
    -----END CERTIFICATE-----`

};

module.exports = config;
