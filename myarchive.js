$("#print").prepend(`<h1>Tu monedero virtual en un solo paso</h1>
                  <p>Es muy sencillo comencémos</p>`);


$('#btn1').click(function () {
    window.location = 'operations.html';
});


$("button").css("background-color", "#4C8FFB");
$("button").css("color", "#FFFFFF");
$("button").css("border", "#3079ED solid");
$("button").css("border-radius", "3px");
$("button").css("font-size", "15px");
$("button").css("box-shadow", "inset 0 1px 0 #80B0FB");

//url para la API//

const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

$("#btnDolar").click(() => {
    $.get(url, (data, state) => {
        if (state == "success") {

            let casa = data[0]["casa"]

            let compra = casa["compra"]
            let venta = casa["venta"]


            dolarDiv.innerHTML = " "
            $("#dolarDiv").append("<div> <p> Precio compra: " + compra + " </p> <p> Precio venta: " + venta + "</p> </div>");
            $("#dolarDiv").fadeIn(800, function () {
                setTimeout(
                    function () {
                        $("#dolarDiv").fadeOut(800)
                    }, 8000)
            });

        }
    })
})
