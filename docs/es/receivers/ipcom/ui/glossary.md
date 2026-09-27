# Glosario de la interfaz de IPcom

Use este glosario al revisar las pestañas `Estado`, `Eventos entrantes` y `Objetos`.

## IDs principales

- `OID` - ID de objeto en IPcom.
- `PUID` - UID parcial (UID truncado del dispositivo mostrado en listas de eventos).
- `UID` - Identificador único del dispositivo.
- `ICCID` - Identificador de la tarjeta SIM para dispositivos celulares.
- `OOVR` - Sobrescritura del OID. Número de objeto alternativo que sustituye al OID propio del objeto; se usa para reasignar el objeto al número de abonado que espera su software de monitorización. Vacío o `0` significa que no se aplica ninguna sobrescritura.

## Conectividad y transporte

- `Com` / `Com Type` - Canal de comunicación utilizado por el dispositivo (por ejemplo, `GSM`, `WiFi`, `LAN`).
- `Con` - Protocolo de conexión (por ejemplo, `TCP`, `UDP`).
- `Lvl` - Indicador del nivel de señal.
- `Ping` - Indicador de keepalive o alcanzabilidad.
- `SMS Ping` - Keepalive por transporte SMS.

## Campos de enrutamiento {#glossary-routing-fields}

- `RR ID` - ID del receptor.
- `RR` - Número de receptor.
- `LL` - Número de línea.
- `Dev RR` - Número de receptor informado por el propio dispositivo.
- `Dev LL` - Número de línea informado por el propio dispositivo.

## Campos de la carga del evento

- `Reg?` - Indica si ese evento concreto es un evento de registro. Describe el evento, no el estado actual del dispositivo.
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
