$(document).ready(function(){
    $('#btn_frm_cargo').click(function(){
        console.log("Entro a la funcion");
        var datos = $('#frm_cargo').serialize();
        /*alert(datos);
        return false;*/
        $.ajax({
            type: "POST",
            url: "app/models/menu/cargo.php",
            data: datos,
            success:function(response){
                if(response == 1) {
                    alert("Agregado con exito");
                } else {
                    alert("No se agregó");
                }
            }
        });

        return false;
    })
})