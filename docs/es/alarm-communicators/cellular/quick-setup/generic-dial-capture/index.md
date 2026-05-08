# Conexión TIP/RING universal de GT/GT+/GET a un panel de alarma

Use esta guía cuando un panel de alarma reporte eventos mediante su marcador telefónico PSTN. El comunicador GT/GT+/GET se conecta a los terminales `TIP` / `RING` del panel, captura automáticamente los eventos Contact ID y, si se requiere, permite armado/desarmado remoto desde Protegus2 mediante una zona de interruptor de llave. Use esta guía junto con el manual completo del comunicador y el manual de programación del panel.

!!! caution "Precaución"
    La instalación y el servicio deben ser realizados solo por personal cualificado. Desconecte la alimentación antes de cablear. Los cambios no autorizados anulan la garantía.

## Requisitos

- Firmware GT/GT+/GET 1.21, SIM insertada, PIN deshabilitado, plan de datos activo.
- Panel de alarma con marcador telefónico PSTN que admita Contact ID por tonos DTMF.
- Cuenta de empresa/instalador de Protegus2 e IMEI del comunicador.
- Código de instalador del panel y manual de programación del panel solo si el panel no está marcando ya por el marcador telefónico, si deben cambiarse ajustes del marcador o si se añadirá armado/desarmado remoto mediante una zona de interruptor de llave.
- Zona libre del panel que pueda programarse como zona de interruptor de llave solo si se requiere armado/desarmado remoto.

!!! note "Nota"
    Si el panel ya reportaba mediante marcador telefónico, mantenga el marcador del panel habilitado y conecte el comunicador a los terminales `TIP` / `RING` del panel. El comunicador contesta la llamada del panel y captura automáticamente los eventos Contact ID con cualquier ID de cuenta enviado por el panel. Cambie la programación del panel solo si el panel no está marcando ya, los ajustes del marcador no son correctos, el ID de cuenta debe cumplir un requisito de CRA/CMS o se debe añadir una zona de interruptor de llave para armado/desarmado remoto.

## Cableado

Desconecte la alimentación del panel y del comunicador antes de cablear. Conecte el comunicador a la alimentación del panel, `TIP` / `RING` y la zona de interruptor de llave como se muestra abajo.

| Terminal GT/GT+/GET | Terminal del panel de alarma | Propósito |
| --- | --- | --- |
| `+12V` / `GND` | `AUX+` / `AUX-` | Alimentar el comunicador desde la salida auxiliar del panel. |
| `TIP` / `RING` | `TIP` / `RING` | Capturar eventos Contact ID desde el marcador telefónico del panel. |
| `OUT` / `I/O` configurado como PGM | Entrada de zona de interruptor de llave | Enviar comandos de armado/desarmado desde Protegus2. |
| `GND` / `COM` | Común de zona, si se requiere | Referencia común para el cableado de la zona de interruptor de llave. |

![Esquema genérico de cableado TIP/RING y zona de interruptor de llave](../../../../../images/quick-setup/generic-dial-capture.svg)

!!! warning "Advertencia"
    Cablee la zona de interruptor de llave exactamente como lo requiere el manual del panel. Algunos paneles usan entrada normalmente abierta, entrada normalmente cerrada, resistencia EOL, doble resistencia EOL o un terminal común dedicado.

## Programación del panel

Omita esta sección si el panel ya marca por el marcador telefónico y no se necesita armado/desarmado remoto. Los códigos de programación son diferentes para cada fabricante y modelo. Use el manual de programación del panel de alarma solo para los puntos que deban cambiarse.

1. Habilite el marcador telefónico PSTN del panel.
2. Seleccione marcación por tonos / DTMF.
3. Seleccione el formato de reporte Contact ID.
4. Configure el número telefónico del receptor. Si el panel ya reportaba a una central receptora por línea telefónica, normalmente puede dejarse el número existente. Para una nueva captura TIP/RING, introduzca cualquier número de receptor de más de 4 dígitos, salvo que el manual del panel requiera otro formato.
5. Si se requiere reporte a CRA/CMS, configure el ID de cuenta del panel con el valor suministrado por la central receptora. El comunicador puede transmitir el ID de cuenta enviado por el panel, por lo que no se requiere un Object ID separado del comunicador para una captura TIP/RING básica.
6. Habilite los eventos que deben reportarse, incluidos alarmas, restauraciones, averías, sabotajes y eventos de apertura/cierre cuando sean necesarios.
7. Programe la zona conectada a la salida del comunicador como zona de interruptor de llave solo cuando se requiera armado/desarmado remoto desde Protegus2.
8. Seleccione el tipo de interruptor de llave que coincida con el modo de salida del comunicador: momentáneo / pulso o mantenido / nivel.
9. Asigne la zona de interruptor de llave a la partición o área correcta, después guarde y salga de programación.

