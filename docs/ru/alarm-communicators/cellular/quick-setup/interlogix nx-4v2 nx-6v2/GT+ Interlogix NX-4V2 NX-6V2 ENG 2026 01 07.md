# Interlogix NX-4V2 / NX-6V2 с GT/GT+/GET быстрая настройка

Краткие шаги по подключению и программированию для подключения коммуникатора GT/GT+/GET к панелям Interlogix NX-4V2, Interlogix NX-6V2 через KeyBus, затем добавления системы в Protegus2. Используйте вместе с полными руководствами для остальных настроек. (Обозначения клемм на GT/GT+/GET могут немного отличаться, но подключения одинаковые.)

!!! caution "Осторожно"
    Установку и обслуживание должны выполнять только квалифицированные специалисты. Перед подключением отключите питание. Несанкционированные изменения аннулируют гарантию.

## Требования

1. Прошивка GT/GT+/GET 1.21, SIM-карта установлена, PIN отключен, активен тариф с передачей данных.
1. Панель Interlogix NX-4V2 / NX-6V2 с доступом к клавиатуре (есть код установщика).
1. Номер учетной записи CMS, если используется передача в CMS.
1. Учетная запись компании/установщика Protegus2 и IMEI коммуникатора.

## Подключение

Следуйте схеме ниже, чтобы подключить коммуникатор к панели:

| **Клемма GT/GT+/GET** | **Панель Interlogix** | **Примечания**           |
| --------------------- | --------------------- | ------------------------ |
| +12V DC/-12V DC       | POS/COM               | Питание коммуникатора    |
| DATA                  | DATA                  | KeyBus                   |


<img src="../GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31.png" alt="GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31" class="GT+ Interlogix NX-4V2 prijungimo schema ENG 2025 12 31">



<img src="../GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31.png" alt="GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31" class="GT+ Interlogix NX-6V2 prijungimo schema ENG 2025 12 31">


## Программирование панели сигнализации Interlogix NX-4V2, Interlogix NX-6V2 через LCD клавиатуру

Используя клавиатуру панели, войдите в следующие разделы и настройте их как указано:

**Включение отчетов Contact ID**

| **LCD клавиатура**     | **Ввод с клавиатуры** | **Описание действия**                                           |
| ---------------------- | --------------------- | --------------------------------------------------------------- |
| System ready           | *89713                | Войти в режим программирования                                  |
| Enter device address   | 0#                    | Перейти в главное меню программирования панели                  |
| Enter location         | 4#                    | Перейти в меню переключателей “Phone1 events reported”          |
| Loc#4 Seg#1            | 12345678*             | Все переключатели должны быть включены. * сохранить и перейти к следующему меню |
| Loc#4 Seg#2            | 12345678*             | Все переключатели должны быть включены. * сохранить и вернуться назад |
| Enter location         | 23#                   | Перейти в меню “Partition features”.                            |
| Loc#23 Seg#1           | **                    | Нажмите * дважды, чтобы перейти в меню переключателей секции 3.  |
| Loc#23 Seg#3           | 12345678*#            | Секция 3. Все переключатели должны быть включены, нажмите * для сохранения, затем # для сохранения и # для возврата в главное меню. |
| Enter location         | 37#                   | Перейти в меню “Siren and system supervision”.                  |
| Loc#37 Seg#1           | **                    | Нажмите * дважды, чтобы перейти в меню переключателей секции 3.  |
| Loc#37 Seg#3           | 12345678*             | Секция 3. Все переключатели должны быть включены, нажмите * для сохранения. |
| Loc#37 Seg#4           | 12345678*#            | Секция 4. Все переключатели должны быть включены, нажмите * для сохранения, затем # для сохранения и # для возврата в главное меню. |
| Enter location         | EXIT EXIT             | Нажмите “EXIT” дважды, чтобы выйти из режима программирования.  |

## Программирование панели сигнализации Interlogix NX-4V2, Interlogix NX-6V2 через LED клавиатуру

Используя клавиатуру панели, войдите в следующие разделы и настройте их как указано:

**Включение отчетов Contact ID**

