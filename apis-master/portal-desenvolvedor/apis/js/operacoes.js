function makeOperationBlock(operacao){
    var ent = '';
    ent += "<div id=\"" + operacao.id + "\" style=\"display:none;\">" ;
    ent += "<header class=\"major\">";
    ent += "<h2 id=\"" + operacao.id + "\">"+operacao.descricao+"</h2>";
    ent += "</header>";
    ent += "<div class=\"content\">";
    tpMetodo = "";
//    console.log(operacao.metodo.deprecated);
    if(operacao.metodo.deprecated === true){
        tpMetodo = "DEPRECATED";
    }
    else{
        tpMetodo = operacao.metodo;
    }
    ent += "<p class=\"" + tpMetodo + "Operation\"><span class=\"" + tpMetodo + "Label\">" + operacao.metodo + "</span><strong> " + operacao.path + " </strong></p>";
    ent += "<div id=\"modal" + operacao.id + "\" class=\"modal\">";
    ent += "<div class=\"modal-content\">";
    ent += "<span class=\"close\" onmouseup=\"clearFieldsResult(document.getElementById('resultPanel" + operacao.id + "'))\">&times;</span>";    
    ent += "<h3>"+ operacao.descricao + "</h3>";
    ent += "<p><strong>Bearer:</strong> <span class=\"bearer\"></span><br/>";
    ent += "<strong>URL:</strong> <span id=\"url" + operacao.id + "\"></span><br/>";
    ent += "<strong>Ambiente:</strong><span class=\"amb\"></span></p>";
    ent += "<h3>Parâmetros</h3>";
    ent += "<div id=\"modalOp\" class=\"box\">";
    var parametros = [];
    operacao.entrada.forEach(entrada => {
        parametros.push(entrada.campo);
        ent += entrada.campo + ": <input id=\"param" + entrada.campo + operacao.id + "\"></input><br/>";
    });        
    ent += "<center><button id=\"req" + operacao.id + "\" onclick=\"makeHTTPRequest(document.getElementById('resultPanel" + operacao.id + "'), document.getElementById('param" + operacao.id + "').value)\">Executar</button></center>";
    ent += "</div>";
    ent += "</div>";
    ent += "</div>";
    ent += "<h3>Informações de entrada e saída</h3>";
    ent += "<div class=\"tab\">";
    ent += "<button class=\"tablinksData"+ operacao.id +" tab\" onclick=\"openTab(event, 'entrada"+ operacao.id +"','Data" + operacao.id + "')\">Entrada</button>";
    ent += "<button class=\"tablinksData"+ operacao.id +" tab\" onclick=\"openTab(event, 'saida"+ operacao.id +"','Data" + operacao.id + "')\">Saída</button>";
    ent += "<button class=\"tablinksData"+ operacao.id +" tab\" onclick=\"openTab(event, 'teste"+ operacao.id +"','Data" + operacao.id + "')\">Dados de Teste</button>";
    ent += "</div>";
    ent += "<div id=\"entrada"+ operacao.id +"\" class=\"tabcontentData"+ operacao.id +" box\" style=\"display:none\">";
    ent += "<h4>Dados de Entrada</h4>";
    var opCampos = '';
    operacao.entrada.forEach(entrada => {
        opCampos += "<tr><td>" + entrada.campo + "</td><td>" + entrada.descricao + "</td><td>" + entrada.tipo + "</td></tr>";
    });
    ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descricao</th><th>Tipo</th></tr></thead><tbody>" + opCampos + "</tbody></table>";
    ent += "</div>";
    ent += "<div id=\"saida"+ operacao.id +"\" class=\"tabcontentData"+ operacao.id +" box\" style=\"display:none\">";
    ent += "<h4>Dados de Saída</h4>";
    opCampos = '';
    operacao.saida.forEach(saida => {
        opCampos += "<tr><td>" + saida.campo + "</td><td>" + saida.descricao + "</td><td>" + saida.tipo + "</td></tr>";
    });
    ent += "<table class=\"alt\"><thead><tr><th>Campo</th><th>Descrição</th><th>Tipo</th></tr></thead><tbody>" + opCampos + "</tbody></table>";
    ent += "</div>";
    ent += "<div id=\"teste"+ operacao.id +"\" class=\"tabcontentData"+ operacao.id +" box\" style=\"display:none\">";
    ent += "<h4>Dados de Teste</h4>";
    opCampos = '';
    operacao.teste.forEach(teste => {
        opCampos += "<tr><td>" + teste.ni + "</td><td>" + teste.situacao + "</td></tr>";
    });
    ent += "<table class=\"alt\"><thead><tr><th>Entrada</th><th>Observações</th></tr></thead><tbody>" + opCampos + "</tbody></table>";    
    ent += "</div>";
    ent += "<br/><h3>Exemplos de requisições</h3>";
    var opLinguagens = '';
    var opDivsLinguagens = '';
    operacao.exemplos.forEach(exemplo => {
        opLinguagens += "<button class=\"tablinksCode"+ operacao.id +" tab\" onclick=\"openTab(event, 'exemplo" + exemplo.linguagem + operacao.id + "','Code" + operacao.id + "')\"> " + exemplo.linguagem + "</button>";
        opDivsLinguagens += "<div id=\"exemplo" + exemplo.linguagem + operacao.id + "\" class=\"tabcontentCode" + operacao.id + " box\" style=\"display:none\"><h3>" + exemplo.linguagem + "</h3><pre><code>" + exemplo.exemplo + "</code></pre></div>";
    });
    ent += "<div class=\"tab\">";
    ent += opLinguagens;
    ent += "</div>";
    ent += opDivsLinguagens;
    ent += "<br/><h3>Códigos de Resposta</h3>";
    var opRetornos = '';
    var opDivs = '';
    operacao.respostas.forEach(resposta => {
        opRetornos += "<button class=\"tablinksResponse"+ operacao.id +" tab\" onclick=\"openTab(event, 'resposta" + resposta.codigo + operacao.id + "','Response" + operacao.id + "')\"> " + resposta.codigo + " - " + resposta.mensagem  + "</button>";
        opDivs += "<div id=\"resposta" + resposta.codigo + operacao.id + "\" class=\"tabcontentResponse" + operacao.id + " box\" style=\"display:none\"><h3>" + resposta.codigo + " - " + resposta.mensagem + "</h3><pre><code>" + resposta.exemplo + "</code></pre></div>";
    });
    ent += "<div class=\"tab\">";
    ent += opRetornos;
    ent += "</div>";
    ent += opDivs;
    ent += "</div>";
    ent += "</section><br/><br/><br/>";

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
      
       var e = document.getElementById(id);
       if(e.style.display == 'none')
          e.style.display = 'block';
       else
          e.style.display = 'none';
    }
