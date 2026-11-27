# Utbyggnadsmodul iO-8 för ingångar och utgångar

<div style="text-align: center;">
  <img src="./cover.webp" alt="Foto av det gröna kretskortet iO-8 med plintar för +DC, -DC, A, B och AUX-matning till vänster och åtta numrerade ingångs-/gemensamma plintar (1 till 8, med C mellan varje) längs underkanten." width="400">
</div>

Med utbyggnadsmodulen iO-8 kan du öka antalet ingångar och utgångar i en kompatibel TRIKDIS-enhet.

iO-8 har 8 kontakter som kan ställas in som ingång eller utgång.

På [sidan om iO-8 på *trikdis.com*](http://www.trikdis.com/) finns enhetens specifikationer och en aktuell lista över kompatibla TRIKDIS-enheter.

Kompatibel med [SP3](/en/control-panels/sp3/), [CG17](/en/control-panels/cg17/), [GT+](../../alarm-communicators/cellular/gt-plus/index.md), [GT](../../alarm-communicators/cellular/gt/index.md), [G16](/en/alarm-communicators/cellular/g16/), [G16T](/en/alarm-communicators/cellular/g16t/), [G17F](/en/alarm-communicators/fire-panels/g17f/), [E16](/en/alarm-communicators/e16/), [E16T](/en/alarm-communicators/e16t/), [GATOR Cellular](../../gate-controllers/gator/index.md) och [GATOR WiFi](../../gate-controllers/gator-wifi/index.md).

**Gör så här för att ställa in iO-8:**

1.  Anslut iO-8 till en kompatibel TRIKDIS-enhet enligt bilden:

<img alt="Kopplingsschema: TRIKDIS-enhetens plintar +DC, -DC, 485 A och 485 B är förbundna med fyra parallella ledare märkta (+12 V) till motsvarande plintar +DC, -DC, A och B på iO-8-modulen." src="./image1.webp" style="display: block; margin: 1rem auto; max-width: 350px; height: auto;" />

2.  Anslut ingångarna enligt bilden:

<img alt="Tre kopplingsscheman där en ingångsplint på iO-8 (xIN) och den gemensamma plinten (C) är kopplade till en normalt öppen kontakt, en normalt sluten kontakt och en normalt öppen/sluten kontakt i kombination med ett slutmotstånd (EOL) på 2,2 kΩ (10 kΩ)." src="./image2.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

Kopplingsscheman och motståndsvärden för ingångarna bestäms av den huvudenhet som iO-8-modulen är ansluten till.

3.  Anslut utgångarna enligt bilden:

<img alt="Två kopplingsscheman: iO-8:s plintar AUX+ och xOUT kopplade till en reläspole vars kontakter har plintarna NC, C och NO, samt separat till ett motstånd på 2,2 kΩ i serie med en lysdiod." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 530px; height: auto;" />

4.  Anslut en USB-kabel till TRIKDIS-huvudenheten och öppna programvaran TrikdisConfig. Klicka på **Read [F4]**.

5.  Gå till fönstret Modules och klicka på en ledig rad i rutan ”RS485 modules”. Välj ”iO-8 expander” i rullgardinslistan enligt bilden:

<img alt="Skärmbild av TrikdisConfig, fönstret Modules med tabellen RS485 modules; en rullgardinslista är öppen på rad 1 och ”iO-8 expander” är markerad bland alternativen Not available, iO expander, iO-WL radio expander, TM17 Reader, RF-SH wireless transceiver, FLS fuel sensor, E485 communicator och W485 (W17u) module." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

6.  Ange iO-8:s serienummer (endast siffror) i cellen till höger. Du hittar numret på etiketten på iO-8.

7.  I rullgardinsmenyerna **Input** och **PGM Output** (fönstret Zones and PGM) visas nu iO-8:s ingångar och utgångar, som du kan aktivera:

    <img alt="Skärmbild av TrikdisConfig, fönstret Zones; rullgardinslistan Input för sektion 1 är öppen med alternativen Disable, CG17 1 IN och RS485 Expander ID1 IO2 till IO8, där ”RS485 Expander ID1, IO2” är markerat." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

Inställningarna kan skilja sig beroende på TRIKDIS-huvudenheten. Konfigurera sektioner och PGM-utgångar enligt huvudenhetens manual.

8.  Klicka på **Write [F5**] när du är klar och koppla bort USB-kabeln.

9.  Påverka ingångarna och koppla utgångarna för att testa installationen.
