# Snabbinstallation av GATOR LTE och GATOR WiFi med iO4R

<div style="text-align: center;">
  <img src="./io4r-cover.webp" alt="Utbyggnadsmodulen iO4R" style="width: 100%; max-width: 420px;">
</div>

Korta anvisningar för inkoppling och programmering i Protegus2 när en utbyggnadsmodul iO4R ansluts till en styrenhet för port, GATOR LTE eller GATOR WiFi. Använd anvisningen tillsammans med de fullständiga manualerna för [GATOR](../gator/index.md) och [GATOR WiFi](../gator-wifi/index.md) för alla övriga installations- och konfigurationsinställningar.

iO4R används för avancerad övervakning av porten. Modulen ger övervakade bevakningsingångar för portens säkerhetsgivare och gör det möjligt för behörig personal att tillfälligt förbikoppla en givare när ett fel måste isoleras tills service kan utföras. Protegus2 räknar också hela öppnings- och stängningscykler för porten och varnar när det är dags för underhåll, så att installatörer kan ersätta oplanerade utryckningar med schemalagda servicebesök och återkommande underhållsavtal.

!!! caution "Försiktighet"
    Installation och service får endast utföras av behörig personal. Koppla bort nätspänningen och lågspänningsmatningen innan du drar ledningarna. Följ portautomatikens tillverkares säkerhetsanvisningar och gällande lokala elföreskrifter.

## Förutsättningar

- Styrenheten GATOR LTE eller GATOR WiFi finns tillgänglig för installation. Håll matningen frånkopplad under inkopplingen.
- iO4R-modulens serienummer.
- Protegus2-konto för larmbolag eller installatör samt styrenhetens IMEI / unika ID.
- Givare för portens läge ansluten till styrenhetens ingång för portläge.
- Portens säkerhetsgivare anslutna via iO4R, om de ska övervakas eller förbikopplas i Protegus2.

## Inkoppling

Anslut iO4R till styrenhetens RS485-buss och matningsplintar enligt bilden nedan.

!!! note "Obs!"
    Kopplingsschemat visar plintbeteckningarna på GATOR LTE. För GATOR WiFi använder du motsvarande plintar `+DC`, `-DC`, `A RS485` och `B RS485` enligt manualen för GATOR WiFi.

<img src="./wiring-gator-io4r.webp" alt="Kopplingsschema för GATOR LTE och iO4R: nätaggregat, GATOR-plintarna AC/+DC, AC/-DC, 3 I/O, A RS485 och B RS485, iO4R:s plintar +DC, -DC, RS485A och RS485B samt portautomatikens ingångar, med portens säkerhetsgivare kopplad till iO4R:s ingång och iO4R:s utgång kopplad till portautomatikens säkerhetsingång">

Modulen iO4R används för att förbikoppla felaktiga säkerhetsgivare i portautomatiken. När du förbikopplar defekta givare och aktiverar portmekanismen ska du alltid kontrollera att inga hinder finns inom portens rörelseområde. 
Portens säkerhetsgivare är kopplade till portautomatikens styrenhet via iO4R-modulen. Modulen har fyra oberoende kanaler med ingång och utgång. Varje ingångskanal hör ihop med motsvarande reläutgångskontakter enligt följande:

- Ingång 1 → utgång 1 (1 NO / 1 C / 1 NC).
- Ingång 2 → utgång 2 (2 NO / 2 C / 2 NC).
- Ingång 3 → utgång 3 (3 NO / 3 C / 3 NC).
- Ingång 4 → utgång 4 (4 NO / 4 C / 4 NC).

Använd `3 I/O` som ingång för portläge vid cykelräkning. En cykel räknas först när porten har öppnats helt och stängts helt.

!!! important "Viktigt"
    I övervakningsinställningarna i Protegus2 är `I/O 3` reserverad för portläge och cykelräkning. Tilldela den inte om. Ingångarna `IN1` och `IN2` är reserverade för Wiegand.

## Lägg till styrenheten och iO4R i Protegus2

Logga in i Protegus2 med kontot för larmbolag eller installatör och lägg sedan till styrenheten.

