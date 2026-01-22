# Paradox SP(+)/MG(+) с GT/GT+/GET быстрая настройка

Краткие шаги по подключению и программированию для подключения коммуникатора GT/GT+/GET к панелям Paradox SP/SP+/MG/MG+ через TIP/RING и KeyBus, затем добавления системы в Protegus2. Используйте вместе с полными руководствами для остальных настроек. (Обозначения клемм на GT/GT+/GET могут немного отличаться, но подключения одинаковые.)

!!! caution "Осторожно"
    Установку и обслуживание должны выполнять только квалифицированные специалисты. Перед подключением отключите питание. Несанкционированные изменения аннулируют гарантию.

## Требования

1. Прошивка GT/GT+/GET 1.21, SIM-карта установлена, PIN отключен, активен тариф с передачей данных.
1. Панель Paradox SP/SP+/MG/MG+ с доступом к клавиатуре (есть код установщика).
1. Номер учетной записи CMS, если используется передача в CMS.
1. Учетная запись компании/установщика Protegus2 и IMEI коммуникатора.

## Подключение

Следуйте схеме ниже, чтобы подключить коммуникатор к панели:

| Клемма GT/GT+/GET | Панель Paradox | Примечания |
| --- | --- | --- |
| TIP / RING | TIP / RING | Эмуляция PSTN линии (Contact ID). |
| CLK / DATA (KeyBus) | YEL / GRN (KeyBus) | Управление по серийному BUS. |
| +12V / GND | AUX + / GND | Питание коммуникатора. |

<style>
.wiring-diagram {
  max-width: 900px;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

<img src="./wiring-diagram.svg" alt="Схема подключения" class="wiring-diagram">

## Программирование панели Paradox (LCD клавиатура)

Используйте клавиатуру панели, чтобы включить Contact ID и задать номера учетных записей:

1. Вход в программирование установщика: `[ENTER] 0000` (или ваш код установщика).
2. Раздел 801: общие параметры дозвона → оставьте по умолчанию, если не требуется иное.
3. Раздел 811: введите номер учетной записи Раздела 1 (пример `1111`; используйте значение от CMS).
4. Раздел 812: введите номер учетной записи Раздела 2 (пример `2222`; используйте значение от CMS).
5. Раздел 815: введите номер телефона для передачи (пример `123456`; используйте значение от CMS).
6. Раздел 911: задайте пароль ПК (пример `1234`; по вашей политике).
7. Нажмите `[CLEAR]`, чтобы выйти из программирования.

Если коды клавиатуры отличаются, используйте полное руководство Paradox.

## Добавление системы в Protegus2 (мобильное приложение или веб)

<style>
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}
.step-card {
  padding: 8px;
  border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
  border-radius: 6px;
  background: var(--md-default-bg-color, #fff);
}
.step-card img {
  width: 100%;
  height: auto;
  display: block;
}
</style>

<div class="steps-grid">
  <div class="step-card">
    <strong>Шаг 1.</strong> Нажмите <strong>Add new system</strong>.
    <img src="./protegus-add-new-system.png" alt="Add new system">
  </div>
  <div class="step-card">
    <strong>Шаг 2.</strong> Введите <strong>IMEI</strong> коммуникатора, нажмите <strong>Next</strong>.
    <img src="./protegus-enter-imei.png" alt="Enter IMEI">
  </div>
  <div class="step-card">
    <strong>Шаг 3.</strong> Выберите <strong>TIP RING</strong>, нажмите <strong>Next</strong>.
    <img src="./protegus-select-tip-ring.png" alt="Select TIP RING">
  </div>
  <div class="step-card">
    <strong>Шаг 4.</strong> Нажмите <strong>Back</strong>.
    <img src="./protegus-back.png" alt="Back">
  </div>
  <div class="step-card">
    <strong>Шаг 5.</strong> Выберите <strong>Serial BUS</strong>, нажмите <strong>Next</strong>.
    <img src="./protegus-select-serial-bus.png" alt="Select Serial BUS">
  </div>
  <div class="step-card">
    <strong>Шаг 6.</strong> Выберите <strong>PARADOX</strong>.
    <img src="./protegus-select-paradox.png" alt="Select Paradox">
  </div>
  <div class="step-card">
    <strong>Шаг 7.</strong> Выберите <strong>PARADOX SP+/MG+ series KeyBus</strong>.
    <img src="./protegus-select-paradox-keybus.png" alt="Select Paradox KeyBus">
  </div>
  <div class="step-card">
    <strong>Шаг 8.</strong> Введите <strong>Primary Object ID</strong>, нажмите <strong>Next</strong>.
    <img src="./protegus-primary-object-id.png" alt="Enter Primary Object ID">
  </div>
  <div class="step-card">
    <strong>Шаг 9.</strong> Подождите, пока записываются данные.
    <img src="./protegus-writing-data.png" alt="Writing data">
  </div>
  <div class="step-card">
    <strong>Шаг 10.</strong> Нажмите <strong>Next</strong>.
    <img src="./protegus-press-next.png" alt="Press Next">
  </div>
  <div class="step-card">
    <strong>Шаг 11.</strong> Введите <strong>Name</strong> системы, нажмите <strong>Next</strong>.
    <img src="./protegus-enter-name.png" alt="Enter name">
  </div>
  <div class="step-card">
    <strong>Шаг 12.</strong> Нажмите <strong>Skip</strong> (если не добавляете пользователей сейчас).
    <img src="./protegus-skip.png" alt="Skip">
  </div>
  <div class="step-card">
    <strong>Шаг 13.</strong> Подождите ~1 минуту для завершения.
    <img src="./protegus-wait.png" alt="Wait">
  </div>
  <div class="step-card">
    <strong>Шаг 14.</strong> Настройка завершена.
    <img src="./protegus-finished.png" alt="Finished">
  </div>
</div>

!!! tip "Совет"
    Если Protegus2 не может завершить запись данных, проверьте подключение KeyBus (YEL/GRN), ввод IMEI и сохранение настроек CMS/Contact ID на панели.
