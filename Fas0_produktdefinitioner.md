# FAS 0 — PRODUKTDEFINITIONER (LÅST 2026-08-05)

> **Detta dokument är fas 0-leveransen enligt IMPLEMENTATIONPLAN_WEBSITE_UPDATES.md §4.**
> All kundvänd copy i fas 2 hämtas HÄRIFRÅN — ordagrant eller som godkänd omskrivning.
> Saknas text: STANNA och fråga Hugo. Code skriver aldrig produktcopy fritt.
>
> Text inom citationstecken är färdig sajtcopy (klarspråkad, följer CLAUDE.md
> hård regel 15: inga tankstreck i synlig text). Rader märkta *Internt* ska
> ALDRIG synas på sajten.

---

## 1. Prisblock (låst)

### Listpriser (visas på sajten och i guiden)

| Produkt | Uppsättning | Månad | Kortbeskrivning |
|---|---|---|---|
| Hemsida | 8 000 kr | 399 kr/mån | Sajt live inom 14 dagar. Drift, säkerhet, mindre ändringar och månadsrapport ingår |
| Chatbot | 4 000 kr | 695 kr/mån | Chatt på hemsidan tränad på verksamheten. Svarar dygnet runt, samlar leads |
| AI-Receptionist | 7 000 kr | 1 495 kr/mån | Svarar i telefon dygnet runt, bokar och tar meddelanden. Personlig uppsättning |

### Paket
- **Hemsida + Chatbot:** 10 995 kr + 995 kr/mån
- **Allt-i-ett (alla tre):** 14 995 kr + 2 295 kr/mån. Säljs som utfall
  ("en digital reception som jobbar dygnet runt"), ALDRIG som rabattmatris på sajten.
- *Internt:* grundarrabatt och paketrabatt staplas aldrig automatiskt.

### Grundarpriser (*Internt* — säljverktyg hösten 2026, står EJ på sajten)
- Chatbot: 3 000 kr + 495 kr/mån
- AI-Receptionist: 5 000 kr + 995 kr/mån
- Hemsidan behåller ordinarie pris. Begränsat antal, nämns endast i samtal.
- Sajten visar alltid "från"-priser där paket nämns, så grundarpris i samtal
  aldrig motsäger sajten.

### Betalning & trygghet (sajtcopy-underlag)
- Hemsida: "Betala hälften nu, resten först när du är nöjd." (sajtens
  viktigaste förtroenderad, ska ha tydlig visuell plats — se implementationsplanen §7)
- *Internt:* halveringsvillkoret gäller ENDAST hemsidan. Chatbot, receptionist
  och paket faktureras fullt vid start (receptionisten har rörliga kostnader
  från dag ett). Villkoret får aldrig visas vid övriga produkter på sajten.
- Drift faktureras från månad 1. Lojalitetsbonus år 1: månad 10, 11 och 12 är
  fakturafria vid fortsatt abonnemang. Sajtformulering (bisats under
  hemsidepriset, ingen kampanjruta): "Drift 399 kr/mån. Tre månader på köpet
  första året."
- *Internt:* månad 10–12 skickas som nollfaktura med struket pris och texten
  "Tack för ditt första år med oss. Månad 10 till 12 bjuder vi på." Månad 12-
  fakturan innehåller även rad om årsrapporten. Aldrig orden kampanj/rabatt/erbjudande.
- Ingen inlåsning: "Säger du upp dig får du med dig koden." *Internt:* vid
  uppsägning upphör hosting, domänhantering, mejl och ändringar. Månadsrapport
  ingår i all drift och är värdebeviset som bär abonnemanget.

### Avtalsskydd (*Internt* — står i kundavtal, ALDRIG på sajten)
- Leveransklockan (14 dagar) startar när komplett underlag inkommit via
  onboarding-formuläret OCH access (t.ex. kalenderdelning) verifierats av oss.
  Bekräftelsemejl skickas som startskott.
- Mindre justeringar ingår i driften; större ändringar offereras.
- Priser gäller normalstor verksamhet; omfattande behov (flera anläggningar,
  mycket höga volymer) offereras separat.
- Receptionist: 300 min/mån ingår; överskjutande volym offereras, autodebiteras aldrig.

---

## 2. Produktdefinition: Hemsida (befintlig, bekräftad)

Befintligt offer i CLAUDE.md gäller oförändrat:

- **Outcome:** "Gå från en sajt som ingen agerar på till en som genererar
  bokningar varje vecka"
