# PLAYBOOK — bygga kundsidor snabbare med det vi lärt oss

_Skapad 2026-11-25. Destillat av allt vi lärde oss när PHIGOs egen sajt byggdes
och optimerades (mars–november 2026). Detaljerna och historiken finns i
`lessons.md`, `implementation/IMPLEMENTATION_v2.md` och
`IMPLEMENTATIONPLAN_WEBSITE_UPDATES.md`. Den här filen är checklistan._

**Viktigt:** kundhemsidor byggs i **vanilla HTML/CSS/JS**, inte Next.js eller
Tailwind (se `lessons.md`, mars 2026). Principerna nedan är skrivna så att de
gäller oavsett teknik. Där något bara gäller vår Next-sajt står det uttryckligen.

---

## 1. Innan bygget — erbjudande och copy

- **Offer-strukturen** styr varje sida: utfall (vad kunden får) → hur det går
  till (max 3 steg) → varför det fungerar → vad det är och inte är → pris.
- **Klarspråk på kundytan.** Inga tekniska ord (SEO, hosting, CMS, responsiv).
  Skriv "Hittar folk dig på Google?", inte "SEO-optimerad".
- **Inga tankstreck (—) i synlig text.** Punkt och ny mening, eller komma. Läses
  som AI-skrivet. Undantag: sifferintervall och titelseparator i metadata.
- **Inga utropstecken i rubriker.** Lugnt och säkert, Apple/Stripe-ton.
- **Bara riktiga kunder som bevis.** Inga påhittade logotyper eller företag.
  Demos märks "Konceptcase", och "kundcase" och "designexempel" får aldrig
  glida ihop.
- **Priser:** baspris får synas, tillägg beskrivs utan siffra.
- **En primär CTA som säger vad besökaren får**, till exempel "Se vad din
  hemsida missar, kostnadsfritt". Samma formulering överallt, och den leder
  till kontaktformuläret.

## 2. Struktur

- **Single-page är standard** för 8 000 kr-paketet. Undersidor är en
  uppsäljning när kunden har eget innehåll per tjänst.
- Beprövad ordning: Hero (problem + löfte + CTA) → bevis/exempel → erbjudande
  → process i 3 steg → varför oss → vanliga frågor → avslutande CTA +
  kontaktformulär.
- **Kontaktformuläret:** namn, företag, e-post, hemsida (valfri), ärende,
  meddelande. Validering på svenska. Lova svar inom en tydlig tid (vi lovar 24 timmar).
- **Länkar till ankare på en annan sida** (till exempel startsidans kontakt-
  formulär från en undersida) måste testas: en vanlig länk med full sidladdning
  kan landa överst i stället för vid formuläret. Verifiera att besökaren
  faktiskt hamnar där.

## 3. Design

- **Ljust läge som standard. Grönt (kundens accent) är accent, aldrig yta i
  ljust läge.** Ytorna är neutrala vita/grå.
- **Färger som tokens från start** (bakgrund, text, accent, kort, ram), inga
  hårdkodade färger i komponenter. Mörkt läge blir då en ändring på ett ställe.
- **Kontrast mäts mot den yta som faktiskt syns**, inte mot det man tror att
  bakgrunden är. Ljusa grå på vitt underkänns lätt. Mål: WCAG AA (4,5:1 för
  brödtext).
- **Dekorelement** (orbs, blobbar) ska vara helt synliga eller skymmas av ett
  opakt innehållselement, aldrig klippas av skärmkant, header eller
  sektionsgräns. En primär, få sekundära. Ingen dekor bakom text.
- **Tryckytor minst cirka 24×24 px**, även när det synliga elementet är
  mindre (till exempel prickar under en karusell). Förstora den klickbara ytan
  med osynlig marginal.
- **Interaktiva tillstånd på allt klickbart:** hover, synlig fokusring och en
  liten press-effekt.

## 4. Prestanda och mobil

- **Animera bara transform och opacity**, aldrig layout-egenskaper. Respektera
  "reducerad rörelse".
- **Tona inte in huvudrubriken.** Google räknar den största texten (oftast
  rubriken) som synlig först när animationen är klar. På vår sajt gav det
  ~2,9 s renderingsfördröjning och Speed Index 5,2 s på mobil (PSI 2026-11-25).
  Visa rubriken direkt, animera resten.
