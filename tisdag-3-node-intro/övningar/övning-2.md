# Node.js – Övning

Övningen bygger på lektionen **Tisdag 3 – Intro till Backend & Node.js**. Du sätter upp ett projekt med ESM, använder **fs** för att läsa och skriva filer, och **readline-sync** för användarindata. Passar bra att göra tisdag eftermiddag och på onsdag – innan torsdag när ni bygger webbservern.

**Översikt:** Projekt → fs (fil) → readline-sync (indata) → moduler + HTML (valfritt) → testa → fler idéer (valfritt).

---

## 1. Sätt upp projektet

- Skapa en ny mapp (t.ex. `node-ovning`) och gå in i den i terminalen.
- Initiera projektet:
  ```bash
  npm init -y
  ```
- Öppna `package.json` och lägg till `"type": "module"` (t.ex. efter `"main"`), så att Node accepterar `import` och `export`.

_Valfritt:_ Kör `node -v` och `npm -v` för att kontrollera att miljön fungerar.

---

## 2. Skriv och läs en fil med fs

- Skapa filen `index.js` i projektmappen.
- Importera fs från promises:
  ```javascript
  import fs from "fs/promises";
  ```
- Skriv till en fil med `await fs.writeFile('data.txt', 'Hej från Node!', 'utf-8')`.
- Läs tillbaka med `await fs.readFile('data.txt', 'utf-8')` och skriv ut med `console.log`.
- Kör:
  ```bash
  node index.js
  ```
  Kontrollera att `data.txt` skapas och att innehållet syns i terminalen.

**Tips:** Använd alltid `await` med `fs.writeFile` och `fs.readFile` (filen ska vara toppnivå eller inuti en `async`-funktion).

---

## 3. Användarindata med readline-sync

- Installera paketet:
  ```bash
  npm install readline-sync
  ```
- I `index.js`: importera readline-sync och ersätt den hårdkodade texten med:
  ```javascript
  const text = readlineSync.question("Skriv något som ska sparas: ");
  ```
- Spara `text` till `data.txt` med `await fs.writeFile(...)` och läs tillbaka med `await fs.readFile(...)` och `console.log`.
- Kör `node index.js`, skriv in något när programmet frågar och tryck Enter. Kontrollera att rätt text hamnar i `data.txt` och i terminalen.

---

## 4. Två moduler och en enkel HTML-fil (valfritt, rekommenderat)

- **modul1.js** – exportera en variabel, t.ex. `export const appName = 'Min app';`
- **modul2.js** – exportera en funktion, t.ex. `export function getGreeting() { return 'Hej!'; }`
- I **index.js**: importera båda (`import { appName } from './modul1.js';` och `import { getGreeting } from './modul2.js';`), bygg en HTML-sträng med template literal som använder `appName` och `getGreeting()`, och skriv den till `index.html` med `await fs.writeFile('index.html', html, 'utf-8')`.
- Kör `node index.js` och öppna `index.html` i webbläsaren – rubrik och text ska komma från dina moduler.

**Tips:** Projektet behöver `"type": "module"` i `package.json`. Använd `fs` från `fs/promises` och `await` när du skriver filen.

---

## 5. Testa att allt fungerar

- **Fil + indata:** Kör `node index.js`, skriv in text – kontrollera att `data.txt` uppdateras och att rätt innehåll visas i terminalen.
- **Moduler + HTML (om du gjorde steg 4):** Kör scriptet, öppna den genererade `index.html` i webbläsaren och kontrollera att innehållet kommer från modulerna.

---

## 6. Förbättringar (valfritt)

- **Fler frågor** – Använd `readlineSync.question` flera gånger (t.ex. namn och meddelande) och bygg en text eller HTML av svaren.
- **Annat filnamn** – Spara till t.ex. `anteckning.txt`, eller låt användaren ange filnamn (kräver lite egen research om säkerhet).
- **CommonJS i en annan mapp** – Skapa en mapp utan `"type": "module"` och gör samma modul-övning med `require` och `module.exports`, jämför med ESM-versionen.
