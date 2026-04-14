# Salidas

![Vista de pantalla completa de la pestaña Salidas](../assets/screens/outputs.webp)

**Propósito:** Configurar destinos de salida para la entrega de eventos e integraciones de automatización.

## Cuándo usarlo

- Al crear o actualizar rutas CMS o de automatización.
- Al solucionar problemas de entrega hacia un destino específico.

## Secciones y por qué importan

### Tabla de salidas {#outputs-table}

Cada fila representa un destino y su configuración de enrutamiento. Campos principales:

- `ID` y `Name`: identifican la salida.
- `Enabled`: controla si los eventos se envían a este destino.
- `Type` y `Protocol`: describen el transporte de salida.
- `Identifier` y `Account number`: identificadores de enrutamiento que espera el sistema de destino.
- `Receiver` y `Line`: identificadores de enrutamiento del lado del receptor.
- `Receivers`: grupo de receptores asignado a esta salida.
- `Host` y `Port`: dirección remota de destino.
- `Buffer size`: límite de cola por salida utilizado para detectar cuellos de botella de entrega.
- `Heartbeat` y `Heartbeat interval`: comprobaciones de salud de la conexión.
- `Encrypt` y `Encryption key`: protegen el transporte cuando es necesario (las integraciones respaldadas por API usan una clave de longitud fija).
- `IP Whitelist`: restringe las IP de destino permitidas.
- `Filters`: filtros de enrutamiento de eventos que controlan qué eventos se envían.

Opciones disponibles de `Type`:

- `TCP`
- `COM Port`
- `JSON Server`
- `TCP Server`
- `Webhook`

Opciones disponibles de `Protocol`:

- `Surgard MLR2`
- `Monas 3`
- `Surgard MLR2 8`
- `Surgard MLR2 No End`
- `Ademco 685`
- `Ademco 685 CID`
- `SurgardMRL2000 CID`
- `SIA DC-09`
- `Surgard MLR2 Line with Account`

Los campos mal configurados aquí son una causa habitual de eventos no entregados, así que valide los cambios frente a los requisitos del sistema de destino.

`Buffer size` es un límite de cola por salida. Un uso alto o creciente de la cola indica retrasos del lado del destino o incompatibilidad de protocolo, y puede provocar retrasos en la entrega de alarmas.

El uso de campos específicos de protocolo varía según la integración y debe coincidir con el perfil de análisis del CMS utilizado en su implementación.

Nota: si `buffer_size` está en `0`, IPcom usa el tamaño de cola predeterminado de `1000` eventos.

### Añadir salida {#outputs-add-output}

Use `Add output` para crear un nuevo destino y rellenar identificadores de enrutamiento y valores de red.

### Comprobaciones y acciones operativas {#outputs-operational-checks}

Use dos pasadas rápidas después de cualquier cambio: primero supervise el comportamiento en tiempo de ejecución y luego confirme los detalles de configuración antes de habilitar la entrega en producción.

**Supervise esto en tiempo de ejecución:**

- Crecimiento de `Buffer size` en salidas activas. Señal de alerta: la cola no se vacía mientras los dispositivos siguen generando eventos.
- Ediciones de endpoint/protocolo sin cambios coordinados en el CMS. Señal de alerta: fallos de entrega o errores de decodificación.
- Nueva salida habilitada antes de que el destino esté preparado. Señal de alerta: crecimiento inmediato del buffer e intentos fallidos de conexión.

**Confirme antes del uso en producción:**

- El `id` de la salida es único y mayor que `0`; `name` no está vacío.
- `Type`, `Protocol` e `Identifier` coinciden con el perfil de integración CMS.
- `OID`, `Receiver number` y `Line` coinciden con el enrutamiento esperado en el CMS.
- Si el cifrado está habilitado, la longitud de `encryption_key` es exactamente de `16` caracteres.
- La política de `IP Whitelist` y `Host` de la salida está alineada con la guía de `Red y firewall`.
- El conjunto de caracteres/codificación de la clave de cifrado está acordado con su equipo de integración.
- El comportamiento de reintento/backoff y persistencia de cola está documentado para su implementación.
- Ejecute eventos de prueba controlados por protocolo antes de habilitar en producción.

## Runbook de operaciones {#outputs-operations-runbook}

- `Los eventos no llegan al destino`: verifique `Enabled`, `Host`/`Port` del destino, elección de protocolo y asignación receptor/línea.
- `Reconexiones frecuentes`: ajuste `Heartbeat interval`, verifique la estabilidad de red y confirme que el destino acepta el protocolo configurado.
- `Crecimiento de cola en una salida`: deshabilite temporalmente la salida problemática, corrija la configuración del endpoint, vuelva a habilitarla y observe la recuperación del buffer.
- `Los cambios rompen la entrega`: compare con una salida conocida que funcione y revierta a los últimos valores estables antes de reintentar.
