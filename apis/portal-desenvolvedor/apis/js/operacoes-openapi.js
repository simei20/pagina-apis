function makeOperationBlock(id, operacao, metodo, api){
    id = "op"+id;
    var ent = '';
    ent += "<div id=\"" + id + "\" style=\"display:none;\">" ;
    ent += "<header class=\"major\">";
    ent += "<h2 id=\"" + id + "\">"+api.paths[operacao][metodo].summary+"</h2>";
    ent += "</header>";
    ent += "<div class=\"content\">";
    tpDeprecated = "";
    if(api.paths[operacao][metodo].deprecated === true){
        tpMetodo = "DEPRECATED";
        tpDeprecated = " (descontinuado)";
    }
    else{
        tpMetodo = metodo.toUpperCase();
    }
    ent += "<p class=\"" + tpMetodo + "Operation\"><span class=\"" + tpMetodo + "Label\">" + metodo.toUpperCase() + "</span><strong> " + operacao + tpDeprecated + " </strong></p>";
    // ent += "<div id=\"modal" + id + "\" class=\"modal\">";
    // ent += "<div class=\"modal-content\">";
    // ent += "<span class=\"close\" onmouseup=\"clearFieldsResult(document.getElementById('resultPanel" + id + "'))\">&times;</span>";    
    // ent += "<h3>"+ operacao.descricao + "</h3>";
    // ent += "<p><strong>Bearer:</strong> <span class=\"bearer\"></span><br/>";
    // ent += "<strong>URL:</strong> <span id=\"url" + id + "\"></span><br/>";
    // ent += "<strong>Ambiente:</strong><span class=\"amb\"></span></p>";
    // ent += "<h3>Parâmetros</h3>";
    // ent += "<div id=\"modalOp\" class=\"box\">";
    // var parametros = [];
    // operacao.entrada.forEach(entrada => {
    //     parametros.push(entrada.campo);
    //     ent += entrada.campo + ": <input id=\"param" + entrada.campo + id + "\"></input><br/>";
    // });        
    // ent += "<center><button id=\"req" + id + "\" onclick=\"makeHTTPRequest(document.getElementById('resultPanel" + id + "'), document.getElementById('param" + id + "').value)\">Executar</button></center>";
    // ent += "</div>";
    // ent += "</div>";
    // ent += "</div>";
     ent += "<h3>Informações de entrada e saída</h3>";
     ent += "<div class=\"tab\">";
     ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'entrada"+ id +"','Data" + id + "')\">Entrada</button>";
     ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'saida"+ id +"','Data" + id + "')\">Saída</button>";
     ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'teste"+ id +"','Data" + id + "')\">Dados de Teste</button>";
    // ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'teste"+ id +"','Data" + id + "')\">Dados de Teste</button>";
     ent += "</div>";
     ent += "<div id=\"entrada"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
     ent += "<h4>Dados de Entrada</h4>";
     var opCampos = "";
     if(api.paths[operacao][metodo].parameters ){
        api.paths[operacao][metodo].parameters.forEach(entrada => {
            var type = entrada.schema? entrada.schema.type : entrada.type;
            opCampos += "<tr><td>" + entrada.name + "</td><td>" + entrada.description + "</td><td>" + type + "</td><td>" + entrada.in + "</td></tr>";
        });
        ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descricao</th><th>Tipo</th><th>Local</th></tr></thead><tbody>" + opCampos + "</tbody></table>";
     } else {
    	 if(api.paths[operacao][metodo].requestBody ){
             ent +="<br>";
           } else {
       		descricaoEntrada = "Esta API não possui dados de entrada.";
       		ent +="<ul>";
       		ent +='<li><strong>' + descricaoEntrada + ' &nbsp; </strong> </li>';
       		ent +="</ul>";
  	       }
     //	descricaoEntrada = "Esta API não possui dados de entrada.";
     //	ent +="<ul>";
     //	ent +='<li><strong>' + descricaoEntrada + ' &nbsp; </strong> </li>';
     //	ent +="</ul>";
     }
    if(metodo === "post" || metodo === "put"){
        ent += "<h4> Dados do Corpo da Requisição</h4>";
        var schema = api.paths[operacao][metodo].requestBody.content['application/json'].schema;
        var fields = Object.getOwnPropertyNames(schema.properties);
        ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descricao</th><th>Tipo</th></tr></thead><tbody>";
        ent += addFields(fields, schema, "");
        ent += "</tbody></table>";        
        ent += "<h4> Exemplo de Corpo da Requisição</h4>";
        ent += "<pre class=\"code\">";
        ent += syntaxHighlight(api.paths[operacao][metodo].requestBody.content['application/json'].example);
        ent += "</pre>"; 
    }
    ent += "</div>";
    ent += "<div id=\"saida"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    ent += "<h4>Dados de Saída</h4>";
    // var apiobj = api.paths[operacao][metodo].responses['200'].content['application/json'].schema.properties;
    // var opProperties;
    // var saidaCampos = "";
    // Object.getOwnPropertyNames(api.paths)
    // opProperties = Object.getOwnPropertyNames(apiobj);
    // opProperties.forEach(saida => {
    //     saidaCampos += "<tr><td>" + saida + "</td><td>" +  apiobj[saida].description + "</td><td>" + apiobj[saida].type + "</td></tr>";
    // });
    //  var schema = api.paths[operacao][metodo].responses['200'].content['application/json'].schema;
    //  var fields = Object.getOwnPropertyNames(schema.properties);
    //  ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descricao</th><th>Tipo</th></tr></thead><tbody>";
    //  ent += addFields(fields, schema, "");
    //  ent += "</tbody></table>";    
    //  ent += "<pre class=\"code\">";
    //  var jsf = JSONSchemaFaker;
    //  jsf.resolveJsonPath = true;
    //  jsf.format('double', () => jsf.random.randexp('0\.\d*'));
    //  jsf.option({
    //     fixedProbabilities: true, // 100% chances all the time, otherwise 0-100% chances
    //     alwaysFakeOptionals: true, // set `optionalsProbability: 1.0` which means 100% always
    // });
    //  ent += syntaxHighlight(jsf.generate(schema.properties));
      if(operacao === "////" ){
      	if(api.paths[operacao][metodo].externalDocs){
      	opCampos = api.paths[operacao][metodo].externalDocs.url;
      	descricaoTeste = api.paths[operacao][metodo].externalDocs.description;
      	ent +="<ul>";
      	ent +='<li><strong>' + ' Json de Saída ' + ': &nbsp; </strong><a href="' + opCampos + '">Download</a> </li>';
      	ent +="</ul>";
      	} else {
      	descricaoTeste = "Esta API ainda não possui dados de Saida";
      	ent +="<ul>";
      	ent +='<li><strong>' + ' Esta API ainda não possui dados de Saída ' + ' &nbsp; </strong> </li>';
      	ent +="</ul>";
      	}
      } else {
      	var schema = api.paths[operacao][metodo].responses['200'].content['application/json'].schema;
      	var fields = Object.getOwnPropertyNames(schema.properties);
      	ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descricao</th><th>Tipo</th></tr></thead><tbody>";
      	ent += addFields(fields, schema, "");
      	ent += "</tbody></table>";    
      	ent += "<pre class=\"code\">";
      	var jsf = JSONSchemaFaker;
      	jsf.resolveJsonPath = true;
      	jsf.format('double', () => jsf.random.randexp('0\.\d*'));
      	jsf.option({
          fixedProbabilities: true, // 100% chances all the time, otherwise 0-100% chances
          alwaysFakeOptionals: true, // set `optionalsProbability: 1.0` which means 100% always
      	});							
        if(api.paths[operacao][metodo].responses['200'].content['application/json'].example){
           var optexto = api.paths[operacao][metodo].responses['200'].content['application/json'].example;    
      	   ent += syntaxHighlight(jsf.generate(optexto));
      	} else {
      	ent += syntaxHighlight(jsf.generate(schema.properties));
      	}
      }
    ent += "</pre>";
    ent += "</div>";
    ent += "<div id=\"teste"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    ent += "<h4>Dados de Teste</h4>";
    // var opCampos = "";
    // var teste = new Remarkable();
	//if(api.paths[operacao][metodo].description){
	//	opCampos = teste.render(api.paths[operacao][metodo].description);
    //   ent += "<table class=\"alt\"><tbody>" + opCampos + "</tbody></table>";
    if(api.paths[operacao][metodo].externalDocs){
    	opCampos = api.paths[operacao][metodo].externalDocs.url;
    	descricaoTeste = api.paths[operacao][metodo].externalDocs.description;
    	ent +="<ul>";
    	ent +='<li><strong>' + descricaoTeste + ': &nbsp; </strong><a href="' + opCampos + '">Download</a> </li>';
    	ent +="</ul>";
    } else {
    	descricaoTeste = "Esta API ainda não possui dados de teste.";
    	ent +="<ul>";
    	ent +='<li><strong>' + descricaoTeste + ' &nbsp; </strong> </li>';
    	ent +="</ul>";
    }
    ent += "</div>";
    var opCampos = "";
    var optexto = "";