- **Ingen backdrop-blur på fixerade element på mobil** (headern). Den ritas om
  vid varje scroll-frame och hackar på svaga telefoner. Solid bakgrund under
  mobilbrytpunkten, glas bara på desktop.
- **Fullhöjds-hero: använd svh (small viewport height), inte dvh.** dvh ändras
  när adressfältet glider och sidan hoppar.
- **Layoutskift:** element som byter innehåll (stegvisa guider, flikar) får ett
  höjdgolv som är **uppmätt** i alla bredder, inte gissat.
- **Tredjepartsskript (chatt, kartor, bokningswidgets) är den största
  prestandakostnaden.** Vår chattwidget är ~470 KiB varav ~320 KiB oanvänt
  vid sidladdning. Ladda dem efter att sidan är interaktiv, helst först när
  besökaren klickar (en egen knapp som laddar skriptet vid klick). Lås
  versionen, ladda aldrig "latest".
- **Bilder:** moderna format (WebP/AVIF), rätt storlek, lazy loading under
  vecket.

## 5. Chatbot och AI-receptionist på en kundsida

- **Allowlist i ElevenLabs** på både agenten och widgeten: kundens domän,
  www-varianten och eventuell preview-domän. Ny preview-domän måste läggas till
  innan widgeten startar där. Agent-ID:t syns i källkoden. Det är allowlisten
  som skyddar.
- **CSP:** widgeten behöver unpkg.com (skript), api.elevenlabs.io och
  underdomäner (https + wss) samt storage.googleapis.com (avatarbild). Kör
  först i Report-Only, gå över till skarp policy när konsolen är tyst med ett
  riktigt samtal igång. Se `next.config.mjs` för vår färdiga policy.
- **Testa chatten och numret som en kund** innan lansering: pris, bokning,
  meddelande, engelska.

## 6. SEO och delning

- Unik titel och beskrivning per sida, OG-bild 1200×630, språk satt till
  svenska.
- **Strukturerad data:** företagsuppgifter på alla sidor, Service på varje
  tjänstesida, FAQPage där vanliga frågor finns (genererad från samma data som
  frågorna på sidan, så de aldrig glider isär), BlogPosting på inlägg.
- sitemap och robots från start. IndexNow-ping vid publicering om hostingen
  tillåter.

## 7. Verifiering innan "klar"

- **Mät mot en nystartad server**, aldrig en gammal instans som redan körs.
- **Skärmdumpar av hela sidan fångar scroll-animerat innehåll osynligt**
  (opacity 0). Det ser ut som kontrastfel men är det inte. Scrolla in varje
  sektion eller stäng av animationer innan du bedömer färg och kontrast. Samma
  fälla kan ge falska kontrastfel i PageSpeed.
- **Headless-mätningar:** CLS och horisontell scroll är pålitliga; fps och LCP
  är brusiga. Bekräfta på riktig mobil och med PageSpeed Insights.
- **Grindskript lönar sig:** vi har skript som kontrollerar att varje CTA
  landar på rätt ankare, geometriska designregler och guidens flöde
  (`scripts/`). En grind som jämför appens värde mot samma värde godkänner sina
  egna fel, så mät mot något oberoende.
- Checklista: mobilvy, formuläret skickar på riktigt, inga konsolfel, alla
  bilder har alt-text, metadata stämmer, ordlistan följd.

## 8. Riktmärke — PHIGOs sajt (PageSpeed 2026-11-25, startsidan)

| | Prestanda | Tillgänglighet | Bästa metoder | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Mobil | 91 | 92 | 100 | 100 | 2,0 s | 0 | 200 ms |
| Dator | 88 | 96 | 100 | 100 | 1,6 s | 0 | 190 ms |

Det som drog ned: chattwidgeten (oanvänd JS och huvudtrådstid), inbleknande
hero-rubrik, renderingsblockerande CSS (~220 ms på mobil), små tryckytor på
karusellprickar och en kontrastflagga på CTA-knappen. En kundsida i vanilla
HTML utan widget bör ligga över detta.

## 9. Verktygsfällor (vår egen sajt)

- Alltid pnpm, aldrig npm/yarn.
- Redigera inte UTF-8-filer via PowerShell-strängar (å/ä/ö förstörs).
- Tailwind 4 läser även markdown och kommentarer: skriv aldrig Tailwind-klasser
  med godtyckligt värde inom hakparentes i dokumentation.
- Git på Windows visar radslutsändringar som ändrade filer. Committa bara
  filer med riktiga ändringar.
