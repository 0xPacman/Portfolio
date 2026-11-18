(() => {
  'use strict';
  // Canvas masks only supply destinations. The visible artwork is made of orb particles.
  function maskPoints(paint,height=960) {
    const canvas=document.createElement('canvas'); canvas.width=1280; canvas.height=height;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    if(!ctx) throw new Error('A 2D canvas is needed to shape the hidden scenes.');
    ctx.fillStyle='#fff'; ctx.strokeStyle='#fff'; paint(ctx);
    const pixels=ctx.getImageData(0,0,1280,height).data,points=[];
    for(let y=0;y<height;y+=2) for(let x=0;x<1280;x+=2) {
      if(pixels[(y*1280+x)*4+3]>100) points.push([(x-640)/530,(height/2-y)/530]);
    }
    if(!points.length) throw new Error('The hidden scene mask is empty.');
    return points;
  }
  function trackedText(ctx,text,y,font,spacing) {
    ctx.font=font;
    const width=[...text].reduce((sum,char)=>sum+ctx.measureText(char).width,0)+(text.length-1)*spacing;
    let x=(1280-width)/2;
    for(const char of text) { ctx.fillText(char,x,y); x+=ctx.measureText(char).width+spacing; }
  }
  function makeTargets(count,random) {
    const words=maskPoints(ctx=>{
      trackedText(ctx,'THE WORLD',457,'bold 124px "Courier New", monospace',5);
      trackedText(ctx,'IS ABSURD',607,'bold 148px "Courier New", monospace',3);
    });
    const figure=maskPoints(ctx=>{
      ctx.setTransform(530,0,0,-530,640,640);
      function contour(commands) {
        ctx.beginPath();
        for(const [op,...args] of commands) ctx[op](...args);
        ctx.closePath(); ctx.fill();
      }
      // Original curved contours: profile, shoulders, hips, bent knee, calf and bare feet.
      contour([
        ['moveTo',-.715,-.51],['bezierCurveTo',-.79,-.57,-.80,-.69,-.855,-.77],
        ['bezierCurveTo',-.88,-.82,-.94,-.93,-.978,-1.006],
        ['bezierCurveTo',-1.005,-1.04,-1.002,-1.067,-.978,-1.073],
        ['lineTo',-.833,-.984],['bezierCurveTo',-.816,-.974,-.829,-.954,-.858,-.963],
        ['lineTo',-.918,-.982],['bezierCurveTo',-.885,-.90,-.825,-.859,-.80,-.811],
        ['bezierCurveTo',-.75,-.737,-.697,-.674,-.654,-.594],
        ['lineTo',-.65,-.53]
      ]);
      contour([
        ['moveTo',-.695,-.53],['bezierCurveTo',-.626,-.50,-.47,-.49,-.38,-.526],
        ['bezierCurveTo',-.321,-.547,-.345,-.589,-.367,-.624],
        ['lineTo',-.401,-.694],['bezierCurveTo',-.38,-.699,-.326,-.656,-.294,-.654],
        ['bezierCurveTo',-.273,-.653,-.269,-.674,-.294,-.685],
        ['lineTo',-.448,-.774],['bezierCurveTo',-.469,-.771,-.463,-.733,-.454,-.712],
        ['lineTo',-.441,-.609],['bezierCurveTo',-.536,-.627,-.624,-.623,-.691,-.615]
      ]);
      contour([
        ['moveTo',-.738,-.577],['bezierCurveTo',-.747,-.51,-.688,-.453,-.653,-.392],
        ['bezierCurveTo',-.624,-.337,-.632,-.273,-.577,-.246],
        ['bezierCurveTo',-.538,-.223,-.498,-.242,-.477,-.273],
        ['bezierCurveTo',-.454,-.309,-.495,-.341,-.523,-.378],
        ['bezierCurveTo',-.554,-.424,-.567,-.482,-.60,-.533],
        ['bezierCurveTo',-.628,-.592,-.689,-.634,-.738,-.577]
      ]);
      // Far arm reaches upward; the near arm braces lower on the boulder.
      contour([
        ['moveTo',-.55,-.267],['bezierCurveTo',-.49,-.249,-.383,-.203,-.347,-.172],
        ['lineTo',-.234,.073],['bezierCurveTo',-.235,.103,-.225,.122,-.21,.127],
        ['bezierCurveTo',-.194,.131,-.197,.1,-.204,.076],
        ['lineTo',-.292,-.207],['bezierCurveTo',-.323,-.254,-.439,-.326,-.511,-.333]
      ]);
      contour([
        ['moveTo',-.495,-.275],['bezierCurveTo',-.457,-.279,-.368,-.309,-.332,-.276],
        ['lineTo',-.178,-.019],['lineTo',-.153,.015],
        ['bezierCurveTo',-.142,.031,-.138,.056,-.15,.061],
        ['bezierCurveTo',-.164,.064,-.177,.042,-.187,.026],
        ['lineTo',-.367,-.226],['bezierCurveTo',-.408,-.232,-.482,-.216,-.513,-.235]
      ]);
      contour([
        ['moveTo',-.535,-.258],['lineTo',-.506,-.218],
        ['bezierCurveTo',-.557,-.204,-.557,-.123,-.519,-.098],
        ['bezierCurveTo',-.492,-.077,-.442,-.085,-.431,-.115],
        ['lineTo',-.43,-.155],['lineTo',-.413,-.177],['lineTo',-.433,-.186],
        ['bezierCurveTo',-.426,-.212,-.444,-.221,-.465,-.216],
        ['lineTo',-.473,-.257]
      ]);
    },1280);
    const message=new Float32Array(count*4),myth=new Float32Array(count*4),mythStyle=new Float32Array(count*2);
    const rockCenter=[.30,.42],rockRadius=.60,slope=.62,ground=-.47;
    const outline=[1,.98,1.025,.97,1.02,.99,.94,1.01,1.025,.97,.98,1.035,.965,1.01,.975,1.02,1.015,.99];
    const cracks=[
      [[-.64,.77],[-.58,.52],[-.69,.29],[-.59,.05],[-.63,-.13]],
      [[-.03,.98],[-.13,.70],[.04,.47],[-.04,.28]],
      [[.85,.48],[.61,.36],[.54,.13],[.67,-.08]],
      [[-.82,-.37],[-.55,-.30],[-.35,-.47],[-.18,-.50]]
    ];
    function crackDistance(x,y) {
      let nearest=10;
      for(const path of cracks) for(let i=1;i<path.length;i++) {
        const [ax,ay]=path[i-1],[bx,by]=path[i],dx=bx-ax,dy=by-ay;
        const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));
        nearest=Math.min(nearest,Math.hypot(x-ax-t*dx,y-ay-t*dy));
      }
      return nearest;
    }
    for(let i=0;i<count;i++) {
      const f=(i+.5)/count;
      if(f<.68) {
        const p=words[Math.floor(random()*words.length)];
        message.set([p[0]+(random()-.5)*.003,p[1]+(random()-.5)*.003,(random()-.5)*.025,0],i*4);
      } else {
        const theta=random()*Math.PI*2,r=1.08+(random()-.5)*.045;
        message.set([Math.cos(theta)*r,Math.sin(theta)*r,(random()-.5)*.1,1],i*4);
      }
      if(f<.58) {
        // Visible stone face, with an angular contour and engraved fracture lines.
        const theta=random()*Math.PI*2,edge=random()<.055;
        const r=edge?.991+random()*.009:Math.sqrt(random()),nx=Math.cos(theta)*r,ny=Math.sin(theta)*r;
        const segment=theta/(Math.PI*2)*outline.length,index=Math.floor(segment),mix=segment-index;
        const contour=outline[index]*(1-mix)+outline[(index+1)%outline.length]*mix;
        const nz=Math.sqrt(Math.max(0,1-r*r));
        const facet=.94+.06*Math.sin(nx*14+ny*9)+.025*Math.sin(ny*29-nx*11);
        const diffuse=Math.max(0,-nx*.56+ny*.66+nz*.49);
        const crack=crackDistance(nx,ny),etch=crack<.009?.12:crack<.02?.62:1;
        const light=edge?.80:(.09+.69*Math.pow(diffuse,1.7))*facet*etch;
        myth.set([rockCenter[0]+nx*rockRadius*contour,rockCenter[1]+ny*rockRadius*contour,nz*rockRadius,0],i*4);
        mythStyle.set([light,.29],i*2);
      } else if(f<.76) {
        const p=figure[Math.floor(random()*figure.length)];
        myth.set([p[0]+(random()-.5)*.003,p[1]+(random()-.5)*.003,(random()-.5)*.045,1],i*4);
        mythStyle.set([.74+random()*.15,.94],i*2);
      } else if(f<.96) {
        // Broken strata, rather than a uniform band: the slope feels cut from rock.
        const lane=i%73,stroke=random()>.25;
        let x,depth;
        if(stroke) {
          const start=-1.30+(Math.sin(lane*19.19)*.5+.5)*2.38;
          x=start+random()*(.06+.27*(.5+.5*Math.sin(lane*3.3)));
          depth=.012+.17*(.5+.5*Math.sin(lane*7.7))+(random()-.5)*.005;
        } else { x=(random()*2-1)*1.25; depth=random()*.009; }
        const edgeFade=Math.min(1,Math.max(0,(1.36-Math.abs(x))*7));
        myth.set([x,slope*x+ground-depth,-.10,2],i*4);
        mythStyle.set([(stroke?.12+.18*random():.60)*edgeFade,.27],i*2);
      } else {
        const x=(random()*2-1)*1.20,depth=.03+Math.pow(random(),.5)*.25;
        myth.set([x,slope*x+ground-depth,-.16,3],i*4);
        mythStyle.set([.03+random()*.10,.34],i*2);
      }
    }
    return {message,myth,mythStyle,rockCenter,rockRadius,slope};
  }
  // Wait briefly after click two so a triple-click never flashes the text scene.
  function tapRecognizer(onDouble,onTriple,schedule=setTimeout,unschedule=clearTimeout) {
    let count=0,last=-Infinity,x=0,y=0,timer=null;
    function cancel() { if(timer!==null) unschedule(timer); timer=null; count=0; }
    function tap(px,py,now) {
      if(now-last>380 || Math.hypot(px-x,py-y)>36) cancel();
      if(timer!==null) unschedule(timer);
      last=now; x=px; y=py; count++;
      if(count===3) { cancel(); onTriple(); return; }
      timer=schedule(()=>{const completed=count; cancel(); if(completed===2) onDouble();},380);
    }
    return {tap,cancel};
  }
  window.OrbSecrets={makeTargets,tapRecognizer};
})();