- **Mechanism:** Analysera → Bygga → Drifta ("Vi lär känna ditt företag" →
  "Vi bygger din sajt" → "Din sajt går live")
- **Differentiator:** "De flesta hemsidor behandlar alla besökare likadant.
  Vi bygger ett konverteringsflöde."
- **Boundaries:** "Fixar konvertering, bygger inte om hela din marknadsföring"
- **Price:** 8 000 kr + 399 kr/mån. Leverans 14 dagar. "Betala hälften nu,
  resten först när du är nöjd."

**Två tillägg i fas 2:**
1. Lojalitetsraden under priset: "Tre månader på köpet första året."
2. FAQ-justering: "Hur lång tid tar det? 14 dagar från att vi fått dina uppgifter."

---

## 3. Produktdefinition: AI-Receptionist (LÅST, uppdaterad 2026-08-05: eget lokalt nummer + utökad FAQ)

**Namn på sajten:** AI-Receptionist

**En menings-pitch:**
"En receptionist som svarar i din telefon dygnet runt, bokar in kunder i din
kalender och skickar dig en sammanfattning. Du jobbar vidare, den missar
aldrig ett samtal."

**Outcome:**
"Sluta tappa kunder för att du inte kan svara. Varje samtal besvaras direkt,
även när du står mitt i ett jobb, har stängt eller är ledig. Bokningar hamnar
i din kalender och du får besked om varje samtal."

**Mechanism (3 steg):**
1. "Vi lär den ditt företag" — tjänster, öppettider, hur den ska låta och vad
   den ska fråga om
2. "Vi ger den ett eget lokalt nummer" — vidarekopplas från ditt vanliga
   nummer, eller visas direkt på din hemsida och Googleprofil om du hellre vill
   det. Du väljer.
3. "Den svarar, bokar och rapporterar" — bokning i kalendern, SMS-bekräftelse
   till den som ringde, sammanfattning till dig

*(Steg-texterna ovan innehåller tankstreck som avgränsare i detta dokument;
på sajten sätts förklaringarna som egen mening eller undertext, regel 15.)*

*Internt:* vidarekoppling sätts upp av kunden på eget abonnemang (villkorad
vidarekoppling vid ej svar/upptaget); operatörsinstruktioner ingår i
onboarding-formuläret. Eventuell vidarekopplingskostnad ligger på kundens
abonnemang och nämns vid uppsättning.

**Differentiator:**
"Den som möts av en röstbrevlåda ringer nästa företag i listan. Vår
receptionist svarar direkt, låter naturlig och bokar in kunden medan intresset
är varmt. Vi sätter upp allt åt dig och du godkänner hur den låter innan den
tar ett enda riktigt samtal."

**Boundaries (sajtcopy):**
"Receptionisten presenterar sig alltid som digital assistent, den låtsas
aldrig vara en människa. Den bokar tider, svarar på vanliga frågor och tar
meddelanden. Den lovar inga priser utanför din prislista och gissar aldrig.
Är den osäker tar den ett meddelande så att du kan ringa upp."

