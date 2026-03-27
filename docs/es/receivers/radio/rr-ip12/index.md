---
pdf: rr-ip12-original.pdf
---

# Repetidor R-IP12

<div style="text-align: center;">
  <img src="./image1.webp" alt="" style="width: 100%; max-width: 600px;">
</div>

## Finalidad del producto

El repetidor R-IP12 es un dispositivo multifuncional del sistema de transmisión de mensajes diseñado para retransmitir los mensajes recibidos a una central receptora centralizada.

## Características principales

- La configuración del repetidor se selecciona en función de la tarea a resolver.
- Selección de canales de comunicación con la central receptora: GPRS / Ethernet / Radio — según se requiera.
- Los mensajes a la central receptora se envían por los canales de comunicación principal o de respaldo.

## Ámbito de aplicación

El repetidor R-IP12 puede utilizarse para:

- Retransmisión de mensajes de transmisores de radio por canal de radio.
- Retransmisión de mensajes de transmisores de radio por canales de comunicación IP.
- Retransmisión de mensajes de otros dispositivos receptores remotos por canales IP.

## Principio de funcionamiento

Los mensajes enviados desde el equipo del objeto son recibidos por un receptor de radio o entran al repetidor por el puerto serie RS232. Los mensajes recibidos se filtran y enrutan hacia los módulos de transmisión según los parámetros configurados durante la parametrización.

La transmisión a la central receptora se realiza mediante uno o varios módulos de transmisión que operan por diferentes canales de comunicación. Tras la recepción del mensaje, el módulo de transmisión lo envía a través de su propio canal de comunicación al equipo de la central receptora. Los mensajes se envían en una secuencia especificada o simultáneamente si se utilizan dos (o más) módulos de transmisión.

El diagrama estructural del repetidor R-IP12 se muestra en la Figura 1.

<img alt="Diagrama estructural del repetidor R-IP12" src="./image3.webp" style="width: 100%; max-width: 700px;">

*Fig. 1. Diagrama estructural del repetidor R-IP12*

Opciones posibles de uso y equipamiento del receptor, preparadas según los requisitos de la tarea:

| Opción | R11 | GM10 | E10C | T10R | R7 | Notas |
|--------|-----|------|------|------|----|-------|
| Base_1 | + | + x2 | — | — | — | Recepción por canal de radio (RAS-3); transmisión por GPRS |
| Base_2 | + | + | + | — | — | Recepción por canal de radio (RAS-3); transmisión por GPRS y Ethernet |
| Radio_1 | + | — | — | + | — | Recepción por canal de radio (RAS-3); transmisión por canal de radio |
| Radio doble_1 | + | + x2 | — | — | + | Recepción por canal de radio (RAS-2M y RAS-3); transmisión por GPRS |
| Radio doble_2 | + | + | + | — | + | Recepción por canal de radio (RAS-2M y RAS-3); transmisión por GPRS y Ethernet |

!!! note
    Los módulos de transmisión requeridos se instalan en el repetidor durante la fabricación.

Las opciones base permiten el envío de mensajes de radio de los objetos monitorizados con codificación del sistema RAS-3 y la recepción por el receptor de radio R11. Los circuitos de control de tensión AC del repetidor, protección de la carcasa y control del conmutador de antena también se conectan a sus entradas.

La opción de radio permite el envío de mensajes de radio de los objetos monitorizados con codificación del sistema RAS-3 y la recepción por el receptor de radio R11. Los mensajes se retransmiten mediante un único transmisor de radio conectado. La antena se conecta al transmisor durante el envío.

Las opciones de radio ampliadas permiten el envío de mensajes de radio de los objetos monitorizados con codificaciones de los sistemas RAS-2M, LARS y LARS1, y la recepción por el receptor de radio R11. La información del receptor R7 se enruta al receptor R11 por el puerto serie RS232. En lugar del receptor R7, puede conectarse cualquier otra unidad receptora de mensajes al puerto serie RS232 según sea necesario.

La información del receptor R11 se enruta a los módulos de transmisión por la interfaz MCI. El módulo de transmisión GM10 opera por canal GPRS, el módulo E10C por canal Ethernet, y el transmisor T10R por canal de radio. La comunicación con los módulos de transmisión está constantemente bajo control. Si se pierde la comunicación con un módulo de transmisión, los mensajes se transmiten por el módulo siguiente.

