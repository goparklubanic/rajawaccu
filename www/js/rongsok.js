$(document).ready( function(){
  $("#kondur").click(function(){
    window.location = 'index.html';
  });

  $("#mbalik").click(function(){
    window.location = 'index.html';
  });

  $.post(serverurl+"dedauran.php",{
    dest : 'getHarga'
  },function(harga){
    var data = JSON.parse(harga);
    // console.log(data);
    $("#regaKiloan").html(data.harga);
    $("#tglBerlaku").html(data.tanggal);
    localStorage.setItem('perkilo',data.regadb);
  });

  $.post(serverurl+"dedauran.php",{
    dest : 'rombengan'
  },function(data){
    $("#rongsokList li").remove();
    var aset = JSON.parse(data);
    // console.log(aset);
    $.each(aset, function(i,accu){
      $("#rongsokList").append(
        "<li class='list-group-item' onclick=rombengme('"+accu.kodeBarang+"')>"+
        "<p>"+accu.merek+" "+accu.tipe+"<br/>["+accu.kodeBarang+"]"+
        "<span class='glyphicon glyphicon-trash raka'>"+accu.readyStok+"</span>"+
        "</p></li>"
      );
    });
  });


  $("#chgHarga").click(function(){
    $("#formPerkilo").show();
    $("#infoPerkilo").hide();
  });

  $("#setHarga").click( function(){
    $.post(serverurl+"dedauran.php",{
      dest : 'setHarga',
      rega : $("#hargarongsok").val(),
    },function(){
      location.reload();
    });
  });
});

function rombengme(kb){
  $.post(serverurl+"dedauran.php",{
    dest : 'rombengin',
    accu : kb,
    rega : localStorage.getItem('perkilo')
  },function(){
    location.reload();
  });
}