!!! important "Importante"
    El armado/desarmado remoto desde Protegus2 funciona solo cuando la zona cableada del panel está programada como zona de interruptor de llave. El estado en la app también depende de que el panel envíe eventos de apertura y cierre mediante el marcador.

## Añadir sistema a Protegus2

<div class="steps-grid">
  <div class="step-card">
    <strong>Paso 1.</strong> Pulse <strong>Agregar nuevo sistema</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 1 ENG 2026 01 02.webp" alt="Agregar nuevo sistema">
  </div>
  <div class="step-card">
    <strong>Paso 2.</strong> Introduzca el <strong>IMEI</strong> del comunicador y pulse <strong>Siguiente</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 2 ENG 2026 01 02.webp" alt="Introducir IMEI del comunicador">
  </div>
  <div class="step-card">
    <strong>Paso 3.</strong> Seleccione la empresa de seguridad.
    <img src="../dsc neo hs/GT+ neo hs2016 3 ENG 2026 01 02.webp" alt="Seleccionar empresa de seguridad">
  </div>
  <div class="step-card">
    <strong>Paso 4.</strong> Elija <strong>TIP RING</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 4 ENG 2026 01 02.webp" alt="Elegir TIP RING">
  </div>
  <div class="step-card">
    <strong>Paso 5.</strong> Elija <strong>Mode</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 5 ENG 2026 01 02.webp" alt="Elegir Mode">
  </div>
  <div class="step-card">
    <strong>Paso 6.</strong> Elija <strong>AUTO</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 6 ENG 2026 01 02.webp" alt="Elegir AUTO">
  </div>
  <div class="step-card">
    <strong>Paso 7.</strong> Introduzca <strong>Object ID</strong> si lo requiere el asistente o la configuración de monitoreo, introduzca <strong>Module ID</strong> y pulse <strong>Siguiente</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 8 ENG 2026 01 02.webp" alt="Introducir Object ID y Module ID">
  </div>
  <div class="step-card">
    <strong>Paso 8.</strong> Espere mientras se escriben los datos.
    <img src="../dsc neo hs/GT+ neo hs2016 9 ENG 2026 01 02.webp" alt="Escritura de datos">
  </div>
  <div class="step-card">
    <strong>Paso 9.</strong> Pulse <strong>Agregar a Protegus2</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 10 ENG 2026 01 02.webp" alt="Añadir a Protegus2">
  </div>
  <div class="step-card">
    <strong>Paso 10.</strong> Introduzca el <strong>nombre</strong> del sistema y pulse <strong>Siguiente</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 11 ENG 2026 01 02.webp" alt="Introducir nombre del sistema">
  </div>
  <div class="step-card">
    <strong>Paso 11.</strong> Introduzca el <strong>nombre del área</strong>. Active <strong>Control with Protegus2</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 13 ENG 2026 01 02.webp" alt="Activar control con Protegus2">
  </div>
  <div class="step-card">
    <strong>Paso 12.</strong> Elija la salida PGM cableada. Seleccione <strong>Pulso</strong> o <strong>Nivel</strong> para que coincida con la zona de interruptor de llave del panel y pulse <strong>Guardar</strong>.
    <img src="../dsc neo hs/GT+ neo hs2016 14 ENG 2026 01 02.webp" alt="Elegir salida PGM">
  </div>
</div>

!!! tip "Consejo"
    Si solo se requiere reporte de eventos, omita el cableado de la salida a la zona de interruptor de llave y deje deshabilitado el armado/desarmado remoto en Protegus2.

## Comprobación del sistema

- [ ] Arme y desarme el panel desde el teclado.
- [ ] Genere una alarma de prueba mientras el sistema está armado.
- [ ] Confirme que los eventos lleguen a Protegus2. Si se usa reporte a CRA/CMS, confirme que la central receptora reciba eventos con el ID de cuenta esperado.
- [ ] Arme y desarme el sistema desde Protegus2 si la zona de interruptor de llave está cableada.
- [ ] Confirme que el panel obedece el comando de la app y luego reporta el evento de apertura/cierre de vuelta a Protegus2.
- [ ] Si no se reciben eventos, revise la habilitación del marcador del panel, la marcación DTMF, el formato Contact ID, el número telefónico, el cableado `TIP` / `RING` y el ID de cuenta solo cuando se espere reporte a CRA/CMS.
