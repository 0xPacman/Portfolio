(() => {
  'use strict';
  const config = Object.assign({
    color: [.86,.89,.93], background: [8/255,11/255,16/255],
    particles: matchMedia('(max-width:700px)').matches ? 20000 : 33000,
    size:.64, speed:1, pointSize:1.60, turbulence:1, interaction:1,
  },window.ORB_CONFIG);
  const canvas = document.querySelector('canvas');
  const motion = matchMedia('(prefers-reduced-motion:reduce)');
  let lightTheme=document.documentElement.getAttribute('data-theme')==='light';
  const clamp = (x,lo,hi) => Math.max(lo,Math.min(hi,x));
  const state = { time:0,morph:0,target:0,velocity:0,charge:0,down:false,
    hover:0,hoverTarget:0,x:0,y:0,tx:0,ty:0,last:0,frame:0,width:1,height:1,dpr:1,
    secret:'orb',message:0,myth:0,storyStart:0,vx:0,vy:0,pressTime:0 };
  const trails=[[0,0],[0,0],[0,0]],trailData=new Float32Array(6);
  const pulses = Array.from({length:4},() => ({x:0,y:0,start:-100,strength:0}));
  let pulseIndex=0,contact=null,gl=null,display=canvas;
  let draw,resizeRenderer;
  try { gl=canvas.getContext('webgl',{alpha:true,antialias:false,depth:false,powerPreference:'low-power'}); } catch {}
  const {vertex,fragment}=window.OrbAppearance;
  const count=clamp(Math.floor(config.particles),1000,100000),data=new Float32Array(count*5);
  const outer=Math.floor(count*.8),golden=Math.PI*(3-Math.sqrt(5));
  let randomState=70239;
  const random=() => { randomState=(Math.imul(randomState,1664525)+1013904223)>>>0; return randomState/4294967296; };
  for(let i=0;i<count;i++) {
    const shell=i<outer?0:1,index=shell?i-outer:i,total=shell?count-outer:outer;
    const y=1-2*(index+.5)/total,r=Math.sqrt(1-y*y),angle=index*golden;
    data.set([r*Math.cos(angle)+(random()-.5)*.006,y+(random()-.5)*.006,
      r*Math.sin(angle)+(random()-.5)*.006,random(),shell],i*5);
  }
  const destinations=window.OrbSecrets.makeTargets(count,random);
  function setupWebGL() {
    function compile(type,source) {
      const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
        const error=gl.getShaderInfoLog(shader); gl.deleteShader(shader); throw new Error(error);
      }
      return shader;
    }
    const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment),program=gl.createProgram();
    gl.attachShader(program,vs); gl.attachShader(program,fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    for(const [name,size,offset] of [['aPosition',3,0],['aSeed',1,12],['aShell',1,16]]) {
      const location=gl.getAttribLocation(program,name);
      gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location,size,gl.FLOAT,false,20,offset);
    }
    for(const [name,array,size] of [['aMessage',destinations.message,4],['aMyth',destinations.myth,4],['aMythStyle',destinations.mythStyle,2]]) {
      const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,array,gl.STATIC_DRAW);
      const location=gl.getAttribLocation(program,name); gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0);
    }
    const uniforms={};
    for(const name of ['uTime','uMorph','uMomentum','uCharge','uHover','uAspect','uScale',
      'uPixelRatio','uPointSize','uTurbulence','uPointer','uColor','uPulses[0]',
      'uMessage','uMyth','uStoryTime','uStone','uSlope','uPointerVelocity','uTrail[0]','uGlowPass','uLight']) uniforms[name]=gl.getUniformLocation(program,name);
    gl.uniform3fv(uniforms.uStone,[...destinations.rockCenter,destinations.rockRadius]);
    gl.uniform1f(uniforms.uSlope,destinations.slope);
    const pulseData=new Float32Array(16);
    gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND);
    gl.clearColor(0,0,0,0);
    resizeRenderer=() => gl.viewport(0,0,display.width,display.height);
    draw=() => {
      if(gl.isContextLost()) return;
      // Ink accumulates on paper; light accumulates in the dark palette.
      gl.blendFuncSeparate(gl.SRC_ALPHA,lightTheme?gl.ONE_MINUS_SRC_ALPHA:gl.ONE,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
      gl.clear(gl.COLOR_BUFFER_BIT);
      for(const [name,value] of Object.entries({
        uTime:state.time*config.speed,uMorph:((state.morph%4)+4)%4,
        uMomentum:motion.matches?0:clamp(state.velocity,-3,3),uCharge:state.charge,uHover:state.hover*config.interaction,
        uAspect:state.width/state.height,uScale:scale(),uPixelRatio:state.dpr,
        uPointSize:config.pointSize,uTurbulence:config.turbulence,
        uMessage:state.message,uMyth:state.myth,uStoryTime:state.time-state.storyStart,
        uLight:lightTheme?1:0,
      })) gl.uniform1f(uniforms[name],value);
      gl.uniform2f(uniforms.uPointer,state.x,state.y); gl.uniform3fv(uniforms.uColor,config.color);
      gl.uniform2f(uniforms.uPointerVelocity,state.vx,state.vy);
      trails.forEach((p,i)=>trailData.set(p,i*2)); gl.uniform2fv(uniforms['uTrail[0]'],trailData);
      pulses.forEach((p,i) => pulseData.set([p.x,p.y,clamp(state.time-p.start,0,100),motion.matches?0:p.strength],i*4));
      gl.uniform4fv(uniforms['uPulses[0]'],pulseData);
      if(!lightTheme && state.message+state.myth<.99) {
        gl.uniform1f(uniforms.uGlowPass,1); gl.drawArrays(gl.POINTS,0,count);
      }
      gl.uniform1f(uniforms.uGlowPass,0); gl.drawArrays(gl.POINTS,0,count);
    };
  }
  function setupFallback() {
    // A simpler interactive renderer keeps the orb usable without WebGL.
    const replacement=canvas.cloneNode(false); canvas.replaceWith(replacement); display=replacement; gl=null;
    const ctx=display.getContext('2d'); resizeRenderer=() => {};
    draw=() => {
      if(!ctx) return;
      ctx.setTransform(state.dpr,0,0,state.dpr,0,0); ctx.clearRect(0,0,state.width,state.height);
      const pixels=Math.min(state.width,state.height)*config.size/2,ring=.5-.5*Math.cos(state.morph*Math.PI/2);
      const c=Math.cos(state.time*.1),s=Math.sin(state.time*.1);
      for(let i=0;i<count;i+=4) {
        const at=i*5,y=data[at+1],shell=data[at+4],x=data[at]*c+data[at+2]*s,z=data[at+2]*c-data[at]*s;
        const phi=Math.atan2(z,x),r=.75+.24*Math.cos((y+1)*Math.PI);
        let px=x*(1-.46*shell)*(1-ring)+Math.cos(phi)*r*ring;
        let py=y*(1-.46*shell)*(1-ring)+Math.sin(phi)*r*ring;
        const dx=state.x-px,dy=state.y-py,force=Math.exp(-(dx*dx+dy*dy)/.095)*state.hover;
        px+=(dx*.5-dy*.95)*force; py+=(dy*.5+dx*.95)*force;
        let energy=force*.5;
        for(const p of pulses) {
          const age=state.time-p.start,d=Math.hypot(px-p.x,py-p.y);
          const env=motion.matches?0:Math.exp(-Math.pow(d-age*1.65,2)*30-age*1.5)*p.strength;
          const wave=Math.sin((d-age*1.65)*19)*env*.16;
          px+=(px-p.x)/Math.max(d,.05)*wave; py+=(py-p.y)/Math.max(d,.05)*wave; energy+=env;
        }
        const contraction=1-state.charge*.18,secret=state.message+state.myth,at4=i*4;
        let sx=destinations.myth[at4],sy=destinations.myth[at4+1];
        const role=destinations.myth[at4+3],age=state.time-state.storyStart,cycle=(age%16)/16;
        const smooth=x=>x*x*(3-2*x);
        const ascent=cycle<.76?smooth(cycle/.76):1-smooth((cycle-.76)/.24),travel=(ascent-.4)*.14;
        if(role<.5) {
          const [cx,cy]=destinations.rockCenter,roll=-travel/destinations.rockRadius,lx=sx-cx,ly=sy-cy;
          sx=cx+lx*Math.cos(roll)-ly*Math.sin(roll); sy=cy+lx*Math.sin(roll)+ly*Math.cos(roll);
        }
        if(role<1.5) { sx+=travel; sy+=travel*destinations.slope; }
        px=px*contraction*(1-secret)+destinations.message[at4]*state.message+sx*state.myth;
        py=py*contraction*(1-secret)+destinations.message[at4+1]*state.message+sy*state.myth;
        const ink=destinations.message[at4+3]<.5?.85:.2;
        const storyInk=destinations.mythStyle[i*2];
        const alpha=clamp(.35+.25*z+energy*.3,.15,.95)*(1-secret)+ink*state.message+storyInk*state.myth;
        if(lightTheme) {
          const warmth=clamp(energy*.55*(1-secret)+secret*.6,0,1);
          ctx.fillStyle=`rgba(${Math.round(34+warmth*44)},${Math.round(43+warmth*10)},${Math.round(44-warmth*16)},${Math.min(1,alpha*1.08)})`;
        } else {
          ctx.fillStyle=`rgba(${Math.round(219-energy*50*(1-secret)+30*secret)},${Math.round(227-secret*16)},${Math.round(237-secret*60)},${alpha})`;
        }
        ctx.fillRect(state.width/2+px*pixels,state.height/2-py*pixels,1,1);
      }
    };
  }
  try { if(gl) setupWebGL(); else setupFallback(); }
  catch(error) { console.warn('Using the Canvas orb renderer.',error.message); setupFallback(); }
  function scale() { return config.size*Math.min(1,state.width/state.height); }
  function resize() {
    state.width=Math.max(1,innerWidth); state.height=Math.max(1,innerHeight); state.dpr=Math.min(devicePixelRatio||1,2);
    display.width=Math.round(state.width*state.dpr); display.height=Math.round(state.height*state.dpr); resizeRenderer(); draw();
  }
  function updatePointer(event) {
    state.tx=((event.clientX/state.width)*2-1)*(state.width/state.height)/scale();
    state.ty=(1-(event.clientY/state.height)*2)/scale();
    if(state.hoverTarget===0) trails.forEach(p=>{p[0]=state.tx;p[1]=state.ty;});
    state.hoverTarget=1;
    if(motion.matches) { state.x=state.tx; state.y=state.ty; state.hover=1; draw(); }
  }
  function morphBy(delta) {
    if(state.secret!=='orb') reveal('orb');
    state.target+=delta;
    if(motion.matches) { state.morph=state.target; state.velocity=0; draw(); }
  }
  function pulse(x,y,strength=1) {
    if(motion.matches) { if(state.secret==='orb') morphBy(.35); return; }
    Object.assign(pulses[pulseIndex],{x,y,start:state.time,strength}); pulseIndex=(pulseIndex+1)%pulses.length;
  }
  function reveal(mode) {
    state.secret=state.secret===mode?'orb':mode;
    state.down=false; state.charge=0;
    pulses.forEach(p=>{p.strength=0;});
    if(state.secret==='myth') state.storyStart=state.time;
    const labels={orb:'Interactive particle orb. Scroll to change shape. Hover to stir. Click for a ripple.',
      message:'THE WORLD IS ABSURD. A hidden inscription made of particles. Scroll or press Escape to return.',
      myth:'Sisyphus pushes a boulder uphill, only to begin again. Scroll or press Escape to return.'};
    display.setAttribute('aria-label',labels[state.secret]);
    if(motion.matches) {
      state.message=state.secret==='message'?1:0; state.myth=state.secret==='myth'?1:0; draw();
    }
  }
  const taps=window.OrbSecrets.tapRecognizer(()=>reveal('message'),()=>reveal('myth'));
  function resetPointer() { state.hoverTarget=0; if(motion.matches) { state.hover=0; draw(); } }
  function cancelContact() {
    if(contact && display.hasPointerCapture(contact.id)) display.releasePointerCapture(contact.id);
    contact=null; state.down=false; taps.cancel(); resetPointer();
  }
  function tick(now) {
    const dt=state.last?Math.min((now-state.last)/1000,.04):0; state.last=now; state.time+=dt;
    // A damped spring retains the gesture's momentum, then settles precisely.
    state.velocity+=(state.target-state.morph)*36*dt; state.velocity*=Math.exp(-12*dt); state.morph+=state.velocity*dt;
    if(Math.abs(state.target-state.morph)<.00001 && Math.abs(state.velocity)<.0001) {
      state.morph=state.target; state.velocity=0;
      const turns=Math.floor(state.target/4)*4; state.target-=turns; state.morph-=turns;
    }
    const follow=1-Math.exp(-dt*12);
    const previousX=state.x,previousY=state.y;
    state.x+=(state.tx-state.x)*follow; state.y+=(state.ty-state.y)*follow;
    state.vx=dt?clamp((state.x-previousX)/dt,-8,8):0;
    state.vy=dt?clamp((state.y-previousY)/dt,-8,8):0;
    trails.forEach((point,i)=>{
      const target=i?trails[i-1]:[state.x,state.y],lag=1-Math.exp(-dt*(8-i*2));
      point[0]+=(target[0]-point[0])*lag; point[1]+=(target[1]-point[1])*lag;
    });
    state.hover+=(state.hoverTarget-state.hover)*(1-Math.exp(-dt*7));
    const charging=state.down&&state.time-state.pressTime>.18;
    state.charge+=((charging?1:0)-state.charge)*(1-Math.exp(-dt*(charging?1.6:7)));
    const gather=1-Math.exp(-dt*3.6);
    state.message+=((state.secret==='message'?1:0)-state.message)*gather;
    state.myth+=((state.secret==='myth'?1:0)-state.myth)*gather;
    draw(); state.frame=requestAnimationFrame(tick);
  }
  function syncAnimation() {
    cancelAnimationFrame(state.frame); state.last=0;
    if(document.hidden || gl?.isContextLost()) { cancelContact(); return; }
    if(motion.matches) {
      state.morph=state.target; state.velocity=0; state.charge=0;
      state.message=state.secret==='message'?1:0; state.myth=state.secret==='myth'?1:0; draw();
    }
    else state.frame=requestAnimationFrame(tick);
  }
  display.addEventListener('wheel',event => {
    if(event.ctrlKey) return;
    event.preventDefault();
    taps.cancel();
    const unit=event.deltaMode===1?16:event.deltaMode===2?state.height:1;
    const delta=Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX;
    morphBy(clamp(delta*unit,-600,600)/1000);
  },{passive:false});
  display.addEventListener('pointermove',event => {
    if(event.isPrimary===false || (contact && contact.id!==event.pointerId)) return;
    updatePointer(event);
    if(!contact || contact.id!==event.pointerId) return;
    if(Math.hypot(event.clientX-contact.x,event.clientY-contact.y)>9) contact.dragged=true;
    if(contact.dragged) { taps.cancel(); morphBy((contact.lastY-event.clientY)/350); state.down=false; }
    contact.lastY=event.clientY;
  },{passive:true});
  display.addEventListener('pointerdown',event => {
    if(!event.isPrimary || event.button!==0) return;
    updatePointer(event); display.focus({preventScroll:true});
    contact={id:event.pointerId,x:event.clientX,y:event.clientY,lastY:event.clientY,dragged:false,start:event.timeStamp};
    state.down=true; state.pressTime=state.time; state.charge=0;
    display.setPointerCapture(event.pointerId); pulse(state.tx,state.ty,.90);
  });
  display.addEventListener('pointerup',event => {
    if(!contact || contact.id!==event.pointerId) return;
    if(!contact.dragged && state.charge>.20) pulse(state.tx,state.ty,1+state.charge*1.7);
    if(!contact.dragged && event.timeStamp-contact.start<500) taps.tap(event.clientX,event.clientY,event.timeStamp);
    else taps.cancel();
    contact=null; state.down=false;
    if(display.hasPointerCapture(event.pointerId)) display.releasePointerCapture(event.pointerId);
    if(event.pointerType==='touch') resetPointer();
  });
  display.addEventListener('pointercancel',cancelContact);
  display.addEventListener('dblclick',event=>event.preventDefault());
  display.addEventListener('lostpointercapture',() => { if(contact) cancelContact(); });
  display.addEventListener('pointerleave',() => { if(!contact) resetPointer(); });
  display.addEventListener('keydown',event => {
    if(['Escape','ArrowDown','ArrowRight','PageDown','ArrowUp','ArrowLeft','PageUp',' ','Home'].includes(event.key)) taps.cancel();
    if(event.key==='Escape') { taps.cancel(); reveal('orb'); }
    if(['ArrowDown','ArrowRight','PageDown','ArrowUp','ArrowLeft','PageUp',' ','Home'].includes(event.key)) event.preventDefault();
    if(['ArrowDown','ArrowRight','PageDown'].includes(event.key)) morphBy(1);
    if(['ArrowUp','ArrowLeft','PageUp'].includes(event.key)) morphBy(-1);
    if(event.key===' ' && !event.repeat) pulse(0,0,1.4);
    if(event.key==='Home') morphBy(-state.target);
  });
  display.addEventListener('webglcontextlost',event => { event.preventDefault(); cancelAnimationFrame(state.frame); cancelContact(); });
  display.addEventListener('webglcontextrestored',() => {
    try { setupWebGL(); resize(); syncAnimation(); }
    catch(error) { console.warn('Orb graphics restoration failed.',error.message); cancelAnimationFrame(state.frame); }
  });
  addEventListener('resize',resize,{passive:true}); addEventListener('blur',cancelContact);
  document.addEventListener('visibilitychange',syncAnimation); motion.addEventListener('change',syncAnimation);
  // Only the frame's own root is observed, so removing the iframe releases it.
  const themeObserver=new MutationObserver(() => {
    const next=document.documentElement.getAttribute('data-theme')==='light';
    if(next===lightTheme) return;
    lightTheme=next;
    if(!document.hidden) draw();
  });
  themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  resize(); syncAnimation();
})();
