# Backend och frontend – var sitter vad?

- **Frontend** är den del av en webbapplikation som användaren ser och interagerar med – t.ex. webbappen eller mobilappen. Den körs i webbläsaren eller på enheten och **skickar förfrågningar** till servern (t.ex. när användaren laddar en sida eller skickar ett formulär).

- **Backend** är den kod som **körs på servern**. Servern **tar emot** förfrågningar från klienten, kan prata med **databas** och **filer**, och **skickar tillbaka ett svar**. All logik för inloggning, sparande av data, leverans av data via API:er och liknande – det är backend.

- **Client–server-modellen** beskriver just detta: **klienten** (t.ex. webbläsaren) skickar en förfrågan, **servern** (backend) behandlar den och svarar. Backend är alltså inte “en app du öppnar” – det är den kod som körs på en server och svarar när någon (t.ex. frontend) anropar den.

---

# Backend-ramverk – vad är det och vilka finns?

- Ett **backend-ramverk** är ett verktyg som gör det **enklare att bygga servrar och API:er**. Man behöver inte skriva allt från noll; ramverket ger struktur för routes, hantering av förfrågningar och svar, och ofta stöd för databas, autentisering m.m.

- **Exempel på backend-ramverk:** Node.js (runtime) tillsammans med Express, Django (Python), Flask (Python), Spring Boot (Java), Laravel (PHP), ASP.NET (C#), FastAPI (Python) med flera. Olika ramverk används i olika språk och projekt.

- **Runtime** vs **ramverk:** En **runtime** (t.ex. **Node.js**) är det som **kör** koden – Node.js låter dig köra JavaScript på servern utan webbläsare. Ett **ramverk** (t.ex. **Express**) bygger ovanpå runtimeten och ger färdiga lösningar för att bygga webbservrar och API:er (routes, middleware, parsning av request body osv.). Node.js är alltså runtime; Express är ett ramverk som används tillsammans med Node.

---

# Node.js och pakethantering (NPM)

- **Node.js** är en **runtime** som låter dig köra **JavaScript på servern**. Det behövs ingen webbläsare; koden körs direkt på datorn/servern. Det underlättar för frontend-utvecklare som redan kan JavaScript.

- **npm** (Node Package Manager) är verktyget för att **hitta, installera och hantera paket** (bibliotek) i ett Node-projekt. npm **följer med** när du installerar Node. Med npm kan du initiera ett projekt (skapa **package.json**), installera paket (t.ex. Express, readline-sync) och se till att andra kan få samma miljö genom att köra `npm install`.

- **package.json** beskriver projektet (namn, version) och **vilka paket** projektet använder (**dependencies**). När du kör `npm install <paket>` laddas paketet ner till mappen **node_modules** och registreras i package.json – då kan någon annan (eller du på en annan dator) köra `npm install` (utan paketnamn) och få exakt samma beroenden. Det kallas **återanvändbar miljö** och är en del av **pakethantering**.

- **LTS** (Long Term Support) betyder att en Node-version får säkerhetsuppdateringar och stöd under en längre period. För kurs och produktion rekommenderas LTS (t.ex. v18 eller v20).

---

# Moduler i Node – CommonJS och ESM

- **Moduler** är sätt att **dela och importera kod** mellan filer. I Node finns historiskt två system: **CommonJS** och **ESM** (ECMAScript Modules).

- **CommonJS** använder `require('modul')` för att importera och `module.exports` för att exportera. Det är Node:s äldre standard och används fortfarande i mycket befintlig kod.

- **ESM** använder `import ... from '...'` och `export`. Det är samma modell som i modern JavaScript i webbläsaren och det som rekommenderas för ny kod. För att Node ska acceptera import/export i .js-filer måste projektet ha **`"type": "module"`** i package.json.

---

# HTTP – protokollet som styr webben

- **HTTP** (HyperText Transfer Protocol) är det **protokoll** som styr hur klient och server pratar med varandra på webben. När du skriver en adress i webbläsaren eller anropar ett API skickas en **HTTP-förfrågan** till servern; servern svarar med ett **HTTP-svar**.

- **Request–Response-cykeln** betyder att **klienten** skickar en **förfrågan** (request) – med adress, metod, headers och eventuellt body – och **servern** svarar med ett **svar** (response) – med statuskod, headers och ofta en body (t.ex. HTML eller JSON). Allt som händer på webben – ladda sida, skicka formulär, hämta data från API – bygger på detta mönster.

---

# HTTP-metoder

- Varje HTTP-förfrågan har en **metod** (verb) som beskriver **vad** klienten vill göra.

- **GET** – **hämta** data. Används när man vill läsa något (t.ex. ladda en sida eller hämta data från ett API). GET ska inte användas för att skicka känslig data (den syns i URL:en).

- **POST** – **skicka** data till servern, ofta för att **skapa** något nytt (t.ex. skicka ett formulär eller skapa en resurs via API). Data skickas vanligtvis i **request body**, inte i URL:en.

- **PUT** – används ofta för att **ersätta** en hel resurs (uppdatera något som redan finns).

- **PATCH** – används för att **uppdatera en del** av en resurs (ändra bara vissa fält).

- **DELETE** – **ta bort** en resurs.

---

# HTTP-headers

- **Headers** är **metadata** – information _om_ förfrågan eller svaret, inte nödvändigtvis själva innehållet. Tänk på dem som kuvertet på ett brev.

- **Content-Type** – talar om **vilken typ av innehåll** som skickas (t.ex. `text/plain`, `text/html` eller `application/json`). Viktig både i request (vad klienten skickar) och response (vad servern svarar med).

- **User-Agent** – identifierar **vilken klient** som skickar förfrågan (t.ex. webbläsare och version). Finns i request.

- **Authorization** – används för att skicka **inloggningsuppgifter** eller **tokens** (t.ex. API-nyckel eller Bearer-token) så att servern kan avgöra vem som anropar och om de får tillgång.

---

# HTTP-statuskoder

- **Statuskoden** är ett **treiffersnummer** som talar om för klienten **vad som hände** med förfrågan.

- **2xx** – framgång. **200 OK** = allt gick bra. **201 Created** = något nytt skapades (t.ex. efter en lyckad POST).

- **4xx** – fel hos **klienten**. **400 Bad Request** = dålig eller ogiltig data. **404 Not Found** = resursen eller sidan hittades inte.

- **5xx** – fel på **servern**. **500 Internal Server Error** = något gick fel i serverkoden (bugg, krasch).

---

# URL-struktur – path och query-parametrar

- **Path** (sökväg) är själva **adressen** till en resurs – t.ex. `/api/users` eller `/produkter`. Den beskriver _vilken_ resurs som efterfrågas.

- **Query-parametrar** kommer efter **`?`** i URL:en och har formen **nyckel=värde** (t.ex. `?namn=Anna&sida=2`). De används för att skicka **extra information** – filter, sidnummer, sökord osv.

- **Viktigt:** **Känslig information** (lösenord, tokens, personuppgifter) ska **inte** skickas i query-parametrar, eftersom de syns i URL:en, i historik och i loggar. Använd i stället **request body** (t.ex. med POST) och **HTTPS**.

---

# API och datautbyte – hämta och lämna data

- Ett **API** (Application Programming Interface) är det sätt som en server **exponerar** funktionalitet och data så att klienter (t.ex. frontend eller mobilapp) kan **hämta** och **lämna** data. I webbens värld görs det ofta via **HTTP**: klienten skickar en request (t.ex. GET för att hämta, POST för att skicka), servern svarar med en response (ofta med data i **JSON**).

- **JSON** (JavaScript Object Notation) är ett vanligt **dataformat** för utbyte mellan klient och server. Servern sätter då **Content-Type** till **application/json** och skickar data som text i JSON-format. Klienten kan tolka texten till objekt i sin egen kod.

---

# Websockets – realtidskommunikation

- **Websockets** är en teknik för **full-duplex-kommunikation** över en enda TCP-anslutning – det vill säga att klient och server kan skicka data **åt båda hållen** över samma anslutning, utan att behöva skicka nya HTTP-förfrågningar varje gång.

- **Skillnad mot HTTP:** Vanlig HTTP bygger på **request–response** – klienten skickar en förfrågan, servern svarar, anslutningen avslutas. För att få ny data måste klienten skicka en ny förfrågan. Med **Websockets** hålls anslutningen **öppen**; servern kan **skicka data till klienten** när som helst (t.ex. vid en uppdatering), utan att klienten behöver fråga först.

- **Användningsområden:** Websockets passar när man behöver **realtid** – t.ex. chatt, livescore, notifieringar, samarbetsverktyg där flera användare ser samma data uppdateras direkt. För vanliga "hämta data vid klick" räcker vanliga HTTP-anrop (GET/POST).

---

# SQL och NoSQL – skillnaden mellan databastyper

- **SQL** (relationella databaser) lagrar data i **tabeller** med **rader** och **kolumner**. Strukturen ( **schema** ) är tydligt definierad – vilka kolumner som finns och vilken typ de har. Relationer mellan tabeller hanteras med **nycklar** (primärnyckel, främmande nyckel). Exempel: MySQL, PostgreSQL, SQLite.

- **NoSQL** (icke-relationella databaser) är ett brett begrepp. **Dokumentbaserade** databaser (t.ex. MongoDB, NeDB) lagrar data ofta som **dokument** (t.ex. JSON-liknande), utan att alla dokument behöver ha exakt samma struktur. Det ger **flexibilitet** – man kan lägga till nya fält utan att ändra ett fast schema.

- **När vad?** **SQL** passar när datan har **tydlig struktur** och **många relationer** mellan entiteter (t.ex. användare, beställningar, orderrader). **NoSQL** (dokumentbaserat) passar när man vill **utveckla snabbt**, när strukturen kan **ändras** eller **variera**, eller när man har andra krav på skalning. Båda är giltiga – valet beror på projektet.

---

# Säkerhet – inte exponera känslig data

- **Övergripande princip:** Backend ska **inte exponera känslig data** – t.ex. databaslösenord, API-nycklar eller onödiga personuppgifter – till klienten eller i loggar. Känslig information ska inte ligga i **URL:en** (query-parametrar) eller i felmeddelanden som visas för användaren.

- **Miljövariabler** (t.ex. i en `.env`-fil) används för att hålla hemligheter **utanför källkoden**. Servern läser t.ex. databaslösenord från miljövariabler i stället för att ha dem hårdkodade. Filer med hemligheter ska inte laddas upp till versionshantering (Git).

- **Authorization** (headers, tokens) används för att avgöra _vem_ som anropar och vad de får tillgång till – så att endast behöriga användare får känslig data.