//1    if(api.paths[operacao][metodo].externalDocs){
    if(api.paths[operacao][metodo].operationId){
//    if(api.paths[operacao][metodo].description){
//1		opCampos = api.paths[operacao][metodo].externalDocs.url;
		opCampos = api.paths[operacao][metodo].operationId;
//    	opCampos = api.paths[operacao][metodo].description;
//		var CurlInicial = opCampos.indexOf('#### Chamada');
//		var CurlFinalExtra = opCampos.indexOf('## P',CurlInicial + 5);
//		var CurlFinal = opCampos.indexOf('####',CurlInicial + 5);
//		if (CurlFinal > 0) {
//		    opCampos = opCampos.substr(CurlInicial + 17, CurlFinal - CurlInicial - 25);
//		}else {
//			CurlFinal = CurlFinalExtra;
//			opCampos = opCampos.substr(CurlInicial + 18, CurlFinal - CurlInicial - 24);
//		}
//		var CurlModelo = opCampos.indexOf('] ');
//		if (CurlModelo > 0) {
//			opCampos = api.paths[operacao][metodo].description;
//			opCampos = opCampos.substr(CurlInicial + 25, CurlFinal - CurlInicial - 26);
//		}
		opCampos = opCampos.trim();
    }
    ent += "<br>";
    ent += "<h3>Exemplos de requisições</h3>";
    ent += "<div class=\"tab\">";
    ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'curl"+ id +"','Data" + id + "')\">CURL</button>";
    ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'vba"+ id +"','Data" + id + "')\">VBA</button>";
    ent += "<button class=\"tablinksData"+ id +" tab\" onclick=\"openTab(event, 'node"+ id +"','Data" + id + "')\">NODE.JS</button>";
    ent += "</div>";
    ent += "<div id=\"curl"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    ent += "<h4>C U R L</h4>";
		optexto = 'curl -X ' + metodo.toUpperCase() + ' -H "Accept: application/json" -H "Authorization: Bearer [token de acesso]' + '"';
 		opcampo =  '"' + opCampos + '"' ;
    ent += "<table class=\"alt\"><tbody><pre><code>" + optexto + "<br>" +  opcampo + "<br></code></pre></tbody></table>";

    ent += "</div>";
    ent += "<div id=\"vba"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    ent += "<h4>V B A</h4>";
		optexto = 'Dim objHTTP As New WinHttpRequest<br>';
		optexto = optexto + 'Dim strURL As String<br>';
		optexto = optexto + 'Dim response As String<br><br>';
		optexto = optexto + '<br>strURL =  "' +	opCampos + '"<br><br>';
		optexto = optexto + 'objHTTP.Open  "' + metodo.toUpperCase() + '", strURL, False<br>';
		optexto = optexto + 'objHTTP.SetRequestHeader "Authorization", "Bearer [token de acesso]"<br>';
		optexto = optexto + 'objHTTP.SetRequestHeader "Accept", "application/json"<br>';
		optexto = optexto + 'objHTTP.Send<br><br>';
		optexto = optexto + 'response = objHTTP.ResponseText<br><br>';
		optexto = optexto + "MsgBox response<br>});";
    ent += "<table class=\"alt\"><tbody><pre><code>" + optexto + "<br></code></pre></tbody></table>";
    ent += "</div>";
    ent += "<div id=\"node"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    ent += "<h4>N O D E ' J S</h4>";
		optexto = 'var request = require("request");<br><br>';
		optexto = optexto + "var options = {<br>  method: '" + metodo.toUpperCase() + "',";
		optexto = optexto + "<br>  url: '" +	opCampos + "',";
		optexto = optexto + "<br>  headers: { authorization: 'Bearer [token de acesso]' },";
		optexto = optexto + "<br>  body: {},";
		optexto = optexto + "<br>  json: true };";
		optexto = optexto + "<br><br>request(options, function (error, response, body) {";
		optexto = optexto + "<br>  if (error) throw new Error(error);";
		optexto = optexto + "<br><br>  console.log(body);";
		optexto = optexto + "<br>});";
    ent += "<table class=\"alt\"><tbody><pre><code>" + optexto + "<br></code></pre></tbody></table>";
    ent += "</div>";
    // ent += "<div id=\"teste"+ id +"\" class=\"tabcontentData"+ id +" box\" style=\"display:none\">";
    // ent += "<h4>Dados de Teste</h4>";
    // opCampos = '';
    // operacao.teste.forEach(teste => {
    //     opCampos += "<tr><td>" + teste.ni + "</td><td>" + teste.situacao + "</td></tr>";
    // });
    // ent += "<table class=\"alt\"><thead><tr><th>Entrada</th><th>Observações</th></tr></thead><tbody>" + opCampos + "</tbody></table>";    
    // ent += "</div>";
    // ent += "<br/><h3>Exemplos de requisições</h3>";
    // var opLinguagens = '';
    // var opDivsLinguagens = '';
    // operacao.exemplos.forEach(exemplo => {
    //     opLinguagens += "<button class=\"tablinksCode"+ id +" tab\" onclick=\"openTab(event, 'exemplo" + exemplo.linguagem + id + "','Code" + id + "')\"> " + exemplo.linguagem + "</button>";
    //     opDivsLinguagens += "<div id=\"exemplo" + exemplo.linguagem + id + "\" class=\"tabcontentCode" + id + " box\" style=\"display:none\"><h3>" + exemplo.linguagem + "</h3><pre><code>" + exemplo.exemplo + "</code></pre></div>";
    // });
    // ent += "<div class=\"tab\">";
    // ent += opLinguagens;
    // ent += "</div>";
    // ent += opDivsLinguagens;
     ent += "<br/><h3>Códigos de Resposta</h3>";
    // var opRetornos = '';
    // var opDivs = '';
    var descCodes = "";
    var responseCodes = Object.getOwnPropertyNames(api.paths[operacao][metodo].responses);
    responseCodes.forEach(resposta => {
        descCodes += "<tr><td>" + resposta + "</td><td>" + api.paths[operacao][metodo].responses[resposta].description + "</td></tr>";
    });
    ent += "<table class=\"alt\"><thead><tr><th>Código</th><th>Descricao</th></tr></thead><tbody>" + descCodes + "</tbody></table>";    
    // ent += "<div class=\"tab\">";
    // ent += opRetornos;
    ent += "</div>";
    // ent += opDivs;
    ent += "</div>";
    ent += "</section>";

    return ent;
}

