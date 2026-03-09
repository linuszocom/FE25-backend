# Webshop API – dokumentation

API-kontrakt för en enkel webshop. Beskriver vilka endpoints som finns,
vilken data som skickas och vad man får tillbaka.

---

## Resurs: Products

Produkter i webshopen. Varje produkt har ett id, name, pris, beskrivning och kategori.

**Bas-URI:** `/api/products`

---

## Endpoints

| Metod  | URI               | Beskrivning          | Body? | Svar         |
| ------ | ----------------- | -------------------- | ----- | ------------ |
| GET    | /api/products     | Hämta alla produkter | Nej   | 200 + JSON[] |
| GET    | /api/products/:id | Hämta en produkt     | Nej   | 200 / 404    |
| POST   | /api/products     | Lägg till ny produkt | Ja    | 201 / 400    |
| PUT    | /api/products/:id | Uppdatera en produkt | Ja    | 200 / 404    |
| DELETE | /api/products/:id | Ta bort en produkt   | Nej   | 204 / 404    |

---

## Statuskoder

| Kod | Name        | Betyder                               |
| --- | ----------- | ------------------------------------- |
| 200 | OK          | Lyckat – data returneras              |
| 201 | Created     | Ny produkt skapades                   |
| 204 | No Content  | Lyckat – inget att returnera (DELETE) |
| 400 | Bad Request | Saknad eller felaktig data i body     |
| 404 | Not Found   | Produkten finns inte                  |

---

## Datamodell

Så här ser ett produktobjekt ut:

```json
{
  "id": 1,
  "name": "Trådlösa hörlurar",
  "pris": 899,
  "beskrivning": "Bluetooth-hörlurar med brusreducering",
  "kategori": "elektronik"
}
```

### Obligatoriska fält vid POST

| Fält        | Typ    | Krävs? | Exempel                             |
| ----------- | ------ | ------ | ----------------------------------- |
| name        | string | Ja     | "Trådlösa hörlurar"                 |
| pris        | number | Ja     | 899                                 |
| beskrivning | string | Nej    | "Bluetooth-hörlurar med brusred..." |
| kategori    | string | Nej    | "elektronik"                        |

---

## Exempel på anrop och svar

### GET /api/products – Hämta alla produkter

**Request:**

```
GET /api/products
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Trådlösa hörlurar",
    "pris": 899,
    "beskrivning": "Bluetooth-hörlurar med brusreducering",
    "kategori": "elektronik"
  },
  {
    "id": 2,
    "name": "Musmatta XL",
    "pris": 249,
    "beskrivning": "Stor musmatta med sydda kanter",
    "kategori": "tillbehör"
  }
]
```

---

### GET /api/products/1 – Hämta en produkt

**Request:**

```
GET /api/products/1
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Trådlösa hörlurar",
  "pris": 899,
  "beskrivning": "Bluetooth-hörlurar med brusreducering",
  "kategori": "elektronik"
}
```

**Om produkten inte finns (404 Not Found):**

```json
{
  "error": "Produkten hittades inte"
}
```

---

### POST /api/products – Skapa ny produkt

**Request:**

```
POST /api/products
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Mekaniskt tangentbord",
  "pris": 1299,
  "beskrivning": "RGB-belysning och Cherry MX-switchar",
  "kategori": "elektronik"
}
```

**Response (201 Created):**

```json
{
  "id": 3,
  "name": "Mekaniskt tangentbord",
  "pris": 1299,
  "beskrivning": "RGB-belysning och Cherry MX-switchar",
  "kategori": "elektronik"
}
```

**Om name eller pris saknas (400 Bad Request):**

```json
{
  "error": "Name och pris krävs"
}
```

---

### PUT /api/products/1 – Uppdatera en produkt

**Request:**

```
PUT /api/products/1
Content-Type: application/json
```

**Body:**

```json
{
  "pris": 749,
  "beskrivning": "Bluetooth-hörlurar med brusreducering – REA!"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Trådlösa hörlurar",
  "pris": 749,
  "beskrivning": "Bluetooth-hörlurar med brusreducering – REA!",
  "kategori": "elektronik"
}
```

---

### DELETE /api/products/2 – Ta bort en produkt

**Request:**

```
DELETE /api/products/2
```

**Response (204 No Content):**

Ingen body – statuskoden 204 bekräftar att produkten togs bort.
