$(document).ready( function(){
  $("#kondur").click( function(){
    localStorage.setItem('jntrx','');
    localStorage.setItem('saleId','');
    window.location="index.html";
  });

  $("#mbalik").click( function(){
    localStorage.setItem('jntrx','');
    localStorage.setItem('saleId','');
    window.location="index.html";
  });

  $.post(serverurl+"dodolan.php",{
    dest  : 'saleId'
  },function(response){
    console.log(response);
    $('#saleId').val(response);
  });
  var now = new Date();
  var dy = now.getDate();
  var dd = pad(dy,2);
  var mt = now.getMonth()+1;
  var mm = pad(mt,2);
  var yy = now.getFullYear();
  var tgJual = yy+"-"+mm+"-"+dd;
  $("#tgJual").val(tgJual);

  $("input[name='jenisTransaksi']").click( function(){
    var index = $( "input[name='jenisTransaksi']" ).index( this );
    var jntrx = $( "input[name='jenisTransaksi']" ).eq(index).val();
    localStorage.setItem('jntrx',jntrx);
  });

  $("#kodeBarang").focus( function(){
    var jntrx = localStorage.getItem('jntrx');
    //alert (jntrx);
    $("#acculist").show();
    $.ajax({url:serverurl+"ajax.php?rqs=debars&at="+jntrx,
      success:function(barang){
        $("#acculist").html(barang);
      }
    });
  });

  $("#kdAki").keyup( function(){
    var mrx = $("#kdAki").val();
    $("#catAki").show();
    $("#catAki").html('');
    $.ajax({
      url:serverurl+'ajax.php?rqs=katabek&mrx='+mrx,
      success: function(katabek){
        $("#catAki").html(katabek);
      }
    });
  });

  $("#saleSubmit").click( function(){
    var sdata = {
      saleId      : $("#saleId").val(),
      tgJual      : $("#tgJual").val(),
      jntrx       : localStorage.getItem('jntrx'),
      kodeBarang  : $("#kodeBarang").val(),
      banyak      : 1,
      hargaJual   : $("#hargaJual").val()

    }

    var data = JSON.stringify(sdata);
    $.post(
      serverurl+'dodolan.php',{
      dest : 'akimetu',
      data : data
      },function( response ){
        $("#saleResponse").html( response )
      }
    );
  });

  $("#stokSubmit").click( function (){
    var katId = $("#kdAki").val().substring(0,3);
    var sstok = {
      katId     : katId,
      tglMasuk  : $("#tgJual").val(),
      kondisi   : 'X',
      kodeBarang: $("#kdAki").val(),
      banyak    : 1,
      hargaBeli : 0,
      biayaModal: 0,
      hargaJB   : $("#hargaRx").val(),
      hargaTT   : $("#hargaTT").val()
    }
    var stok = JSON.stringify(sstok);
    $.post(
      serverurl+"panduwe.php",
      {
        dest : 'stokMasuk',
        stok : stok
      }, function( response ){
        $("#stokResponse").html( response )
      }
    );

  });
});

function pad(n, len) {
    s = n.toString();
    if (s.length < len) {
        s = ('0000000000' + s).slice(-len);
    }
    return s;
}

function setAkimas(kode,harga){
  $("#kdAki").val(kode);
  $("#hargaRx").val(harga);
  $("#catAki").hide();
}
