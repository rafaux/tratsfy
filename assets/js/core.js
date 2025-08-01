$(document).ready(function(){

  /* Checkout Animate */
  setTimeout(function(){
    $('#checkout').addClass('on')
  }, 1000)

  /* Menu */
  $('#header .right span.menu').click(function(){
    $('#sidebar').toggleClass('on')
  })

  /* Graph */
  $('.chart-bar').each(function(){
    var height = $(this).find('.bar').attr('ref')
    $(this).find('.bar').attr('style', 'height: ' + height)
    console.log(height)
  })

  /* Sidebar */
  $('#sidebar nav ul li a.sub').click(function(){
    $(this).toggleClass('on')
    $(this).parent().find('ul').slideToggle()
    return false
  })

  /* Método de Pagamento */
  $('.metodo-pagamento span').click(function(){
    $('.metodo-pagamento span').removeClass('active')
    $(this).addClass('active')
    var tipo = $(this).attr('ref')
    $('.mp-cont').slideUp();
    if(tipo == 'mp-cartao'){ $('.mp-c-cartao').slideDown() }
    if(tipo == 'mp-pix'){ $('.mp-c-pix').slideDown() }
    if(tipo == 'mp-boleto'){ $('.mp-c-boleto').slideDown() }
  })

  // Close Alert
  $('.form-float section .alert .close').click(function(){
    $(this).parent().slideUp();
  })

  // View Password
    $('.form-float .right').on('click', function () {
        const $passwordInput = $(this).siblings('.pwd'); 
        const currentType = $passwordInput.attr('type');
        
        if (currentType === 'password') {
            $passwordInput.attr('type', 'text');
        } else {
            $passwordInput.attr('type', 'password');
        }
        
        $(this).toggleClass('fa-eye fa-eye-slash');
    });
  
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