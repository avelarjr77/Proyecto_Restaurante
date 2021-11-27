<?php

    include("../../../sql/conexion.php");

    $platillos=[];
    $vendidos=[];

    $sql="SELECT receta_catalogo.nom_receta platillos, SUM(pedido_detalle.cantidad) vendidos
    from platillo
    INNER JOIN receta_catalogo
    ON platillo.cod_receta_catalogo = receta_catalogo.cod_receta_catalogo
    INNER JOIN pedido_detalle
    ON platillo.cod_platillo=pedido_detalle.cod_platillo
    GROUP BY Platillos";

    $resultado=mysqli_query($conn, $sql);

    if(mysqli_num_rows($resultado)>0){
        while($fila=mysqli_fetch_array($resultado)){
            array_push($platillos, $fila['platillos']);
            array_push($vendidos, $fila['total']);
        }

        $response=array(
            'success'=>true,
            'vendidos'=>$vendidos,
            'platillos'=>$platillos,
            'total'=>mysqli_num_rows($resultado)
        );

        mysqli_close($conn);
        unset($platillos, $vendidos, $resultado);

    }else{
        $response=array('success'=>false, 'error'=>'No fue posible extraer datos de la base de datos');
    }

    echo json_encode($response);

?>