# Registros

![Vista de pantalla completa de la pestaña Registros](../assets/screens/logs.webp)

**Propósito:** Proporcionar una pista de auditoría de la actividad del sistema y de las acciones administrativas para la resolución de problemas y el cumplimiento.

## Cuándo usarlo

- Después de cambios de configuración para confirmar que se aplicaron.
- Al investigar reinicios, tareas de limpieza o comportamientos inesperados.

## Secciones y por qué importan

### Tabla de registros {#logs-table}

Cada fila registra un evento del sistema o administrativo con marca de tiempo, tipo y mensaje. Este es el primer lugar para confirmar limpiezas programadas, actualizaciones o cambios de configuración. Algunas entradas incluyen un enlace `more info` con detalles ampliados que ayuda a identificar qué cambió y quién lo inició.

### Comprobaciones y acciones operativas {#logs-operational-checks}

Use dos pasadas rápidas: primero supervise patrones en las entradas recientes y luego confirme los metadatos del evento antes de escalar.

**Supervise esto en tiempo de ejecución:**

- Entradas `error` repetidas en ventanas de tiempo cortas. Señal de alerta: inestabilidad recurrente de transporte o del servicio.
- Entradas de tipo `Settings` frecuentes fuera de ventanas de mantenimiento. Señal de alerta: cambios no autorizados o accidentales.
- Actor/origen de `more info` no coincide con el operador o la cuenta de automatización esperados. Señal de alerta: cambios administrativos no planificados.

**Confirme antes del uso en producción:**

- Las etiquetas `Type` se mantienen coherentes (`info`, `warning`, `error`, `settings`).
- Las marcas de tiempo siguen el orden cronológico esperado para la misma línea temporal del incidente.

## Lista de comprobación para incidentes {#logs-incident-checklist}

- `Fallos de entrega al destino`: busque errores repetidos de conexión de salida y patrones de timeout.
- `Fallos de ingesta del receptor`: busque errores de bind/start del listener después de cambios de puerto o red.
- `Problemas de autenticación y permisos`: busque eventos fallidos de login/auth después de cambios de cuenta o token.
- `Síntomas de acumulación`: correlacione entradas de limpieza o advertencia con crecimiento de buffers en `Estado`.
