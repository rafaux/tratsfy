$(document).ready(function(){

  setTimeout(function(){
    $('#checkout').addClass('on')
  }, 1000)

  /* metodo pagamento */
  $('.metodo-pagamento span').click(function(){
    $('.metodo-pagamento span').removeClass('active')
    $(this).addClass('active')
    var tipo = $(this).attr('ref')
    $('.mp-cont').slideUp();
    if(tipo == 'mp-cartao'){ $('.mp-c-cartao').slideDown() }
    if(tipo == 'mp-pix'){ $('.mp-c-pix').slideDown() }
    if(tipo == 'mp-boleto'){ $('.mp-c-boleto').slideDown() }
  })
  
  // Mask
  $('.field-tel').mask('(00) 00000-0000');
  $('.field-cep').mask('00000-000');
  $('.field-cartao').mask('0000 0000 0000 0000');

  // CEP
  function limpaCamposEndereco() {
      $('.field-endereco').val('');
      $('.field-bairro').val('');
      $('.field-cidade').val('');
      $('.field-estado').val('');
  }

  $('.field-cep').on('blur', function() {
      var cep = $(this).val().replace(/\D/g, '');

      if (cep != "") {
          var validacep = /^[0-9]{8}$/;

          if(validacep.test(cep)) {
              $('.field-endereco').val('...');
              $('.field-bairro').val('...');
              $('.field-estado').val('...');

              $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {
                  if (!("erro" in dados)) {
                      $('.field-endereco').val(dados.logradouro);
                      $('.field-bairro').val(dados.bairro);
                      $('.field-numero').focus();
                  } else {
                      limpaCamposEndereco();
                      alert("CEP não encontrado.");
                  }
              });
          } else {
              limpaCamposEndereco();
              alert("Formato de CEP inválido.");
          }
      } else {
          limpaCamposEndereco();
      }
  });

})