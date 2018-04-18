$(document).ready( function(){
  $("#kondur").click( function(){
    window.location="index.html";
  });

  var tgl = new Date();
  var thn = tgl.getFullYear();
  var bln = tgl.getMonth();
  for( var i = bln ; i >=1  ; i-- ){
    var bl = pad(i,2);
    $("#pdptBulan").append(
      "<option value='"+thn+"-"+bl+"'>"+thn+"-"+bl+"</option>"
    );
  }

  $("#hariIni").click( function(){
    $.post(serverurl+"bathen.php",{
      filter: 'today'
    },function(revenue){
      showBathen(revenue);
    });
  });

  $("#bulanIni").click( function(){
    $.post(serverurl+"bathen.php",{
      filter: 'thisMonth'
    },function(revenue){
      showBathen(revenue);
    });
  });

  $("#pdptTanggal").on('change', function(){
    var tgl = $("#pdptTanggal").val();

    $.post(serverurl+"bathen.php",{
      filter: tgl
    },function(revenue){
      showBathen(revenue);
    });
  });

  $("#pdptBulan").on('change', function(){
    $.post(serverurl+"bathen.php",{
      filter: $("#pdptBulan").val()
    },function(revenue){
      showBathen.log(revenue);
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

function showBathen(data){

  var bathen = JSON.parse(data);

  var uraian = bathen.uraian;
  $("#datalaba tr").remove();
  $.each(uraian, function(i,laba){
    $("#datalaba").append(
      "<tr>"+
      "<td>"+laba.trx+"</td>"+
      "<td align='right'>"+laba.qty+"</td>"+
      "<td align='right'>"+laba.cash+"</td>"+
      "</tr>"
    );
  });
  $("#datalaba").append(
    "<tr>"+
    "<td colspan='2'>Total  Pendapatan</td>"+
    "<td align='right'>"+bathen.total+"</td>"+
    "</tr>"
  );
}

function showRevenue(tgl){
  var tanggal = toString(tgl);
  console.log('tanggal',tanggal);

  $.post(serverurl+"bathen.php",{
    filter: tanggal
  },function(revenue){
    showBathen(revenue);
  });
}
