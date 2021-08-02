//from https://github.com/cjhoward/platonic-solids

var tetrahedron =
`v 0.000000 1.000000 0.000000
v 0.942809 -0.333333 0.000000
v -0.471405 -0.333333 -0.816497
v -0.471405 -0.333333 0.816497
s off
f 1 2 3
f 1 3 4
f 1 4 2
f 2 4 3`;

var hexahedron = `v -0.577350 -0.577350 0.577350
v 0.577350 -0.577350 0.577350
v 0.577350 -0.577350 -0.577350
v -0.577350 -0.577350 -0.577350
v -0.577350 0.577350 0.577350
v 0.577350 0.577350 0.577350
v 0.577350 0.577350 -0.577350
v -0.577350 0.577350 -0.577350
s off
f 1 4 3 2
f 1 2 6 5
f 1 5 8 4
f 7 6 2 3
f 7 3 4 8
f 7 8 5 6`;

var octahedron = `v 1.000000 0.000000 0.000000
v -1.000000 0.000000 0.000000
v 0.000000 0.000000 -1.000000
v 0.000000 0.000000 1.000000
v 0.000000 1.000000 0.000000
v 0.000000 -1.000000 0.000000
s off
f 5 1 3
f 5 3 2
f 5 2 4
f 5 4 1
f 6 3 1
f 6 2 3
f 6 4 2
f 6 1 4`;


var icosahedron = `v 0.850651 0.000000 -0.525731
v -0.850651 0.000000 -0.525731
v 0.850651 0.000000 0.525731
v -0.850651 0.000000 0.525731
v 0.525731 0.850651 0.000000
v 0.525731 -0.850651 0.000000
v -0.525731 0.850651 0.000000
v -0.525731 -0.850651 0.000000
v 0.000000 0.525731 -0.850651
v 0.000000 0.525731 0.850651
v 0.000000 -0.525731 -0.850651
v 0.000000 -0.525731 0.850651
s off
f 1 9 5
f 1 6 11
f 3 5 10
f 3 12 6
f 2 7 9
f 2 11 8
f 4 10 7
f 4 8 12
f 1 11 9
f 2 9 11
f 3 10 12
f 4 12 10
f 5 3 1
f 6 1 3
f 7 2 4
f 8 4 2
f 9 7 5
f 10 5 7
f 11 6 8
f 12 8 6`;

var dodecahedron = `v 0.577350 0.577350 -0.577350
v 0.577350 -0.577350 -0.577350
v 0.577350 0.577350 0.577350
v 0.577350 -0.577350 0.577350
v -0.577350 0.577350 -0.577350
v -0.577350 -0.577350 -0.577350
v -0.577350 0.577350 0.577350
v -0.577350 -0.577350 0.577350
v 0.356822 0.000000 -0.934172
v -0.356822 0.000000 -0.934172
v 0.356822 0.000000 0.934172
v -0.356822 0.000000 0.934172
v 0.934172 0.356822 0.000000
v 0.934172 -0.356822 0.000000
v -0.934172 0.356822 0.000000
v -0.934172 -0.356822 0.000000
v 0.000000 0.934172 -0.356822
v 0.000000 0.934172 0.356822
v 0.000000 -0.934172 -0.356822
v 0.000000 -0.934172 0.356822
s off
f 1 9 5 17
f 9 10 5
f 1 13 2 9
f 13 14 2
f 1 17 3 13
f 17 18 3
f 9 2 6 10
f 2 19 6
f 13 3 4 14
f 3 11 4
f 17 5 7 18
f 5 15 7
f 10 6 15 5
f 6 16 15
f 7 12 3 18
f 12 11 3
f 4 20 2 14
f 20 19 2
f 8 16 19 20
f 16 6 19
f 8 12 15 16
f 12 7 15
f 8 20 11 12
f 20 4 11`;

export {tetrahedron, hexahedron, octahedron, icosahedron, dodecahedron}