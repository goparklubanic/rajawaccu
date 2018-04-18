$(document).ready( function(){
  $("#kondur").click( function(){
    localStorage.setItem('jntrx','');
    localStorage.setItem('saleId','');
    window.location="index.html";
  });

  $("#mbalik").click( function(){
    localStorage.setItem('jntrx','');
    localStorage.setItem('saleId','');
    window.location="sale.html";
  });

  var saleId = localStorage.getItem('saleId');
  $("#saleId").val(saleId);

  var now = new Date();
  var dy = now.getDate();
  var dd = pad(dy,2);
  var mt = now.getMonth()+1;
  var mm = pad(mt,2);
  var yy = now.getFullYear();
  var tgJual = yy+"-"+mm+"-"+dd;
  $("#tgJual").val(tgJual);

  $("#kodeBarang").focus( function(){
    $.ajax({url:serverurl+"ajax.php?rqs=debar",
      success:function(barang){
        $("#acculist").html(barang);
      }
    });
  });

  $("input[name='jenisTransaksi']").click( function(){
    var index = $( "input[name='jenisTransaksi']" ).index( this );
    var jntrx = $("input[name='jenisTransaksi']").eq(index).val();
    localStorage.setItem('jntrx',jntrx);
  });

  $("#saleSubmit").click( function(){
    var jual = {
      'saleId'      : $("#saleId").val(),
      'tgJual'      : $("#tgJual").val(),
      'jntrx'       : localStorage.getItem('jntrx'),
      'kodeBarang'  : $("#kodeBarang").val(),
      'banyak'      : $("#banyak").val(),
      'hargaJual'   : $("#hargaJual").val()
    }

    var djual = JSON.stringify(jual);

    $.post(serverurl+"dodolan.php",{
      dest : 'akimetu',
      data : djual
    }, function(response){
      $("#saleResponse").html(response);
      $("#kodeBarang").val('');
      $("#banyak").val('');
      $("#hargaJual").val('');
    });
  });

});

function pad(n, len) {
    s = n.toString();
    if (s.length < len) {
        s = ('0000000000' + s).slice(-len);
    }
    return s;
}
