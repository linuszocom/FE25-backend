# Workshop: Citatmaskinen – Din egen pepp-API

**Verktyg:** Node.js (inbyggda http), JSON, Postman/Insomnia.

---

## 💡 Idén

Ni ska bygga ett "Citatmaskin"-API som returnerar slumpade peppande citat eller roliga fakta. Genom ert API ska användare kunna hämta citat och även lägga till egna via POST-anrop.

- **Ingen Express:** Vi använder bara Node:s inbyggda moduler.
- **Databas:** Vi sparar citaten i minnet (en array). När servern startar om återställs listan.

---

## 📋 Kravspecifikation

### 1. Projektstruktur

- Använd `server-api.js` från lektionen eller skapa en ny fil: `citatmaskin.js`.
- Använd `http.createServer`.
- Hantera logik med `new URL(req.url, ...)` och `req.method`.
- Servern ska köras på port **3001**.

### 2. Datakälla (Array)

Skapa en array med minst 3–5 citat-objekt:

```javascript
let citat = [
  { text: 'Det löser sig. Om inte, är det inte slutet.', kategori: 'pepp' },
  { text: 'Koden fungerar inte? Har du provat att stänga och öppna datorn?', kategori: 'rolig' },
  { text: 'Idag är en bra dag att lära sig något nytt.', kategori: 'pepp' }
];
```

### 3. GET /api/citat

- Ska returnera ett slumpat citat från arrayen.
- **Header:** `Content-Type: application/json`
- **Statuskod:** 200 OK

### 4. Query-parametrar

- `GET /api/citat?kategori=rolig` ska filtrera och returnera ett slumpat citat från just den kategorin.
- Använd `searchParams.get('kategori')`.

### 5. POST /api/citat

- Ta emot JSON-data (t.ex. `{ "text": "Nytt citat", "kategori": "pepp" }`).
- Lyssna på `req.on('data')` och `req.on('end')`.
- Använd `JSON.parse(body)` och pusha objektet till din array.
- **Statuskod:** 201 Created

### 6. Felhantering & 404

- Alla okända sökvägar ska returnera **404 Not Found** med ett tydligt felmeddelande i JSON-format.

---

## 🛠️ Testning i Postman/Insomnia

Verifiera din lösning med följande steg:

1. **GET** `http://localhost:3001/api/citat` → Kolla att du får ett slumpat objekt.
2. **GET** `http://localhost:3001/api/citat?kategori=pepp` → Kolla att filtreringen fungerar.
3. **POST** `http://localhost:3001/api/citat` → Välj Body → raw → JSON. Skicka ett nytt citat och verifiera att du får 201 tillbaka.

---

## 🌟 Frivilliga utökningar

- **GET /api/citat/alla:** Returnera hela arrayen (bra för felsökning).
- **Robusthet:** Lägg `JSON.parse` i ett `try/catch`-block för att undvika att servern kraschar vid felaktig input.
- **Välkomstmeddelande:** Skapa en route för `GET /` som förklarar hur man använder API:et.

---

## 💡 Tips på vägen

- **Slumpa:** `citat[Math.floor(Math.random() * citat.length)]`
- **Filtrera:** `citat.filter(c => c.kategori === searchParams.get('kategori'))`
- **Headers:** Glöm inte att alltid skicka JSON-headern när du skickar JSON-data!

---

## 📌 Sammanfattning av Routes

| Route                   | Metod | Beskrivning                    | Statuskod |
| ----------------------- | ----- | ------------------------------ | --------- |
| `/api/citat`            | GET   | Returnerar ett slumpat citat   | 200       |
| `/api/citat?kategori=x` | GET   | Returnerar slumpat citat i kategori | 200  |
| `/api/citat`            | POST  | Lägger till ett nytt citat i listan | 201  |
| Övriga                  | Alla  | Felmeddelande (JSON)           | 404       |
