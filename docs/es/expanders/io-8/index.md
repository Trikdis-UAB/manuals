# iO-8 Expansor de entrada y salida

<div style="text-align: center;">
  <img src="./cover.webp" alt="Foto de la placa de circuito verde del expansor iO-8, con bloques de terminales para +DC, -DC, A, B y alimentación AUX a la izquierda, y ocho terminales numerados de entrada/común en la parte inferior, del 1 al 8, con C entre cada uno." width="400">
</div>

Con el expansor iO-8 puede aumentar el número de entradas y salidas en un dispositivo TRIKDIS compatible.

iO-8 tiene 8 contactos, que se pueden configurar en modo de entrada o salida.

Visite la página iO-8 en www.trikdis.com para obtener las especificaciones del dispositivo y una lista actualizada de dispositivos TRIKDIS compatibles.

Compatible con [SP3](../../control-panels/sp3/index.md), [CG17](../../control-panels/cg17/index.md), [GT+](../../alarm-communicators/cellular/gt-plus/index.md), [GT](../../alarm-communicators/cellular/gt/index.md), [G16](../../alarm-communicators/cellular/g16/index.md), [G16T](../../alarm-communicators/cellular/g16t/index.md), [G17F](../../alarm-communicators/fire-panels/g17f/index.md), [E16](../../alarm-communicators/e16/index.md), [E16T](../../alarm-communicators/e16t/index.md), [GATOR Cellular](../../gate-controllers/gator/index.md) y [GATOR WiFi](../../gate-controllers/gator-wifi/index.md).

**Siga estos pasos para configurar iO-8:**

1.  Conecte el iO-8 a un dispositivo TRIKDIS compatible como se muestra:

<img alt="Diagrama de conexión: los terminales +DC, -DC, 485 A y 485 B de un dispositivo TRIKDIS se conectan mediante cuatro cables paralelos, con la indicación (+12 V), a los terminales correspondientes +DC, -DC, A y B del módulo iO-8." src="./image1.webp" style="display: block; margin: 1rem auto; max-width: 350px; height: auto;" />

2.  Conecte las ENTRADAS como se muestra:

<img alt="Tres diagramas de conexión de la entrada iO-8. Normalmente abierto (NO): xIN y C se conectan mediante un contacto NO. Normalmente cerrado (NC): xIN y C se conectan mediante un contacto NC. Circuito normalmente cerrado/abierto con resistencia de fin de línea (EOL): el contacto NC está en serie entre xIN y el circuito; el contacto NO está en paralelo con la resistencia marcada 2,2k (10k), entre ese circuito y C." src="./image2.webp" style="display: block; margin: 1rem auto; max-width: 400px; height: auto;" />

El módulo principal establece los diagramas de cableado y la resistencia nominal, al que está conectado el módulo de expansión iO-8.

3.  Conecte las SALIDAS como se muestra:

<img alt="Diagrama de conexión: dos conexiones de los terminales AUX+ y xOUT del iO-8. En la primera, se conectan a la bobina de un relé cuyos contactos tienen terminales NC, C y NO. En la segunda, se conectan a una resistencia 2k2 en serie con un LED." src="./image3.webp" style="display: block; margin: 1rem auto; max-width: 530px; height: auto;" />

4.  Conecte un cable USB al dispositivo TRIKDIS principal y abra el software TrikdisConfig. Presione **Leer [F4]**.

5.  Vaya a la ventana Módulos y haga clic en una fila libre en el panel "RS485 Módulos". Seleccione "Expansor iO-8" en la lista desplegable como se muestra:

<img alt="TrikdisConfig, sección Módulos, tabla Módulos RS485: en la lista desplegable de la columna Módulo está seleccionada la opción Expansor iO-8." src="./image4.webp" style="display: block; margin: 1rem auto; max-width: 520px; height: auto;" />

6.  Ingrese el No. de serie de iO-8 (solo números) en la celda de la derecha. Encontrará este número en la etiqueta de iO-8.

7.  En la selección del menú desplegable ENTRADAS y SALIDAS (Zonas y ventana de PGM) verá las entradas y salidas de iO-8, que puede habilitar.

    <img alt="TrikdisConfig, sección Zonas, pestaña Configuraciones de zonas: la lista desplegable Entrada ofrece Desactivar y las entradas RS485 Expander ID1, IO1 a IO8 para asignarlas a una zona." src="./image5.webp" style="display: block; margin: 1rem auto; max-width: 480px; height: auto;" />

La configuración puede variar según el dispositivo TRIKDIS principal. Configure los ajustes para zonas y salidas PGM según el manual del dispositivo principal.

8.  Una vez que haya terminado, presione Escribir [F5] y desconecte el cable USB.

9.  Hacer funcionar las entradas y cambiar las salidas para probar la instalación.
