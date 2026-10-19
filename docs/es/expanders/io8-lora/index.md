# iO8-LoRa Expansor inalámbrico

<div style="text-align: center;">
  <img src="./image1.webp" alt="Fotografía de la placa de circuito del expansor iO8-LoRa, con sus bloques de terminales, indicadores LED, botón SW1 e interruptor DIP SW2." width="400">
</div>

## Descripción 

Los expansores inalámbricos iO-8-LORA con transceptor RF-LORA aumentan el número de entradas y salidas del panel de control "FLEXi" SP3 mediante comunicación RF bidireccional.


Compatible con el panel de control de seguridad [SP3](../../control-panels/sp3/index.md) y el controlador de acceso [GATOR Cellular](../../gate-controllers/gator/index.md).
El expansor inalámbrico iO-8-LORA tiene 8 terminales de I/O, cada uno de los cuales se puede configurar como entrada (IN) o como salida (OUT).

**Características**

Comunicación:

- Alcance inalámbrico de línea de visión de hasta 5000 m.

- Hasta 8 und. se puede conectar al panel de control *"FLEXi" SP3* expansores inalámbricos *iO-8-LORA*.

- Los productos de la versión HW iO8_x5xx_7_230419 vienen con una antena estándar adecuada para la mayoría de los casos. <u>En los casos en que sea necesario proporcionar una comunicación de alta calidad a la máxima distancia posible, se debe utilizar una antena (AX-ANT-KIT – 433 MHz, AX-ANT01S_SF – 868 MHz) con una mayor ganancia de señal de radio</u>.

Entradas y salidas:
- 8 terminales de I/O, cada uno se puede configurar como terminal de entrada (IN) o salida (OUT). Tipos de entrada (IN): ATZ, EOL, NC, NO. Se pueden usar diferentes valores nominales de resistencias en los circuitos de tipo EOL y ATZ.

**Conexión:**

- El expansor inalámbrico iO-8-LORA está conectado al panel de control "FLEXi" SP3 a través del transceptor RF-LORA.

### Parámetros Técnicos 

| Parámetro | Descripción |
|----|----|
| Frecuencia de transmisión | Modificación 4F: 433,3 - 434,7 MHz /​ Modificación 8F: 867 - 869 MHz |
| Tipo de modulación | LORA |
| Tensión de alimentación | 10-26 V DC |
| Consumo actual | hasta 50 mA (en espera) /​ hasta 120 mA (a corto plazo, mientras se envía) |
| Cifrado de mensajes | Si |
| Rango en área abierta | hasta 5000 m |
| Terminales de doble propósito [I/​O] | 8, función IN o OUT seleccionada durante la programación. Si se selecciona IN, tipos disponibles: NC, NO, EOL, EOL_T, 3EOL, ATZ, ATZ_T. Si se selecciona OUT, la terminal se convierte en colector abierto (OC) con una corriente de hasta 100 mA |
| Entorno operativo | Temperatura de -20 ° C a +50 ° C, humedad relativa - de hasta 80% a +20 ° C |
| Dimensiones | 65 x 90 x 12 mm |
| Peso | 80 g |

### Elementos expansores 

<img alt="Fotografía numerada de la placa del expansor iO8-LoRa a la izquierda. La llamada 1 señala los indicadores de LED; la 2, los terminales para cableado; la 3, el botón SW1 para emparejar el dispositivo y probar la conexión; y la 4, el interruptor DIP SW2. Los nombres numerados aparecen en una lista a la derecha." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 860px; height: auto;" />

!!! note "Configuración del interruptor DIP 'SW2'"
    Para la versión HW iO8_x5xx_7_230419:

    1. Frecuencia de radio (`OFF` - RF1; `ON` - RF2). Diseñado para cambiar el canal de radio si el canal actual está muy cargado.
    2. Tipo de modulación (`OFF` - rápido; `ON` - lento). La posición `ON` permite aumentar la distancia de comunicación aproximadamente 2 veces (dependiendo de las condiciones ambientales). Pero si se garantiza una conexión de calidad usando la posición `OFF`, se recomienda usarla. En la posición `ON`, disminuye el rendimiento del sistema.

    **NOTA:** ¡En los dispositivos iO8-LORA y RF-LORA, las posiciones del interruptor `SW` deben coincidir! De lo contrario, la comunicación por radio no funcionará.

### Descripción del Bloque de Terminales 

