$(document).ready(function () {
    ventasPlatillos();
    ventas();

    $("#calendario").daterangepicker({
        "locale":{
            "format": "DD/MM/YYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cacelLabel":  "Cancelar",
            "daysOfWeek": [
                "Dom",
                "Lun",
                "Mar",
                "Mié",
                "Jue",
                "Vie",
                "Sáb"
            ],
            "monthNames":[
                "Enero",
                "Febrero",
                "Marzo","Abril",
                "Mayo", 
                "Junio", 
                "Julio", 
                "Agosto", 
                "Septiembre",
                "Octubre", 
                "Noviembre",
                "Diciembre"
            ]
        }
    });

    $("#calendario").click(function(){
        ventas();
    });
});

function ventas(){

    var datos=[]; 

    $.ajax({
        data: {
            fechas: $("#calendario").val()
        },
        type: 'POST', 
        dataType: 'Json',
        url: 'app/models/graficas/vendidos.php', 
        cache: false,
        beforeSend: function(){}, 
        success: function(response){ 
            if(response.success){
                for (let i = 0; i < response.total; i++) {
                    datos.push(response.datos[i]);
                }
                var ctx = document.getElementById('ventas').getContext('2d');
                const ventas = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                                labels: labels,
                                datasets: [{
                                      data: datos,
                                      backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                options: {
                    title: {
                        display: true,
                        text: '# Cantidad vendida '
                    }
                },
            });
            $("resultados").show();
            } else{
                swal('¡Error!', response.error, 'error')
            }
            }, 
                error: function(){
                swal('¡Error!','Error de ejecución del Ajax', 'error');
            },
                complete: function(){} 
        }); 
    }
function ventasPlatillos(){

    var datos=[];    
    var labels=[];

    $.ajax({
        data: {},
        type: 'POST', 
        dataType: 'Json',
        url: 'app/models/graficas/mostrar_vendidos.php', 
        cache: false,
        beforeSend: function(){}, 
        success: function(response){ 
            if(response.success){
                for (let i = 0; i < response.total; i++) {
                    datos.push(response.datos[i]);                    
                    labels.push(response.platillos[i]);
                }
                var ctx = document.getElementById('ventasPlatillos').getContext('2d');
                var myChart = new Chart(ctx, {
                type: 'bar',
                data: {  
                    labels: labels,
                    datasets: [{
                        data: datos,
                        backgroundColor: [
                            'rgb(5, 201, 38, 0.2)'

                        ],
                        borderColor: [
                            'rgb(5, 201, 38, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
            options: {
                title: {
                    display: true,
                    text: '# Total '
                }
            },
        });

        } else{
            swal('¡Error!', response.error, 'error')
        }
        }, 
            error: function(){
            swal('¡Error!','Error de ejecución del Ajax', 'error');
        },
            complete: function(){} 
    }); 
}