# Enkel Node.js-övning – projekt, filer och indata 📁

I den här övningen ska du sätta upp ett Node.js-projekt med ESM (import/export), läsa och skriva till filer med **fs**, och ta emot indata från användaren med **readline-sync**. Du övar på det du gjorde på lektionen: projektstruktur, asynkron filhantering och moduler. Passar bra att göra tisdag eftermiddag eller onsdag – innan torsdag när ni bygger webbservern.

---

## 1: Sätt upp projektet

**Skapa ett nytt projekt:**

- Skapa en ny mapp för ditt projekt (t.ex. `node-ovning`) och navigera till den i terminalen.
- Initiera ett Node.js-projekt med `npm init -y` så att du får en `package.json`.
- Lägg till **`"type": "module"`** i `package.json` (under `"main"` eller efter `"name"`) så att Node accepterar `import`/`export`.

**Kontrollera miljön (om du vill):**

- Kör `node -v` och `npm -v` i terminalen så att du ser att Node och npm fungerar.

---

## 2: Skriv och läs en fil med fs

**Skapa en huvudfil:**

- Skapa en JavaScript-fil (t.ex. `index.js`) i projektmappen.
- **Importera fs:** Använd `import fs from 'fs/promises'` så att du kan använda `readFile` och `writeFile` asynkront.
- **Skriv till en fil:** Använd `await fs.writeFile('data.txt', 'Hej från Node!', 'utf-8')` för att skapa/skriva till `data.txt`.
- **Läs från filen:** Använd `await fs.readFile('data.txt', 'utf-8')` och skriv ut innehållet med `console.log`.
- **Kör scriptet:** Kör `node index.js` i terminalen. Kontrollera att `data.txt` skapas och att du ser innehållet i terminalen.

**Tips:** Alla anrop till `fs.writeFile` och `fs.readFile` ska vara med `await` (filen ska vara toppnivå eller inuti en `async`-funktion).

---

## 3: Användarindata med readline-sync

**Installera readline-sync:**

- Kör `npm install readline-sync` i projektmappen.

**Uppdatera index.js:**

- **Importera readline-sync:** `import readlineSync from 'readline-sync'`.
- **Fråga användaren:** Använd `readlineSync.question('Skriv något som ska sparas: ')` för att läsa in text från terminalen. Spara svaret i en variabel.
- **Spara till fil:** Skriv det användaren skrev till `data.txt` med `await fs.writeFile(...)`.
- **Läs tillbaka:** Läs filen med `await fs.readFile(...)` och skriv ut innehållet med `console.log`.

**Kör och testa:**

- Kör `node index.js`, skriv in något när programmet frågar, och tryck Enter. Kontrollera att rätt text sparas i `data.txt` och skrivs ut i terminalen.

---

## 4: Två moduler och en enkel HTML-fil (valfritt men rekommenderat)

**Skapa två egna moduler:**

- **modul1.js** – exportera en **variabel** (t.ex. `export const appName = 'Min app';`).
- **modul2.js** – exportera en **funktion** (t.ex. `export function getGreeting() { return 'Hej!'; }`).

**Använd modulerna i index.js:**

- Importera med `import { appName } from './modul1.js';` och `import { getGreeting } from './modul2.js';`.
- Bygg en enkel HTML-sträng (template literal) som använder `appName` och `getGreeting()`.
- Skriv HTML-strängen till en fil (t.ex. `index.html`) med `await fs.writeFile('index.html', html, 'utf-8')`.
- Kör `node index.js` och öppna sedan `index.html` i webbläsaren – du ska se rubrik och text från dina moduler.

**Tips:** Projektet ska ha `"type": "module"` i `package.json` för att `import` ska fungera. Använd `fs` från `fs/promises` och `await` när du skriver filen.

---

## 5: Testa att allt fungerar

- **Fil och indata:** Kör `node index.js`, skriv in text när programmet frågar – kontrollera att `data.txt` uppdateras och att rätt innehåll visas i terminalen.
- **Moduler och HTML (om du gjort steg 4):** Kör scriptet och öppna den genererade `index.html` i webbläsaren. Kontrollera att rubrik och text kommer från dina moduler.

---

## 6: Förbättringar (valfritt!)

- **Fler frågor:** Använd `readlineSync.question` flera gånger (t.ex. namn och meddelande) och bygg en text eller HTML som innehåller båda.
- **Annat filnamn:** Spara till en annan fil (t.ex. `anteckning.txt`) eller låt användaren välja filnamn via readline-sync (kräver lite egen research om filsäkerhet).
- **CommonJS i en annan mapp:** Skapa en separat mapp (utan `"type": "module"`), skriv samma modul-övning med `require` och `module.exports`, och jämför med ESM-versionen.