| Terminal | Descripción                             |
|----------|-----------------------------------------|
| +DC      | Terminal de poder (10-26 V DC positive) |
| -DC      | Terminal de poder (10-26 V DC negativo) |
| A        | Terminal A del bus de datos *RS485*     |
| B        | Terminal B del bus de datos *RS485*     |
| 1- 8     | Terminales de entrada/​salida            |
| C        | Terminal negativa común                 |

### Indicación de LED 

| Indicador | Estados de LED | Descripción |
|-----------|----------------|-------------|
| NETWORK / (Red) | Off | Sin señal de RF |
| NETWORK / (Red) | Verde parpadeando | Nivel de señal RF de 0 a 10. Suficiente 3 |
| POWER / (Poder) | Off | Sin tensión de alimentación |
| POWER / (Poder) | Verde parpadeando | Nivel normal de tensión de alimentación |
| POWER / (Poder) | Amarillo parpadeando | Tensión de alimentación baja (≤11,5 V) |

## Esquemas de conexión 

### Esquema para la conexión de la fuente de alimentación 

<img alt="Diagrama de conexión: Fuente de poder a iO-8-LORA. Alimentación (+12 V): +12V a +DC, 0V a -DC." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Esquemas para la entradas de conexión 

Hay 8 terminales IO1 – IO8 (entradas) en la placa de expansión iO-8-LORA para conectar circuitos de sensores. Cualquier terminal puede configurarse como entrada y asignarse atributos de zona: tipo de circuito (NO, NC, EOL, EOL_T, 3EOL , ATZ, ATZ_T); sensibilidad a eventos temporales del circuito; función de zona (Delay, Instant, Instant Stay, Interior, Interior Stay, Fire, Keyswitch, 24_hour, Silent, Silent 24h).

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image5.webp" alt="Diagrama de conexión: circuito de entrada normalmente abierto (NO). Un contacto NO conecta IOx con C al cerrarse. No se muestra ninguna resistencia." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image6.webp" alt="Diagrama de conexión: circuito de entrada normalmente cerrado (NC). Un contacto NC conecta IOx con C. No se muestra ninguna resistencia." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image7.webp" alt="Tabla de valores de resistencias con columnas RT, R1 y R2. Las seis filas son 2.2k, 2.2k, 4.7k; 1k, 1k, 2.2k; 5.6k, 5.6k, 3.3k; 5.6k, 3.3k, 5.6k; 3.3k, 6.8k, 3.3k; y 2.2k, 4.7k, 8.2k." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image8.webp" alt="Circuito normalmente cerrado con resistencia de fin de línea (EOL): entre IOx y C, el contacto NO está en paralelo con la resistencia R1." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image9.webp" alt="Circuito normalmente cerrado con resistencia de fin de línea (EOL): entre IOx y C, el contacto NC y la resistencia R1 están en serie." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image10.webp" alt="Normalmente cerrado con resistencia de fin de línea, con reconocimiento de sabotaje y falla de cable (EOL_T): de IOx a C, el contacto NC Tamper y RT están en serie con R1; el contacto NC está en paralelo con R1." style="width: 100%; height: auto;" />
  </figure>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <figure style="margin: 0;">
    <img src="./image11.webp" alt="Diagrama de conexión: entrada normalmente cerrada sin EOL (ATZ) entre IOx y C. El detector terminal 1 tiene un contacto NC en paralelo con R1; el detector terminal 2 tiene un contacto NC en paralelo con R2. Los dos circuitos de los detectores están en serie." style="width: 100%; height: auto;" />
  </figure>
  <figure style="margin: 0;">
    <img src="./image12.webp" alt="Diagrama de conexión: entrada normalmente cerrada ATZ_T entre IOx y C. El detector terminal 1 tiene un contacto NC de sabotaje y RT en serie, seguidos de un contacto NC en paralelo con R1. El detector terminal 2 tiene un contacto NC de sabotaje en serie, seguido de un contacto NC en paralelo con R2." style="width: 100%; height: auto;" />
  </figure>
</div>

<img alt="Normalmente cerrado con resistencia de fin de línea, con reconocimiento de sabotaje y falla de cable (3EOL): de IOx a C, el contacto NC Tamper, RT, R1 y R2 están en serie. El contacto NC Alarma está en paralelo con R1; el contacto NC Antienmascaramiento está en paralelo con R2." src="./image13.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

### Esquema para conectar un relé 

