function loadObj(str, w){

    let obj = {
        vertices: {v:[], vt:[], vn:[]},
        elements: {p:[], l:[], f:[]}
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
                let f = {v:[], vt:[], vn: []};
                for(let e of arr){
                    let el = e.split('/').filter(el=> el!='');
                    switch(el.length){
                        case 1:
                            f.v.push(+el[0]);
                        break;
                        case 2:
                            f.v.push(+el[0]);
                            f.vn.push(+el[1]);
                        break;
                        case 3:
                            f.v.push(+el[0]);
                            f.vt.push(+el[1]);
                            f.vn.push(+el[2]);
                        break;
                    }
                }
                obj.elements[c].push(f);
        }
    }

    for(let k in obj.elements){
        let e = obj.elements[k];
        let vlist = [];
        for(let l of e){
            if(l.v) vlist.push(l.v.map(n=>n-1));
        }
        if(vlist.length) e.vlist = vlist;
    }

    return obj;
} 

export{loadObj};