| **LED клавиатура**                      | **Ввод с клавиатуры** | **Описание действия**                                           |
| --------------------------------------- | --------------------- | --------------------------------------------------------------- |
| Ready и Power горят постоянно           | *89713                | Войти в режим программирования                                  |
| Service мигает                          | 0#                    | Перейти в главное меню программирования панели                  |
| Service мигает, Armed горит постоянно   | 4#                    | Перейти в меню переключателей “Phone1 events reported”          |
| Все светодиоды зон горят                | 12345678*             | Все переключатели должны быть включены. * сохранить и перейти к следующему меню |
| Все светодиоды зон горят                | 12345678*             | Все переключатели должны быть включены. * сохранить и вернуться назад |
| Service мигает, Armed горит постоянно   | 23#                   | Перейти в меню “Partition features and reporting selection”.    |
| Service мигает, Ready горит постоянно   | **                    | Нажмите * дважды, чтобы перейти в меню переключателей секции 3.  |
| Service мигает, Ready горит постоянно   | 12345678*#            | Секция 3. Все переключатели должны быть включены, нажмите * для сохранения, затем # для сохранения и # для возврата в главное меню. |
| Service мигает, Armed горит постоянно   | 37#                   | Перейти в меню “Siren and system supervision”.                  |
| Service мигает, Ready горит постоянно   | **                    | Нажмите * дважды, чтобы перейти в меню переключателей секции 3.  |
| Service мигает, Ready горит постоянно   | 12345678*             | Секция 3. Все переключатели должны быть включены, нажмите * для сохранения. |
| Service мигает, Ready горит постоянно   | 12345678*#            | Секция 4. Все переключатели должны быть включены, нажмите * для сохранения, затем # для сохранения и # для возврата в главное меню. |
| Service мигает, Armed горит постоянно   | EXIT EXIT             | Нажмите “EXIT” дважды, чтобы выйти из режима программирования.  |

## Добавление системы в Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Шаг 1.</strong> Нажмите <strong>Add new system</strong>.
        <img src="../GT+ interlogix nx 4v2 1 ENG 2025 12 31.png" alt="Add new system">
  </div>
  
 
  <div class="step-card">
        <strong>Шаг 2.</strong> Введите <strong>IMEI</strong> коммуникатора, нажмите <strong>Next</strong>.
        <img src="../GT+ interlogix nx 4v2 2 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 3.</strong> Выберите охранную компанию.
        <img src="../GT+ interlogix nx 4v2 3 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 4.</strong> Выберите <strong>Interlogix</strong>.
        <img src="../GT+ interlogix nx 4v2 4 ENG 2025 12 31.png" alt="Add new system">
  </div>
  

  <div class="step-card">
        <strong>Шаг 5.</strong> Выберите <strong>NX-4</strong> (<strong>NX-6</strong>).
        <img src="../GT+ interlogix nx 4v2 5 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 6.</strong> Введите <strong>Object ID</strong> и <strong>Module ID</strong>, нажмите <strong>Next</strong>.
        <img src="../GT+ interlogix nx 4v2 6 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 7.</strong> Подождите, пока записываются данные.
        <img src="../GT+ interlogix nx 4v2 7 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 8.</strong> Нажмите <strong>Add to Protegus2</strong>.
        <img src="../GT+ interlogix nx 4v2 8 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 9.</strong> Введите <strong>Name</strong> системы, нажмите <strong>Next</strong>.
        <img src="../GT+ interlogix nx 4v2 9 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 10.</strong> Нажмите <strong>Skip</strong>.
        <img src="../GT+ interlogix nx 4v2 10 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 11.</strong> Нажмите на систему.
        <img src="../GT+ interlogix nx 4v2 11 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 12.</strong> Подождите 1 минуту для завершения и нажмите <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 4v2 12 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 13.</strong> Введите e-mail пользователя, которому установщик передаст систему. Нажмите <strong>Transfer</strong>.
        <img src="../GT+ interlogix nx 4v2 13 ENG 2025 12 31.png" alt="Add new system">
  </div>


  <div class="step-card">
        <strong>Шаг 14.</strong> Система появится в Protegus на телефоне пользователя.
        <img src="../GT+ interlogix nx 4v2 14 ENG 2025 12 31.png" alt="Add new system">
  </div>





</div>

!!! tip "Совет"
    После завершения установки и настройки выполните проверку системы:

    1. Создайте событие:

       - поставьте/снимите систему с охраны с клавиатуры панели управления.
       - вызовите тревогу зоны при включенной охране.

    2. Убедитесь, что событие поступает в CMS (Central Monitoring Station) и в приложение Protegus2.
