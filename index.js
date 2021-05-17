$(document).ready(
    function () {
        
        // Clears the input-fields //
        $(".day").val("")

        // The API from the RKI (Robert Koch Institut) in Germany //
        var request = new Request('https://api.corona-zahlen.org/germany');
        
        // To prevent accidently spam-request the API when reloading the page, i added a timeout. //
        setTimeout(function getData() {
            fetch(request).then(
                function(response) {
                    return response.text();
                }
            ).then(
                function(text) {
                    var obj = JSON.parse(text);
                    $("#cases").html("Cases (Today): " + obj.delta.cases)
                    $("#total").html("Cases (Total): " + obj.cases)
                    $("#incidence").html("Weekly-Incidence: " + Math.round(obj.weekIncidence))
                }
            );
        }, 500);
        
        // Get the values from the days and calculate them //
        $("#submit").on("click", function () {
                $("#result").html(
                    "Result: " + 
                    calculate_incidence(
                        mo=parseInt($("#mo").val()),
                        tu=parseInt($("#tu").val()),
                        we=parseInt($("#we").val()),
                        th=parseInt($("#th").val()),
                        fr=parseInt($("#fr").val()),
                        sa=parseInt($("#sa").val()),
                        so=parseInt($("#so").val()),
                        ppl=parseInt($("#ppl").val())
                    )
                )
            }
        );
        
        function calculate_incidence(mo, tu, we, th, fr, sa, so, ppl) {
            return Math.round(((mo + tu + we + th + fr+ sa + so) / ppl) * 100000)
        }
        
    }
)