<?php
    $conexion=mysqli_connect('localhost:3308','root','','bd_restaurante');

    $cod_empleado =$_REQUEST['cod_empleado'];
    $cod_comision =$_REQUEST['cod_comision'];

    $sql = "INSERT INTO `comision_detalle` (`cod_empleado`, `cod_comision`) 
    VALUES ('$cod_empleado', '$cod_comision')";

    echo mysqli_query($conexion,$sql);

?>