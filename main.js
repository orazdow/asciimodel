import {tetrahedron, octahedron, hexahedron, icosahedron, dodecahedron} from './model.js';
import knight from './knight.obj.js';
import {loadObj} from './loader.js';
import * as g from './render.js';
const {sin, cos, floor, abs, PI} = Math;

let obj = loadObj(knight, 1);
console.log(obj.elements.f);
let obj_v = obj.vertices.v;
let obj_i = obj.elements.f.vlist;
obj_v = g.mult_rows(obj.vertices.v, [.088,.088,.088,1]);

var tri_v = [[-0.75, 0.5, 0, 1],
            [0.75, 0.5, 0, 1],
            [0, -.5, 0, 1]];
let tri_i = [[0,1,2]];

var square_v =  [[-0.5, -0.5, 0, 1], //ul
                [0.5, -0.5, 0, 1], //ur
                [-.5, .5, 0, 1],  //ll
                [.5, .5, 0, 1]];  //lr

let square_i = [[0, 1, 3, 2]];

let cube_v =  [[-0.55,-0.55,-0.55,1],
            [0.55,-0.55,-0.55,1],
            [0.55,-0.55,0.55,1],
            [-0.55,-0.55,0.55,1],
            [-0.55,0.55,-0.55,1],
            [0.55,0.55,-0.55,1],
            [0.55,0.55,0.55,1],
            [-0.55,0.55,0.55,1]];

let cube_i = [[0,1],[1,2],[2,3],[3,0],
              [4,5],[5,6],[6,7],[7,4],
              [0,4],[1,5],[2,6],[3,7]];

let geom = obj_v;
let indices = obj_i;

var rot = g.create_rot(.04, -0.03, -0.05);
geom = g.mat_mul_4(geom, g.create_rot(0.2, -0.5, 0.7));
geom = g.mat_mul_4(geom, g.create_translate(.0, -0.6, 0.0));

let w = 100, h = 50;
let pre = document.querySelector('#disp');
pre = {el: pre, w: w*8, h: h*16};

let mouse = {x:0,y:0};
pre.el.onmousemove = (e)=>{
    mouse.x = (2.*e.clientX-pre.w)/pre.w;
    mouse.y = (2.*e.clientY-pre.h)/pre.w;
}

var scene = g.create_scene(pre.el, w, h, geom, indices, rot, null);

window.setInterval(()=>{
    scene.t_mat = g.create_translate(mouse.x, mouse.y, 0);
    g.render(scene);
}, 30);