Usando las terminales de relé es posible controlar (encender/apagar) de forma remota varios dispositivos eléctricos. El terminal I/O universal del expansor inalámbrico *iO-8-LORA* debe configurarse como una salida (OUT) y debe tener asignada la definición de *"*Control remoto*"*.

<img alt="Diagrama de conexión: iO-8-LORA a un relé. AUX+ e IOx se conectan a la bobina del relé. El relé tiene contactos marcados NC, C y NO." src="./image14.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

### Esquema de conexión del expansor iO-8-LORA al panel de control "FLEXi" SP3 

<img alt="Diagrama de conexión: SP3 a RF-LORA y hasta ocho expansores iO-8-LORA. SP3 AUX+ (+12 V) se conecta a RF-LORA +DC; AUX- a -DC; 485 A a A RS 485; y 485 B a B RS485. RF-LORA se conecta de forma inalámbrica con los expansores hasta 5000 m. Cada iO-8-LORA tiene una fuente de alimentación independiente de 12-26 V conectada a +DC y -DC." src="./image15.webp" style="display: block; margin: 1rem auto; max-width: 760px; height: auto;" />

!!! note
    Se debe conectar un transceptor RF-LORA al panel de control
    "FLEXi" SP3 y se pueden conectar hasta 8 expansores
    inalámbricos iO-8-LORA.

## Panel de control de seguridad “FLEXi” SP3

1.  Se debe conectar un transceptor RF-LORA al panel de control "FLEXi" SP3.

2.  Encienda la fuente de alimentación del panel de control "FLEXi" SP3.

3.  Encienda la fuente de alimentación del expansor inalámbrico iO-8-LORA.

4.  Ejecuta ***TrikdisConfig**.*

5.  Conecta el "FLEXi" SP3 a una computadora con un cable USB Mini-B o conéctate al "FLEXi" SP3 de forma remota.

6.  Haga clic en **Leer [F4]** para ver los parámetros actuales "FLEXi" SP3. Si se le solicita, introduzca el código del administrador o instalador de en la ventana emergente.

7.  En la lista "**Módulos**", seleccione "**iO-8-LORA Expansor**".

8.  En el campo "**Núm. de Serie**", ingrese el número de serie del módulo.

<img alt="TrikdisConfig SP3, ventana «Módulos», pestaña «RS485 módulos». La fila 1 muestra un expansor iO8-LORA con un número de serie introducido, área 1 y nombre «Expander ID1». La fila 2 muestra «No disponible», área 1 y nombre «Expander ID2»." src="./image16.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

9.  En la pestaña "**Zonas**", configure la entradas del expansor.

<img alt="TrikdisConfig SP3, sección «Zonas», pestaña «Configuraciones de zonas». En la zona 1, el campo «Entrada» muestra «SP3 1 I/O» y tiene abierto su menú. Entre las opciones visibles están «Inhabilitar», «SP3 10 I/O» y «RS485 Expander ID1, IO1», «IO2» e «IO3»; la opción «IO1» está resaltada." src="./image17.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

10. En la pestaña "**PGM**", realice los ajustes para la salidas PGM del expansor.

<img alt="TrikdisConfig SP3, ventana «PGM», pestaña «Salidas». La columna «PGM Salida» muestra «BELL» para PGM 1 y «RS485 Expander ID1, IO2» para PGM 222. PGM 222 tiene «Definición de Salida» «Control remoto» y «Tiempo de Pulso, s» de 10." src="./image18.webp" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

11. Una vez que se finalice la configuración, haz clic en el botón **Escribir [F5]**.

12. Espera a que finalicen las actualizaciones.

13. Haga clic en el botón "**Desconectar**" y desconecte el cable USB.

## Precauciones de seguridad 

Solo el personal calificado puede instalar y servicio el módulo de alarma de intrusión.

Por favor, lea atentamente este manual antes de la instalación con el fin de evitar errores que pueden conducir a un mal funcionamiento o incluso daños en el equipo.

Siempre desconecte la fuente de alimentación antes de realizar las conexiones eléctricas.

<img alt="Símbolo de un contenedor de basura con ruedas tachado, que indica que el producto no debe desecharse con los residuos domésticos." src="./image2.webp" style="display: inline; height: 1.2em; vertical-align: middle;" />Los cambios, modificaciones o reparaciones no autorizadas por el fabricante deberán invalidar la garantía.

Cumpla con la normativa local y no deseche su sistema de alarma inutilizables o sus componentes con los residuos domésticos.
