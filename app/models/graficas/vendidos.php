<?php

include("../../../sql/conexion.php");

    $total_venta=[];
    

    $fechas=explode(" - ", $_POST['fechas']);

    $sql="SELECT (pt.precio*sum(pd.cantidad)) total_venta, rc.nom_receta AS platillo, p.fecha_pedido
        FROM pedido_detalle pd
        INNER JOIN pedidos p ON pd.cod_pedidos = p.cod_pedidos
        INNER JOIN platillo pt ON pd.cod_platillo = pt.cod_platillo
        INNER JOIN receta_catalogo rc ON pt.cod_receta_catalogo = rc.cod_receta_catalogo
        WHERE pd.cod_platillo = pt.cod_platillo AND pd.cod_estado='1' AND p.fecha_pedido BETWEEN '2021-09-01' 
    	AND '2021-11-29'
        GROUP BY pd.cod_pedido_detalle; ";

    $resultado=mysqli_query($conn, $sql);

    if(mysqli_num_rows($resultado)>0){
        while($fila=mysqli_fetch_array($resultado)){
            array_push($total, $fila['total']);
             
        }

        $response=array(
            'success'=>true,
            'datos'=>$datos
            'total_ventas'=>$total_ventan,
            'total_ventas'=>mysqli_num_rows($resultado)
        );

        mysqli_close($conn);
        unset($total, $datos, $resultado);

    }else{
        $response=array('success'=>false, 'error'=>'No fue posible extraer datos de la base de datos');
    }

    echo json_encode($response);

?>


