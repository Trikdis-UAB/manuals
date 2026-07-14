# Preguntas frecuentes

Respuestas a preguntas reales que surgieron durante instalaciones, recopiladas de casos de soporte. Si tu pregunta no está aquí, contacta con [support@trikdis.lt](mailto:support@trikdis.lt).

## FLEXi SP3

<span id="sp3-wiegand-reader-door-output"></span>

<!-- --8<-- [start:sp3-wiegand-reader-door-output] -->
??? question "¿Cómo configuro un lector Wiegand único (sin teclado) para pulsar una salida de puerta?"

<!-- --8<-- [start:sp3-wiegand-reader-door-output-body] -->
    1. Conecta las líneas de datos del lector a los terminales **GRN**/**YEL** del panel de control.
    2. En TrikdisConfig, configura **Tipo de teclado = lector Wiegand** aunque no haya ningún teclado físico conectado (ventana "Módulos" → pestaña "Teclados" → Parámetros del teclado).
    3. Asigna a la salida deseada **Definición de salida = Control remoto** y un **Tiempo de pulso, s** (por ejemplo, 5) en la **ventana "PGM"**.
    4. En la **pestaña "Control" de la ventana "PGM"**, marca **EN** para ese lector, configura **PGM** con el número de salida y **PGM mode = Pulso**.

    !!! note
        Las tarjetas RFID/Wiegand no se pueden vincular acercándolas al lector: ingresa a mano el **Tag código** de cada tarjeta, como número **decimal**, en "Vinculación de llaves RFID (tarjetas)".
<!-- --8<-- [end:sp3-wiegand-reader-door-output-body] -->
<!-- --8<-- [end:sp3-wiegand-reader-door-output] -->

Consulta el [manual de FLEXi SP3](../control-panels/sp3/index.md) para ver los diagramas de cableado completos y la configuración de TrikdisConfig.
