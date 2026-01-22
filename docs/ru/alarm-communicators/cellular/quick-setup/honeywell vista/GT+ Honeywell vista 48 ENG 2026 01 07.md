# Honeywell Vista-48 с GT/GT+/GET быстрая настройка

Краткие шаги по подключению и программированию для подключения коммуникатора GT/GT+/GET к панели Honeywell Ademco Vista-48 (Vista-20, Vista-15) через KeyBus, затем добавления системы в Protegus2. Используйте вместе с полными руководствами для остальных настроек. (Обозначения клемм на GT/GT+/GET могут немного отличаться, но подключения одинаковые.)

!!! caution "Осторожно"
    Установку и обслуживание должны выполнять только квалифицированные специалисты. Перед подключением отключите питание. Несанкционированные изменения аннулируют гарантию.

## Требования

1. Прошивка GT/GT+/GET 1.21, SIM-карта установлена, PIN отключен, активен тариф с передачей данных.
1. Панель Honeywell Ademco Vista-48 (Vista-20, Vista-15) с доступом к клавиатуре (есть код установщика).
1. Номер учетной записи CMS, если используется передача в CMS.
1. Учетная запись компании/установщика Protegus2 и IMEI коммуникатора.

## Подключение

Следуйте схеме ниже, чтобы подключить коммуникатор к панели:

| **Клемма GT/GT+/GET** | **Панель Honeywell** | **Примечания**           |
| --------------------- | -------------------- | ------------------------ |
| +12V DC/-12V DC       | 5/4                  | Питание коммуникатора    |
| CLK/DATA              | 7/8                  | KeyBus                   |


<img src="../GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.png" alt="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## Программирование панели сигнализации Honeywell Ademco Vista-48 (Vista-20, Vista-15) через клавиатуру

Используя клавиатуру панели, войдите в следующие разделы и настройте их как указано:

**Включение отчетов Contact ID**

| **Ввод с клавиатуры** | **Описание действия**                     |
| --------------------- | ----------------------------------------- |
| *4112800 *            | Войти в режим программирования            |
| *591 *                | Включить “Exit Error Report Code”.        |
| *601 *                | Включить “Trouble Report Code”.           |
| *611 *                | Включить “Bypass reporting Code”.         |
| *621 *                | Включить “AC Mains Loss Report Code”.     |
| *631 *                | Включить “Low Battery Report Code”.       |
| *641 *                | Включить “Test Report Code”.              |
| *651 *                | Включить “Open Report Code”.              |
| *661 *                | Включить “Arm Away/Stay Report Code”.     |
| *671 *                | Включить “RF Low Battery Report Code”.    |
| *681 *                | Включить “Cancel Report Code”.            |
| *691 *                | Включить “Alarm Restores”.                |
| *701 *                | Включить “Alarm Restore Report Code”.     |
| *711 *                | Включить “Trouble Restore Report Code”.   |
| *721 *                | Включить “Bypass Restore Report Code”.    |
| *731 *                | Включить “AC Mains Restore Report Code”.  |
| *741 *                | Включить “Low Battery Restore Report Code”. |
| *751 *                | Включить “RF Low Restore Code”.           |
| *761 *                | Включить “Test Restore Report Code”.      |
| *291 *                | Включить “ECP Contact ID Output for ACM”. |
| *1891 *               | Включить “AUI Device 1 and 2 Enable”.     |
| *99                   | Выйти из режима программирования.         |

## Добавление системы в Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Шаг 1.</strong> Нажмите <strong>Add new system</strong>.
        <img src="../GT+ honeywell vista 48 1 ENG 2026 01 05.png" alt="Add new system">
  </div>
  
 
  <div class="step-card">
        <strong>Шаг 2.</strong> Введите <strong>IMEI</strong> коммуникатора, нажмите <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 2 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 3.</strong> Выберите охранную компанию.
        <img src="../GT+ honeywell vista 48 3 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 4.</strong> Выберите <strong>Honeywell</strong>.
        <img src="../GT+ honeywell vista 48 4 ENG 2026 01 05.png" alt="Add new system">
  </div>
  

  <div class="step-card">
        <strong>Шаг 5.</strong> Выберите <strong>Vista 48 (Vista 20, Vista 15)</strong>.
        <img src="../GT+ honeywell vista 48 5 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 6.</strong> Введите <strong>Object ID</strong> и <strong>Module ID</strong>, нажмите <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 6 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 7.</strong> Подождите, пока записываются данные.
        <img src="../GT+ honeywell vista 48 7 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 8.</strong> Нажмите <strong>Add to Protegus2</strong>.
        <img src="../GT+ honeywell vista 48 8 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 9.</strong> Введите <strong>Name</strong> системы, нажмите <strong>Next</strong>.
        <img src="../GT+ honeywell vista 48 9 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 10.</strong> Нажмите <strong>Skip</strong>.
        <img src="../GT+ honeywell vista 48 10 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 11.</strong> Нажмите на систему.
        <img src="../GT+ honeywell vista 48 11 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 12.</strong> Подождите 1 минуту для завершения и нажмите <strong>Transfer</strong>.
        <img src="../GT+ honeywell vista 48 12 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 13.</strong> Введите e-mail пользователя, которому установщик передаст систему. Нажмите <strong>Transfer</strong>.
        <img src="../GT+ honeywell vista 48 13 ENG 2026 01 05.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 14.</strong> Система появится в Protegus на телефоне пользователя.
        <img src="../GT+ honeywell vista 48 14 ENG 2026 01 05.png" alt="Add new system">
  </div>




</div>

!!! tip "Совет"
    После завершения установки и настройки выполните проверку системы:

    1. Создайте событие:

       - поставьте/снимите систему с охраны с клавиатуры панели управления.
       - вызовите тревогу зоны при включенной охране.

    2. Убедитесь, что событие поступает в CMS (Central Monitoring Station) и в приложение Protegus2.
