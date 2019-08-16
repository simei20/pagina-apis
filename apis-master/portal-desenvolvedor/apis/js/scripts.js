//config variables
var bearerTrial = '4e1a1858bdd584fdc077fb7d80f39283';
var gatewaySPO = 'gateway.apiserpro.serpro.gov.br';
var gatewayBSA = 'apigateway.serpro.gov.br';

//class to work on tab divs
function openTab(evt, name, classSufix) {

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent"+classSufix);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks"+classSufix);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

//get parameters from URL
function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function makeHTTPRequest(panelResult, param1){

  var paramValues = [];
  
  $('div#modalOp :input').each(function(){
    paramValues.push($(this).value);
  });

  var params = '';
  paramValues.forEach(param => {
    params += "/" + param;
  });

  $.ajax({
    url: "https://" + gatewayBSA + "/consulta-cpf-trial/1/"+params,
    type: 'GET',
    headers: {"Authorization": "Bearer " + bearerTrial},
    success: function(result, status, xhr){
      panelResult.getElementsByClassName("resultCode")[0].textContent = xhr.status;
      panelResult.getElementsByClassName("resultPanelCode")[0].textContent = JSON.stringify(result, null, "\t");
    },
    error: function(result){
      panelResult.getElementsByClassName("resultCode")[0].textContent = result.status;
      panelResult.getElementsByClassName("resultPanelCode")[0].textContent = result.responseText;;
    }
  });

}

function clearFieldsResult(panelResult){
  panelResult.getElementsByClassName("resultCode")[0].textContent = "";
  panelResult.getElementsByClassName("resultPanelCode")[0].textContent = "";
}
