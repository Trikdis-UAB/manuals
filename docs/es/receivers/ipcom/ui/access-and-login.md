# Acceso e inicio de sesión

![Vista de pantalla completa de la página de acceso e inicio de sesión](./assets/screens/login.webp)

**Propósito:** Explicar cómo los operadores acceden a IPcom5 Control e inician sesión mediante los métodos de implementación compatibles.

## Métodos de acceso

- `Acceso web` está disponible para todas las variantes de implementación mediante URL/dominio del navegador y puerto de gestión.
- `Acceso mediante .exe de Windows` está disponible en instalaciones Windows y abre el mismo entorno de IPcom Control a través del cliente de Windows.

## Flujo de acceso web

1. Abra la URL de IPcom Control en un navegador (`http(s)://<host>:<port>`).
2. Confirme la instancia o compilación de destino en la página de inicio de sesión antes de introducir credenciales.
3. Inicie sesión con su cuenta de usuario.
4. Después del inicio de sesión, verifique el entorno y el estado en `Estado`.

## Flujo de acceso mediante `.exe` de Windows

1. Inicie el `.exe` de IPcom Control desde la instalación de Windows.
2. Seleccione o introduzca la instancia receptora de destino (host/dominio y puerto).
3. Autentíquese con sus credenciales de cuenta de IPcom.
4. Verifique que está en la instancia prevista usando el contexto de cabecera o pie en `Estado`.

## Referencia de seguridad para el acceso

- Use HTTPS para el acceso de gestión siempre que sea posible.
- Restrinja el alcance de la interfaz de gestión a redes de confianza (VPN/lista permitida/política de firewall).
- Mantenga `administrator` para uso de emergencia y use cuentas nominativas para el trabajo diario.
- Rote credenciales y secretos de integración con regularidad.

## Solución rápida de problemas

- `No se puede iniciar sesión`: verifique host/puerto correctos, credenciales de cuenta y estado de la cuenta en `Usuarios`.
- `Se abrió la instancia incorrecta`: confirme la etiqueta de instancia de la cabecera y el contexto host/usuario del pie en `Estado`.
- `La sesión expira demasiado rápido`: revise la configuración del token y la política de funciones en `Usuarios`.
- `Versión/compilación inesperada`: detenga los cambios y confirme el destino de implementación antes de continuar.

## Páginas relacionadas

- Operaciones de cuentas: [Pestaña Usuarios](./screens/users.md)
- Primera verificación tras iniciar sesión: [Pestaña Estado](./screens/status.md)
