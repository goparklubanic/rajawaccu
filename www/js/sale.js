$(document).ready( function(){

  $.post(serverurl+"dodolan.php",{
    dest : 'saleInfo'
  },function(saleInfo){
    var sf = JSON.parse(saleInfo);
    console.log(sf);
    $(".content-list li").remove();
    $.each(sf, function(i,data){
      $(".content-list").append(
        "<li class='list-group-item' id="+data.tgJual+" onClick = buangTrx('"+data.tgJual+"')>"+
        "<p class='katalog1'>"+data.tgJual+" - "+data.kdBarang+"</p>"+
        "<p class='katalog2'>"+data.jntrx+" - "+data.merek+" "+data.tipe+"</p>"+
        "<p class='katalog3'>Rp. "+data.harga+"</p>"+
        "</li>"
      );
    });
  });


  $("#kondur").click( function(){
    window.location="index.html";
  });

  $("#mbalik").click( function(){
    window.location="sale.html";
  });

  $("#saleAdd").click( function(){
    $.post(serverurl+"dodolan.php",{
      dest  : 'saleId'
    },function(response){
      console.log(response);
      localStorage.setItem('saleId',response);
      window.location = "fsale.html";
    });
  });
});

function buangTrx(saleId){
  console.log(saleId);

  var yqn = confirm('Hapus data penjualan ?');
  if( yqn == true ){
    $.post(serverurl+"/dodolan.php",{
      dest : 'saleRemove',
      slid : saleId
    }, function(response){
      location.reload();
    });
  }

}
