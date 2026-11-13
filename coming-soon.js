(function(){
  var stream='https://stream.zeno.fm/3ypec04s498uv';
  var radio=new Audio();
  var volume=document.getElementById('radio-volume');
  var button=document.getElementById('play-button');
  var state=document.getElementById('player-state');
  var playground=document.getElementById('playground');
  var words=['FEEL','FE','FLOW','HUELLA','GO'];
  var wordIndex=0;
  radio.volume=Number(volume.value)/100;
  volume.addEventListener('input',function(){radio.volume=Number(volume.value)/100});
  function update(){
    var playing=!radio.paused;
    document.body.classList.toggle('playing',playing);
    button.textContent=playing?'❚❚':'▶';
    button.setAttribute('aria-label',playing?'Pausar la radio':'Escuchar A tus Pies Radio');
    button.setAttribute('aria-pressed',String(playing));
    state.textContent=playing?'En vivo':'Al aire';
  }
  button.addEventListener('click',function(){
    if(radio.paused){if(!radio.src)radio.src=stream;radio.play().then(update).catch(function(){state.textContent='Intenta de nuevo';});}
    else{radio.pause();update();}
  });
  radio.addEventListener('pause',update);radio.addEventListener('playing',update);
  document.getElementById('teaser').addEventListener('click',function(){
    wordIndex=(wordIndex+1)%words.length;
    document.getElementById('teaser-word').textContent=words[wordIndex];
    playground.classList.remove('pop');void playground.offsetWidth;playground.classList.add('pop');
  });
  if(window.matchMedia('(hover:hover)').matches){
    playground.addEventListener('pointermove',function(event){
      var bounds=playground.getBoundingClientRect();
      playground.style.setProperty('--mx',((event.clientX-bounds.left)/bounds.width-.5)*24+'px');
      playground.style.setProperty('--my',((event.clientY-bounds.top)/bounds.height-.5)*20+'px');
    });
    playground.addEventListener('pointerleave',function(){playground.style.setProperty('--mx','0px');playground.style.setProperty('--my','0px')});
  }
})();
