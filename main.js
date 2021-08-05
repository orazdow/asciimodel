import {tetrahedron, octahedron, hexahedron, icosahedron, dodecahedron, knight, bunny, salamander} from './model.js';
import {loadObj, edgeList} from './loader.js';
import * as g from './render.js';
const {sin, cos, floor, abs, PI} = Math;

let obj = loadObj(salamander, .4);
let obj_v = obj.vertices.v;
let obj_i = obj.elements.f.v;
obj_i = edgeList(obj_i);

let geom = obj_v;
let indices = obj_i;

let w = 100, h = 50;
let pw = w*8, ph = h*16;
let pre = document.querySelector('#disp');
let mouse = {x:0,y:0};

pre.onmousemove = (e)=>{
    mouse.x = (2.*e.clientX-pw)/pw;
    mouse.y = (2.*e.clientY-ph)/pw;
}
let run = true;
document.body.onkeydown = (e)=>{
    if(e.key === " ") run = !run;
}

let rot = g.create_rot(.04, -0.03, -0.05);
// geom = g.mat_mul_4(geom, g.create_rot(0.2, -0.5, 0.7));
// geom = g.mat_mul_4(geom, g.create_translate(.0, -0.6, 0.0));

let translate = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[mouse.x,mouse.y,0,1]];

let scene = g.create_scene(pre, w, h, geom, indices, rot, translate);

window.setInterval(()=>{
    if(run){
        translate[3][0] = mouse.x*2;
        translate[3][2] = mouse.y*2;  
        g.render(scene);
    }
}, 30);
