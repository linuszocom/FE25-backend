# Users API – dokumentation

Det här är vårt API-kontrakt – en plan som beskriver vad API:et ska kunna göra
innan vi skriver en enda rad serverkod.

---

## Resurs: Users

REST bygger på **resurser** – saker som finns i systemet.
Här är resursen "users" (användare).

En resurs har en adress – en **URI** (Uniform Resource Identifier).
URI:en beskriver **VAD** resursen är, inte vad man **GÖR** med den.

**Bas-URI:** `/api/users/`

- Plural (`users`, inte `user`) – URI:en beskriver samlingen
- `/api/`-prefix separerar API-routes från t.ex. en webbsida på samma server

---

## Endpoints

CRUD = Create, Read, Update, Delete.
Vi mappar varje operation till en HTTP-metod.
Samma URI kan hantera flera metoder – det är kärnan i REST.

| Metod  | URI            | Beskrivning            | Body? | Svar         |
| ------ | -------------- | ---------------------- | ----- | ------------ |
| GET    | /api/users     | Hämta alla användare   | Nej   | 200 + JSON[] |
| GET    | /api/users/:id | Hämta en användare     | Nej   | 200 / 404    |
| POST   | /api/users     | Skapa ny användare     | Ja    | 201 / 400    |
| PUT    | /api/users/:id | Uppdatera en användare | Ja    | 200 / 404    |
| DELETE | /api/users/:id | Ta bort en användare   | Nej   | 204 / 404    |

---

## Statuskoder vi använder

Statuskoden talar om för klienten vad som hände – utan att den behöver läsa bodyn.

| Kod | Namn        | Betyder                                     |
| --- | ----------- | ------------------------------------------- |
| 200 | OK          | Lyckat – data returneras                    |
| 201 | Created     | Ny resurs skapades – vid POST               |
| 204 | No Content  | Lyckat men inget att returnera – vid DELETE |
| 400 | Bad Request | Klienten skickade felaktig/saknad data      |
| 404 | Not Found   | Resursen finns inte                         |

---

## Exempel: Hur ett anrop ser ut

### GET /api/users/1

```
Klient skickar:
  GET /api/users/1
  (ingen body)

Server gör:
  1. Tar ut id från URI:en → id = 1
  2. Hämtar användare med id 1 (t.ex. från minne eller databas)
  3. Hittade? → svarar 200 + { id: 1, namn: "Anna", email: "anna@example.com" }
  4. Hittade inte? → svarar 404 + { fel: "Användaren hittades inte" }
```

### POST /api/users

```
Klient skickar:
  POST /api/users
  Body: { "namn": "Lisa", "email": "lisa@example.com" }

Server gör:
  1. Läser body → req.body → { namn: "Lisa", email: "lisa@example.com" }
  2. Validerar: namn finns? email finns? → om nej: 400 + { fel: "Namn och email krävs" }
  3. Skapar objekt med nytt id → { id: 3, namn: "Lisa", email: "lisa@example.com" }
  4. Sparar användaren
  5. Svarar 201 + det skapade objektet
```

---

## Bra vs mindre bra URI:er

| Bra ✓            | Mindre bra ✗           | Varför?                              |
| ---------------- | ---------------------- | ------------------------------------ |
| `/api/users`     | `/getUsers`            | Verb i URI – GET är redan "hämta"    |
| `/api/users/1`   | `/api/user/1`          | Plural för samlingen är konvention   |
| `/api/users/:id` | `/api/users/getById/1` | Metoden är verbet; URI = resurs + id |

**Regel:** substantiv, plural, id för enskild. Då kan samma URI användas för GET, PUT och DELETE.

---

## Fler exempel: Resurser i olika typer av appar

Samma mönster fungerar oavsett vad ni bygger. Här är några exempel:

### Webbshop

| Metod  | URI               | Beskrivning                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/products     | Alla produkter             |
| GET    | /api/products/:id | En produkt                 |
| POST   | /api/products     | Lägg till ny produkt       |
| PUT    | /api/products/:id | Uppdatera pris/beskrivning |
| DELETE | /api/products/:id | Ta bort produkt            |
| GET    | /api/orders       | Alla beställningar         |
| GET    | /api/orders/:id   | En beställning             |
| POST   | /api/orders       | Skapa ny beställning       |

### Blogg

| Metod  | URI            | Beskrivning       |
| ------ | -------------- | ----------------- |
| GET    | /api/posts     | Alla blogginlägg  |
| GET    | /api/posts/:id | Ett blogginlägg   |
| POST   | /api/posts     | Skapa nytt inlägg |
| PUT    | /api/posts/:id | Redigera inlägg   |
| DELETE | /api/posts/:id | Ta bort inlägg    |

### Recept-app

| Metod  | URI              | Beskrivning           |
| ------ | ---------------- | --------------------- |
| GET    | /api/recipes     | Alla recept           |
| GET    | /api/recipes/:id | Ett recept            |
| POST   | /api/recipes     | Lägg till nytt recept |
| PUT    | /api/recipes/:id | Uppdatera recept      |
| DELETE | /api/recipes/:id | Ta bort recept        |

### Musikspelare

| Metod  | URI                | Beskrivning         |
| ------ | ------------------ | ------------------- |
| GET    | /api/songs         | Alla låtar          |
| GET    | /api/songs/:id     | En låt              |
| POST   | /api/playlists     | Skapa ny spellista  |
| GET    | /api/playlists/:id | Hämta en spellista  |
| PUT    | /api/playlists/:id | Uppdatera spellista |
| DELETE | /api/playlists/:id | Ta bort spellista   |

**Mönstret är alltid detsamma:**

- Substantiv i plural → `/api/things`
- Enskild resurs med id → `/api/things/:id`
- HTTP-metoden bestämmer operationen (GET, POST, PUT, DELETE)