*Internt:* v1-segment = verkstäder, hantverkare och enklare tjänsteföretag med
Google- eller papperskalender. Tandläkare (journalsystem, känsliga uppgifter)
och Bokadirekt-bundna frisörer hänvisas framåt (guide-utfallet: "vi ringer upp
och ser om det passar din verksamhet"). Avbokning/ombokning enligt
testprotokollets scope-beslut i onboarding-dokumentet.

**Price (sajtcopy):**
7 000 kr uppsättning + 1 495 kr/mån.
"300 minuters samtalstid per månad ingår. Det motsvarar ungefär 100 till 150
samtal och räcker gott för de flesta småföretag. Ringer det mer än så hör vi
av oss och hittar en nivå som passar."
*Internt:* grundarpris i samtal 5 000 + 995. Rörlig kostnad ~1,0–1,2 kr/min +
SMS ~0,5–0,8 kr/bokning. Minuter loggas för ALLA kunder från dag ett, även de
under poolen. Överskott över 300 min autodebiteras aldrig; pris per månad görs
upp individuellt med kunden när mönstret syns. Kunder i spannet 5–15 samtal/dag
bevakas extra månad 1, de kan nå pooltaket.

**FAQ (sajtcopy, ordnad):**

1. "Hur låter den?" / "Naturlig och trevlig, på svenska. Du hör själv exakt hur
   den låter och godkänner rösten innan den tar ett enda riktigt samtal. Ring
   demo-numret så hör du."
2. "Behåller jag mitt vanliga nummer?" / "Ja. Receptionisten får ett eget lokalt
   nummer som du vidarekopplar till, så kunderna ringer dig precis som vanligt
   och receptionisten tar samtalen du inte hinner svara på. Vill du hellre att
   kunderna ringer receptionisten direkt visar du dess nummer på hemsidan eller
   din Googleprofil istället."
3. "Kan den ta alla mina samtal när jag är ledig?" / "Ja. Normalt tar den bara
   samtalen du inte hinner svara på, men du kan enkelt låta den ta allt, till
   exempel under semestern."
4. "Vad händer om den inte kan svara på en fråga?" / "Den gissar aldrig. Är den
   osäker tar den namn och nummer så att du kan ringa upp, och du får hela
   ärendet i din sammanfattning."
5. "Kan jag ändra vad den ska säga?" / "Ja. Nya öppettider, nya tjänster eller
   ett nytt svar på en vanlig fråga. Hör av dig så uppdaterar vi den, mindre
   ändringar ingår i månadskostnaden."

*Internt:* "mindre ändringar" i FAQ:n (rad 5) = uppdateringar av kunskapsbas och
enklare promptjusteringar (öppettider, tjänster, svarsformuleringar). Större
omläggningar (nya flöden, ny röst, nya integrationer) offereras. Varje ändring
kräver testsvit-körning enligt systemrapporten.

**Demo-CTA (primär):** "Ring och prova själv" + receptionist-numret (samma som
visitkorten; numret läggs in i fas 5 om ej fastställt vid fas 2-bygget).
Sekundär CTA: kontaktformuläret.

---

## 4. Produktdefinition: Chatbot (LÅST)

**Namn på sajten:** Chatbot (rubrikalternativ i sektion: "Chatt på hemsidan")

**En menings-pitch:**
"En chatt på din hemsida som svarar på kundernas frågor direkt, dygnet runt,
och samlar in deras uppgifter så att du kan återkomma med ett färdigt svar."

**Outcome:**
"Besökare som får svar direkt stannar kvar. Chatten svarar på vanliga frågor
om priser, öppettider och tjänster, hjälper besökaren rätt och ser till att du
får namn och nummer på den som vill bli kontaktad. Inga fler besökare som
lämnar sidan för att ingen svarade."

**Mechanism (3 steg):**
1. "Vi lär den ditt företag" — samma underlag som receptionisten; köps båda är
   detta redan gjort
2. "Vi lägger in den på din hemsida" — fungerar oavsett vem som byggt sajten
3. "Den svarar och samlar leads" — varje intresserad besökare landar hos dig
   med namn, kontakt och ärende

**Differentiator:**
"De flesta chattar på hemsidor är antingen en människa som sällan är inloggad
eller en robot som bara svarar med länkar. Vår chatt kan ditt företag, svarar
som du skulle svarat och vet när den ska lämna över till dig."

**Boundaries (sajtcopy):**
"Chatten svarar utifrån det ni kommit överens om att den ska kunna. Den lovar
inga priser utanför din prislista och gissar aldrig. När en fråga är för stor
tar den kontaktuppgifter så att du kan ringa upp."

*Internt:* v1 = FAQ + lead-insamling. INGEN bokning i chatten (formuläret är
bokningsvägen på sajten, receptionisten är bokningsprodukten i telefon).
Bokning i chatt = v2/upsell-väg.

**Price:** 4 000 kr + 695 kr/mån. Ingen minutpool på sajten (text är billigt);
omfattningsklausulen i avtalet räcker. *Internt:* grundarpris 3 000 + 495.

**Demo-CTA:** chatten själv, nere i hörnet på phigo.se.
"Testa den här på sidan. Den du pratar med är samma produkt."

---

## 5. Guiden "Hitta rätt lösning" (LÅST)

*Byggs i Voiceflow (fas 5-embed). Fas 2 bygger endast den designade ytan med
intro-copy + CTA enligt implementationsplanen §6.2. Frågor och utfall nedan är
Voiceflow-underlag OCH copy-referens.*

**Intro på guide-ytan (fas 2-copy):**
"Svara på fem snabba frågor så visar vi vad som skulle ge ditt företag mest.
Tar under en minut."

### Frågor (knappar, ingen fritext förrän kontaktuppgifterna)

1. **"Vad gör ditt företag?"**
   Hantverk eller bygg · Verkstad eller service · Vård eller behandling ·
   Butik eller restaurang · Annat
   → HubSpot: Lead-kategori. Styr ordval i utfall + v1-segmentflagga.

2. **"Hur ser din hemsida ut idag?"**
   Har ingen · Har en, men den är gammal · Har en jag är nöjd med
   → Avgör om hemsida ingår i rekommendationen. "Nöjd" = ingen hemside-pitch.

3. **"Vad händer när någon ringer och du inte kan svara?"**
   Röstbrevlåda · Det ringer bara ut · Kollega eller familj svarar ibland ·
   Jag svarar nästan alltid
   → Receptionist-kvalificering. Guidens viktigaste fråga.

4. **"Var kommer dina kunder ifrån idag?"**
   Rekommendationer och stammisar · Google och nätet · Skyltläge och
   förbipasserande · Vet faktiskt inte
   → "Rekommendationer" + ingen/gammal sajt = starkaste hemside-caset.

5. **"Vad skulle betyda mest för dig just nu?"**
   Fler förfrågningar · Sluta missa samtal · Slippa svara på samma frågor ·
   Mer tid över
   → Prioriterar rekommendationens ordning och rubrikvinkel.

6. **(Endast om fråga 3 ≠ "Jag svarar nästan alltid")
   "Ungefär hur många samtal får du en vanlig dag?"**
   Några enstaka · 5 till 15 · Fler än 15
   → Volym mot 300-minuterspoolen. "Fler än 15" flaggas internt för
   anpassat pris-samtal.

### Utfallslogik

| Signal | Rekommendation |
|---|---|
| Ingen/gammal sajt + missar samtal | Allt-i-ett-paketet |
| Ingen/gammal sajt + svarar nästan alltid | Hemsida (chatbot som rad två) |
| Nöjd med sajten + missar samtal | AI-Receptionist |
| Nöjd med sajten + "slippa samma frågor" | Chatbot (receptionist som rad två) |
| Vård/behandling + receptionist-signal | Receptionist-utfall med mjukare löfte: "vi ringer upp och ser om det passar din verksamhet" |

### Utfallsmall (Johnny-regeln: UTFALL + pris + CTA, aldrig spec/funktionslista)

Exempel, Allt-i-ett:

> **"Det här skulle ge dig mest: en digital reception som jobbar dygnet runt."**
> "En hemsida som får besökare att höra av sig. En chatt som svarar direkt på
> sidan. En receptionist som tar samtalen du missar och bokar in kunderna i
> din kalender."
> **"Från 14 995 kr att komma igång, sedan 2 295 kr i månaden."**
> "Lämna namn och nummer så ringer vi upp inom en arbetsdag och berättar exakt
> hur det skulle fungera för [bransch från fråga 1]."
> [Namn] [Telefon] [E-post (valfritt)] → knapp: **"Ja, ring mig"**

Singelprodukt-utfall: samma skelett med respektive produkts pitch + pris ur
avsnitt 2–4. Alltid "från"-pris. Branschekot från fråga 1 alltid med i sista raden.

### Lead till HubSpot (fas 5)
Kontakt + affär skapas med: Lead-kategori (fråga 1), samtliga svar som
anteckning, källa "Guiden", pipeline-stage "Guide-lead".

### Avslut utan kontaktuppgifter
"Inga problem. Ring oss på [PHIGO-nummer] eller testa vår receptionist direkt:
[receptionist-numret]."

---

## 6. Onboarding-principen (*Internt* — bor UTANFÖR sajten)

- Onboarding-formuläret är en länk kunden får efter köp (Google Form/Typeform
  v1), INTE en sida i detta repo. Native onboarding-sida = backlog §11.
- Checklista-grind före skickaknappen ("har du delat din kalender?" med
  gör-så-här-länk) — ett steg, aldrig ett stopp som ser ut som en bugg.
- Automatiskt kvittomejl vid inskick ("Vi kollar att allt är komplett och hör
  av oss inom 24 timmar"). Startskotts-mejl ("Nu har vi allt, klart senast den
  X") skickas MANUELLT efter att access verifierats — det är också
  granskningstillfället av kundens svar.
- Sajtens enda spår av detta: FAQ-raden "14 dagar från att vi fått dina uppgifter."

---

*Fas 0 därmed komplett. Fas 2 kan byggas. Vid minsta oklarhet i copy: fråga
Hugo, gissa aldrig.*
