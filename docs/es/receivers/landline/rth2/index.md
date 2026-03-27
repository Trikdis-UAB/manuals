---
pdf: rth2-original.pdf
---

# RTH2 Receptor de Línea Telefónica

<div style="text-align: center;">
  <img src="./image1.png" alt="" style="width: 100%; max-width: 600px;">
</div>

# Sobre el receptor de línea telefónica

<div style="text-align: center;">
  <img src="./image1.png" alt="" style="width: 100%; max-width: 600px;">
</div>

**El receptor de línea telefónica RTH2** recibe los informes de eventos de los comunicadores telefónicos del panel de control de seguridad. Los eventos recibidos se procesan y se transfieren al software de monitoreo.

**Nota:** Configuramos el receptor con los ajustes predefinidos a petición del cliente.

## Parámetros técnicos

|  |  |
|:---|:---|
| Nombre | Descripción |
| Canal de comunicación | Líneas telefónicas - tonales o pulso |
| Formatos de recepción | Contact ID, SIA, Ademco Express 4+2 y otros |
| Fuente de alimentación primaria | 100 – 240 V (50 /​ 60 Hz) red de CA |
| Puertos de salida de datos RS232 | 1 x DB9 |
| Temperatura de funcionamiento | Desde 0°C, a +55°C |
| Dimensiones | 225 x 235 x 115 mm |
| Peso | 1.21kg, con cables |

### Tecnología de recepción de informes

| Nombre | Descripción |
|--------|-------------|
| Formato protocolo SIA | Standard SIA DC-03-1990.01 |
| Contact ID | Standard SIA DC-05-1999.09 |
| Formatos Ademco Express 4+2 | Standard SIA DC-05-1999.09, formato 4+2 con suma de comprobación – código de cuenta de 4 dígitos, código de eventos de 2 dígitos, suma de comprobación de 1 dígito |
| Protocolos de pulso 3/​1, 4/​1, 4/​2, que utilizan señales de 2300 Hz HSK | Funcionamiento a la velocidad de 10 ... 40 baudios y mediante el uso de señales de 2300 Hz HSK y kissoff |
| Protocolos de pulso 3/​1, 4/​1, 4/​2, que utilizan señales de 1400 Hz HSK | Funcionamiento a la velocidad de 10 ... 40 baudios y mediante el uso de señales de 1400 Hz HSK y kissoff |

**Nota:** cables *SPROG-1 o UP2* para la programación del receptor no incluidos.

|                                       |       |
|:--------------------------------------|:------|
| Receptor                              | 1 pc. |
| Cable Fuente de alimentación de 1.5 m | 1 pc. |
| Cable Módem nulo de 1.8 m RS232       | 1 pc. |

## Fuente de Alimentación

El receptor se alimenta con fuente de corriente alterna (CA). Para asegurar un funcionamiento ininterrumpido, el receptor debe conectarse a una batería de 12 V, 7Ah, proporcionando alimentación de reserva durante 12 horas.

## Estructura del Receptor

<img alt="" src="./image2.PNG" style="width:6.040972222222222in;height:4.780068897637795in" />

| 1\. | Indicación luminosa | 6\. | Conector de la batería de reserva |
|:---|:---|:---|:---|
| 2\. | Botón de REINICIO del dispositivo | 7\. | Conector de cable de CA y botón de encendido/apagado |
| 3\. | Toma de tierra |  |  |
| 4\. | Conector de entrada de la línea telefónica |  |  |
| 5\. | Puerto de salida de datos RS232 |  |  |

### Indicación luminosa

| *Indicador LED* | Funcionamiento | Significado |
|:---|:---|:---|
| “LINE” amarillo / Funcionamiento línea telefónica | Apagado (Off) | Línea telefónica no conectada o no disponible |
| “HOOK” rojo Levantamiento de auriculares | Se ilumina | Se levanta el auricular |
| **“DATA” amarillo** / Recepción de datos | Amarillo intermitente | Durante la recepción de datos desde un dispositivo periférico |
| **“WDG” verde** / **Estado de la Fuente de alimentación** | Parpadea en períodos cortos | Tensión de alimentación durante el modo de espera y funcionamiento |

