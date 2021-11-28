<?php

include("../../../sql/conexion.php");

    $total=[];
    

    $fechas=explode(" - ", $_POST['fechas']);

    $sql="SELECT sum(cantidad) total 
    FROM pedido_detalle 
    INNER JOIN pedidos
    ON pedido_detalle.cod_pedidos = pedidos.cod_pedidos
    WHERE cod_estado=1 AND fecha_pedido 
    BETWEEN STR_TO_DATE ('$fechas[0]', '%d/%m/%Y') 
    AND STR_TO_DATE ('$fechas[1]', '%d/%m/%Y')
    ";

    $resultado=mysqli_query($conn, $sql);

    if(mysqli_num_rows($resultado)>0){
        while($fila=mysqli_fetch_array($resultado)){
            array_push($total, $fila['total']);
             
        }

        $response=array(
            'success'=>true,
            'datos'=>$datos,
            'total'=>$total,
            'vendidos'=>mysqli_num_rows($resultado)
        );

        mysqli_close($conn);
        unset($total, $datos, $resultado);

    }else{
        $response=array('success'=>false, 'error'=>'No fue posible extraer datos de la base de datos');
    }

    echo json_encode($response);

?>


