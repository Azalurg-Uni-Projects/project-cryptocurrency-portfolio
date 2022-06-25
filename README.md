# Bezpieczeństwo aplikacji webowych - OAuth/OIDC

## Cel
Zabezpieczanie dostępud do HTTP API wg standardu OAuth/OpenID Connect. 
Omawiamy rozmaite zagadnienia i scenariusze związane z bezpieczeństwem aplikacji z uwzględnieniem specyfiki róznych klientów.

Uwaga: do rozwazań przyjmujemy wersję OAuth2.1 (jeszcze w wersji draft). Ta wersja porządkuje rózne specyfikacje, które tworzyły wersję 2.0 oraz jest zgodna z OAuth 2.0 Security Best Current Practice, w szczególności usuwa dwa, uznane za współcześnie niebezpieczne, flow ze standardu. Podsumowanie zmian wersji [OAuth 2.1](https://oauth.net/2.1/). Szerzej opisany standard [OAuth 2.1](https://connect2id.com/learn/oauth-2-1).

## Role zgodnie z OAuth
- Client (aplikacja w róznej formie)
- Resource Owner (End User lub aplikacja backendowa/serwis dla przypadku uzycia typu machine-to-machine)
- Resource Server (API do którego dostęp chcemy uzyskać)
- Authorization Server (zarządza klientami, userami, wydawaniem tokenów i wiele innych )

## Omawiane ze szczegółami klienty
- Aplikacja webowa typu Server Side Rendering (na przykładzie)
- Aplikacja backendowa, serwis (na przykładzie)
- Aplikacja wg wzorca Single Page Application (głównie na laboratoriach) 
- Aplikacja mobilna (tylko omówione)

## Omawiane flow/grant wg OAuth 2.1
- Authorization code grant (dla aplikacji webowych i mobilnych)
- Client credentials (dla komunikacji typu machine-to-machine)
- Refresh token

## Authorization server - Keycloak
1. [Dokumentacja szczegółowa](https://keycloak.org)
1. Docker podstawowe (bez persystencji) uruchomienie
`docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:18.0.0 start-dev`
1. [Endpoints - konfiguracja](http://localhost:8080/realms/myapprealm/.well-known/openid-configuration) enpoint
1. Dokumentacja: [Keycloak Node.js Adapter](https://github.com/keycloak/keycloak-nodejs-connect)

## System docelowy (na zaliczenie)
Budujemy system składający się z kilku komponentów. Uwaga, mozna komponenty uruchamiac w rozny sposób, przykładowo:
- komponenty są częścią klastra kubernetes (zgodnie z budowanym systemem budowanym na przedmiocie Technologie chmurowe)
- komponenty są uruchamiane jako kontenery Docker lub z wykorzystaniem Docker compose
- komponenty są uruchamiane z terminala, oddzielnie na komputerze lokalnym
- tryb mieszany np. Keycloak jako kontener Docker, a reszta komponentów lokalnie


Komponenty:
- (Authorization Server wg OAuth) serwer autoryzacyjny Keycloak (na wyzsze oceny konfiguracja z bazą danych)
- (Resource Sever wg OAuth) serwis wystawiający HTTP API - dostęp do tego serwisu zabezpieczamy. Posiada enpointy zarówno chronione jak i ogólnie dostępne (po jednym przykładzie dla metod POST i GET). Dokonuje inspekcji tokenów (będzie omawiane na wykładzie)
- (Client wg OAuth) aplikacja webowa typu Server Side Rendering wywołująca endpointy z zabezpieczanego serwisu z API. Aplikacja realizuje flow wg "Authorization code grant" i odwołuje się do endpointów z zabezpieczanego serwisu z API. 
- (Client wg OAuth) aplikacja backendowa tj. inny serwis odwołujący się do andpointów z zabezpieczanego serwisu z API
- (Client wg OAuth) aplikacja typu Single Page Application

Sugerowane technologie:
- Node + Express + (opcjonalnie: jakiś silnik renderujący html dla ułatwienia)


