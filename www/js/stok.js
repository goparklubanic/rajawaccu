$(document).ready( function(){
  $("#kondur").click( function(){
    window.location="index.html";
  });

  $("#stokAdd").click( function(){
    localStorage.setItem('katId','');
    window.location="fstok.html";
  });

  $.post(serverurl+"/panduwe.php",{
      dest : 'stokInfo'
  },function(stokInfo){
    var stok = JSON.parse(stokInfo);
    /* console.log(stok); */
    $("#stokInfo li").remove();
    $.each(stok,function(i,info){
      $("#stokInfo").append(
        "<li class='list-group-item' onClick=controlme('"+info.stokId+"')>"+
        "<p class='katalog1'>"+info.kodeBarang+" - "+info.stok+"</p>"+
        "<p class='katalog2'>"+info.merek+" "+info.tipe+"</p>"+
        "<p class='katalog3'>Rp. "+info.hargaJB+" - Rp. "+info.hargaTT+"</p>"+
        "</li>"
      );
    });
  });

  $("#stokChg").click( function(){
    window.location = 'fstok.html';
  });

  $("#stokRmv").click( function(){
    var stokId = localStorage.getItem('stokId');
    var busek = confirm('Stok dihapus permanen !');
    if ( busek == true ){
      $.post(serverurl+"/panduwe.php",{
        dest  : 'stokHilang',
        recId : stokId
      },function(response){
          console.log(response);
          localStorage.setItem('stokId','');
          location.reload();
      });
    }
  });
});

function controlme(stokId){
  $("#stokModal").modal("show");
  $("#stokId").html(stokId);
  localStorage.setItem('stokId',stokId);
}