El orden de transmisión se configura durante la parametrización del repetidor. El dispositivo de transmisión indicado como primero es el que opera en primer lugar y transmite los datos. Si falla el envío de datos por el primer dispositivo o si el receptor R11 ha detectado previamente una interrupción de comunicación por el primero, los datos se enviarán por el segundo, o si éste también falla, por el tercer módulo de comunicación. También es posible configurar el envío simultáneo (concurrente) para los dispositivos seleccionados.

La comunicación con el equipo de la estación está constantemente bajo control cuando se utilizan módulos de comunicación bidireccional (GPRS y Ethernet). Para este fin, los módulos de transmisión envían mensajes especiales de prueba de comunicación PING que son controlados por el receptor IP de la central receptora RL14, RM14 (u otro equipo similar), el cual entrega un mensaje de confirmación de recepción. Cuando se pierde la comunicación, el módulo notifica al receptor R11, que enruta los mensajes al otro módulo operativo y los mensajes se transmiten por otro canal de comunicación.

## Especificaciones técnicas

1. El repetidor R-IP12 recibe mensajes de radio enviados por los sistemas de codificación RAS-3, RAS-2M, LARS y LARS1 (en función de la configuración del repetidor y los ajustes del receptor).

2. El receptor R11 del repetidor R-IP12 está equipado con el puerto serie RS232 para la recepción de mensajes transmitidos mediante el protocolo Surgard MLR2-DG.

3. El receptor R11 del repetidor R-IP12 incluye cuatro terminales que pueden configurarse como entrada o salida: tipo de entrada NO/NC, tipo de salida — colector abierto (OC), conmutación de tensión continua hasta 30 V y corriente hasta 0,1 A.

4. El repetidor está equipado con módulos de transmisión que operan por diferentes canales de comunicación:

   - **T10R** está diseñado para la retransmisión de mensajes de radio por canal de radio. El dispositivo opera con codificación RAS-3 y protocolo Monas-3D. Los mensajes pueden ser recibidos por los receptores R11 y RF11.
   - **GM10** está diseñado para la retransmisión de mensajes por canal GPRS. Opera con protocolo UDP/IP y codificación TRK_UDP. Los mensajes pueden ser recibidos por el receptor RL10 (u otro equipo similar).
   - **E10C** está diseñado para la retransmisión de mensajes por canal Ethernet. Opera con protocolo UDP/IP y codificación TRK_UDP. Los mensajes pueden ser recibidos por el receptor RL10 (u otro equipo similar).

   Pueden instalarse tres módulos de transmisión diferentes considerando las distintas opciones de tarea y equipamiento.

5. El repetidor se alimenta de la red eléctrica AC a 230 V con frecuencia de 50 ± 1 Hz. Potencia máxima de 60 W. Los límites de variación de tensión admisibles son de 120 a 250 V.

6. El repetidor se alimenta con una batería de respaldo de 12 V con una capacidad mínima de 7 Ah. La corriente aplicada no supera 1,8 A (en la opción de equipamiento máximo con tres módulos de transmisión y dos módulos receptores). Los límites de variación de tensión admisibles son de 10,5 a 13,8 V. La batería se carga automáticamente con la alimentación AC de red.

7. El repetidor funciona y mantiene los parámetros indicados a temperatura ambiente de -10 °C a +55 °C y humedad relativa del aire de hasta el 90 % a +20 °C.

8. Las dimensiones generales del repetidor no superan 310 x 390 x 130 mm. El peso es de hasta 4 kg.

## Vista general y diseño del repetidor R-IP12

Todos los nodos del repetidor R-IP12 están instalados sobre una base metálica alojada en una carcasa de plástico. La vista general del repetidor R-IP12 se muestra en la Figura 2.

Con la cubierta frontal retirada, son visibles los siguientes componentes:

- Módulos receptores R11 y R7 (en la parte inferior)
- Batería de respaldo 12 V / 7 Ah
- Módulos de transmisión GM10, E10C y T10R
- Sensor de apertura de carcasa
- Fuente de alimentación conmutada
- Entrada de red AC
- Conmutador de antena

*Fig. 2. Vista general del repetidor R-IP12 (cubierta frontal retirada)*

!!! note
    La cantidad de módulos de transmisión y recepción instalados puede variar según la opción de equipamiento seleccionada, conforme a la configuración proporcionada del repetidor.

