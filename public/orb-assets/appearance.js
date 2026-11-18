(() => {
  'use strict';
  const vertex = `
    precision highp float;
    attribute vec3 aPosition;
    attribute float aSeed,aShell;
    attribute vec4 aMessage,aMyth;
    attribute vec2 aMythStyle;
    uniform float uTime,uMorph,uMomentum,uCharge,uHover;
    uniform float uMessage,uMyth,uStoryTime,uSlope;
    uniform mediump float uGlowPass;
    uniform float uAspect,uScale,uPixelRatio,uPointSize,uTurbulence;
    uniform vec3 uStone;
    uniform vec2 uPointer,uPointerVelocity;
    uniform vec4 uPulses[4];
    uniform vec2 uTrail[3];
    varying float vAlpha,vRadiance,vHeat,vSecret,vWarmth;
    const float PI=3.14159265359;
    const float TAU=6.28318530718;
    mat3 turnY(float a) { float c=cos(a),s=sin(a); return mat3(c,0.,-s,0.,1.,0.,s,0.,c); }
    mat3 turnX(float a) { float c=cos(a),s=sin(a); return mat3(1.,0.,0.,0.,c,s,0.,-s,c); }
    mat3 turnZ(float a) { float c=cos(a),s=sin(a); return mat3(c,s,0.,-s,c,0.,0.,0.,1.); }

    vec3 sculpture(float form,vec3 n,float t) {
      float phi=atan(n.z,n.x),v=n.y;
      vec3 p;
      if(form<.5) {
        // Thirty-six strands lace a moving spherical envelope.
        float band=floor((v+1.)*18.);
        float latitude=-1.+(band+.48+.14*(fract((v+1.)*18.)-.5))/18.;
        latitude=clamp(latitude+.10*sin(phi*3.+band*.18+t*.22)*(1.-latitude*latitude),-.999,.999);
        float r=sqrt(1.-latitude*latitude);
        float twist=phi+.14*sin(latitude*5.+t*.15);
        p=vec3(cos(twist)*r,latitude,sin(twist)*r);
        float folds=sin(phi*4.+latitude*7.-t*.32)*.045;
        p*=.91+folds*uTurbulence+.025*sin(t*.52);
        if(aSeed>.72) p=turnZ(1.57)*turnY(.20)*p;
        p=turnZ(-.28)*turnX(.33)*turnY(t*.055)*p;
        if(aShell>.5) {
          p=turnY(-t*.12)*n*(.30+.04*sin(phi*3.+v*6.+t*.5));
        }
      } else if(form<1.5) {
        // An open, half-twisted band. Filament spacing gives it the texture of silk.
        float u=phi+t*.065;
        float ribbon=floor((v+1.)*24.)/24.-1.;
        ribbon+=(fract((v+1.)*24.)-.5)*.022;
        float radius=.76+.29*ribbon*cos(u*.5);
        p=vec3(radius*cos(u),radius*sin(u),.44*ribbon*sin(u*.5));
        p=turnZ(-.35)*turnX(.72+sin(t*.13)*.12)*p;
        if(aShell>.5) p=turnY(t*.08)*n*.23;
      } else if(form<2.5) {
        // Three spiral streams pour out of a quiet, suspended nucleus.
        float radius=.10+sqrt((v+1.)*.5)*.94;
        float arm=floor(aSeed*3.);
        float u=arm*TAU/3.+radius*7.2-t*.14+sin(phi)*.19;
        p=vec3(cos(u)*radius,sin(u)*radius,sin(phi*2.+radius*8.)*.075);
        p=turnZ(.23)*turnX(.66)*p;
        if(aShell>.5) p=n*(.17+.035*sin(phi*3.+t*.5));
      } else {
        // A trefoil, made of narrow tubes with a slightly breathing cross-section.
        float u=phi+t*.05,w=v*PI;
        vec3 center=vec3((.63+.22*cos(3.*u))*cos(2.*u),(.63+.22*cos(3.*u))*sin(2.*u),.28*sin(3.*u));
        vec3 radial=vec3(cos(2.*u),sin(2.*u),0.);
        p=center+radial*cos(w)*.095+vec3(0.,0.,sin(w)*.095);
        p=turnY(.35+sin(t*.1)*.2)*turnX(.43)*p;
        if(aShell>.5) p*=.58;
      }
      if(aSeed>.965) {
        // A few escaping particles trace the space around the object.
        p=turnY(t*.022)*turnZ(.4)*n*(1.12+fract(aSeed*137.)*.40);
      }
      return p;
    }
    void main() {
      float t=uTime,secret=clamp(uMessage+uMyth,0.,1.);
      vec3 n=normalize(aPosition);
      float section=floor(uMorph),blend=fract(uMorph);
      blend=blend*blend*(3.-2.*blend);
      vec3 p=mix(sculpture(section,n,t),sculpture(mod(section+1.,4.),n,t),blend);
      p=turnY(p.y*uMomentum*.09)*p;
      p*=1.-uCharge*.22;
      p=turnX(-uPointer.y*.024*uHover)*turnY(uPointer.x*.025*uHover)*p;
      float dust=step(.965,aSeed);
      float energy=uCharge*.42;
      if(secret<.999) {
        vec2 projected=p.xy*4.8/(4.8-p.z),toward=uPointer-projected;
        float magnet=exp(-dot(toward,toward)/.11)*uHover;
        p.xy+=(toward*.37+vec2(-toward.y,toward.x)*.58)*magnet;
        p.z+=magnet*.15;
        energy+=magnet*.62;
        for(int i=0;i<3;i++) {
          vec2 delta=uTrail[i]-projected;
          float wake=exp(-dot(delta,delta)/(.07+float(i)*.025))*uHover/(float(i)+2.);
          p.xy+=vec2(-delta.y,delta.x)*wake*.23;
          p.xy+=uPointerVelocity*wake*.014;
          energy+=wake*.25;
        }
        for(int i=0;i<4;i++) {
          vec4 pulse=uPulses[i];
          if(pulse.w>.001 && pulse.z<4.) {
            float age=pulse.z,distanceFromClick=length(projected-pulse.xy);
            float front=distanceFromClick-age*1.55;
            float envelope=exp(-front*front*33.-age*1.25)*pulse.w;
            float wave=sin(front*18.)*envelope;
            vec2 outward=(projected-pulse.xy)/max(distanceFromClick,.05);
            p.xy+=outward*wave*.20; p.z+=wave*.20;
            p+=normalize(p+vec3(.0001))*exp(-age*3.)*pulse.w*.09;
            energy+=envelope*.90;
          }
        }
      }
      p*=min(1.,mix(1.25,1.6,dust)/max(length(p),.001));
      float sceneInk=0.,sceneWarmth=0.;
      if(secret>.0001) {
        vec3 inscription=aMessage.xyz;
        if(aMessage.w>.5) {
          inscription=turnY(sin(t*.14)*.14)*inscription;
          inscription.xy*=1.+.009*sin(t*.7+aSeed*6.);
        }
        vec3 story=aMyth.xyz;
        if(uMyth>.0001) {
          float cycle=mod(uStoryTime,16.)/16.;
          float ascent=cycle<.76?smoothstep(0.,.76,cycle):1.-smoothstep(.76,1.,cycle);
          float travel=(ascent-.4)*.14;
          if(aMyth.w<.5) {
            vec3 local=story-vec3(uStone.xy,0.);
            float roll=-travel/uStone.z,c=cos(roll),s=sin(roll);
            local.xy=mat2(c,s,-s,c)*local.xy;
            story=vec3(uStone.xy,0.)+local;
            story.xy+=vec2(travel,travel*uSlope);
          } else if(aMyth.w<1.5) {
            story.xy+=vec2(travel,travel*uSlope);
            float effort=sin(uStoryTime*3.2)*.006*smoothstep(-.5,.25,aMyth.y);
            story.xy+=vec2(effort,effort*uSlope);
          } else if(aMyth.w>2.5) story.xy*=1.+sin(uStoryTime*.3+aSeed*9.)*.012;
        }
        p=p*(1.-secret)+inscription*uMessage+story*uMyth;
        float gathering=sin(secret*PI);
        p+=vec3(-n.y,n.x,n.z*.3)*gathering*.18;
        sceneInk=(aMessage.w<.5?.72:.13)*uMessage+aMythStyle.x*uMyth;
        // The lower line takes the same amber as an active tmux window.
        sceneWarmth=uMessage*(aMessage.w>.5?.75:(aMessage.y<0.?.97:.12))+uMyth*aMythStyle.y;
      }
      float perspective=mix(4.8/(4.8-p.z),1.,secret);
      vec2 xy=p.xy*perspective*uScale; xy.x/=uAspect;
      gl_Position=vec4(xy,0.,1.);
      float front=smoothstep(-.9,.9,p.z);
      float rim=pow(1.-abs(n.z),2.);
      float filament=.5+.5*sin(n.y*28.+atan(n.z,n.x)*4.+t*.24);
      float core=aShell*(1.-dust);
      float alpha=(.30+front*.36+rim*.15+filament*.12)*mix(1.,.90,core);
      alpha*=mix(1.,.13,dust);
      vAlpha=alpha*(1.-secret)+sceneInk;
      vRadiance=mix(.78+front*.22,.97,secret);
      vHeat=min(energy,1.)*(1.-secret);
      float amber=smoothstep(-.65,.7,n.x*.65+n.y*.4);
      float patina=.18+.65*amber+.12*filament;
      vWarmth=mix(patina,.16,core)*(1.-secret)+sceneWarmth;
      vSecret=secret;
      float point=uPixelRatio*uPointSize*perspective*mix(.85,1.13,aSeed);
      point*=mix(1.,.66,dust*(1.-secret));
      point*=mix(1.,1.18,secret);
      gl_PointSize=max(1.,point*(1.+vHeat*.30)*mix(1.,3.8,uGlowPass));
    }
  `;
  const fragment = `
    precision mediump float;
    uniform vec3 uInk,uAmber;
    uniform float uGlowPass,uLight;
    varying float vAlpha,vRadiance,vHeat,vSecret,vWarmth;
    void main() {
      float r=length(gl_PointCoord-.5);
      float coverage=1.-smoothstep(.22,.50,r);
      vec3 color=mix(uInk,uAmber,mix(vWarmth,1.,vHeat*.85));
      float opacity=vAlpha*coverage;
      if(uGlowPass>.5) opacity=vAlpha*exp(-r*r*19.)*.075*(1.-vSecret*.92);
      if(uLight>.5) opacity=min(1.,opacity*1.08);
      else color*=min(1.,vRadiance+vHeat*.4);
      gl_FragColor=vec4(color,opacity);
    }
  `;
  window.OrbAppearance={vertex,fragment};
})();