<div class="steps-grid">
  <div class="step-card">
    <strong>Steg 1.</strong> Tryck på <strong>Add new system</strong>.
    <img src="./protegus-add-new-system.webp" alt="Protegus2, skärmen för att lägga till system: plusknappen nere till höger är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 2.</strong> Ange styrenhetens <strong>IMEI</strong> och tryck på <strong>Next</strong>.
    <img src="./protegus-enter-imei.webp" alt="Protegus2, fältet för unikt ID/IMEI och knappen Next är markerade">
  </div>
  <div class="step-card">
    <strong>Steg 3.</strong> Välj <strong>Advanced Gator Monitoring</strong> och tryck på <strong>Next</strong>.
    <img src="./protegus-select-advanced-gator-monitoring.webp" alt="Protegus2, val av inställningsläge: Advanced Gator Monitoring är markerat och knappen Next är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 4.</strong> Ange antal <strong>Cycles</strong> efter vilket underhåll krävs och tryck på <strong>Next</strong>.
    <img src="./protegus-set-cycles.webp" alt="Protegus2, skärmen Gate control and maintenance med fältet Cycles (3000) och knappen Next markerade">
  </div>
  <div class="step-card">
    <strong>Steg 5.</strong> Aktivera varje iO4R-utgång som är ansluten till en övervakad säkerhetsgivare eller statuskrets.
    <img src="./protegus-io4r-enable-outputs.webp" alt="Protegus2, skärmen iO4R Settings: fältet Serial number och reglagen för Output 1 till Output 4 är markerade">
  </div>
  <div class="step-card">
    <strong>Steg 6.</strong> Ange iO4R:s <strong>Serial number</strong> och tryck på <strong>OK</strong>.
    <img src="./protegus-io4r-enter-serial.webp" alt="Protegus2, dialogrutan Serial number med serienumret ifyllt; knappen OK är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 7.</strong> För varje aktiverad utgång: ange namn och ikon, låt utgångens <strong>Type</strong> vara <strong>Guard</strong>, tilldela motsvarande iO4R-ingång och ställ in ingångens <strong>Type</strong> så att den stämmer med inkopplingen. I exemplet är ingångstypen <strong>NO</strong>. Tryck på <strong>Next</strong>.
    <img src="./protegus-io4r-output-settings.webp" alt="Protegus2, iO4R Settings: Output 1 är påslagen med Assigned input Input 1 iOx1 och typen NO; knappen Next är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 8.</strong> Vänta medan Protegus2 skriver data.
    <img src="./protegus-writing-data.webp" alt="Protegus2, skärmen Restarting device medan enheten startas om efter att data har skrivits">
  </div>
  <div class="step-card">
    <strong>Steg 9.</strong> Tryck på <strong>Next</strong>.
    <img src="./protegus-press-next.webp" alt="Protegus2, skärmen Configuration almost done (75 %); knappen Next är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 10.</strong> Ange systemets <strong>Name</strong> och tryck på <strong>Next</strong>.
    <img src="./protegus-enter-system-name.webp" alt="Protegus2, formuläret för nytt system med namnfältet och knappen Next markerade">
  </div>
  <div class="step-card">
    <strong>Steg 11.</strong> Tryck på <strong>Skip</strong> om du inte vill lägga till användare nu.
    <img src="./protegus-skip.webp" alt="Protegus2, bekräftelsen System added successfully; knappen Skip är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 12.</strong> Vänta ca 1 minut tills det är klart.
    <img src="./protegus-wait-completion.webp" alt="Protegus2, systemvyn Gator med meddelandet att det kan ta upp till 1 minut innan systemet är fullt funktionsdugligt">
  </div>
</div>

## Överför systemet till användaren

När inställningarna är klara överför du systemet till användarens Protegus2-konto.

<div class="steps-grid">
  <div class="step-card">
    <strong>Steg 13.</strong> Tryck på <strong>Menu</strong>.
    <img src="./protegus-open-menu.webp" alt="Protegus2, systemvyn Gator; menyknappen uppe till vänster">
  </div>
  <div class="step-card">
    <strong>Steg 14.</strong> Tryck på <strong>Settings</strong>.
    <img src="./protegus-settings.webp" alt="Protegus2, menyn med Events, Users, Outputs, Settings och Cameras; Settings är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 15.</strong> Tryck på <strong>Transfer system</strong>.
    <img src="./protegus-transfer-system.webp" alt="Protegus2, skärmen Configure Gator; alternativet Transfer system är markerat">
  </div>
  <div class="step-card">
    <strong>Steg 16.</strong> Ange användarens e-postadress och tryck på <strong>Transfer</strong>.
    <img src="./protegus-enter-user-email.webp" alt="Protegus2, skärmen för att överföra systemet med e-postfältet och knappen Transfer">
  </div>
</div>

## Kontrollera övervakning och styrning av porten

Användaren måste logga in i Protegus2 med sitt konto efter överföringen.

!!! warning "Varning"
    Förbikoppling av en säkerhetsgivare i porten kan sätta skyddet ur funktion. Använd förbikoppling endast som en tillfällig, behörig serviceåtgärd och återställ givarens normala drift innan anläggningen tas i bruk igen.

<div class="steps-grid">
  <div class="step-card">
    <strong>Steg 17.</strong> Tryck på <strong>Gate control</strong> för att se cykelräknaren.
    <img src="./protegus-gate-control.webp" alt="Protegus2, systemvyn Gator online; knappen Gate control är markerad">
  </div>
  <div class="step-card">
    <strong>Steg 18.</strong> Kontrollera <strong>Total cycles</strong> och <strong>Cycles to maintenance</strong>. Om behörig installatör behöver kontrollera säkerhetsgivarnas status trycker du på <strong>Input status</strong>.
    <img src="./protegus-gate-cycles-input-status.webp" alt="Protegus2, skärmen Gate control med räknarna Total cycles (0) och Cycles to maintenance (3000) samt knappen Input status markerade">
  </div>
  <div class="step-card">
    <strong>Steg 19.</strong> Använd <strong>Input status / bypass</strong> endast när en säkerhetsgivare har kontrollerats och en tillfällig förbikoppling behövs.
    <img src="./protegus-input-status-bypass.webp" alt="Protegus2, skärmen Input status / bypass med I/O 3 och Input 1 iOx1 till Input 4 iOx4; reglagen för förbikoppling är markerade">
  </div>
  <div class="step-card">
    <strong>Steg 20.</strong> Tryck på ikonen för portstyrning för att öppna porten.
    <img src="./protegus-open-gate.webp" alt="Protegus2, systemvyn Gator med ikonen för portstyrning markerad">
  </div>
</div>

## Systemkontroll

1. Öppna och stäng porten helt och kontrollera att cykelräknaren ändras som förväntat.
2. Påverka varje övervakad iO4R-ingång och kontrollera att ingångens status ändras i Protegus2.
3. Testa ikonen för portstyrning och kontrollera att portautomatiken svarar som den ska.
