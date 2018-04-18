$(document).ready( function(){
  var stokId = localStorage.getItem('stokId');
  if( stokId != '' && stokId != null ){
    $.post(serverurl+"panduwe.php",{
      dest    : 'stokData',
      stokId  : stokId
    },function(stokData){
      var data = JSON.parse(stokData)
      console.log('stok data',data);
      $("#updateBtn").show();
      $("#submitBtn").hide();
      $(".hideOnUpdate").css('display','none');
      $("#kodeBarang").val(data.kodeBarang);
      $("#banyak").val(data.banyak);
      $("#hargaBeli").val(data.hargaBeli);
      $("#biayaModal").val(data.biayaModal);
      $("#hargaJB").val(data.hargaJB);
      $("#hargaTT").val(data.hargaTT);
    });
  }
  $("#kondur").click( function(){
    window.location="index.html";
  });

  $("#katId").focus( function(){
    $.ajax({url:serverurl+"ajax.php?rqs=katalis",
      success:function(katalis){
        $("#katalis").html(katalis);
      }
    });
  });

  $("#mbalik").click( function(){
    window.location="stok.html";
  });

  /*
  $("#katId").change( function(){
    var kode = $(this).val();
    setKodeAccu(kode);
  });
  */

  $(".battCond").click( function(){
    var index = $( ".battCond" ).index( this );
    var battCond = $(".battCond").eq(index).val();
    localStorage.setItem('battCond',battCond);
    setKodeAccu(battCond);
    urutseek(battCond);
  });

  $("#tglMasuk").blur( function(){
    var tgl = $(this).val();
    var tgb = tgl.split('-');
    var kode = tgb[1]+tgb[2];
    setKodeAccu(kode);
  });

  $("#banyak").click( function(){
    var urut = localStorage.getItem('urut');
    setKodeAccu(urut);
    localStorage.setItem('urut','');
  });

  $("#stokSubmit").click( function(){
    /* katId,tglMasuk,kondisi,
    banyak,hargaBeli,biayaModal,
    hargaJB,hargaJT */
    var stok = {
      'katId'       : $("#katId").val(),
      'tglMasuk'    : $("#tglMasuk").val(),
      'kondisi'     : localStorage.getItem('battCond'),
      'kodeBarang'  : $("#kodeBarang").val(),
      'banyak'      : $("#banyak").val(),
      'hargaBeli'   : $("#hargaBeli").val(),
      'biayaModal'  : $("#biayaModal").val(),
      'hargaJB'     : $("#hargaJB").val(),
      'hargaTT'     : $("#hargaTT").val(),
    }

    // console.log('array',stok);
    var jstok = JSON.stringify(stok);
    // console.log('json',jstok);

    $.post(serverurl+"panduwe.php",{
      dest : 'stokMasuk',
      stok : jstok
    },function(response){
      console.log(response);
      window.location='stok.html';
    });
  });


  $("#stokUpdate").click( function(){

    var stok = {
      'recId'       : localStorage.getItem('stokId'),
      'kodeBarang'  : $("#kodeBarang").val(),
      'banyak'      : $("#banyak").val(),
      'hargaBeli'   : $("#hargaBeli").val(),
      'biayaModal'  : $("#biayaModal").val(),
      'hargaJB'     : $("#hargaJB").val(),
      'hargaTT'     : $("#hargaTT").val(),
    }

    // console.log('array',stok);
    var jstok = JSON.stringify(stok);
    // console.log('json',jstok);

    $.post(serverurl+"panduwe.php",{
      dest : 'stokGanti',
      stok : jstok
    },function(response){
      console.log(response);
      window.location='stok.html';
      localStorage.setItem('stokId','');
    });
  });

});

function setKodeAccu(kode){
  var kdAccu = $("#kodeBarang").val();
  var kdBaru = kdAccu + kode;
  var kdAccu = $("#kodeBarang").val(kdBaru);
}

function urutseek(kondisi){
  if(kondisi =='N'){
    localStorage.setItem('urut','00');
  }else{
    $.post(serverurl+"panduwe.php",{
      dest  : 'urutaki',
      kond  : kondisi
    },function(urut){
      console.log(urut);
      localStorage.setItem('urut',urut);
    });
  }
}
