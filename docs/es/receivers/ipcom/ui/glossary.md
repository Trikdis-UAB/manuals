# Glosario de la interfaz de IPcom

Use este glosario al revisar las pestañas `Estado`, `Eventos entrantes` y `Objetos`.

## IDs principales

- `OID` - ID de objeto en IPcom.
- `PUID` - UID parcial (UID truncado del dispositivo mostrado en listas de eventos).
- `UID` - Identificador único del dispositivo.
- `ICCID` - Identificador de la tarjeta SIM para dispositivos celulares.

## Conectividad y transporte

- `Com` / `Com Type` - Canal de comunicación utilizado por el dispositivo (por ejemplo, `GSM`, `WiFi`, `LAN`).
- `Con` - Protocolo de conexión (por ejemplo, `TCP`, `UDP`).
- `Lvl` - Indicador del nivel de señal.
- `Ping` - Indicador de keepalive o alcanzabilidad.
- `SMS Ping` - Keepalive por transporte SMS.

## Campos de enrutamiento {#glossary-routing-fields}

- `RR ID` - Identificador de enrutamiento del receptor. [REVIEW]
- `RR` - Número de receptor utilizado para el enrutamiento de eventos. [REVIEW]
- `LL` - Número de línea utilizado para el enrutamiento de eventos. [REVIEW]
- `Dev RR` - Valor de receptor informado por el dispositivo. [REVIEW]
- `Dev LL` - Valor de línea informado por el dispositivo. [REVIEW]
- `Reg?` - Indicador del estado de registro del dispositivo. [REVIEW]

## Campos de la carga del evento

- `Seq` - Número de secuencia del evento.
- `Code` - Código de evento enviado a los sistemas de destino.
- `Group` - Valor de grupo del evento.
- `Zone` - Valor de zona del evento.
- `Type` / `SubType` - Categoría y subcategoría del evento.
- `P` - Valor de partición (si lo usa el protocolo del panel).

## Estados operativos

- `Online` - El dispositivo se comunica activamente dentro de los umbrales de supervisión.
- `Offline` - El dispositivo ha superado los umbrales de supervisión sin comunicación.
- `Untracked` - El dispositivo está presente, pero actualmente no lo supervisa la lógica de seguimiento.

## Campos de supervisión {#glossary-supervision-fields}

- `OOVR` - Campo relacionado con supervisión/anulación del objeto mostrado en `Objetos`. El comportamiento exacto sigue en [REVIEW].
