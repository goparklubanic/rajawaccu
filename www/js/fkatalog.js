$(document).ready( function(){
  // console.log('sever url',serverurl);
  var katId=localStorage.getItem('katId');

  if(katId != null && katId != ''){
    $("#catId").val(katId);
    $.post(serverurl+"/pancake.php",{
      dest  : 'katInfo',
      katId : katId
    },function(katData){
      console.log('katInfo',katData);
      var kat = JSON.parse(katData);
      $("#merek").val(kat.merek);
      $("#tipe").val(kat.tipe);
      $("#kapasitas").val(kat.kapasitas);
      $("#berat").val(kat.berat);
      $("#btnSubmit").hide();
      $("#btnUpdate").show();
    });
  }

  $("#katalogUpdate").click( function(){
    alert('update');
    var data = {"catId":$("#catId").val(),
                "merek":$("#merek").val(),
                "tipe":$("#tipe").val(),
                "kapasitas":$("#kapasitas").val(),
                "berat":$("#berat").val() } ;
    $.post(serverurl+"/pancake.php",{
      dest  : 'katUbah',
      info  : data
    },function(response){
      $("#testResponse").html(response);
      // console.log(response);
      $("#catId").val('');
      $("#merek").val('');
      $("#tipe").val('');
      $("#kapasitas").val('');
      $("#berat").val('');
      localStorage.setItem('katId','');
    });
  })

  $("#kondur").click( function(){
    window.location="index.html";
  });

  $("#mbalik").click( function(){
    window.location="katalog.html";
  });

  $("#katalogSubmit").click( function(){
    var data = {"catId":"null",
                "merek":$("#merek").val(),
                "tipe":$("#tipe").val(),
                "kapasitas":$("#kapasitas").val(),
                "berat":$("#berat").val() } ;
    // console.log(data);
    $.post(serverurl+"/pancake.php",{
      dest:'katBaru', data: data
    },function(response){
        $("#testResponse").html(response);
        // console.log(response);
        $("#catId").val('');
        $("#merek").val('');
        $("#tipe").val('');
        $("#kapasitas").val('');
        $("#berat").val('');
    });

  });
});
