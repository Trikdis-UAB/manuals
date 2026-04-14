# Guía de red y firewall

Esta página resume los límites de red de IPcom desde la perspectiva de operaciones TI.

## Direcciones del tráfico {#network-traffic-directions}

- Entrante hacia IPcom: el tráfico de los dispositivos llega a los listeners del receptor configurados (`TCP`/`UDP`/`COM`/rutas de módem).
- Saliente desde IPcom: los eventos y el tráfico de estado se envían a salidas CMS/automatización.

## Planificación del firewall {#network-firewall-planning}

- Permita puertos de listeners del receptor entrantes solo desde redes o fuentes de dispositivos de confianza.
- Permita tráfico saliente solo hacia IP y puertos de destino CMS/automatización aprobados.
- Mantenga el acceso a la interfaz de gestión limitado a redes de administración, jump hosts o VPN.
- Revise reglas NAT y de redirección de puertos antes de cambiar los puertos de listener en `Receptores`.

## Notas sobre lista permitida de IP {#network-ip-allowlist}

- Los campos `IP Whitelist` aparecen tanto en `General` como en contextos de `Salidas`.
- La dirección y el comportamiento de aplicación deben validarse en su implementación antes de confiar en ello para la segmentación. [REVIEW]

## Lista de comprobación de cambios {#network-change-checklist}

1. Aplique cambios de firewall y NAT antes de modificar ajustes de receptor o salida en producción.
2. Valide la conectividad con eventos de prueba controlados.
3. Supervise los buffers de `Estado` y los `Registros` para detectar rechazos o fallos de conexión.
4. Mantenga un conjunto de reglas de reversión para una recuperación rápida.
