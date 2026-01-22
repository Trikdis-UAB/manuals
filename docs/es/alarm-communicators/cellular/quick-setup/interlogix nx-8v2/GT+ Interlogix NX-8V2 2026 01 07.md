# Interlogix NX-8V2 con GT/GT+/GET configuración rápida

Pasos breves de cableado y programación para conectar el comunicador GT/GT+/GET al panel Interlogix NX-8V2 usando KeyBus, y luego añadir el sistema a Protegus2. Use esto junto con los manuales completos para otros ajustes. (Las etiquetas de terminal pueden variar ligeramente entre GT/GT+/GET, pero las conexiones son las mismas.)

!!! caution "Precaución"
    La instalación y el servicio deben ser realizados solo por personal cualificado. Desconecte la alimentación antes de cablear. Los cambios no autorizados anulan la garantía.

## Requisitos

1. Firmware GT/GT+/GET 1.21, SIM insertada, PIN deshabilitado, plan de datos activo.
1. Panel Interlogix NX-8V2 con acceso al teclado (código de instalador disponible).
1. Número de cuenta CMS si reporta a CMS.
1. Cuenta de empresa/instalador de Protegus2 y IMEI del comunicador.

## Cableado

Siga el esquema de abajo para conectar el comunicador al panel:

| **Terminal GT/GT+/GET** | **Panel Interlogix** | **Notas**               |
| ----------------------- | -------------------- | ----------------------- |
| +12V DC/-12V DC         | POS/COM              | Alimentación del comunicador |
| DATA                    | DATA                 | KeyBus                  |


<img src="../GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30.png" alt="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30" class="GT+ interlogix nx 8v2 prijungimo schema ENG 2025 12 30">

## Programación del panel de alarma Interlogix NX-8V2 mediante el teclado LCD

Usando el teclado del panel, entre en estas secciones y configúrelas como se indica:

**Habilitar reporte Contact ID**

| **Teclado LCD**      | **Entrada de teclado** | **Descripción de la acción**                                     |
| -------------------- | ---------------------- | --------------------------------------------------------------- |
| System ready         | *89713                 | Entrar en modo de programación                                   |
| Enter device address | 0#                     | Ir al menú principal de programación del panel                  |
| Enter location       | 4#                     | Ir al menú de conmutación “Phone1 events reported”              |
| Loc#4 Seg#1          | 12345678*              | Todas las opciones deben estar habilitadas. * para guardar y pasar al siguiente menú |
| Loc#4 Seg#2          | 12345678*              | Todas las opciones deben estar habilitadas. * para guardar y volver atrás |
| Enter location       | 23#                    | Ir al menú “Partition features”.                                |
| Loc#23 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#23 Seg#3         | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 37#                    | Ir al menú “Siren and system supervision”.                      |
| Loc#37 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#37 Seg#3         | 12345678*              | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar. |
| Loc#37 Seg#4         | 12345678*#             | Segmento 4. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 90#                    | Ir al menú “Partition 2 features”.                              |
| Loc#90 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#90 Seg#3         | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 93#                    | Ir al menú “Partition 3 features”.                              |
| Loc#93 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#93 Seg#3         | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 96#                    | Ir al menú “Partition 4 features”.                              |
| Loc#96 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#96 Seg#3         | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 99#                    | Ir al menú “Partition 5 features”.                              |
| Loc#99 Seg#1         | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#99 Seg#3         | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 102#                   | Ir al menú “Partition 6 features”.                              |
| Loc#102 Seg#1        | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#102 Seg#3        | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 105#                   | Ir al menú “Partition 7 features”.                              |
| Loc#105 Seg#1        | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#105 Seg#3        | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | 108#                   | Ir al menú “Partition 8 features”.                              |
| Loc#108 Seg#1        | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| Loc#108 Seg#3        | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| Enter location       | EXIT EXIT              | Pulse “EXIT” dos veces para salir del modo de programación.     |

## Programación del panel de alarma Interlogix NX-8V2 mediante el teclado LED

Usando el teclado del panel, entre en estas secciones y configúrelas como se indica:

**Habilitar reporte Contact ID**

