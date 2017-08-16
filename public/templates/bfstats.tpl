<link rel="stylesheet" type="text/css" href="/plugins/nodebb-widget-bfstats-vrk/public/css/style.css">
<div id="bfleaderboard">
  <div class="container-fluid">
     <div class="row align-middle table-title">
      <div class="col-md-3 text-uppercase text-center"><strong>Name</strong></div>
      <div class="col-md-1 text-uppercase"><strong>K/D</strong></div>
      <div class="col-md-1 text-uppercase"><strong>W/L</strong></div>
      <div class="col-md-1 text-uppercase"><strong>SPM</strong></div>
      <div class="col-md-1 text-uppercase"><strong>KPM</strong></div>
      <div class="col-md-1 text-uppercase"><strong>Skill</strong></div>
      <div class="col-md-2 text-uppercase"><strong>Time Played</strong></div>
      <div class="col-md-2 text-uppercase"><strong>Rank</strong></div>
     </div>
     <div class="row"><hr/></div>
  </div>

  <!-- BEGIN players -->
  <div class="row align-middle table-title">
    <div class="col-md-1">
      <img class="img-responsive" src="{players.picture}" />
    </div>
    <div class="col-md-2">
      <h5 class="">{players.username}</h5>
    </div>
    <div class="col-md-1">{players.kd}</div>
    <div class="col-md-1">{players.wins} / {players.losses}</div>
    <div class="col-md-1">{players.spm}</div>
    <div class="col-md-1">{players.kpm}</div>
    <div class="col-md-1">{players.skill}</div>
    <div class="col-md-2">{players.timePlayed}</div>
    <div class="col-md-2 text-left">
      <div class="pull-left">
        <img class="img-responsive" src="{players.rank.imageUrl}" style="max-width:64px;"/>
      </div>
    </div>
  </div>
  <div class="row"><hr/></div>
  <!-- END players -->
</div>