## Instalación del sistema

### Pasos de instalación del equipo

**Nota:** 1) Los cables SPROG-1 o UP2 para la programación del receptor no se incluyen con el receptor.

2\) Para configurar los parámetros que necesita para instalar el software GProg2. Para descargar el archivo de instalación de GProg2, vaya a <http://www.trikdis.com/>

2\. Conecte el receptor a la computadora usando el cable RS232 para reenviar eventos al software de monitoreo.

3\. Configure su software de supervisión para mostrar los mensajes del receptor. Siga las instrucciones de la documentación del software de supervisión.

ffff

1.  Conecte el receptor al ordenador usando el cable RS232 para reenviar eventos al software de monitoreo.

2.  Configure su software de monitoreo para mostrar los mensajes del receptor. Siga las instrucciones de la documentación del software de monitoreo.

3.  Conecte el cable de alimentación de CA.

4.  Encienda el receptor. El receptor está funcionando correctamente cuando el LED llamado "WDG" está parpadeando.

5.  Presione el botón RESET (REINICIO).

6.  Compruebe si su software de MONITOREO está mostrando los mensajes del receptor RTH2.

**Nota:** El módulo de recepción integrado genera los mensajes de servicio, indicados en el anexo A.

## Ajuste de los parámetros de uso

### Parámetros de uso del receptor

<table>
<tbody>
<tr>
<td>Título</td>
<td>Rango permitido</td>
<td>Valor ajustado</td>
</tr>
<tr>
<td>Número de timbres hasta que el teléfono del módulo se levante</td>
<td>1 - 8</td>
<td>2</td>
</tr>
<tr>
<td>Control línea telefónica on/off</td>
<td>Habilitado/deshabilitado</td>
<td>Habilitado</td>
</tr>
<tr>
<td>Tiempo desde la elevación del teléfono hasta el inicio de la señal FSK</td>
<td>500 ms – 4000 ms</td>
<td>2000</td>
</tr>
<tr>
<td>Duración señales Kissoff (y confirmación)</td>
<td>500 ms – 8000 ms</td>
<td>900</td>
</tr>
<tr>
<td>Periodo de tiempo entre señales HSK</td>
<td>1 s – 16 s</td>
<td>4</td>
</tr>
<tr>
<td>Duración permitida de la recepción de mensajes</td>
<td>2 s – 16 s</td>
<td>2</td>
</tr>
<tr>
<td>Duración SIA HSK</td>
<td>500 ms – 2000 ms</td>
<td>900</td>
</tr>
<tr>
<td>Límite de tiempo usual para una única sesión de comunicación</td>
<td>15 s – 255 s</td>
<td>60 s</td>
</tr>
<tr>
<td>Protocolo de salida</td>
<td>Surgard o Radionics D6600</td>
<td>Surgard</td>
</tr>
<tr>
<td>Límite de tiempo para la recepción de paquetes SIA</td>
<td>1 – 32 s</td>
<td>8 s</td>
</tr>
<tr>
<td>Orden HSK (prioridad de protocolos de recepción)</td>
<td>SIA FSK HSK<br>Tono dual HSK (1400+2300 Hz)<br>3/1, 4/1, 4/2<br>3/1, 4/1, 4/2</td>
<td>SIA FSK HSK<br>Tono dual HSK (1400+2300 Hz)<br>2300 Hz<br></td>
</tr>
</tbody>
</table>

### Configuración de los parámetros de uso del RTH2 con GProg2

**Nota:** 7. El software GProg2 debe instalarse en un PC, con sistema operativo MS Windows 2000 / XP / Vista / Win 7.

#### Conexión al ordenador.

1\. Abra la caja del RTH2 y extraiga el módulo (no olvide desconectar la batería de reserva).

2\. Conecte el módulo a la fuente de alimentación.

3\. Conecte el módulo a un ordenador con el programador SPROG-1 o UP2.