function makeAPIList(apis){

    var ent = '';
    apis.forEach(api => {
        ent += "<article>";
        ent += "<div class=\"badge\"><a href=\"apis/apis.html?api=" + api.modelo + "\" style=\"border:none;\"><img src=\"./images/badges/" + api.imagem + ".png\"></a></img></div>";
        ent += "<div class=\"content\">";
        ent += "<h3><a href=\"apis/apis.html?api=" + api.modelo + "\" style=\"border:none;\">" + api.nome + "</a></h3>";
        ent += "<p>" + api.descricao + "</p>";
        ent += "</div>";
        ent += "</article>";    
    })

    return ent;

}

function toggle_visibility(id,rp) {
    var ii=0;
     for (ii = 1; ii < rp ; ii++) {
      var op = 'op' + ii
        document.getElementById(op).style.display="none";

      } 
      
       var e = document.getElementById("op"+id);
       if(e.style.display == 'none')
          e.style.display = 'block';
       else
          e.style.display = 'none';
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function addFields(fields, schema, father){
    saida = "";
    fields.forEach(field => {
        description = "";
        if(schema.properties && schema.properties[field].description !== undefined){
            description = schema.properties[field].description;
        }else {
        	description = " ------------ ";
        }
        	
        var arrow = "";
        if(father !== ""){
            arrow = "&#8627 ";
        }
        var tipo = "";
        if(!schema.properties){
            tipo = schema.type;
        }
        else{
            tipo = schema.properties[field].type;
        }
        saida += "<tr><td>" + "<b>" + father + arrow + "</b>"  + field + "</td><td>" + description + "</td><td>" + tipo + "</td></tr>";
        if(schema.properties && schema.properties[field].type === "object"){
            var subFields = Object.getOwnPropertyNames(schema.properties[field].properties);
            saida += addFields(subFields,schema.properties[field],father+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }
        if(schema.properties && schema.properties[field].type === "array"){
            console.log(schema.properties[field].items);
            var subFields;
            if(schema.properties[field].items.properties === undefined){
                subFields = Object.getOwnPropertyNames(schema.properties[field].items);
            }
            else{
                subFields = Object.getOwnPropertyNames(schema.properties[field].items.properties);
            }
            saida += addFields(subFields,schema.properties[field].items,father+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }
    });

    return saida;
}
