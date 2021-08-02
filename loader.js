function loadObj(str, w){

    let obj = {
        vertices: {v:[], vt:[], vn:[]},
        elements: {
            p:{v:[], vt:[], vn:[]},
            l:{v:[], vt:[], vn:[]}, 
            f:{v:[], vt:[], vn:[]}
        }
    };

    let a = str.split('\n');
    for(let s of a){

        let arr = s.split(' ').filter(el=> el!='');
        let c = arr.shift();
        
        switch(c){
            case 'v':
                if(w && arr.length == 3) arr.push(1);
                obj.vertices.v.push(arr.map(f=>+f));
            break;

            case 'vt':
               obj.vertices.vt.push(arr.map(f=>+f));
            break;

            case 'vn':
                obj.vertices.vn.push(arr.map(f=>+f));
            break;
            
            case 'f':
            case 'l':
            case 'p':
                let f = obj.elements[c];
                let v = [], vt = [], vn = [];
                for(let e of arr){
                    let el = e.split('/').filter(el=> el!='');
                    switch(el.length){
                        case 1:
                            v.push(+el[0]-1);
                        break;
                        case 2:
                            v.push(+el[0]-1);
                            vn.push(+el[1]-1);
                        break;
                        case 3:
                            v.push(+el[0]-1);
                            vt.push(+el[1]-1);
                            vn.push(+el[2]-1);
                        break;
                    }
                }
                if(v.length) f.v.push(v);
                if(vt.length) f.vt.push(vt);
                if(vn.length) f.vn.push(vn);
        }
    }
    
    return obj;
} 

export{loadObj};