#### Instalación del controlador USB.

> Los controladores USB deben estar instalados en el ordenador. Cuando el módulo se conecta a un ordenador por primera vez, el sistema operativo MS Windows debe abrir la ventana *Asistente para nuevo hardware encontrado* para instalar los controladores USB.
>
> 4\. Descargue el archivo del controlador USB \*.inf para MS Windows OS desde el sitio web www.trikdis.lt.
>
> 5\. En la ventana del asistente, seleccione la función [*Sí, sólo esta vez*] y pulse el botón [*Siguiente*].
>
> 6\. Cuando se abra la ventana *Por favor elija su búsqueda y abra las opciones de instalación*, pulse el botón [*Examinar*] y seleccione el lugar donde se guardó el archivo \*.inf.
>
> 7\. Siga las restantes instrucciones del asistente para finalizar la instalación del controlador USB.

#### Inicio de GProg2

1.  Inicie el programa haciendo clic en el icono GProg2 <img alt="" src="./image3.png" style="width:0.22916666666666666in;height:0.22916666666666666in" /> y, a continuación, en la ventana Configuración, especifique el puerto serie (por ejemplo: COM3).

2.  <img alt="" src="./image4.wmf" style="width:0.18125in;height:0.21875in" />En la barra de menús, seleccione el comando [*Dispositivos*] y seleccione RT2.

3.  Pulse el icono en la barra de herramientas para conectar el receptor.

4.  <img alt="" src="./image5.wmf" style="width:0.22916666666666666in;height:0.21875in" />Para leer los parámetros de funcionamiento almacenados en la memoria interna del dispositivo, pulse el botón

Settings

Toolbar

Menu bar

<span id="_Toc467134836"></span>Descripción de los iconos de la barra de herramientas

**[Abrir]** - icono para abrir el archivo guardado con la extensión ".tcfg"

<img alt="" src="./image8.wmf" style="width:0.23958333333333334in;height:0.21875in" />

**[Guardar]** - icono para guardar el archivo con los parámetros establecidos con la extensión ".tcfg"

<img alt="" src="./image9.png" style="width:0.22916666666666666in;height:0.22916666666666666in" />

**[Conectar]** - icono para conectar al puerto serie

<img alt="" src="./image4.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Desconectar]** - icono para desconectar del puerto serie

<img alt="" src="./image10.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Config de recepción]** - icono para leer los parámetros del dispositivo

<img alt="" src="./image5.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Config de envío]** - icono para escribir los nuevos parámetros en la memoria del dispositivo

<img alt="" src="./image11.wmf" style="width:0.22916666666666666in;height:0.21875in" />

**[Generar informe de configuración]** - icono para imprimir el informe de los parámetros

establecidos.

<img alt="" src="./image12.jpeg" style="width:0.22916666666666666in;height:0.21875in" />

#### Ajuste de los parámetros

> 13\. En la sección ventana principal, establezca el protocolo Surgard.
>
> 14\. Si es necesario, puede cambiar los parámetros en la sección Configuración de comunicación, los valores recomendados se muestran en **7.1 Parámetros de uso del receptor**.
>
> <img alt="" src="./image13.jpeg" style="width:0.1701388888888889in;height:0.20833333333333334in" />15. Para guardar los parámetros, vaya a [File / Write device] en la barra de menús o presione el icono

Communication settings

Main window


### Anexo A

Servicio de mensajes del receptor de comunicación telefónica

|  |  |  |
|:---|:---|:---|
| **Mensaje** | **Código** | **Descripción** |
| COM TROUBLE | 05 | Fallo de comunicación entre el dispositivo y el concentrador |
| COM RESTORE | 06 | Comunicación con el concentrador restaurada |
| TEL LINE ERROR | 20 | Fallo o desconexión de la línea telefónica |
| TEL LINE OK | 30 | Línea telefónica restaurada |
| MODULE DISCONNECT | C0 | Dispositivo desconectado |
| MODULE CONNECT | C1 | Dispositivo conectado |
