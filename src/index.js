module.exports = function solveSudoku(matrix) {
        
    function checkSolve(mat){
        for(let i = 0; i < 9; i++)
            for(let j = 0; j < 9; j++)
                if(mat[i][j] == 0) return false;
        return true;
    }    

    function checkCandidates(mat){
        for (let i = 0; i < 9; i++) 
            for (let j = 0; j < 9; j++) 
                if(getCandidates([i,j],mat) === []) return false;
        return true;
    }
    
    function checkCol(col, num,mat){
        for(let i = 0; i < 9; i++)
            if(mat[i][col] != 0 && mat[i][col] == num)return false;
        return true;    
    }
    
    function checkRow(row, num,mat){
        for(let i = 0; i < 9; i++)
            if(mat[row][i] != 0 && mat[row][i] == num)return false;
        return true;    
    }    
        
    function checkBlock(x, y,  num,mat){
        if(x < 3)x = 0;else if(x > 5) x = 6;else x = 3;
        if(y < 3)y = 0;else if(y > 5) y = 6;else y = 3;
        for(let i = x; i < x+3; i++)
            for(let j = y; j < y+3; j++)
                if(mat[i][j] != 0 && mat[i][j] == num)return false;
        return true;
    }
    
    function checkCell(x, y, num, mat){
        return checkCol(y,num,mat) && checkRow(x,num,mat) && checkBlock(x, y, num, mat) && mat[x][y] == 0;
    }
    
    function checkSingles(x, y,mat){
        if(mat[x][y] != 0) return 0;
        let c = 0;
        for(let num = 1; num < 10; num++){
            if(checkCell(x, y, num,mat)){
                if(c == 0)c = num;
                else {
                    c = -1;
                    break;
                }
            }
        }
        if (c == -1) c = 0;
        return c;
    }
    
    function getCountNumInBlock(x,y,num,mat){
        let k = 0;
        let cell = {};
        for(let i = x; i < x+3; i++)
            for(let j = y; j < y+3; j++){
                if(checkCell(i, j, num,mat)){
                    cell.x = i;
                    cell.y = j;
                    if(++k>1) return false;
                }
            }
        if(k == 1)return cell; else false;
    }

    function getCountNumInRow(x,num,mat){
        let k = 0;
        let row = {};
        for(let j = 0; j < 9; j++)
            if(checkCell(x, j, num,mat)){
                    row.x = x;
                    row.y = j;
                    if(++k>1) return false;
                }
        if(k == 1)return row; else false;
    }

    function getCountNumInCol(y,num,mat){
        let k = 0;
        let row = {};
        for(let i = 0; i < 9; i++)
            if(checkCell(i, y, num,mat)){
                    row.x = i;
                    row.y = y;
                    if(++k>1) return false;
                }
        if(k == 1)return row; else false;
    }
    
    function putSingles(mat){
        let check = 1;
        let change = 0;
        while(check){
            check = 0;
            for(let x = 0; x < 9; x++){
                for(let y = 0; y < 9; y++){
                    if(checkSingles(x,y,mat)){
                        mat[x][y] = checkSingles(x,y,mat);
                        check++;
                        change++;
                    }
                }
            }
        }
        return change;
    }
    
    function putHideSinglesInBlock(mat){
        let check = {};
        let change = 0;
        for(let x = 0; x < 9; x+=3)
            for(let y = 0; y < 9; y+=3)
                for(let num = 1; num < 10; num++)
                    if(check = getCountNumInBlock(x,y,num,mat)){
                        mat[check.x][check.y] = num;
                        change++;
                    }
        return change;
    }

    function putHideSinglesInRow(mat){
        let check = {};
        let change = 0;
        for(let x = 0; x < 9; x++)
            for(let num = 1; num < 10; num++)
                if(check = getCountNumInRow(x,num,mat)){
                    change++;
                    mat[check.x][check.y] = num;
                }
        return change;
    }

    function putHideSinglesInCol(mat){
        let check = {};
        let change = 0;
        for(let y = 0; y < 9; y++)
            for(let num = 1; num < 10; num++)
                if(check = getCountNumInCol(y,num,mat)){
                    mat[check.x][check.y] = num;
                    change++;
                }
        return change;  
    }

    function putHideSingles(mat){
        let change = 0;
        change = putHideSinglesInBlock(mat)+putHideSinglesInRow(mat)+putHideSinglesInCol(mat);
        return change;
    }

    function getCandidates(cell,mat){
        let candidates = [];
        let k = 0;
        for(let num = 1; num < 10; num++)
            if(checkCell(cell[0],cell[1],num,mat))candidates[k++] = num;
        return candidates;
    }

    function nextCell(x,y,mat){
        let i = x;
        let j = y;
        if(i > 8){
            i = 0;
            j++;
        } else if(j > 8) return false;
        while (mat[i][j] != 0){
            if(i<8)i++;
            else {
                if(j<9)
                i = 0;
                j++;
            }
            if (j>=9)return false;
        }
        return [i,j];
    }

    function cloneMatrix(mat){
        let new_matrix = [[],[],[],[],[],[],[],[],[]];
        for (let i = 0; i < 9; i++) 
            for (let j = 0; j < 9; j++) 
                new_matrix[i][j] = mat[i][j];
        return new_matrix;
    }

    function solveSudokuS(mat){
        let change = 0;
        change = putSingles(mat)+putHideSingles(mat)
        return change;
    }

    function inRotation(x,y,matr){
        let mat = cloneMatrix(matr);
        let cell = nextCell(x,y,mat);
        let candidates = getCandidates(cell,mat);
        for (let i = 0; i < candidates.length; i++) {
            mat = cloneMatrix(matr);
            mat[cell[0]][cell[1]] = candidates[i];
            while(!checkSolve(mat)){
                if(!solveSudokuS(mat))break;
            }
            if(checkSolve(mat)) return mat;
            let deploy;
            if(checkCandidates(mat)) {
                deploy = inRotation(cell[0],cell[1],mat);
                if(deploy === false) continue;
                return deploy;
            } else continue;
            
        }
        return false;
    }

    while(!checkSolve(matrix)){
        if(!solveSudokuS(matrix))break;
    }
    if(!checkSolve(matrix))
    matrix = inRotation(0,0,cloneMatrix(matrix)); 
    return matrix;
}