La cubierta frontal de la carcasa tiene bisagras y puede retirarse completamente. En posición de funcionamiento, la cubierta frontal debe estar cerrada y fijada adicionalmente con cuatro tornillos.

Todos los cables de conexión, antena y alimentación se introducen en el repetidor a través de los orificios situados en la parte inferior de la carcasa.

## Preparación del repetidor

La preparación del repetidor para su comercialización y entrega al cliente se organiza de la siguiente manera:

1. Selección de la opción de equipamiento según la tarea correspondiente.
2. Montaje del repetidor.
3. Configuración de los módulos receptores y módulos de transmisión conforme a los requisitos.
4. Prueba de funcionamiento del repetidor y preparación de la documentación de entrega.

!!! note
    La documentación de entrega debe especificar los datos del cliente, la opción de equipamiento del repetidor y los parámetros configurados de los módulos receptores y módulos de transmisión.

## Configuración del repetidor

Los parámetros de funcionamiento del repetidor se configuran mediante el software de parametrización para los nodos individuales. El procedimiento detallado de configuración se describe en los manuales de instalación. A continuación se indica la parametrización necesaria para garantizar el modo de retransmisión.

### 1. Configuración de los parámetros del receptor R11

Los parámetros del receptor de radio R11 se configuran mediante el software de parametrización R11config. Se deben indicar los siguientes parámetros:

- Modo repetidor, frecuencia de operación, tipo de identificación
- Parámetros de filtrado de mensajes:
  - por secuencia de ID
  - por sistemas de codificación y subsistemas
  - por números internos de repetidores
  - Tiempo de silencio para la misma señal
- Protocolo de salida y parámetros de intercambio, secuencia de transmisión a los módulos de envío y/o recepción activada por el puerto serie:
  - Lista de mensajes generados
  - Número de receptor y línea, números de subsistema e ID mostrados en el mensaje
  - Protocolo de salida
  - Entrada activada, protocolo de intercambio y velocidad
  - Secuencia de operación de los módulos de transmisión conectados

### 2. Configuración de los parámetros del módulo de transmisión GM10

Los parámetros del módulo de transmisión GM10 se configuran mediante el software de parametrización G10config. Se deben indicar los siguientes parámetros:

- Parámetros de identificación del módulo de transmisión:
  - Número de secuencia del módulo de transmisión
  - ID del módulo de transmisión

!!! note
    No puede haber dos módulos con números de secuencia idénticos.

- Dirección del dispositivo receptor al que se envían los mensajes:
  - Clave de cifrado
  - Parámetros de red
  - Dirección de recepción

### 3. Configuración de los parámetros del módulo de transmisión E10C

Los parámetros del módulo de transmisión E10C se configuran mediante el software de parametrización Econfig. Se deben indicar los siguientes parámetros:

- Parámetros de identificación del módulo de transmisión:
  - ID del módulo de transmisión
- Dirección del dispositivo receptor al que se envían los mensajes:
  - Protocolo de comunicación del módulo de transmisión
  - Parámetros de red y receptor (envío entrante)
  - Parámetros de red (envío saliente)
  - Contraseña
  - Número de secuencia del módulo de transmisión
  - Tiempo PING del módulo de transmisión

### 4. Configuración de los parámetros del transmisor de radio T10R

Los parámetros del transmisor de radio T10R se configuran mediante el software de parametrización T10config. Se deben indicar los siguientes parámetros:

- Parámetros de identificación del módulo de transmisión, frecuencia de operación y codificación, número de recurrencias del mensaje:
  - Protocolo de codificación, ID del módulo, subsistema, frecuencia de operación y potencia de salida
  - Número de recurrencias del mensaje en el repetidor = 1
- Parámetros de la interfaz MCI y número de secuencia del módulo:
  - Activar MCI, número de secuencia y número interno del repetidor

### 5. Configuración de los parámetros del receptor R7

Los parámetros del receptor de radio R7 se configuran mediante el software de parametrización Hyper Terminal. Se deben indicar los siguientes parámetros:

- Frecuencia de operación especificada, codificación y parámetros de filtrado de mensajes
- Configurar el protocolo de salida Surgard MLR2-DG
- Números de receptor y línea especificados

!!! note
    Los parámetros de otros dispositivos receptores se configuran utilizando el equipo indicado en los manuales de instalación de dichos dispositivos.

## Instalación del repetidor

