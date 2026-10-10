(() => {
  "use strict";
  const canvas = document.getElementById("fighter-showcase");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const model = { yaw: -0.22, targetYaw: -0.22, drag: false, lastX: 0, idle: 0, flip: 0, flipTimer: 0, width: 0, height: 0, dpr: 1 };
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  function resize() {
    const rect = canvas.getBoundingClientRect();
    model.dpr = Math.min(window.devicePixelRatio || 1, 2);
    model.width = Math.max(1, rect.width);
    model.height = Math.max(1, rect.height);
    canvas.width = Math.round(model.width * model.dpr);
    canvas.height = Math.round(model.height * model.dpr);
    ctx.setTransform(model.dpr,0,0,model.dpr,0,0);
  }
  function stroke(points, color, width) {
    ctx.beginPath();
    points.forEach((p,i) => i ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1]));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  function drawPodium(cx, baseY, scale, time) {
    const spin = model.yaw;
    const rx = 132 * scale, ry = 27 * scale;
    ctx.save();
    ctx.translate(cx,baseY);
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 35 * scale;
    ctx.shadowOffsetY = 14 * scale;
    ctx.fillStyle = "#07080a";
    ctx.beginPath(); ctx.ellipse(0,0,rx*1.13,ry*1.05,0,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.fillStyle = "#30343c";
    ctx.beginPath(); ctx.moveTo(-rx,-8*scale); ctx.lineTo(-rx*0.82,31*scale); ctx.quadraticCurveTo(0,52*scale,rx*0.82,31*scale); ctx.lineTo(rx,-8*scale); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#17191e";
    ctx.beginPath(); ctx.ellipse(0,31*scale,rx*.82,ry*.88,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#747b87"; ctx.lineWidth = 1.5*scale;
    ctx.beginPath(); ctx.ellipse(0,-8*scale,rx,ry,0,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle = "#dfe3e9"; ctx.globalAlpha = .48;
    ctx.beginPath(); ctx.ellipse(0,-8*scale,rx*.84,ry*.74,0,Math.PI*1.02,Math.PI*1.94); ctx.stroke();
    ctx.globalAlpha = 1;
    const markerX = Math.cos(spin)*rx*.82;
    ctx.fillStyle = "#b9f4f7";
    ctx.shadowColor = "#8de9f3"; ctx.shadowBlur = 14*scale;
    ctx.beginPath(); ctx.ellipse(markerX,-8*scale,4*scale,2.4*scale,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  function drawFighter(cx, footY, scale, time) {
    const turn = Math.cos(model.yaw);
    const side = Math.sin(model.yaw);
    const squash = Math.max(.22, Math.abs(turn));
    const bob = Math.sin(time*2.3)*2.5*scale;
    const step = Math.sin(time*4.4)*2.2*scale;
    const showFlip = model.flip > 0;
    const progress = showFlip ? 1-model.flip : 0;
    const rotation = showFlip ? progress*Math.PI*2 : 0;
    const flipLift = showFlip ? Math.sin(progress*Math.PI)*72 : 0;
    ctx.save();
    ctx.translate(cx,footY-10*scale+bob-flipLift*scale);
    ctx.rotate(rotation);
    ctx.scale(scale*(0.82+squash*.18),scale);
    const ink = "#f1f2f4", shade = "#9ca3af";
    // grounded shadow
    ctx.save(); ctx.scale(1,.22); ctx.fillStyle="#0008"; ctx.beginPath();ctx.ellipse(0,5,25,8,0,0,Math.PI*2);ctx.fill();ctx.restore();
    // subtle back leg, then front leg
    stroke([[-2,-41],[side*3-step*.5,-22],[5-step,-2]],shade,6.5);
    stroke([[2,-41],[-7+step,-23],[-4+step,-2]],ink,7.5);
    // torso and shoulders
    stroke([[0,-79],[1+side*4,-59],[0,-41]],ink,8);
    // arm swing becomes a quick ready stance
    const armSway = Math.sin(time*2.1)*2;
    stroke([[-1,-75],[-11,-62+armSway],[-16,-51+armSway]],shade,6);
    stroke([[3,-75],[12+side*5,-64-armSway],[17,-70-armSway]],ink,7);
    // small wrapped fists
    ctx.fillStyle=ink;ctx.beginPath();ctx.arc(17,-70-armSway,4,0,Math.PI*2);ctx.fill();
    // head
    ctx.fillStyle="#111318";ctx.strokeStyle=ink;ctx.lineWidth=3.5;ctx.beginPath();ctx.arc(0,-91,11,0,Math.PI*2);ctx.fill();ctx.stroke();
    // face direction marker, only visible while turning
    ctx.fillStyle=ink;ctx.globalAlpha=.9;
    ctx.beginPath();ctx.arc(4*turn,-93,1.6,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
    // rim highlight on the side silhouette
    ctx.strokeStyle="#8de9f3";ctx.globalAlpha=.38;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.arc(0,-91,12.7,-1.5,1.4);ctx.stroke();ctx.globalAlpha=1;
    ctx.restore();
  }
  function render(now) {
    const dt = Math.min(.04, (now-(model.lastTime||now))/1000);
    model.lastTime = now;
    model.idle += dt;
    model.yaw += (model.targetYaw-model.yaw)*Math.min(1,dt*7);
    if (!model.drag) model.targetYaw += dt*.13;
    model.flipTimer += dt;
    if (model.flipTimer > 12 && model.flip <= 0) { model.flip = 1; model.flipTimer = 0; }
    if (model.flip > 0) { model.flip = Math.max(0,model.flip-dt*1.4); }
    const w=model.width,h=model.height;
    ctx.clearRect(0,0,w,h);
    const cx=w*.52;
    const baseY=Math.min(h*.78,h-80);
    const scale=clamp(Math.min(w/900,h/680),.64,1.1);
    // soft studio light behind the character
    const glow=ctx.createRadialGradient(cx,baseY-170*scale,5,cx,baseY-170*scale,300*scale);
    glow.addColorStop(0,"#6b74831b");glow.addColorStop(1,"#0c0d1000");
    ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    // ground plane guide
    ctx.strokeStyle="#dbe0eb0a";ctx.lineWidth=1;
    for(let i=0;i<7;i++){const yy=baseY+25+i*17;ctx.beginPath();ctx.moveTo(cx-260+i*16,yy);ctx.lineTo(cx+260-i*16,yy);ctx.stroke();}
    drawPodium(cx,baseY,scale,model.idle);
    drawFighter(cx,baseY-12*scale,scale,model.idle);
    requestAnimationFrame(render);
  }
  canvas.addEventListener("pointerdown",e=>{model.drag=true;model.lastX=e.clientX;canvas.classList.add("dragging");canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener("pointermove",e=>{if(!model.drag)return;const dx=e.clientX-model.lastX;model.lastX=e.clientX;model.targetYaw=clamp(model.targetYaw+dx*.012,-Math.PI*5,Math.PI*5)});
  const endDrag=()=>{model.drag=false;canvas.classList.remove("dragging")};
  canvas.addEventListener("pointerup",endDrag);canvas.addEventListener("pointercancel",endDrag);
  canvas.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")model.targetYaw-=.35;if(e.key==="ArrowRight")model.targetYaw+=.35});
  window.addEventListener("resize",resize);
  resize();
  requestAnimationFrame(render);
})();