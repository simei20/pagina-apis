var bearer = "4e1a1858bdd584fdc077fb7d80f39283";
var ambientes = ['apigateway.serpro.gov.br', 'gateway.apiserpro.serpro.gov.br'];

function getQueryStringParams(param){
    var url = window.location.search.substring(1);
    var queryStrings = url.split('&');
    var paramValue = null;
    queryStrings.forEach(queryString => {
        qs = queryString.split('=');
        if(qs[0] == param){
            paramValue =  qs[1];
            return;
        }
    });
    return paramValue;
}
