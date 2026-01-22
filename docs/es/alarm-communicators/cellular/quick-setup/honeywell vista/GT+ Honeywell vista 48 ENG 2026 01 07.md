# Honeywell Vista-48 con GT/GT+/GET configuración rápida

Pasos breves de cableado y programación para conectar el comunicador GT/GT+/GET al panel Honeywell Ademco Vista-48 (Vista-20, Vista-15) usando KeyBus, y luego añadir el sistema a Protegus2. Use esto junto con los manuales completos para otros ajustes. (Las etiquetas de terminal pueden variar ligeramente entre GT/GT+/GET, pero las conexiones son las mismas.)

!!! caution "Precaución"
    La instalación y el servicio deben ser realizados solo por personal cualificado. Desconecte la alimentación antes de cablear. Los cambios no autorizados anulan la garantía.

## Requisitos

1. Firmware GT/GT+/GET 1.21, SIM insertada, PIN deshabilitado, plan de datos activo.
1. Panel Honeywell Ademco Vista-48 (Vista-20, Vista-15) con acceso al teclado (código de instalador disponible).
1. Número de cuenta CMS si reporta a CMS.
1. Cuenta de empresa/instalador de Protegus2 y IMEI del comunicador.

## Cableado

Siga el esquema de abajo para conectar el comunicador al panel:

| **Terminal GT/GT+/GET** | **Panel Honeywell** | **Notas**               |
| ----------------------- | ------------------- | ----------------------- |
| +12V DC/-12V DC         | 5/4                 | Alimentación del comunicador |
| CLK/DATA                | 7/8                 | KeyBus                  |


<img src="../GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05.png" alt="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05" class="GT+ honeywell vista 48 prijungimo schema ENG 2026 01 05">

## Programación del panel de alarma Honeywell Ademco Vista-48 (Vista-20, Vista-15) mediante el teclado

Usando el teclado del panel, entre en estas secciones y configúrelas como se indica:

**Habilitar reporte Contact ID**

| **Entrada de teclado** | **Descripción de la acción**                     |
| ---------------------- | ----------------------------------------------- |
| *4112800 *             | Entrar en modo de programación                  |
| *591 *                 | Habilitar “Exit Error Report Code”.             |
| *601 *                 | Habilitar “Trouble Report Code”.                |
| *611 *                 | Habilitar “Bypass reporting Code”.              |
| *621 *                 | Habilitar “AC Mains Loss Report Code”.          |
| *631 *                 | Habilitar “Low Battery Report Code”.            |
| *641 *                 | Habilitar “Test Report Code”.                   |
| *651 *                 | Habilitar “Open Report Code”.                   |
| *661 *                 | Habilitar “Arm Away/Stay Report Code”.          |
| *671 *                 | Habilitar “RF Low Battery Report Code”.         |
| *681 *                 | Habilitar “Cancel Report Code”.                 |
| *691 *                 | Habilitar “Alarm Restores”.                     |
| *701 *                 | Habilitar “Alarm Restore Report Code”.          |
| *711 *                 | Habilitar “Trouble Restore Report Code”.        |
| *721 *                 | Habilitar “Bypass Restore Report Code”.         |
| *731 *                 | Habilitar “AC Mains Restore Report Code”.       |
| *741 *                 | Habilitar “Low Battery Restore Report Code”.    |
| *751 *                 | Habilitar “RF Low Restore Code”.                |
| *761 *                 | Habilitar “Test Restore Report Code”.           |
| *291 *                 | Habilitar “ECP Contact ID Output for ACM”.      |
| *1891 *                | Habilitar “AUI Device 1 and 2 Enable”.          |
| *99                    | Salir del modo de programación.                 |

## Añadir sistema a Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Paso 1.</strong> Pulse <strong>Agregar nuevo sistema</strong>.
        <img src="../GT+ honeywell vista 48 1 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>
  
 
  <div class="step-card">
        <strong>Paso 2.</strong> Introduzca el <strong>IMEI</strong> del comunicador, pulse <strong>Siguiente</strong>.
        <img src="../GT+ honeywell vista 48 2 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 3.</strong> Seleccione la empresa de seguridad.
        <img src="../GT+ honeywell vista 48 3 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 4.</strong> Elija <strong>Honeywell</strong>.
        <img src="../GT+ honeywell vista 48 4 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>
  

  <div class="step-card">
        <strong>Paso 5.</strong> Elija <strong>Vista 48 (Vista 20, Vista 15)</strong>.
        <img src="../GT+ honeywell vista 48 5 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 6.</strong> Introduzca <strong>Object ID</strong> y <strong>Module ID</strong>, pulse <strong>Siguiente</strong>.
        <img src="../GT+ honeywell vista 48 6 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 7.</strong> Espere mientras se escriben los datos.
        <img src="../GT+ honeywell vista 48 7 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 8.</strong> Pulse <strong>Agregar a Protegus2</strong>.
        <img src="../GT+ honeywell vista 48 8 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 9.</strong> Introduzca el <strong>Nombre</strong> del sistema, pulse <strong>Siguiente</strong>.
        <img src="../GT+ honeywell vista 48 9 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 10.</strong> Pulse <strong>Saltar</strong>.
        <img src="../GT+ honeywell vista 48 10 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 11.</strong> Pulse sobre el sistema.
        <img src="../GT+ honeywell vista 48 11 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 12.</strong> Espere 1 minuto para completar y pulse <strong>Transferir</strong>.
        <img src="../GT+ honeywell vista 48 12 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 13.</strong> Introduzca el correo electrónico del usuario al que el instalador transferirá el sistema. Pulse <strong>Transferir</strong>.
        <img src="../GT+ honeywell vista 48 13 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 14.</strong> El sistema aparecerá en Protegus en el teléfono del usuario.
        <img src="../GT+ honeywell vista 48 14 ENG 2026 01 05.png" alt="Agregar nuevo sistema">
  </div>




</div>

!!! tip "Consejo"
    Después de completar la configuración y la instalación realice una comprobación del sistema:

    1. Cree un evento:

       - armando/desarmando el sistema con el teclado del panel de control.
       - provocando una alarma de zona cuando el sistema de seguridad está armado.

    2. Asegúrese de que el evento llegue al CMS (Central Monitoring Station) y a la aplicación Protegus2.
