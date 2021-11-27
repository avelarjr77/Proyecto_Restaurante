$(document).ready(function () {
    ventasPlatillos();
    ventas();
});

function ventas(){
    const ctx = document.getElementById('ventas').getContext('2d');
    const ventas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
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