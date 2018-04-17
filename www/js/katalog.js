$(document).ready( function(){
  // console.log('sever url',serverurl);

  $("#kondur").click( function(){
    window.location="index.html";
  });

  $("#katalogAdd").click( function(){
    localStorage.setItem('katId','');
    window.location="fkatalog.html";
  });


  $.post(serverurl+"/pancake.php",{
    dest: 'katList'
  }, function(response){
    // console.log(response);
    // $("#testResponse").html(response);
    $("#katalogList li").remove();
    var katalog = JSON.parse(response);
    $.each(katalog,function(i,data){
      $("#katalogList").append(
        "<li class='list-group-item' onClick=controlme('"+data.katId+"')>"+
        "<p class='katalog1'>["+data.katId+"] "+data.merek+" "+data.tipe+"</p>"+
        "<p class='katalog2'>"+data.kapasitas+" Ah "+data.berat+" Kg</p>"+
        "</li>"
      );
    })
  });

  $("#katChg").click( function(){
    window.location="fkatalog.html";
  });

  $("#katRmv").click( function(){
    var buang = confirm('Hapus Data Katalog ?');
    if( buang == true ){
      $.post(serverurl+"/pancake.php",{
        dest  : 'katBusek',
        katId : localStorage.getItem('katId')
      }, function(){
        location.reload();
      });
    }
  });

});

function controlme(katId){
  $("#katalogModal").modal("show");
  $("#accuId").html(katId);
  localStorage.setItem('katId',katId);
}
