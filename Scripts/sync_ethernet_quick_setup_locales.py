#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
from shutil import copy2
from textwrap import dedent


ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
LOCALES = ("lt", "es", "ru")
E16_IMAGE_NAMES = (
    "dsc.png",
    "honeywell.png",
    "paradox.png",
    "caddx.png",
    "texecom.png",
    "innerrange-inception.png",
    "innerrange-integriti.png",
)


def bullet_list(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def numbered_list(items: list[str]) -> str:
    return "\n".join(f"1. {item}" for item in items)


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_text(encoding="utf-8") == content:
        return
    path.write_text(content, encoding="utf-8")


COMMON = {
    "lt": {
        "caution": dedent(
            """
            !!! caution "Atsargiai"
                Montavimą ir aptarnavimą gali atlikti tik kvalifikuoti specialistai. Prieš jungdami laidus atjunkite maitinimą. Neautorizuoti pakeitimai panaikina garantiją.
            """
        ).strip(),
        "prerequisites_heading": "## Reikalavimai",
        "wiring_heading": "## Pajungimas",
        "panel_programming_heading": "## Apsaugos centralės programavimas",
        "add_system_protegus2_heading": "## Sistemos pridėjimas į Protegus2",
        "add_system_protegus_heading": "## Sistemos pridėjimas į Protegus",
        "system_check_heading": "## Sistemos tikrinimas",
        "e16_shared": dedent(
            """
            ## Greitas konfigūravimas su programa *TrikdisConfig*

            1. Parsisiųskite **TrikdisConfig** iš [www.trikdis.com](http://www.trikdis.com) ir ją įdiekite.
            2. Plokščiu atsuktuvu atidarykite E16 korpusą.

            ![Atidarykite E16 korpusą](../../../../e16/image6.png)

            3. Su USB Mini-B kabeliu prijunkite E16 prie kompiuterio.
            4. Paleiskite **TrikdisConfig**. Programa atpažins komunikatorių ir atidarys konfigūravimo langą.
            5. Paspauskite **Skaityti [F4]**, kad įkeltumėte esamus nustatymus. Jei reikia, įveskite administratoriaus arba instaliuotojo 6 skaitmenų kodą.

            Atlikite tą poskyrį, kuris atitinka diegimą:

            - **Protegus2 programėlė** jei sistema bus valdoma nuotoliniu būdu.
            - **Stebėjimo pultas** jei komunikatorius siųs pranešimus į CSP.
            - Atlikite abu poskyrius, jei komunikatorius turi veikti ir su CSP, ir su Protegus2.

            ### Nustatymai ryšiui su Protegus2 programėle

            **Lange "Sistemos parinktys":**

            ![E16 sistemos parinktys](../../../../e16/image7.png)

            1. Pasirinkite **Centralės modelį**, kuris bus prijungtas prie komunikatoriaus.
            2. Pažymėkite **Nuotolinis centralės valdymas**, jei vartotojai turi valdyti centralę per Protegus2 savo klaviatūros kodu.
            3. Paradox ir Texecom centralių tiesioginiam valdymui įveskite **Centralės PC download/UDL slaptažodį**. Jis turi sutapti su centrėje nustatytu slaptažodžiu.

            !!! note "Pastaba"
                Kad veiktų tiesioginis valdymas, centrinę taip pat reikia suprogramuoti, kaip nurodyta toliau esančiame centralės programavimo skyriuje.

            **Lange "Pranešimai vartotojui", kortelėje "PROTEGUS servisas":**

            ![E16 Protegus Cloud nustatymai](../../../../e16/image8.png)

            4. Pažymėkite **Leisti prisijungti** prie Protegus serviso.
            5. Pakeiskite **PROTEGUS Cloud prieigos kodą**, jei norite, kad vartotojai jį įvestų pridėdami sistemą į Protegus2.

            Baigę konfigūravimą paspauskite **Įrašyti [F5]** ir atjunkite USB kabelį.

            ### Nustatymai ryšiui su Stebėjimo pultu

            **Lange "Sistemos parinktys":**

            ![E16 CSP sistemos parinktys](../../../../e16/image9.png)

            1. Įveskite **Objekto numerį**, kurį suteikė stebėjimo pultas.
            2. Pasirinkite **Centralės modelį**, kuris bus prijungtas prie komunikatoriaus.

            **Lange "Pranešimai į CSP", parinkčių grupėje "Pirminis ryšio kanalas":**

            ![E16 CSP pranešimų nustatymai](../../../../e16/image10.png)

            3. Nustatykite **Ryšio būdą** į **IP**.
            4. Pasirinkite imtuvui reikalingą protokolą: **TRK**, **DC-09_2007**, **DC-09_2012** arba **TL150**.
            5. Jei pasirinktasis protokolas to reikalauja, įveskite imtuvo šifravimo raktą.
            6. Įveskite imtuvo **Domeną arba IP** ir **Prievadą**.
            7. Pasirinkite **TCP** arba **UDP**.
            8. Jei reikia, sukonfigūruokite atsarginį ir lygiagretų ryšio kanalus.

            !!! note "Pastaba"
                Jei pasirinkote **DC-09** protokolą, lange **Pranešimai į CSP** skirtuke **Parametrai** papildomai įveskite objekto, linijos ir imtuvo numerius.

            Baigę konfigūravimą paspauskite **Įrašyti [F5]** ir atjunkite USB kabelį.
            """
        ).strip(),
        "e16t_shared": dedent(
            """
            ## Greitas konfigūravimas su programa *TrikdisConfig*

            1. Parsisiųskite **TrikdisConfig** iš [www.trikdis.com](http://www.trikdis.com) ir ją įdiekite.
            2. Plokščiu atsuktuvu atidarykite E16T korpusą.

            ![Atidarykite E16T korpusą](../../../e16t/image5.png)

            3. Su USB Mini-B kabeliu prijunkite E16T prie kompiuterio.
            4. Paleiskite **TrikdisConfig**. Programa atpažins komunikatorių ir atidarys konfigūravimo langą.
            5. Paspauskite **Skaityti [F4]**, kad įkeltumėte esamus nustatymus. Jei reikia, įveskite administratoriaus arba instaliuotojo 6 skaitmenų kodą.

            Atlikite tą poskyrį, kuris atitinka diegimą:

            - **Protegus programėlė** jei vartotojai valdys sistemą nuotoliniu būdu.
            - **Stebėjimo pultas** jei komunikatorius siųs pranešimus į CSP.
            - Atlikite abu poskyrius, jei komunikatorius turi veikti ir su CSP, ir su Protegus.

            ### Nustatymai ryšiui su Protegus programėle

            **Lange "Sistemos parametrai":**

            ![E16T sistemos parametrai](../../../e16t/image6.png)

            1. Pasirinkite **Centralės modelį**, kuris bus prijungtas prie komunikatoriaus.

            **Lange "Pranešimai", kortelėje "Protegus servisas":**

            ![E16T Protegus nustatymai](../../../e16t/image7.png)

            2. Pažymėkite **Leisti prisijungti** Protegus serviso nustatymuose.
            3. Pakeiskite **Serviso kodą**, jei norite, kad vartotojai jį įvestų pridėdami sistemą į Protegus.

            Baigę konfigūravimą paspauskite **Įrašyti [F5]** ir atjunkite USB kabelį.

            ### Nustatymai ryšiui su Stebėjimo pultu

            **Lange "Sistemos parametrai":**

            ![E16T CSP sistemos parametrai](../../../e16t/image8.png)

            1. Įveskite **Objekto numerį**, kurį suteikė stebėjimo pultas.
            2. Pasirinkite **Centralės modelį**, kuris bus prijungtas prie komunikatoriaus.

            **Lange "Pranešimai", parinkčių grupėje "Pagrindinis" ryšio kanalas:**

            ![E16T CSP pranešimų nustatymai](../../../e16t/image9.png)

            3. Įjunkite pagrindinį ryšio kanalą.
            4. Įveskite imtuvo **Nuotolinį IP / domeną** ir **Nuotolinį prievadą**.
            5. Pasirinkite **TCP** arba **UDP**.
            6. Nustatykite **PING periodą** ir įveskite imtuvo reikalaujamą šifravimo raktą.
            7. Jei reikia, sukonfigūruokite **Atsarginio** kanalo nustatymus.
            8. Pasirinkite imtuvui reikalingą TCP protokolą: **TRK**, **DC-09_2007** arba **DC-09_2012**.
            9. Jei naudojate **DC-09_2012**, papildomai nustatykite šifravimą bei imtuvo ir linijos numerius.

            **Lange "Pranešimai", kortelėje "Protegus servisas":**

            ![E16T Protegus serviso nustatymai](../../../e16t/image10.png)

            10. Pažymėkite **Leisti prisijungti** prie Protegus, jei vartotojai naudos programėlę.
            11. Pakeiskite **Serviso kodą**, jei norite, kad vartotojai jį įvestų pridėdami sistemą į Protegus.

            !!! note "Pastaba"
                Jei pasirinkote **DC-09** protokolą, lange **Pranešimai** skirtuke **Parametrai** papildomai įveskite objekto, linijos ir imtuvo numerius.

            Baigę konfigūravimą paspauskite **Įrašyti [F5]** ir atjunkite USB kabelį.
            """
        ).strip(),
    },
    "es": {
        "caution": dedent(
            """
            !!! caution "Precaución"
                La instalación y el servicio deben ser realizados solo por personal cualificado. Desconecte la alimentación antes de cablear. Los cambios no autorizados anulan la garantía.
            """
        ).strip(),
        "prerequisites_heading": "## Requisitos",
        "wiring_heading": "## Cableado",
        "panel_programming_heading": "## Programación del panel",
        "add_system_protegus2_heading": "## Añadir sistema a Protegus2",
        "add_system_protegus_heading": "## Añadir sistema a Protegus",
        "system_check_heading": "## Comprobación del sistema",
        "e16_shared": dedent(
            """
            ## Configuración rápida con el software *TrikdisConfig*

            1. Descargue **TrikdisConfig** de [www.trikdis.com](http://www.trikdis.com) e instálelo.
            2. Abra la carcasa del E16 con un destornillador plano.

            ![Abrir la carcasa del E16](../../../../e16/image6.png)

            3. Conecte el E16 al ordenador mediante un cable USB Mini-B.
            4. Ejecute **TrikdisConfig**. El software reconocerá el comunicador y abrirá la ventana de configuración.
            5. Pulse **Leer [F4]** para cargar la configuración actual. Si se solicita, introduzca el código de 6 dígitos del Administrador o del Instalador.

            Complete la subsección que corresponda a la instalación:

            - **App Protegus2** si los usuarios van a controlar el sistema de forma remota.
            - **Central Receptora de Alarmas** si el comunicador reportará al CRA.
            - Complete ambas subsecciones si el comunicador debe funcionar con el CRA y con Protegus2.

            ### Opciones de conexión para la app de Protegus2

            **En la ventana de "Ajustes del sistema":**

            ![Ajustes del sistema E16](../../../../e16/image7.png)

            1. Seleccione el **Modelo de panel** que se conectará al comunicador.
            2. Active **Armado/Desarmado Remoto** si los usuarios deben controlar el panel desde Protegus2 con su código de teclado.
            3. Para el control directo de paneles Paradox y Texecom, introduzca la **Contraseña de descarga PC/UDL del panel**. Debe coincidir con la contraseña configurada en el panel.

            !!! note "Nota"
                Para que funcione el control directo, el panel también debe programarse como se describe más abajo en la sección específica del panel.

            **En la ventana de "Informes para usuario", pestaña "Servicio PROTEGUS":**

            ![Ajustes de Protegus Cloud E16](../../../../e16/image8.png)

            4. Marque **Habilitar conexión** al servicio Protegus.
            5. Cambie el **Código de acceso a PROTEGUS Cloud** si desea que se solicite al añadir el sistema a Protegus2.

            Después de terminar la configuración, haga clic en **Escribir [F5]** y desconecte el cable USB.

            ### Configuración para conectarse con el CRA

            **En la ventana de "Ajustes del sistema":**

            ![Ajustes del sistema E16 para CRA](../../../../e16/image9.png)

            1. Introduzca el **ID del objeto** proporcionado por la Central Receptora.
            2. Seleccione el **Modelo de panel** que se conectará al comunicador.

            **En la ventana de "Ajustes de CRA", opciones del "Canal principal":**

            ![Ajustes de reporte E16 para CRA](../../../../e16/image10.png)

            3. Configure el **Modo de comunicación** en **IP**.
            4. Seleccione el protocolo requerido por el receptor: **TRK**, **DC-09_2007**, **DC-09_2012** o **TL150**.
            5. Introduzca la clave de cifrado del receptor si el protocolo seleccionado la requiere.
            6. Introduzca el **Dominio o IP** y el **Puerto** del receptor.
            7. Seleccione **TCP** o **UDP**.
            8. Configure los canales de respaldo y en paralelo si la instalación requiere redundancia.

            !!! note "Nota"
                Si selecciona un protocolo **DC-09**, en la pestaña **Opciones** de la ventana de **Ajustes de CRA** introduzca también los números de objeto, línea y receptor.

            Después de terminar la configuración, haga clic en **Escribir [F5]** y desconecte el cable USB.
            """
        ).strip(),
        "e16t_shared": dedent(
            """
            ## Configuración rápida con el software *TrikdisConfig*

            1. Descargue **TrikdisConfig** de [www.trikdis.com](http://www.trikdis.com) e instálelo.
            2. Abra la carcasa del E16T con un destornillador plano.

            ![Abrir la carcasa del E16T](../../../e16t/image5.png)

            3. Conecte el E16T al ordenador mediante un cable USB Mini-B.
            4. Ejecute **TrikdisConfig**. El software reconocerá el comunicador y abrirá la ventana de configuración.
            5. Pulse **Leer [F4]** para cargar la configuración actual. Si se solicita, introduzca el código de 6 dígitos del Administrador o del Instalador.

            Complete la subsección que corresponda a la instalación:

            - **App Protegus** si los usuarios van a controlar el sistema de forma remota.
            - **Central Receptora de Alarmas** si el comunicador reportará al CRA.
            - Complete ambas subsecciones si el comunicador debe funcionar con el CRA y con Protegus.

            ### Opciones de conexión para la app de Protegus

            **En la ventana de "Ajustes del sistema":**

            ![Ajustes del sistema E16T](../../../e16t/image6.png)

            1. Seleccione el **Modelo de panel** que se conectará al comunicador.

            **En la ventana de "Informes", pestaña "Servicio Protegus":**

            ![Ajustes de Protegus E16T](../../../e16t/image7.png)

            2. Marque **Habilitar conexión** en la configuración del servicio Protegus.
            3. Cambie el **Código de servicio** si desea que se solicite al añadir el sistema a Protegus.

            Después de terminar la configuración, haga clic en **Escribir [F5]** y desconecte el cable USB.

            ### Configuración para conectarse con el CRA

            **En la ventana de "Ajustes del sistema":**

            ![Ajustes del sistema E16T para CRA](../../../e16t/image8.png)

            1. Introduzca el **Número de cuenta** proporcionado por la Central Receptora.
            2. Seleccione el **Modelo de panel** que se conectará al comunicador.

            **En la ventana de "Informes", opciones del canal "Primario":**

            ![Ajustes de reporte E16T para CRA](../../../e16t/image9.png)

            3. Habilite el canal principal de comunicación.
            4. Introduzca el **Host remoto** y el **Puerto remoto** del receptor.
            5. Seleccione **TCP** o **UDP**.
            6. Configure el **Tiempo de PING** y la clave de cifrado requerida por el receptor.
            7. Configure los ajustes de **Respaldo** si la instalación requiere redundancia.
            8. Seleccione el protocolo TCP requerido por el receptor: **TRK**, **DC-09_2007** o **DC-09_2012**.
            9. Si utiliza **DC-09_2012**, configure también el cifrado y los números de receptor y línea.

            **En la ventana de "Informes", pestaña "Servicio Protegus":**

            ![Ajustes del servicio Protegus E16T](../../../e16t/image10.png)

            10. Marque **Habilitar conexión** a Protegus si los usuarios utilizarán la app.
            11. Cambie el **Código de servicio** si desea que se solicite al añadir el sistema a Protegus.

            !!! note "Nota"
                Si selecciona un protocolo **DC-09**, en la pestaña **Configuración** de la ventana de **Informes** introduzca también los números de objeto, línea y receptor.

            Después de terminar la configuración, haga clic en **Escribir [F5]** y desconecte el cable USB.
            """
        ).strip(),
    },
    "ru": {
        "caution": dedent(
            """
            !!! caution "Осторожно"
                Установку и обслуживание должны выполнять только квалифицированные специалисты. Перед подключением отключите питание. Несанкционированные изменения аннулируют гарантию.
            """
        ).strip(),
        "prerequisites_heading": "## Требования",
        "wiring_heading": "## Подключение",
        "panel_programming_heading": "## Программирование охранной панели",
        "add_system_protegus2_heading": "## Добавление системы в Protegus2",
        "add_system_protegus_heading": "## Добавление системы в Protegus",
        "system_check_heading": "## Проверка системы",
        "e16_shared": dedent(
            """
            ## Быстрая настройка с программой *TrikdisConfig*

            1. Загрузите **TrikdisConfig** со страницы [www.trikdis.com](http://www.trikdis.com) и установите программу.
            2. Плоской отверткой откройте корпус E16.

            ![Откройте корпус E16](../../../../e16/image6.png)

            3. Подключите E16 к компьютеру кабелем USB Mini-B.
            4. Запустите **TrikdisConfig**. Программа определит коммуникатор и откроет окно конфигурации.
            5. Нажмите **Считать [F4]**, чтобы загрузить текущие настройки. Если потребуется, введите 6-значный код администратора или инсталлятора.

            Выполните подраздел, который соответствует вашей установке:

            - **Приложение Protegus2** если пользователи будут управлять системой удаленно.
            - **ПЦН** если коммуникатор будет передавать сообщения на пульт централизованного наблюдения.
            - Выполните оба подраздела, если коммуникатор должен работать и с ПЦН, и с Protegus2.

            ### Настройка связи с приложением Protegus2

            **Окно "Системные настройки":**

            ![Системные настройки E16](../../../../e16/image7.png)

            1. Выберите **Модель панели**, которая будет подключена к коммуникатору.
            2. Включите **Прямое управление панелью**, если пользователи должны управлять системой из Protegus2 своим кодом клавиатуры.
            3. Для прямого управления панелями Paradox и Texecom введите **Код доступа ПК / UDL**. Он должен совпадать с паролем, заданным в панели.

            !!! note "Примечание"
                Чтобы прямое управление работало, панель также необходимо запрограммировать, как описано ниже в разделе программирования панели.

            **Окно "Сообщения пользователю", вкладка "Сервис PROTEGUS":**

            ![Настройки Protegus Cloud E16](../../../../e16/image8.png)

            4. Отметьте поле **Разрешить подключиться** к сервису Protegus.
            5. Измените **Пароль доступа к PROTEGUS Cloud**, если хотите, чтобы его запрашивали при добавлении системы в Protegus2.

            Завершив конфигурацию, нажмите **Записать [F5]** и отключите кабель USB.

            ### Настройка связи с ПЦН

            **Окно "Системные настройки":**

            ![Системные настройки E16 для ПЦН](../../../../e16/image9.png)

            1. Введите **Номер объекта**, предоставленный ПЦН.
            2. Выберите **Модель панели**, которая будет подключена к коммуникатору.

            **Окно "Сообщения на ПЦН", группа "Основной канал связи":**

            ![Настройки передачи на ПЦН E16](../../../../e16/image10.png)

            3. Установите **Режим связи** в **IP**.
            4. Выберите протокол, который требуется приемнику: **TRK**, **DC-09_2007**, **DC-09_2012** или **TL150**.
            5. Введите ключ шифрования приемника, если выбранный протокол этого требует.
            6. Введите **Домен или IP** и **Порт** приемника.
            7. Выберите **TCP** или **UDP**.
            8. Настройте резервный и параллельный каналы, если требуется резервирование.

            !!! note "Примечание"
                Если вы выбрали протокол **DC-09**, в окне **Сообщения на ПЦН** на вкладке **Параметры** дополнительно введите номера объекта, линии и приемника.

            Завершив конфигурацию, нажмите **Записать [F5]** и отключите кабель USB.
            """
        ).strip(),
        "e16t_shared": dedent(
            """
            ## Быстрая настройка с программой *TrikdisConfig*

            1. Загрузите **TrikdisConfig** со страницы [www.trikdis.com](http://www.trikdis.com) и установите программу.
            2. Плоской отверткой откройте корпус E16T.

            ![Откройте корпус E16T](../../../e16t/image5.png)

            3. Подключите E16T к компьютеру кабелем USB Mini-B.
            4. Запустите **TrikdisConfig**. Программа определит коммуникатор и откроет окно конфигурации.
            5. Нажмите **Считать [F4]**, чтобы загрузить текущие настройки. Если потребуется, введите 6-значный код администратора или инсталлятора.

            Выполните подраздел, который соответствует вашей установке:

            - **Приложение Protegus** если пользователи будут управлять системой удаленно.
            - **ПЦН** если коммуникатор будет передавать сообщения на пульт централизованного наблюдения.
            - Выполните оба подраздела, если коммуникатор должен работать и с ПЦН, и с Protegus.

            ### Настройка связи с приложением Protegus

            **Окно "Системные настройки":**

            ![Системные настройки E16T](../../../e16t/image6.png)

            1. Выберите **Модель панели**, которая будет подключена к коммуникатору.

            **Окно "Сообщения", вкладка "Сервис Protegus":**

            ![Настройки Protegus E16T](../../../e16t/image7.png)

            2. Отметьте поле **Разрешить подключиться** в настройках сервиса Protegus.
            3. Измените **Код сервиса**, если хотите, чтобы его запрашивали при добавлении системы в Protegus.

            Завершив конфигурацию, нажмите **Записать [F5]** и отключите кабель USB.

            ### Настройка связи с ПЦН

            **Окно "Системные настройки":**

            ![Системные настройки E16T для ПЦН](../../../e16t/image8.png)

            1. Введите **Номер счета / объекта**, предоставленный ПЦН.
            2. Выберите **Модель панели**, которая будет подключена к коммуникатору.

            **Окно "Сообщения", настройки канала "Основной":**

            ![Настройки передачи на ПЦН E16T](../../../e16t/image9.png)

            3. Включите основной канал связи.
            4. Введите **Удаленный IP / Host** и **Удаленный порт** приемника.
            5. Выберите **TCP** или **UDP**.
            6. Настройте **Период PING** и введите ключ шифрования, требуемый приемником.
            7. При необходимости настройте параметры **Резервного** канала.
            8. Выберите TCP-протокол, который требуется приемнику: **TRK**, **DC-09_2007** или **DC-09_2012**.
            9. Если используется **DC-09_2012**, дополнительно настройте шифрование, а также номера приемника и линии.

            **Окно "Сообщения", вкладка "Сервис Protegus":**

            ![Настройки сервиса Protegus E16T](../../../e16t/image10.png)

            10. Отметьте поле **Разрешить подключиться** к Protegus, если пользователи будут использовать приложение.
            11. Измените **Код сервиса**, если хотите, чтобы его запрашивали при добавлении системы в Protegus.

            !!! note "Примечание"
                Если вы выбрали протокол **DC-09**, в окне **Сообщения** на вкладке **Настройки** дополнительно введите номера объекта, линии и приемника.

            Завершив конфигурацию, нажмите **Записать [F5]** и отключите кабель USB.
            """
        ).strip(),
    },
}


E16_PAGES = {
    "dsc-pc585": {
        "title": {
            "lt": "DSC PowerSeries su E16 greitas paruošimas",
            "es": "DSC PowerSeries con E16 configuración rápida",
            "ru": "DSC PowerSeries с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie DSC PowerSeries centralių (PC585, PC1404, PC1565, PC1616, PC1832, PC1864, PC5020), sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles DSC PowerSeries (PC585, PC1404, PC1565, PC1616, PC1832, PC1864, PC5020), configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям DSC PowerSeries (PC585, PC1404, PC1565, PC1616, PC1832, PC1864, PC5020), настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "DSC PowerSeries centralė su prieiga per klaviatūrą.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel DSC PowerSeries con acceso mediante teclado.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель DSC PowerSeries с доступом через клавиатуру.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | DSC centralė | Pastabos |
                | --- | --- | --- |
                | `+DC` | `RED` / `+AUX` | Centralės maitinimas |
                | `-DC` | `BLK` / `-AUX` | Centralės žemė |
                | `CLK` | `YEL` | Klaviatūros magistralės laikrodis |
                | `DATA` | `GRN` | Klaviatūros magistralės duomenys |

                <img alt="E16 DSC centralės prijungimo schema" src="../images/dsc.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel DSC | Notas |
                | --- | --- | --- |
                | `+DC` | `RED` / `+AUX` | Alimentación del panel |
                | `-DC` | `BLK` / `-AUX` | Tierra del panel |
                | `CLK` | `YEL` | Reloj del bus de teclado |
                | `DATA` | `GRN` | Datos del bus de teclado |

                <img alt="Diagrama de conexión E16 DSC" src="../images/dsc.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель DSC | Примечания |
                | --- | --- | --- |
                | `+DC` | `RED` / `+AUX` | Питание панели |
                | `-DC` | `BLK` / `-AUX` | Общий провод панели |
                | `CLK` | `YEL` | Тактирование шины клавиатуры |
                | `DATA` | `GRN` | Данные шины клавиатуры |

                <img alt="Схема подключения E16 DSC" src="../images/dsc.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": "DSC centralių papildomai programuoti E16 darbui nereikia.",
            "es": "Los paneles DSC no requieren programación adicional para E16.",
            "ru": "Для работы E16 дополнительное программирование панелей DSC не требуется.",
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 nustatykite sritį su `PGM1` veikimu **Pulse** arba **Level** režimu.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona de llave en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure el área en Protegus2 con `PGM1` en modo **Pulse** o **Level**.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте область в Protegus2 с `PGM1` в режиме **Pulse** или **Level**.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "paradox": {
        "title": {
            "lt": "Paradox SP(+)/MG(+) su E16 greitas paruošimas",
            "es": "Paradox SP(+)/MG(+) con E16 configuración rápida",
            "ru": "Paradox SP(+)/MG(+) с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Paradox SP/SP+/MG/MG+ centralių, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles Paradox SP/SP+/MG/MG+, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям Paradox SP/SP+/MG/MG+, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Paradox SP/SP+/MG/MG+ centralė su prieiga per klaviatūrą.",
                "`EX-CRP2.4` kabelis Paradox nuosekliajam prijungimui.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Paradox SP/SP+/MG/MG+ con acceso mediante teclado.",
                "Cable `EX-CRP2.4` para la conexión serie Paradox.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Paradox SP/SP+/MG/MG+ с доступом через клавиатуру.",
                "Кабель `EX-CRP2.4` для последовательного подключения Paradox.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Sujunkite E16 su Paradox nuosekliuoju lizdu naudodami `EX-CRP2.4` kabelį ir maitinkite komunikatorių iš centralės:

                <img alt="E16 Paradox centralės prijungimo schema" src="../images/paradox.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el E16 al conector serie Paradox con el cable `EX-CRP2.4` y alimente el comunicador desde el panel:

                <img alt="Diagrama de conexión E16 Paradox" src="../images/paradox.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите E16 к последовательному разъему Paradox кабелем `EX-CRP2.4` и подайте питание коммуникатору от панели:

                <img alt="Схема подключения E16 Paradox" src="../images/paradox.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                Paradox centralių papildomai programuoti pranešimų nuskaitymui nereikia. Centralę programuokite tik tada, jei norite tiesioginio valdymo iš Protegus2:

                1. Klaviatūroje įeikite į instaliuotojo programavimo režimą.
                2. Atidarykite sekciją `911`.
                3. Įveskite 4 skaitmenų **PC download** slaptažodį.
                4. TrikdisConfig lange **Sistemos parinktys** įsitikinkite, kad įvestas tas pats slaptažodis.
                """
            ).strip(),
            "es": dedent(
                """
                Los paneles Paradox no necesitan programación adicional para la lectura de eventos. Programe el panel solo si desea control directo desde Protegus2:

                1. Entre en programación de instalador desde el teclado.
                2. Abra la sección `911`.
                3. Introduzca la contraseña de 4 dígitos de **PC download**.
                4. En TrikdisConfig, en **Ajustes del sistema**, verifique que esté introducida la misma contraseña.
                """
            ).strip(),
            "ru": dedent(
                """
                Для чтения событий панели Paradox не требуют дополнительного программирования. Программируйте панель только если нужен прямой контроль из Protegus2:

                1. Войдите в режим программирования установщика с клавиатуры.
                2. Откройте секцию `911`.
                3. Введите 4-значный пароль **PC download**.
                4. В TrikdisConfig в окне **Системные настройки** убедитесь, что введен тот же пароль.
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, palikite **Nuotolinis centralės valdymas** nepažymėtą ir po pajungimo Protegus2 nustatykite `PGM1` valdymą, prijungę E16 išėjimą prie raktinės zonos.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si prefiere usar control por zona keyswitch en lugar de control directo, deje **Armado/Desarmado Remoto** desactivado y configure `PGM1` en Protegus2 después de cablear la salida del E16 a la zona keyswitch.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, оставьте **Прямое управление панелью** выключенным и после подключения выхода E16 к ключевой зоне настройте `PGM1` в Protegus2.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "honeywell-vista": {
        "title": {
            "lt": "Honeywell Vista su E16 greitas paruošimas",
            "es": "Honeywell Vista con E16 configuración rápida",
            "ru": "Honeywell Vista с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Honeywell Vista centralių (Ademco Vista-48, Vista-20, Vista-15), sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles Honeywell Vista (Ademco Vista-48, Vista-20, Vista-15), configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям Honeywell Vista (Ademco Vista-48, Vista-20, Vista-15), настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Honeywell Vista centralė (Ademco Vista-48, Vista-20 arba Vista-15) su prieiga per klaviatūrą.",
                "Centralės programinės įrangos versija `V5.3` arba aukštesnė.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Honeywell Vista (Ademco Vista-48, Vista-20 o Vista-15) con acceso mediante teclado.",
                "Versión de firmware del panel `V5.3` o superior.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Honeywell Vista (Ademco Vista-48, Vista-20 или Vista-15) с доступом через клавиатуру.",
                "Версия прошивки панели `V5.3` или выше.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Honeywell centralė | Pastabos |
                | --- | --- | --- |
                | `+DC` | `5` | Centralės maitinimas |
                | `-DC` | `4` | Centralės žemė |
                | `CLK` | `6` | Klaviatūros magistralė |
                | `DATA` | `7` | Klaviatūros magistralė |

                <img alt="E16 Honeywell centralės prijungimo schema" src="../images/honeywell.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel Honeywell | Notas |
                | --- | --- | --- |
                | `+DC` | `5` | Alimentación del panel |
                | `-DC` | `4` | Tierra del panel |
                | `CLK` | `6` | Bus de teclado |
                | `DATA` | `7` | Bus de teclado |

                <img alt="Diagrama de conexión E16 Honeywell" src="../images/honeywell.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель Honeywell | Примечания |
                | --- | --- | --- |
                | `+DC` | `5` | Питание панели |
                | `-DC` | `4` | Общий провод панели |
                | `CLK` | `6` | Шина клавиатуры |
                | `DATA` | `7` | Шина клавиатуры |

                <img alt="Схема подключения E16 Honeywell" src="../images/honeywell.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                Su prie centralės prijungta klaviatūra:

                1. Įeikite į programavimo režimą instaliuotojo kodu `4112`, po to įveskite `800`.
                2. Įjunkite Contact ID įvykių siuntimą per LRR: įveskite `[*][2][9][1][#]`.
                3. Jei norite tiesioginio nuotolinio valdymo, įjunkite antrą AUI adresą: įveskite `[*][1][8][9][1][1][#]`.
                4. Išeikite iš programavimo režimo su `[*][9][9]`.
                """
            ).strip(),
            "es": dedent(
                """
                Con el teclado conectado al panel:

                1. Entre en modo de programación con el código de instalador `4112` y después `800`.
                2. Habilite los eventos Contact ID vía LRR: introduzca `[*][2][9][1][#]`.
                3. Si desea control remoto directo, habilite la segunda dirección AUI: introduzca `[*][1][8][9][1][1][#]`.
                4. Salga del modo de programación con `[*][9][9]`.
                """
            ).strip(),
            "ru": dedent(
                """
                На клавиатуре, подключенной к панели:

                1. Войдите в режим программирования кодом установщика `4112`, затем наберите `800`.
                2. Включите передачу событий Contact ID через LRR: наберите `[*][2][9][1][#]`.
                3. Если требуется прямое удаленное управление, разрешите второй адрес AUI: наберите `[*][1][8][9][1][1][#]`.
                4. Выйдите из режима программирования командой `[*][9][9]`.
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite `PGM1`.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure `PGM1` en Protegus2.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте `PGM1` в Protegus2.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "interlogix-nx-4v2-nx-6v2": {
        "title": {
            "lt": "Interlogix NX-4v2 / NX-6v2 su E16 greitas paruošimas",
            "es": "Interlogix NX-4v2 / NX-6v2 con E16 configuración rápida",
            "ru": "Interlogix NX-4v2 / NX-6v2 с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Interlogix NX-4v2 / NX-6v2 centralių, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles Interlogix NX-4v2 / NX-6v2, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям Interlogix NX-4v2 / NX-6v2, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Interlogix NX-4v2 / NX-6v2 centralė su prieiga per klaviatūrą.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Interlogix NX-4v2 / NX-6v2 con acceso mediante teclado.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Interlogix NX-4v2 / NX-6v2 с доступом через клавиатуру.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Interlogix centralė | Pastabos |
                | --- | --- | --- |
                | `+DC` | `POS` | Centralės maitinimas |
                | `-DC` | `COM` | Centralės žemė |
                | `DATA` | `DATA` | Klaviatūros magistralės duomenys |

                <img alt="E16 Interlogix centralės prijungimo schema" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel Interlogix | Notas |
                | --- | --- | --- |
                | `+DC` | `POS` | Alimentación del panel |
                | `-DC` | `COM` | Tierra del panel |
                | `DATA` | `DATA` | Datos del bus de teclado |

                <img alt="Diagrama de conexión E16 Interlogix" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель Interlogix | Примечания |
                | --- | --- | --- |
                | `+DC` | `POS` | Питание панели |
                | `-DC` | `COM` | Общий провод панели |
                | `DATA` | `DATA` | Данные шины клавиатуры |

                <img alt="Схема подключения E16 Interlogix" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                ### Centralės programavimas LCD klaviatūra

                Naudodami centralės klaviatūrą įveskite žemiau nurodytas sekcijas ir nustatykite jas taip, kaip nurodyta:

                | LCD klaviatūra | Klaviatūros įvedimas | Veiksmo aprašymas |
                | --- | --- | --- |
                | System ready | `*89713` | Įeiti į programavimo režimą |
                | Enter device address | `0#` | Pereiti į pagrindinį centralės programavimo meniu |
                | Enter location | `4#` | Pereiti į **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Loc#4 Seg#2 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `23#` | Pereiti į **Partition features** |
                | Loc#23 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#23 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `37#` | Pereiti į **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#37 Seg#3 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Loc#37 Seg#4 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `90#` | Pereiti į **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#90 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `93#` | Pereiti į **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#93 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `96#` | Pereiti į **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#96 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `99#` | Pereiti į **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#99 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `102#` | Pereiti į **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#102 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `105#` | Pereiti į **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#105 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `108#` | Pereiti į **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#108 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `EXIT EXIT` | Išeiti iš programavimo režimo |

                ### Centralės programavimas LED klaviatūra

                Naudokite tas pačias vietas ir reikšmes, kaip nurodyta aukščiau:

                | LED klaviatūros būsena | Klaviatūros įvedimas | Veiksmo aprašymas |
                | --- | --- | --- |
                | Ready ir Power LED šviečia | `*89713` | Įeiti į programavimo režimą |
                | Service LED mirksi | `0#` | Pereiti į pagrindinį centralės programavimo meniu |
                | Service LED mirksi, Armed LED šviečia | `4#` | Pereiti į **Phone1 events reported** |
                | Visi zonų LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Visi zonų LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `23#` | Pereiti į **Partition features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `37#` | Pereiti į **Siren and system supervision** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `90#` | Pereiti į **Partition 2 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `93#` | Pereiti į **Partition 3 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `96#` | Pereiti į **Partition 4 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `99#` | Pereiti į **Partition 5 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `102#` | Pereiti į **Partition 6 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `105#` | Pereiti į **Partition 7 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `108#` | Pereiti į **Partition 8 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `EXIT EXIT` | Išeiti iš programavimo režimo |
                """
            ).strip(),
            "es": dedent(
                """
                ### Programación del panel mediante teclado LCD

                Usando el teclado del panel, entre en las secciones indicadas y configúrelas como se describe:

                | Teclado LCD | Entrada de teclado | Descripción de la acción |
                | --- | --- | --- |
                | System ready | `*89713` | Entrar en modo de programación |
                | Enter device address | `0#` | Ir al menú principal de programación del panel |
                | Enter location | `4#` | Ir a **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Loc#4 Seg#2 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Enter location | `23#` | Ir a **Partition features** |
                | Loc#23 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#23 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `37#` | Ir a **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#37 Seg#3 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Loc#37 Seg#4 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `90#` | Ir a **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#90 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `93#` | Ir a **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#93 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `96#` | Ir a **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#96 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `99#` | Ir a **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#99 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `102#` | Ir a **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#102 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `105#` | Ir a **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#105 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `108#` | Ir a **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#108 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `EXIT EXIT` | Salir del modo de programación |

                ### Programación del panel mediante teclado LED

                Utilice las mismas ubicaciones y valores indicados arriba:

                | Estado del teclado LED | Entrada de teclado | Descripción de la acción |
                | --- | --- | --- |
                | LEDs Ready y Power encendidos | `*89713` | Entrar en modo de programación |
                | El LED Service parpadea | `0#` | Ir al menú principal de programación del panel |
                | El LED Service parpadea, LED Armed encendido | `4#` | Ir a **Phone1 events reported** |
                | Todos los LEDs de zona encendidos | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Todos los LEDs de zona encendidos | `12345678*` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `23#` | Ir a **Partition features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `37#` | Ir a **Siren and system supervision** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `90#` | Ir a **Partition 2 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `93#` | Ir a **Partition 3 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `96#` | Ir a **Partition 4 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `99#` | Ir a **Partition 5 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `102#` | Ir a **Partition 6 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `105#` | Ir a **Partition 7 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `108#` | Ir a **Partition 8 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `EXIT EXIT` | Salir del modo de programación |
                """
            ).strip(),
            "ru": dedent(
                """
                ### Программирование панели через LCD клавиатуру

                Используя клавиатуру панели, войдите в указанные секции и задайте значения, как описано ниже:

                | LCD клавиатура | Ввод с клавиатуры | Описание действия |
                | --- | --- | --- |
                | System ready | `*89713` | Войти в режим программирования |
                | Enter device address | `0#` | Перейти в главное меню программирования панели |
                | Enter location | `4#` | Перейти в **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Loc#4 Seg#2 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Enter location | `23#` | Перейти в **Partition features** |
                | Loc#23 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#23 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `37#` | Перейти в **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#37 Seg#3 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Loc#37 Seg#4 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `90#` | Перейти в **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#90 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `93#` | Перейти в **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#93 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `96#` | Перейти в **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#96 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `99#` | Перейти в **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#99 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `102#` | Перейти в **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#102 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `105#` | Перейти в **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#105 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `108#` | Перейти в **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#108 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `EXIT EXIT` | Выйти из режима программирования |

                ### Программирование панели через LED клавиатуру

                Используйте те же ячейки и значения, что указаны выше:

                | Состояние LED клавиатуры | Ввод с клавиатуры | Описание действия |
                | --- | --- | --- |
                | Горят LED Ready и Power | `*89713` | Войти в режим программирования |
                | LED Service мигает | `0#` | Перейти в главное меню программирования панели |
                | LED Service мигает, LED Armed горит | `4#` | Перейти в **Phone1 events reported** |
                | Все LED зон горят | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Все LED зон горят | `12345678*` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `23#` | Перейти в **Partition features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `37#` | Перейти в **Siren and system supervision** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `90#` | Перейти в **Partition 2 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `93#` | Перейти в **Partition 3 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `96#` | Перейти в **Partition 4 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `99#` | Перейти в **Partition 5 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `102#` | Перейти в **Partition 6 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `105#` | Перейти в **Partition 7 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `108#` | Перейти в **Partition 8 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `EXIT EXIT` | Выйти из режима программирования |
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite `PGM1`.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure `PGM1` en Protegus2.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте `PGM1` в Protegus2.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "interlogix-nx-8v2": {
        "title": {
            "lt": "Interlogix NX-8v2 su E16 greitas paruošimas",
            "es": "Interlogix NX-8v2 con E16 configuración rápida",
            "ru": "Interlogix NX-8v2 с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Interlogix NX-8v2 centralių, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles Interlogix NX-8v2, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям Interlogix NX-8v2, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Interlogix NX-8v2 centralė su prieiga per klaviatūrą.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Interlogix NX-8v2 con acceso mediante teclado.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Interlogix NX-8v2 с доступом через клавиатуру.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Interlogix centralė | Pastabos |
                | --- | --- | --- |
                | `+DC` | `POS` | Centralės maitinimas |
                | `-DC` | `COM` | Centralės žemė |
                | `DATA` | `DATA` | Klaviatūros magistralės duomenys |

                <img alt="E16 Interlogix centralės prijungimo schema" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel Interlogix | Notas |
                | --- | --- | --- |
                | `+DC` | `POS` | Alimentación del panel |
                | `-DC` | `COM` | Tierra del panel |
                | `DATA` | `DATA` | Datos del bus de teclado |

                <img alt="Diagrama de conexión E16 Interlogix" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель Interlogix | Примечания |
                | --- | --- | --- |
                | `+DC` | `POS` | Питание панели |
                | `-DC` | `COM` | Общий провод панели |
                | `DATA` | `DATA` | Данные шины клавиатуры |

                <img alt="Схема подключения E16 Interlogix" src="../images/caddx.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                ### Centralės programavimas LCD klaviatūra

                Naudodami centralės klaviatūrą įveskite žemiau nurodytas sekcijas ir nustatykite jas taip, kaip nurodyta:

                | LCD klaviatūra | Klaviatūros įvedimas | Veiksmo aprašymas |
                | --- | --- | --- |
                | System ready | `*89713` | Įeiti į programavimo režimą |
                | Enter device address | `0#` | Pereiti į pagrindinį centralės programavimo meniu |
                | Enter location | `4#` | Pereiti į **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Loc#4 Seg#2 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `23#` | Pereiti į **Partition features** |
                | Loc#23 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#23 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `37#` | Pereiti į **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#37 Seg#3 | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Loc#37 Seg#4 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `90#` | Pereiti į **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#90 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `93#` | Pereiti į **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#93 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `96#` | Pereiti į **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#96 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `99#` | Pereiti į **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#99 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `102#` | Pereiti į **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#102 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `105#` | Pereiti į **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#105 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `108#` | Pereiti į **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Pereiti į 3 segmentą |
                | Loc#108 Seg#3 | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Enter location | `EXIT EXIT` | Išeiti iš programavimo režimo |

                ### Centralės programavimas LED klaviatūra

                Naudokite tas pačias vietas ir reikšmes, kaip nurodyta aukščiau:

                | LED klaviatūros būsena | Klaviatūros įvedimas | Veiksmo aprašymas |
                | --- | --- | --- |
                | Ready ir Power LED šviečia | `*89713` | Įeiti į programavimo režimą |
                | Service LED mirksi | `0#` | Pereiti į pagrindinį centralės programavimo meniu |
                | Service LED mirksi, Armed LED šviečia | `4#` | Pereiti į **Phone1 events reported** |
                | Visi zonų LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Visi zonų LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `23#` | Pereiti į **Partition features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `37#` | Pereiti į **Siren and system supervision** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `90#` | Pereiti į **Partition 2 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `93#` | Pereiti į **Partition 3 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `96#` | Pereiti į **Partition 4 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `99#` | Pereiti į **Partition 5 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `102#` | Pereiti į **Partition 6 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `105#` | Pereiti į **Partition 7 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `108#` | Pereiti į **Partition 8 features** |
                | Service LED mirksi, Ready LED šviečia | `**` | Pereiti į 3 segmentą |
                | Service LED mirksi, Ready LED šviečia | `12345678*#` | Įjungti visas perjungiamas parinktis ir išsaugoti |
                | Service LED mirksi, Armed LED šviečia | `EXIT EXIT` | Išeiti iš programavimo režimo |
                """
            ).strip(),
            "es": dedent(
                """
                ### Programación del panel mediante teclado LCD

                Usando el teclado del panel, entre en las secciones indicadas y configúrelas como se describe:

                | Teclado LCD | Entrada de teclado | Descripción de la acción |
                | --- | --- | --- |
                | System ready | `*89713` | Entrar en modo de programación |
                | Enter device address | `0#` | Ir al menú principal de programación del panel |
                | Enter location | `4#` | Ir a **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Loc#4 Seg#2 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Enter location | `23#` | Ir a **Partition features** |
                | Loc#23 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#23 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `37#` | Ir a **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#37 Seg#3 | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Loc#37 Seg#4 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `90#` | Ir a **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#90 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `93#` | Ir a **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#93 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `96#` | Ir a **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#96 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `99#` | Ir a **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#99 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `102#` | Ir a **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#102 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `105#` | Ir a **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#105 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `108#` | Ir a **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Ir al segmento 3 |
                | Loc#108 Seg#3 | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | Enter location | `EXIT EXIT` | Salir del modo de programación |

                ### Programación del panel mediante teclado LED

                Utilice las mismas ubicaciones y valores indicados arriba:

                | Estado del teclado LED | Entrada de teclado | Descripción de la acción |
                | --- | --- | --- |
                | LEDs Ready y Power encendidos | `*89713` | Entrar en modo de programación |
                | El LED Service parpadea | `0#` | Ir al menú principal de programación del panel |
                | El LED Service parpadea, LED Armed encendido | `4#` | Ir a **Phone1 events reported** |
                | Todos los LEDs de zona encendidos | `12345678*` | Activar todas las opciones conmutables y guardar |
                | Todos los LEDs de zona encendidos | `12345678*` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `23#` | Ir a **Partition features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `37#` | Ir a **Siren and system supervision** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `90#` | Ir a **Partition 2 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `93#` | Ir a **Partition 3 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `96#` | Ir a **Partition 4 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `99#` | Ir a **Partition 5 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `102#` | Ir a **Partition 6 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `105#` | Ir a **Partition 7 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `108#` | Ir a **Partition 8 features** |
                | El LED Service parpadea, LED Ready encendido | `**` | Ir al segmento 3 |
                | El LED Service parpadea, LED Ready encendido | `12345678*#` | Activar todas las opciones conmutables y guardar |
                | El LED Service parpadea, LED Armed encendido | `EXIT EXIT` | Salir del modo de programación |
                """
            ).strip(),
            "ru": dedent(
                """
                ### Программирование панели через LCD клавиатуру

                Используя клавиатуру панели, войдите в указанные секции и задайте значения, как описано ниже:

                | LCD клавиатура | Ввод с клавиатуры | Описание действия |
                | --- | --- | --- |
                | System ready | `*89713` | Войти в режим программирования |
                | Enter device address | `0#` | Перейти в главное меню программирования панели |
                | Enter location | `4#` | Перейти в **Phone1 events reported** |
                | Loc#4 Seg#1 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Loc#4 Seg#2 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Enter location | `23#` | Перейти в **Partition features** |
                | Loc#23 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#23 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `37#` | Перейти в **Siren and system supervision** |
                | Loc#37 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#37 Seg#3 | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Loc#37 Seg#4 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `90#` | Перейти в **Partition 2 features** |
                | Loc#90 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#90 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `93#` | Перейти в **Partition 3 features** |
                | Loc#93 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#93 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `96#` | Перейти в **Partition 4 features** |
                | Loc#96 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#96 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `99#` | Перейти в **Partition 5 features** |
                | Loc#99 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#99 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `102#` | Перейти в **Partition 6 features** |
                | Loc#102 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#102 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `105#` | Перейти в **Partition 7 features** |
                | Loc#105 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#105 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `108#` | Перейти в **Partition 8 features** |
                | Loc#108 Seg#1 | `**` | Перейти к сегменту 3 |
                | Loc#108 Seg#3 | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | Enter location | `EXIT EXIT` | Выйти из режима программирования |

                ### Программирование панели через LED клавиатуру

                Используйте те же ячейки и значения, что указаны выше:

                | Состояние LED клавиатуры | Ввод с клавиатуры | Описание действия |
                | --- | --- | --- |
                | Горят LED Ready и Power | `*89713` | Войти в режим программирования |
                | LED Service мигает | `0#` | Перейти в главное меню программирования панели |
                | LED Service мигает, LED Armed горит | `4#` | Перейти в **Phone1 events reported** |
                | Все LED зон горят | `12345678*` | Включить все переключаемые параметры и сохранить |
                | Все LED зон горят | `12345678*` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `23#` | Перейти в **Partition features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `37#` | Перейти в **Siren and system supervision** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `90#` | Перейти в **Partition 2 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `93#` | Перейти в **Partition 3 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `96#` | Перейти в **Partition 4 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `99#` | Перейти в **Partition 5 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `102#` | Перейти в **Partition 6 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `105#` | Перейти в **Partition 7 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `108#` | Перейти в **Partition 8 features** |
                | LED Service мигает, LED Ready горит | `**` | Перейти к сегменту 3 |
                | LED Service мигает, LED Ready горит | `12345678*#` | Включить все переключаемые параметры и сохранить |
                | LED Service мигает, LED Armed горит | `EXIT EXIT` | Выйти из режима программирования |
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite `PGM1`.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure `PGM1` en Protegus2.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте `PGM1` в Protegus2.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "texecom": {
        "title": {
            "lt": "Texecom su E16 greitas paruošimas",
            "es": "Texecom con E16 configuración rápida",
            "ru": "Texecom с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Texecom Premier ir Premier Elite centralių, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a paneles Texecom Premier y Premier Elite, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панелям Texecom Premier и Premier Elite, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Texecom Premier / Premier Elite centralė su instaliuotojo prieiga.",
                "Texecom EX-CRP4 kabelis nuosekliajam prijungimui.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Texecom Premier / Premier Elite con acceso de instalador.",
                "Cable Texecom EX-CRP4 para la conexión serie.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Texecom Premier / Premier Elite с доступом установщика.",
                "Кабель Texecom EX-CRP4 для последовательного подключения.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Naudokite Texecom EX-CRP4 kabelį (užsakomas atskirai) ir prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Texecom EX-CRP4 laidas | Pastabos |
                | --- | --- | --- |
                | `+DC` | `R` (raudonas) | `+12V` maitinimas |
                | `-DC` | `B` (juodas) | Centralės žemė |
                | `CLK` | `BL` (mėlynas) | Nuoseklioji magistralė |
                | `DATA` | `W` (baltas) | Nuoseklioji magistralė |

                <img alt="E16 Texecom centralės prijungimo schema" src="../images/texecom.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Utilice el cable Texecom EX-CRP4 (pedido por separado) y conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Cable Texecom EX-CRP4 | Notas |
                | --- | --- | --- |
                | `+DC` | `R` (rojo) | Alimentación `+12V` |
                | `-DC` | `B` (negro) | Tierra del panel |
                | `CLK` | `BL` (azul) | Bus serie |
                | `DATA` | `W` (blanco) | Bus serie |

                <img alt="Diagrama de conexión E16 Texecom" src="../images/texecom.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Используйте кабель Texecom EX-CRP4 (заказывается отдельно) и подключите панель к E16, как показано ниже:

                | Клемма E16 | Провод Texecom EX-CRP4 | Примечания |
                | --- | --- | --- |
                | `+DC` | `R` (красный) | Питание `+12V` |
                | `-DC` | `B` (черный) | Общий провод панели |
                | `CLK` | `BL` (синий) | Последовательная шина |
                | `DATA` | `W` (белый) | Последовательная шина |

                <img alt="Схема подключения E16 Texecom" src="../images/texecom.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                Texecom centrales reikia programuoti tiek pranešimų nuskaitymui, tiek ir nuotoliniam valdymui.

                1. Programoje **Wintex** atidarykite **Communication Options** langą ir pasirinkite kortelę **Options**.
                2. Įveskite 4 skaitmenų **UDL passcode**.
                3. Įsitikinkite, kad **UDL passcode** sutampa su E16 **Sistemos parinktys** lange įvestu **Centralės PC download/UDL slaptažodžiu**, kai įjungtas **Nuotolinis centralės valdymas**.
                4. Jei programuojate iš klaviatūros, įveskite 4 skaitmenų instaliuotojo kodą ir paspauskite **[Menu]**, kad įeitumėte į programavimo meniu.
                5. Paspauskite **[9]**, tada **[7][6][2]**, ir įveskite 4 skaitmenų **UDL passcode**.
                6. Paspauskite **[Yes]** ir išeikite iš programavimo režimo paspausdami **[Menu]**.
                """
            ).strip(),
            "es": dedent(
                """
                Los paneles Texecom deben programarse tanto para lectura de eventos como para control remoto.

                1. En **Wintex**, abra **Communication Options** y vaya a la pestaña **Options**.
                2. Introduzca el **UDL passcode** de 4 dígitos.
                3. Asegúrese de que el **UDL passcode** coincida con la **Contraseña PC download/UDL del panel** introducida en **Ajustes del sistema** de E16 cuando **Armado/Desarmado Remoto** esté habilitado.
                4. Si programa desde un teclado, introduzca el código de instalador de 4 dígitos y pulse **[Menu]** para entrar al modo de programación.
                5. Pulse **[9]**, después **[7][6][2]**, e introduzca el **UDL passcode** de 4 dígitos.
                6. Pulse **[Yes]** y salga del modo de programación pulsando **[Menu]**.
                """
            ).strip(),
            "ru": dedent(
                """
                Панели Texecom необходимо программировать и для чтения событий, и для удаленного управления.

                1. В программе **Wintex** откройте **Communication Options** и перейдите на вкладку **Options**.
                2. Введите 4-значный **UDL passcode**.
                3. Убедитесь, что **UDL passcode** совпадает с **Кодом доступа ПК / UDL**, введенным в **Системных настройках** E16 при включенном **Прямом управлении панелью**.
                4. Если программируете с клавиатуры, введите 4-значный код установщика и нажмите **[Menu]**, чтобы войти в режим программирования.
                5. Нажмите **[9]**, затем **[7][6][2]**, и введите 4-значный **UDL passcode**.
                6. Нажмите **[Yes]** и выйдите из режима программирования кнопкой **[Menu]**.
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite sritį su `PGM1` veikimu **Pulse** arba **Level** režimu.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure el área en Protegus2 con `PGM1` en modo **Pulse** o **Level**.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте область в Protegus2 с `PGM1` в режиме **Pulse** или **Level**.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra.",
                "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado.",
                "Genere una alarma de prueba mientras el sistema esté armado.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры.",
                "Сымитируйте тестовую тревогу, когда система находится под охраной.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "innerrange-inception": {
        "title": {
            "lt": "Innerrange Inception su E16 greitas paruošimas",
            "es": "Innerrange Inception con E16 configuración rápida",
            "ru": "Innerrange Inception с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Innerrange Inception centralės, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a un panel Innerrange Inception, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панели Innerrange Inception, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Innerrange Inception centralė su interneto ryšiu ir programinės įrangos versija **2.3.0.3507-r0** arba aukštesne.",
                "Inner Range USB kabelis, dalies numeris `993030USB`.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Innerrange Inception con acceso a internet y firmware **2.3.0.3507-r0** o superior.",
                "Cable USB de Inner Range, número de pieza `993030USB`.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Innerrange Inception с доступом в интернет и прошивкой **2.3.0.3507-r0** или выше.",
                "Кабель USB Inner Range, номер детали `993030USB`.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Innerrange Inception centralė / kabelis | Pastabos |
                | --- | --- | --- |
                | `+DC` | `VOUT +` | Centralės maitinimas |
                | `-DC` | `0V` ir juodas kabelio `993030USB` laidas | Centralės žemė |
                | `CLK` | Žalias kabelio `993030USB` laidas | Nuoseklusis ryšys |
                | `DATA` | Baltas kabelio `993030USB` laidas | Nuoseklusis ryšys |

                <img alt="E16 Innerrange Inception centralės prijungimo schema" src="../images/innerrange-inception.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel / cable Innerrange Inception | Notas |
                | --- | --- | --- |
                | `+DC` | `VOUT +` | Alimentación del panel |
                | `-DC` | `0V` y cable negro del cable `993030USB` | Tierra del panel |
                | `CLK` | Cable verde del cable `993030USB` | Conexión serie |
                | `DATA` | Cable blanco del cable `993030USB` | Conexión serie |

                <img alt="Diagrama de conexión E16 Innerrange Inception" src="../images/innerrange-inception.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель / кабель Innerrange Inception | Примечания |
                | --- | --- | --- |
                | `+DC` | `VOUT +` | Питание панели |
                | `-DC` | `0V` и черный провод кабеля `993030USB` | Общий провод панели |
                | `CLK` | Зеленый провод кабеля `993030USB` | Последовательное соединение |
                | `DATA` | Белый провод кабеля `993030USB` | Последовательное соединение |

                <img alt="Схема подключения E16 Innerrange Inception" src="../images/innerrange-inception.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                1. Įsitikinkite, kad Innerrange Inception centrinės programinės įrangos versija yra **2.3.0.3507-r0** arba aukštesnė ir kad centrinė prijungta prie interneto.
                2. Naršyklėje atidarykite `https://skytunnel.com.au/inception/SERIALNUMBER`, kur `SERIALNUMBER` yra ant centralės korpuso nurodytas serijinis numeris.
                3. Atidarykite **Configuration > General > Alarm Reporting**.
                4. Skiltyje **3rd Party Device Configuration** sukonfigūruokite centralę taip, kaip parodyta žemiau.

                ![Innerrange Inception pranešimų nustatymai](../../../../e16/image21.png)

                5. Pažymėkite **Enable 3rd Party Device Reporting**.
                6. **3rd Party Device Type** nustatykite į **Trikdis**.
                7. **Serial port** nustatykite į **Serial Port 1 (Plugged In, In Use By 3rd Party Device)**.
                8. Išsaugokite nustatymus ir išeikite iš programos.
                """
            ).strip(),
            "es": dedent(
                """
                1. Asegúrese de que el panel Innerrange Inception tenga firmware **2.3.0.3507-r0** o superior y esté conectado a internet.
                2. En un navegador, abra `https://skytunnel.com.au/inception/SERIALNUMBER`, donde `SERIALNUMBER` es el número de serie impreso en la carcasa del panel.
                3. Abra **Configuration > General > Alarm Reporting**.
                4. En la sección **3rd Party Device Configuration**, configure el panel como se muestra abajo.

                ![Ajustes de reporte Innerrange Inception](../../../../e16/image21.png)

                5. Marque **Enable 3rd Party Device Reporting**.
                6. Configure **3rd Party Device Type** como **Trikdis**.
                7. Configure **Serial port** como **Serial Port 1 (Plugged In, In Use By 3rd Party Device)**.
                8. Guarde la configuración y salga de la aplicación.
                """
            ).strip(),
            "ru": dedent(
                """
                1. Убедитесь, что панель Innerrange Inception имеет прошивку **2.3.0.3507-r0** или выше и подключена к интернету.
                2. В браузере откройте `https://skytunnel.com.au/inception/SERIALNUMBER`, где `SERIALNUMBER` — серийный номер, указанный на корпусе панели.
                3. Откройте **Configuration > General > Alarm Reporting**.
                4. В разделе **3rd Party Device Configuration** настройте панель, как показано ниже.

                ![Настройки отчетов Innerrange Inception](../../../../e16/image21.png)

                5. Отметьте **Enable 3rd Party Device Reporting**.
                6. Установите **3rd Party Device Type** в **Trikdis**.
                7. Установите **Serial port** в **Serial Port 1 (Plugged In, In Use By 3rd Party Device)**.
                8. Сохраните настройки и выйдите из приложения.
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite sritį su `PGM1` veikimu **Pulse** arba **Level** režimu.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure el área en Protegus2 con `PGM1` en modo **Pulse** o **Level**.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте область в Protegus2 с `PGM1` в режиме **Pulse** или **Level**.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra arba naudotojo sąsaja.",
                "Sukelkite bandomą pavojaus signalą.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado o desde la interfaz de usuario.",
                "Genere una alarma de prueba.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры или пользовательского интерфейса.",
                "Сымитируйте тестовую тревогу.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
    "innerrange-integriti": {
        "title": {
            "lt": "Innerrange Integriti su E16 greitas paruošimas",
            "es": "Innerrange Integriti con E16 configuración rápida",
            "ru": "Innerrange Integriti с E16 быстрая настройка",
        },
        "intro": {
            "lt": "Trumpi prijungimo ir programavimo žingsniai, skirti prijungti E16 komunikatorių prie Innerrange Integriti centralės, sukonfigūruoti E16 IP ryšiui ir pridėti sistemą į Protegus2. Naudokite kartu su pilnu E16 vadovu kitiems nustatymams.",
            "es": "Pasos breves para conectar el comunicador E16 a un panel Innerrange Integriti, configurar E16 para reportes IP y añadir el sistema a Protegus2. Utilice esta guía junto con el manual completo de E16 para el resto de los ajustes.",
            "ru": "Краткие шаги по подключению коммуникатора E16 к панели Innerrange Integriti, настройке E16 для передачи по IP и добавлению системы в Protegus2. Используйте эту инструкцию вместе с полным руководством E16 для остальных настроек.",
        },
        "prerequisites": {
            "lt": [
                "E16 komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
                "Innerrange Integriti centralė su programinės įrangos versija **19.1.0.36608** arba aukštesne.",
                "Innerrange profesionali programinė įranga, versija **19.1.0.15396** arba aukštesnė.",
                "Inner Range kabelis, dalies numeris `INTG-996795`.",
                "CSP objekto numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
                "Protegus2 paskyra ir komunikatoriaus MAC / Unique ID.",
            ],
            "es": [
                "Comunicador E16 con LAN conectado y un cable USB Mini-B para la configuración.",
                "Panel Innerrange Integriti con firmware **19.1.0.36608** o superior.",
                "Software profesional de Innerrange versión **19.1.0.15396** o superior.",
                "Cable Inner Range, número de pieza `INTG-996795`.",
                "ID / número de cuenta del objeto del CRA si va a reportar al CRA.",
                "Cuenta de Protegus2 y MAC / Unique ID del comunicador.",
            ],
            "ru": [
                "Коммуникатор E16 с подключенным LAN и кабелем USB Mini-B для настройки.",
                "Панель Innerrange Integriti с прошивкой **19.1.0.36608** или выше.",
                "Профессиональное ПО Innerrange версии **19.1.0.15396** или выше.",
                "Кабель Inner Range, номер детали `INTG-996795`.",
                "Номер объекта / счета ПЦН, если сообщения будут передаваться на пульт.",
                "Учетная запись Protegus2 и MAC / Unique ID коммуникатора.",
            ],
        },
        "wiring": {
            "lt": dedent(
                """
                Prijunkite centralę prie E16, kaip parodyta žemiau:

                | E16 gnybtas | Innerrange Integriti centralė | Pastabos |
                | --- | --- | --- |
                | `+DC` | `+DET` | `+13V` maitinimas |
                | `-DC` | `GND 5` | TTL Port-0 žemė |
                | `CLK` | `Rx 3` | TTL Port-0 |
                | `DATA` | `Tx 2` | TTL Port-0 |

                <img alt="E16 Innerrange Integriti centralės prijungimo schema" src="../images/innerrange-integriti.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "es": dedent(
                """
                Conecte el panel al E16 como se muestra a continuación:

                | Terminal E16 | Panel Innerrange Integriti | Notas |
                | --- | --- | --- |
                | `+DC` | `+DET` | Alimentación `+13V` |
                | `-DC` | `GND 5` | Tierra de TTL Port-0 |
                | `CLK` | `Rx 3` | TTL Port-0 |
                | `DATA` | `Tx 2` | TTL Port-0 |

                <img alt="Diagrama de conexión E16 Innerrange Integriti" src="../images/innerrange-integriti.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
            "ru": dedent(
                """
                Подключите панель к E16, как показано ниже:

                | Клемма E16 | Панель Innerrange Integriti | Примечания |
                | --- | --- | --- |
                | `+DC` | `+DET` | Питание `+13V` |
                | `-DC` | `GND 5` | Общий TTL Port-0 |
                | `CLK` | `Rx 3` | TTL Port-0 |
                | `DATA` | `Tx 2` | TTL Port-0 |

                <img alt="Схема подключения E16 Innerrange Integriti" src="../images/innerrange-integriti.png" style="width:5.2in;max-width:100%;height:auto;" />
                """
            ).strip(),
        },
        "panel_programming": {
            "lt": dedent(
                """
                1. Įsitikinkite, kad Innerrange Integriti centrinės programinės įrangos versija yra **19.1.0.36608** arba aukštesnė, o profesionalios programinės įrangos versija yra **19.1.0.15396** arba aukštesnė.
                2. Innerrange Integriti konfigūravimo programoje nurodykite **Trikdis** ryšio protokolą.
                3. Duomenų formatą nustatykite į **Contact ID**.
                4. Centralės prievadą, prie kurio prijungtas E16, nustatykite kaip **TTL Port-0** su parametrais **19200, 8, N, 1**.
                5. Išsaugokite nustatymus ir išeikite iš programos.
                """
            ).strip(),
            "es": dedent(
                """
                1. Asegúrese de que el panel Innerrange Integriti tenga firmware **19.1.0.36608** o superior y que el software profesional sea la versión **19.1.0.15396** o superior.
                2. En el programa de configuración de Integriti, especifique el protocolo de comunicación **Trikdis**.
                3. Configure el formato de datos como **Contact ID**.
                4. Configure el puerto del panel conectado al E16 como **TTL Port-0** con parámetros **19200, 8, N, 1**.
                5. Guarde la configuración y salga del programa.
                """
            ).strip(),
            "ru": dedent(
                """
                1. Убедитесь, что панель Innerrange Integriti имеет прошивку **19.1.0.36608** или выше, а профессиональное ПО — версию **19.1.0.15396** или выше.
                2. В программе конфигурации Integriti укажите протокол связи **Trikdis**.
                3. Установите формат данных **Contact ID**.
                4. Настройте порт панели, подключенный к E16, как **TTL Port-0** с параметрами **19200, 8, N, 1**.
                5. Сохраните настройки и выйдите из программы.
                """
            ).strip(),
        },
        "add_system": {
            "lt": [
                'Atidarykite [Protegus2](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
                "Įveskite E16 **MAC / Unique ID**.",
                "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
                "Jei vietoje tiesioginio valdymo naudojate raktinę zoną, prijunkite `I/O 1` prie centralės raktinės zonos ir Protegus2 sukonfigūruokite sritį su `PGM1` veikimu **Pulse** arba **Level** režimu.",
                "Palaukite, kol sistema bus rodoma kaip prisijungusi.",
            ],
            "es": [
                'Abra [Protegus2](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
                "Introduzca el **MAC / Unique ID** del E16.",
                "Introduzca el nombre del sistema y termine el asistente.",
                "Si utiliza control por zona keyswitch en lugar de control directo, conecte `I/O 1` a la zona keyswitch del panel y configure el área en Protegus2 con `PGM1` en modo **Pulse** o **Level**.",
                "Espere hasta que el sistema aparezca en línea.",
            ],
            "ru": [
                'Откройте [Protegus2](https://www.protegus.app) и нажмите **Добавить новую систему**.',
                "Введите **MAC / Unique ID** коммуникатора E16.",
                "Введите имя системы и завершите мастер добавления.",
                "Если вместо прямого управления используется ключевая зона, подключите `I/O 1` к ключевой зоне панели и настройте область в Protegus2 с `PGM1` в режиме **Pulse** или **Level**.",
                "Дождитесь, пока система отобразится в сети.",
            ],
        },
        "system_check": {
            "lt": [
                "Įjunkite ir išjunkite sistemą klaviatūra arba naudotojo sąsaja.",
                "Sukelkite bandomą pavojaus signalą.",
                "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus2.",
            ],
            "es": [
                "Arme y desarme el sistema desde el teclado o desde la interfaz de usuario.",
                "Genere una alarma de prueba.",
                "Confirme que los eventos llegan al CRA y a Protegus2.",
            ],
            "ru": [
                "Поставьте и снимите систему с охраны с клавиатуры или пользовательского интерфейса.",
                "Сымитируйте тестовую тревогу.",
                "Убедитесь, что события поступают на ПЦН и в Protegus2.",
            ],
        },
    },
}


E16T_PAGE = {
    "title": {
        "lt": "E16T greitas paruošimas",
        "es": "E16T configuración rápida",
        "ru": "E16T быстрая настройка",
    },
    "intro": {
        "lt": "Trumpi žingsniai, skirti prijungti E16T komunikatorių prie apsaugos centralės telefoninio komunikatoriaus, sukonfigūruoti IP ryšį ir pridėti sistemą į Protegus. Naudokite kartu su pilnu E16T vadovu kitiems nustatymams.",
        "es": "Pasos breves para conectar el comunicador E16T al comunicador telefónico del panel, configurar el reporte IP y añadir el sistema a Protegus. Utilice esta guía junto con el manual completo de E16T para el resto de los ajustes.",
        "ru": "Краткие шаги по подключению коммуникатора E16T к телефонному коммуникатору панели, настройке передачи по IP и добавлению системы в Protegus. Используйте эту инструкцию вместе с полным руководством E16T для остальных настроек.",
    },
    "prerequisites": {
        "lt": [
            "E16T komunikatorius su prijungtu LAN ir USB Mini-B kabeliu konfigūravimui.",
            "Apsaugos centralė su telefoniniu komunikatoriumi, palaikančiu Contact ID per DTMF tonus.",
            "Instaliuotojo / klaviatūros prieiga prie centralės.",
            "CSP paskyros numeris, jei pranešimai bus siunčiami į stebėjimo pultą.",
            "Protegus paskyra ir komunikatoriaus MAC / Unique ID.",
        ],
        "es": [
            "Comunicador E16T con LAN conectado y un cable USB Mini-B para la configuración.",
            "Panel con comunicador telefónico que soporte Contact ID mediante tonos DTMF.",
            "Acceso de instalador / teclado al panel.",
            "Número de cuenta del CRA si va a reportar al CRA.",
            "Cuenta de Protegus y MAC / Unique ID del comunicador.",
        ],
        "ru": [
            "Коммуникатор E16T с подключенным LAN и кабелем USB Mini-B для настройки.",
            "Панель с телефонным коммуникатором, поддерживающим Contact ID через тональный набор DTMF.",
            "Доступ установщика / клавиатуры к панели.",
            "Номер счета ПЦН, если сообщения будут передаваться на пульт.",
            "Учетная запись Protegus и MAC / Unique ID коммуникатора.",
        ],
    },
    "wiring": {
        "lt": dedent(
            """
            Prijunkite E16T prie centralės maitinimo, `TIP` / `RING` ir LAN, kaip parodyta žemiau:

            ![E16T centralės prijungimo schema](../../../e16t/image11.png)

            Jei centralė bus įjungiama ar išjungiama per raktinės zonos išėjimą, tame pačiame brėžinyje parodytu būdu prijunkite centralės raktinę zoną prie `OUT`.
            """
        ).strip(),
        "es": dedent(
            """
            Conecte el E16T a la alimentación del panel, `TIP` / `RING` y LAN como se muestra a continuación:

            ![Diagrama de conexión del panel E16T](../../../e16t/image11.png)

            Si el panel va a armarse o desarmarse mediante una salida de keyswitch, conecte la zona keyswitch del panel a `OUT` como se muestra en el mismo diagrama.
            """
        ).strip(),
        "ru": dedent(
            """
            Подключите E16T к питанию панели, `TIP` / `RING` и LAN, как показано ниже:

            ![Схема подключения панели E16T](../../../e16t/image11.png)

            Если постановка и снятие с охраны будут выполняться через ключевую зону, подключите ключевую зону панели к `OUT`, как показано на той же схеме.
            """
        ).strip(),
    },
    "panel_programming": {
        "lt": dedent(
            """
            Telefoninį apsaugos centralės komunikatorių suprogramuokite taip:

            1. Įjunkite centralės telefoninį komunikatorių.
            2. Jei E16T prijungtas tiesiai prie `TIP` / `RING`, įveskite bet kokį bent 2 skaitmenų telefono numerį.
            3. Pasirinkite `DTMF` rinkimo režimą.
            4. Pasirinkite `Contact ID` ryšio formatą.
            5. Įveskite 4 skaitmenų centralės objekto numerį.
            """
        ).strip(),
        "es": dedent(
            """
            Programe el comunicador telefónico del panel de la siguiente manera:

            1. Habilite el comunicador telefónico del panel.
            2. Si el E16T está conectado directamente a `TIP` / `RING`, introduzca cualquier número de teléfono de al menos 2 dígitos.
            3. Seleccione el modo de marcación `DTMF`.
            4. Seleccione el protocolo de comunicación `Contact ID`.
            5. Introduzca el número de cuenta de 4 dígitos del panel.
            """
        ).strip(),
        "ru": dedent(
            """
            Запрограммируйте телефонный коммуникатор панели следующим образом:

            1. Включите телефонный коммуникатор панели.
            2. Если E16T подключен напрямую к `TIP` / `RING`, введите любой телефонный номер длиной не менее 2 цифр.
            3. Выберите режим набора `DTMF`.
            4. Выберите формат связи `Contact ID`.
            5. Введите 4-значный номер объекта панели.
            """
        ).strip(),
    },
    "special_settings_heading": {
        "lt": "## Specialieji Honeywell Vista 48 nustatymai",
        "es": "## Ajustes especiales para Honeywell Vista 48",
        "ru": "## Специальные настройки Honeywell Vista 48",
    },
    "special_settings_intro": {
        "lt": "Jei prijungta centralė yra Honeywell Vista 48, nustatykite šias reikšmes:",
        "es": "Si el panel conectado es Honeywell Vista 48, configure estos valores:",
        "ru": "Если подключена панель Honeywell Vista 48, задайте следующие значения:",
    },
    "special_settings_table": {
        "lt": dedent(
            """
            | Skyrius | Duomenys | Skyrius | Duomenys | Skyrius | Duomenys |
            | --- | --- | --- | --- | --- | --- |
            | `*41` | `1111` | `*60` | `1` | `*69` | `1` |
            | `*42` | `1111` | `*61` | `1` | `*70` | `1` |
            | `*43` | `1234` | `*62` | `1` | `*71` | `1` |
            | `*44` | `1234` | `*63` | `1` | `*72` | `1` |
            | `*45` | `1111` | `*64` | `1` | `*73` | `1` |
            | `*47` | `1` | `*65` | `1` | `*74` | `1` |
            | `*48` | `7` | `*66` | `1` | `*75` | `1` |
            | `*50` | `1` | `*67` | `1` | `*76` | `1` |
            | `*59` | `0` | `*68` | `1` |  |  |
            """
        ).strip(),
        "es": dedent(
            """
            | Sección | Datos | Sección | Datos | Sección | Datos |
            | --- | --- | --- | --- | --- | --- |
            | `*41` | `1111` | `*60` | `1` | `*69` | `1` |
            | `*42` | `1111` | `*61` | `1` | `*70` | `1` |
            | `*43` | `1234` | `*62` | `1` | `*71` | `1` |
            | `*44` | `1234` | `*63` | `1` | `*72` | `1` |
            | `*45` | `1111` | `*64` | `1` | `*73` | `1` |
            | `*47` | `1` | `*65` | `1` | `*74` | `1` |
            | `*48` | `7` | `*66` | `1` | `*75` | `1` |
            | `*50` | `1` | `*67` | `1` | `*76` | `1` |
            | `*59` | `0` | `*68` | `1` |  |  |
            """
        ).strip(),
        "ru": dedent(
            """
            | Ячейка | Данные | Ячейка | Данные | Ячейка | Данные |
            | --- | --- | --- | --- | --- | --- |
            | `*41` | `1111` | `*60` | `1` | `*69` | `1` |
            | `*42` | `1111` | `*61` | `1` | `*70` | `1` |
            | `*43` | `1234` | `*62` | `1` | `*71` | `1` |
            | `*44` | `1234` | `*63` | `1` | `*72` | `1` |
            | `*45` | `1111` | `*64` | `1` | `*73` | `1` |
            | `*47` | `1` | `*65` | `1` | `*74` | `1` |
            | `*48` | `7` | `*66` | `1` | `*75` | `1` |
            | `*50` | `1` | `*67` | `1` | `*76` | `1` |
            | `*59` | `0` | `*68` | `1` |  |  |
            """
        ).strip(),
    },
    "special_settings_exit": {
        "lt": "Išeikite iš programavimo režimo komanda `*99`.",
        "es": "Salga del modo de programación con `*99`.",
        "ru": "Выйдите из режима программирования командой `*99`.",
    },
    "add_system": {
        "lt": [
            'Atidarykite [Protegus](https://www.protegus.app) ir paspauskite **Pridėti naują sistemą**.',
            "Įveskite E16T **MAC / Unique ID**.",
            "Įveskite sistemos pavadinimą ir užbaikite vedlį.",
            "Jei `OUT` prijungėte prie raktinės zonos, Protegus lange **Settings** įjunkite **Arm/Disarm with PGM Output 1**.",
            "Pasirinkite **Pulse** arba **Level** režimą, kad jis atitiktų centralės raktinės zonos tipą.",
        ],
        "es": [
            'Abra [Protegus](https://www.protegus.app) y pulse **Agregar nuevo sistema**.',
            "Introduzca el **MAC / Unique ID** del E16T.",
            "Introduzca el nombre del sistema y termine el asistente.",
            "Si conectó `OUT` a una zona keyswitch, abra **Settings** en Protegus y habilite **Arm/Disarm with PGM Output 1**.",
            "Seleccione el modo **Pulse** o **Level** para que coincida con el tipo de zona keyswitch del panel.",
        ],
        "ru": [
            'Откройте [Protegus](https://www.protegus.app) и нажмите **Добавить новую систему**.',
            "Введите **MAC / Unique ID** коммуникатора E16T.",
            "Введите имя системы и завершите мастер добавления.",
            "Если `OUT` подключен к ключевой зоне, откройте **Settings** в Protegus и включите **Arm/Disarm with PGM Output 1**.",
            "Выберите режим **Pulse** или **Level** в соответствии с типом ключевой зоны панели.",
        ],
    },
    "add_system_image": {
        "lt": "![Ekranas sistemos pridėjimui į Protegus](../../../cellular/quick-setup/paradox/protegus-enter-imei.png)",
        "es": "![Pantalla de alta del sistema en Protegus](../../../cellular/quick-setup/paradox/protegus-enter-imei.png)",
        "ru": "![Экран добавления системы в Protegus](../../../cellular/quick-setup/paradox/protegus-enter-imei.png)",
    },
    "system_check": {
        "lt": [
            "Įjunkite ir išjunkite sistemą klaviatūra.",
            "Sukelkite bandomą pavojaus signalą, kai sistema įjungta.",
            "Patikrinkite, kad įvykiai pasiektų stebėjimo pultą ir Protegus.",
        ],
        "es": [
            "Arme y desarme el sistema desde el teclado.",
            "Genere una alarma de prueba mientras el sistema esté armado.",
            "Confirme que los eventos llegan al CRA y a Protegus.",
        ],
        "ru": [
            "Поставьте и снимите систему с охраны с клавиатуры.",
            "Сымитируйте тестовую тревогу, когда система находится под охраной.",
            "Убедитесь, что события поступают на ПЦН и в Protegus.",
        ],
    },
}


def render_e16_page(locale: str, slug: str, spec: dict[str, object]) -> str:
    common = COMMON[locale]
    content = [
        f"# {spec['title'][locale]}",
        spec["intro"][locale],
        common["caution"],
        common["prerequisites_heading"],
        bullet_list(spec["prerequisites"][locale]),
        common["e16_shared"],
        common["wiring_heading"],
        spec["wiring"][locale],
        common["panel_programming_heading"],
        spec["panel_programming"][locale],
        common["add_system_protegus2_heading"],
        numbered_list(spec["add_system"][locale]),
        common["system_check_heading"],
        numbered_list(spec["system_check"][locale]),
    ]
    return "\n\n".join(str(part).strip() for part in content if part).strip() + "\n"


def render_e16t_page(locale: str) -> str:
    common = COMMON[locale]
    content = [
        f"# {E16T_PAGE['title'][locale]}",
        E16T_PAGE["intro"][locale],
        common["caution"],
        common["prerequisites_heading"],
        bullet_list(E16T_PAGE["prerequisites"][locale]),
        common["e16t_shared"],
        common["wiring_heading"],
        E16T_PAGE["wiring"][locale],
        common["panel_programming_heading"],
        E16T_PAGE["panel_programming"][locale],
        E16T_PAGE["special_settings_heading"][locale],
        E16T_PAGE["special_settings_intro"][locale],
        E16T_PAGE["special_settings_table"][locale],
        E16T_PAGE["special_settings_exit"][locale],
        common["add_system_protegus_heading"],
        numbered_list(E16T_PAGE["add_system"][locale]),
        E16T_PAGE["add_system_image"][locale],
        common["system_check_heading"],
        numbered_list(E16T_PAGE["system_check"][locale]),
    ]
    return "\n\n".join(str(part).strip() for part in content if part).strip() + "\n"


def sync_images() -> None:
    en_images = DOCS / "en/alarm-communicators/ethernet/quick-setup/e16/images"
    for locale in LOCALES:
        dest = DOCS / locale / "alarm-communicators/ethernet/quick-setup/e16/images"
        dest.mkdir(parents=True, exist_ok=True)
        for name in E16_IMAGE_NAMES:
            copy2(en_images / name, dest / name)


def sync_pages() -> None:
    for locale in LOCALES:
        for slug, spec in E16_PAGES.items():
            path = DOCS / locale / f"alarm-communicators/ethernet/quick-setup/e16/{slug}/index.md"
            write_text(path, render_e16_page(locale, slug, spec))

        e16t_path = DOCS / locale / "alarm-communicators/ethernet/quick-setup/e16t/index.md"
        write_text(e16t_path, render_e16t_page(locale))


def main() -> int:
    sync_images()
    sync_pages()
    print("Ethernet quick-setup locale pages synchronized.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