El lugar de instalación del receptor debe seleccionarse teniendo en cuenta la finalidad del receptor, las características y el tamaño del terreno regional, y evaluando la protección contra posibles intrusiones ilegales. El repetidor debe instalarse en locales no residenciales, en lugares de acceso limitado y complicado. El repetidor debe montarse en una pared vertical de un local (que puede carecer de calefacción).

Para evitar lesiones (causadas por calor o tensión eléctrica) y garantizar un funcionamiento fiable y duradero del repetidor, es necesario respetar las normas de seguridad.

La secuencia de instalación recomendada es la siguiente:

1. Las antenas de radio deben instalarse a una altura de 20–30 m sobre la superficie del suelo y el cable debe tenderse hacia el repetidor. Es conveniente utilizar antenas separadas para recepción y transmisión. Para el acoplamiento entre el repetidor y la antena debe utilizarse cable coaxial de baja atenuación. Se recomienda cable RG213 o de mejor calidad. Erija el mástil, monte la antena, conecte el cable coaxial y compruebe la compatibilidad de la antena con la frecuencia de operación. La relación de onda estacionaria no debe superar 1,5.

2. Fije el repetidor a la pared vertical. La ubicación del orificio de montaje de la carcasa del repetidor y las dimensiones se indican en el embalaje del dispositivo. El repetidor se fija con cuatro tornillos. Los cables de red AC y los cables de antena deben conectarse una vez fijado el repetidor.

3. Retire el fusible de entrada de la red AC del receptor y conecte los cables de la red AC así como la toma de tierra a los contactos de tensión alterna. La descripción de los contactos del bloque de bornes se indica en el Anexo A. El cable de fase debe conectarse al terminal protegido por el fusible. Fije cuidadosamente el cable de alimentación de la red AC.

4. Para la aplicación de los módulos de transmisión GPRS GM10, inserte las tarjetas SIM en los mismos. La tarjeta SIM y el plan de tarifas deben permitir el envío de datos por canal GPRS mediante protocolo UDP. La solicitud del código PIN de la tarjeta SIM debe estar desactivada.

5. Para la aplicación de los módulos de transmisión Ethernet E10C, conecte el cable de red Ethernet. Los ajustes de red aplicados deben conocerse ya e introducirse en los módulos.

6. Para la aplicación del transmisor de radio T10R, conecte el cable de antena al puerto central del conmutador de antena (o al puerto de antena del transmisor en caso de antenas separadas para recepción y transmisión).

7. Inserte la batería cargada y conecte el cable rojo al terminal «+» de la batería y el cable negro al terminal «−» de la batería.

!!! note
    Los indicadores luminosos de alimentación/funcionamiento de los dispositivos R-IP12 parpadean cuando se activa la alimentación.

8. Inserte el fusible de red AC del repetidor y active la alimentación desde la red AC.

Durante la activación de la alimentación (o tras pulsar el botón RESET del receptor R11) se comprueban los estados de las entradas del receptor R11 y se envían los mensajes iniciales. En el plazo de 1–2 min. se envían todos los mensajes y el repetidor está listo para retransmitir mensajes.

Se recomienda configurar la hora actual en el receptor R11.

## Prueba de comunicación

La comunicación con la central receptora centralizada debe probarse tras la instalación completa del repetidor. Para ello:

1. Compruebe que la central receptora recibe los mensajes PING de los módulos de transmisión GPRS y Ethernet.
2. Compruebe que la central receptora recibe los mensajes enviados por el transmisor de radio.
3. Compruebe que la central receptora recibe mensajes al pulsar y soltar el sensor de protección de la carcasa del repetidor.
4. Genere señales de un transmisor de objeto individual y compruebe su recepción en la central receptora. Compruebe todas las combinaciones disponibles en caso de que el repetidor reciba señales de varias codificaciones o frecuencias.

!!! note
    Los mismos mensajes transmitidos por diferentes canales difieren entre sí y deben describirse correctamente en el software de monitorización.

El repetidor se considera correctamente instalado si todos los mensajes enviados son recibidos correctamente en la central receptora.

## Anexo A — Finalidad de los terminales del bloque de alimentación principal

El cable de conexión a la red AC debe ser de doble aislamiento, con conductores de sección transversal mínima de 0,75 mm². El cable debe incluir un conductor de protección amarillo-verde.

| Color del cable | Descripción |
|----------------|-------------|
| Amarillo / verde | Terminal de tierra |
| Marrón | Terminal de fase de la red AC |
| Azul | Terminal neutro de la red AC |