| **Teclado LED**                           | **Entrada de teclado** | **Descripción de la acción**                                     |
| ----------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| LEDs Ready y Power encendidos fijos       | *89713                 | Entrar en modo de programación                                   |
| LED Service parpadea                      | 0#                     | Ir al menú principal de programación del panel                  |
| LED Service parpadea, LED Armed fijo      | 4#                     | Ir al menú de conmutación “Phone1 events reported”              |
| Todos los LEDs de zona encendidos         | 12345678*              | Todas las opciones deben estar habilitadas. * para guardar y pasar al siguiente menú |
| Todos los LEDs de zona encendidos         | 12345678*              | Todas las opciones deben estar habilitadas. * para guardar y volver atrás |
| LED Service parpadea, LED Armed fijo      | 23#                    | Ir al menú “Partition features and reporting selection”.        |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 37#                    | Ir al menú “Siren and system supervision”.                      |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*              | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 4. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 90#                    | Ir al menú “Partition 2 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 93#                    | Ir al menú “Partition 3 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 96#                    | Ir al menú “Partition 4 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 99#                    | Ir al menú “Partition 5 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 102#                   | Ir al menú “Partition 6 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 105#                   | Ir al menú “Partition 7 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | 108#                   | Ir al menú “Partition 8 features”.                              |
| LED Service parpadea, LED Ready fijo      | **                     | Pulse * dos veces para ir al menú de opciones de conmutación de la sección 3. |
| LED Service parpadea, LED Ready fijo      | 12345678*#             | Segmento 3. Todas las opciones deben estar habilitadas, pulse * para guardar y luego # para guardar y volver al menú principal. |
| LED Service parpadea, LED Armed fijo      | EXIT EXIT              | Pulse “EXIT” dos veces para salir del modo de programación.     |

## Añadir sistema a Protegus2



<div class="steps-grid">
  <div class="step-card">
        <strong>Paso 1.</strong> Pulse <strong>Agregar nuevo sistema</strong>.
        <img src="../GT+ interlogix nx 8v2 1 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>
  
 
  <div class="step-card">
        <strong>Paso 2.</strong> Introduzca el <strong>IMEI</strong> del comunicador, pulse <strong>Siguiente</strong>.
        <img src="../GT+ interlogix nx 8v2 2 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 3.</strong> Seleccione la empresa de seguridad.
        <img src="../GT+ interlogix nx 8v2 3 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 4.</strong> Elija <strong>Interlogix</strong>.
        <img src="../GT+ interlogix nx 8v2 4 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>
  

  <div class="step-card">
        <strong>Paso 5.</strong> Elija <strong>NX-8</strong>.
        <img src="../GT+ interlogix nx 8v2 5 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 6.</strong> Introduzca <strong>Object ID</strong> y <strong>Module ID</strong>, pulse <strong>Siguiente</strong>.
        <img src="../GT+ interlogix nx 8v2 6 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 7.</strong> Espere mientras se escriben los datos.
        <img src="../GT+ interlogix nx 8v2 7 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 8.</strong> Pulse <strong>Agregar a Protegus2</strong>.
        <img src="../GT+ interlogix nx 8v2 8 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 9.</strong> Introduzca el <strong>Nombre</strong> del sistema, pulse <strong>Siguiente</strong>.
        <img src="../GT+ interlogix nx 8v2 9 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 10.</strong> Pulse <strong>Saltar</strong>.
        <img src="../GT+ interlogix nx 8v2 10 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 11.</strong> Pulse sobre el sistema.
        <img src="../GT+ interlogix nx 8v2 11 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 12.</strong> Espere 1 minuto para completar y pulse <strong>Transferir</strong>.
        <img src="../GT+ interlogix nx 8v2 12 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 13.</strong> Introduzca el correo electrónico del usuario al que el instalador transferirá el sistema. Pulse <strong>Transferir</strong>.
        <img src="../GT+ interlogix nx 8v2 13 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>


  <div class="step-card">
        <strong>Paso 14.</strong> El sistema aparecerá en Protegus en el teléfono del usuario.
        <img src="../GT+ interlogix nx 8v2 14 ENG 2025 12 29.png" alt="Agregar nuevo sistema">
  </div>




</div>

!!! tip "Consejo"
    Después de completar la configuración y la instalación realice una comprobación del sistema:

    1. Cree un evento:

       - armando/desarmando el sistema con el teclado del panel de control.
       - provocando una alarma de zona cuando el sistema de seguridad está armado.

    2. Asegúrese de que el evento llegue al CMS (Central Monitoring Station) y a la aplicación Protegus2.
