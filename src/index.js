//module.exports = 
function solveSudoku(matrix) {
    
    function checkSolve(){
        for(let i = 0; i < 9; i++)
            for(let j = 0; j < 9; j++)
                if(matrix[i][j] == 0) return false;
        return true;
    }    
    
    function checkCol(col, num){
        for(let i = 0; i < 9; i++)
            if(matrix[i][col] != 0 && matrix[i][col] == num)return false;
        return true;    
    }
    
    function checkRow(row, num){
        for(let i = 0; i < 9; i++)
            if(matrix[row][i] != 0 && matrix[row][i] == num)return false;
        return true;    
    }    
        
    function checkBlock(x, y,  num){
        if(x < 3)x = 0;else if(x > 5) x = 6;else x = 3;
        if(y < 3)y = 0;else if(y > 5) y = 6;else y = 3;
        for(let i = x; i < x+3; i++)
            for(let j = y; j < y+3; j++)
                if(matrix[i][j] != 0 && matrix[i][j] == num)return false;
        return true;
    }
    
    function checkCell(x, y, num){
        return checkCol(y,num) && checkRow(x,num) && checkBlock(x, y, num) && matrix[x][y] == 0;
    }
    
    function checkSingles(x, y){
        if(matrix[x][y] != 0) return 0;
        let c = 0;
        for(let num = 1; num < 10; num++){
            if(checkCell(x, y, num)){
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
    
    function getCountNumInBlock(x,y,num){
        let k = 0;
        let cell = {};
        for(let i = x; i < x+3; i++)
            for(let j = y; j < y+3; j++){
                if(checkCell(i, j, num)){
                    cell.x = i;
                    cell.y = j;
                    if(++k>1) return false;
                }
            }
        if(k == 1)return cell; else false;
    }
    
    function putSingles(){
        let check = 1;
        while(check){
            check = 0;
            for(let x = 0; x < 9; x++){
                for(let y = 0; y < 9; y++){
                    if(checkSingles(x,y)){
                        matrix[x][y] = checkSingles(x,y);
                        check++;
                    }
                }
            }
        }
    }
    
    function putHideSingles(){
        let check = {};
        for(let x = 0; x < 9; x+=3)
            for(let y = 0; y < 9; y+=3)
                for(let num = 1; num < 10; num++)
                    if(check = getCountNumInBlock(x,y,num)){
                        matrix[check.x][check.y] = num;
                    }
    }

   // function setCondidats(){
//
   //     for(let i = 0; i < 9; i++)
  //          for(let j = 0; j < 9; j++)
  //              if(matrix[i][j] == 0){
  //                  for(let num = 1; num < 10; num++)
  //                      if(checkCell(i,j,num)) 
  //              }
  //  }
    
    function solveSudoku(){
        putSingles();
        putHideSingles();
    }
    var stop=0;
    while(!checkSolve()){
        if(stop++>10)break;
        solveSudoku();
    }
    return matrix;
}

matrix = [
    [0, 5, 0, 0, 7, 0, 0, 0, 1],
    [8, 7, 6, 0, 2, 1, 9, 0, 3],
    [0, 0, 0, 0, 3, 5, 0, 0, 0],
    [0, 0, 0, 0, 4, 3, 6, 1, 0],
    [0, 4, 0, 0, 0, 9, 0, 0, 2],
    [0, 1, 2, 0, 5, 0, 0, 0, 4],
    [0, 8, 9, 0, 6, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [1, 6, 7, 0, 0, 2, 5, 4, 0]
];

console.log(solveSudoku(matrix)); 