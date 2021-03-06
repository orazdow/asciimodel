const {sin, cos, floor, abs, PI} = Math;
const idmat = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

// row-order matrix v*T(4x4)
function mat_mul_4(a, b){
	let mat = [];
	for(let i = 0; i < a.length; i++){
		mat.push([
		a[i][0]*b[0][0] + a[i][1]*b[1][0] + a[i][2]*b[2][0] + a[i][3]*b[3][0],
		a[i][0]*b[0][1] + a[i][1]*b[1][1] + a[i][2]*b[2][1] + a[i][3]*b[3][1],
		a[i][0]*b[0][2] + a[i][1]*b[1][2] + a[i][2]*b[2][2] + a[i][3]*b[3][2],
		a[i][0]*b[0][3] + a[i][1]*b[1][3] + a[i][2]*b[2][3] + a[i][3]*b[3][3]
		]);
	}
	return mat;
}

function mat_mul_4w(a, b){
	let mat = [];
	for(let i = 0; i < a.length; i++){
		let x = a[i][0]*b[0][0] + a[i][1]*b[1][0] + a[i][2]*b[2][0] + a[i][3]*b[3][0];
		let y = a[i][0]*b[0][1] + a[i][1]*b[1][1] + a[i][2]*b[2][1] + a[i][3]*b[3][1];
		let z = a[i][0]*b[0][2] + a[i][1]*b[1][2] + a[i][2]*b[2][2] + a[i][3]*b[3][2];
		let w = a[i][0]*b[0][3] + a[i][1]*b[1][3] + a[i][2]*b[2][3] + a[i][3]*b[3][3];
		mat.push([x/w, y/w, z/w, w]);
	}
	return mat;
}

function mult_rows(mat, arr){
	for(let i = 0; i < mat.length; i++){
		for(let j = 0; j < arr.length; j++){
			mat[i][j] *= arr[j];
		}
	}
    return mat;
}

function add_rows(mat, arr){
	for(let i = 0; i < mat.length; i++){
		for(let j = 0; j < arr.length; j++){
			mat[i][j] += arr[j];
		}
	}
    return mat;
}

function proc_rows(mat, f){
	for(let i = 0; i < mat.length; i++){
		f(mat[i]);
	}
}

function transpose(mat){
    let m = mat.length, n = mat[0].length;
    let t = [];
    for(let i = 0; i < n; i++)
         t.push(Array(m).fill(0)); 
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            t[i][j] = mat[j][i];
        }
    }
    return t;
}

//check point with determinant
function inline(px,py,ax,ay,bx,by,e){
	return ((px >= ax && px <= bx) || (px >= bx && px <= ax)) && 
	((py >= ay && py <= by) || (py >= by && py <= ay)) && 
	(Math.abs(((bx - ax) * (py - ay) - (px - ax) * (by - ay))) < e);
}

function create_rot(tx, ty, tz){
	let rot = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

	let zrot = [[Math.cos(tz), -Math.sin(tz), 0, 0],
				[Math.sin(tz), Math.cos(tz), 0, 0],
				[0, 0, 1, 0],
				[0,0,0,1]];
	let xrot = [[1,0,0,0],
				[0,Math.cos(tx), -Math.sin(tx), 0],
				[0, Math.sin(tx), Math.cos(tx), 0],
				[0,0,0,1]];
	let yrot = [[Math.cos(ty), 0, Math.sin(ty), 0],
				[0, 1, 0, 0],
				[-Math.sin(ty), 0, Math.cos(ty), 0],
				[0,0,0,1]];

	rot = mat_mul_4(rot, zrot);
	rot = mat_mul_4(rot, yrot);
	rot = mat_mul_4(rot, xrot);
	return rot;
}

function create_scale(x, y, z){
	return [[x,0,0,0],[0,y||x,0,0],[0,0,z||x,0],[0,0,0,1]];
}

function create_translate(x, y, z){
	return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[x, y||x, z||x, 1]];
}

function create_proj(scale, plane, perpective){
	return [[scale,0,0,0],[0,scale,0,0],[0,0,scale,-perspective],[0,0,0,plane]];
}

function create_scene(pre, x, y, vertices, elements, r_mat, t_mat){
	return arguments.length > 4 ? {
		pre: pre, x: x, y: y, vertices: vertices, elements: elements, r_mat : r_mat, t_mat: t_mat
	} : null;
}

var proj = [[1, 0, 0, 0], 
            [0, 1, 0, 0], 
            [0, 0, -1, -.5],
            [0, 0, 0, 1]];

function render(s){
	let e = 0.005;
	let str = '';
	let x = s.x, y = s.y;

	s.vertices = s.r_mat ? mat_mul_4(s.vertices, s.r_mat) : s.vertices;	
	let mat = mat_mul_4(s.vertices, s.t_mat || idmat);	
	// mat = mat_mul_4w(mat, proj);

	proc_rows(mat, (r)=>{
		r[0] /= 1.2-r[2]*.38;
		r[1] /= 1.2-r[2]*.38;
	});

	for(let iy = 0; iy < y; iy++){
		for(let ix = 0; ix < x; ix++){
			let draw = 0;	
			let _y = (2*iy-y)/x;
			let _x = (2*ix-x)/x;

            for(let el of s.elements){
                let n = el.length;
                if(n == 2){
                    let a = el[0], b = el[1];
                    draw = draw | inline(_x, _y, mat[a][0], mat[a][1]*.5, mat[b][0], mat[b][1]*.5, e);
                }else if(n > 2){
                    for(let i = 0; i < n; i++){
                        let a = el[i], b = el[(i+1)%n];
                        draw = draw | inline(_x, _y, mat[a][0], mat[a][1]*.5, mat[b][0], mat[b][1]*.5, e);
                    }
                }
            }
			if(draw){ str += 'g'; }else{ str += '_' };
		}   str += '\n';	
	}	
	s.pre.innerHTML = str;
}

export{mat_mul_4, mult_rows, add_rows, create_rot, create_scene, create_scale, create_translate, create_proj, render};