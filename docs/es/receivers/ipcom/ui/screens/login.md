# Inicio de sesión

**Propósito:** Autenticar al usuario en IPcom Control Web antes de acceder a las pestañas de supervisión y administración.

## Cuándo usarlo

- Al inicio de cada sesión de administración o supervisión.
- Después de la expiración del token o de un cierre de sesión explícito.

## Secciones y por qué importan

### Formulario de inicio de sesión

Recoge `Username` y `Password` e inicia una sesión cuando se selecciona `Login`.

### Indicador de compilación

El valor de compilación mostrado en esta pantalla ayuda a los operadores a verificar que están accediendo a la implementación esperada antes de aplicar cambios.


## Campos clave que debe vigilar {#login-key-fields}

- `Username`: principal utilizado para autenticación y correlación en auditoría. Señal de alerta: fallos repetidos de inicio de sesión para usuarios válidos.
- `Password`: secreto de credencial para acceso a la cuenta. Señal de alerta: bloqueos o solicitudes frecuentes de restablecimiento.
- `Login`: envía la solicitud de autenticación. Señal de alerta: no hay respuesta o rechazo repetido pese a una conectividad de red válida.
- `IPCCw Build`: identificador de implementación/compilación mostrado en la pantalla de inicio de sesión. Señal de alerta: valor de compilación inesperado después de mantenimiento.
