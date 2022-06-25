const hasMutation= (dna) => {
    let validJson = true;
    
    //Initial validations at dna
    //Checks if DNA initially is an array 
    if(typeof dna != 'object' || typeof dna[0] === 'undefined'){
        validJson = false;
        return {error : "Invalid dna type - Only arrays allowed"}
    }

    if(validJson){
        let allowedDNA = true;
        let allowedLetters = ['A', 'T', 'C', 'G'];

        //To compare subarrays lenght
        let dnaLength =  dna.length;
        let subArrayVerifier =  dna[0].length;
        
        //Transform object to array
        let dnaArray = [];
        
        for(i in dna){
            let subArray = []
            //Checks if each item of JSON is a strig
            if((typeof dna[i] != 'string')){
                allowedDNA = false;
                return {error : "Invalid JSON dna type on values types"}
            }

            for(j in dna[i]){
                //Checks if each letter is valid on dna type
                if(!allowedLetters.includes(dna[i][j])){
                    allowedDNA = false;
                    return {error : "Invalid JSON dna on allowed letters"}
                }
                subArray.push(dna[i][j]);
            }
            //Check if dna is a square matrix
            if((subArray.length != subArrayVerifier)||(subArray.length != dnaLength)){
                allowedDNA = false;
                return {error : "Invalid JSON dna on substring length that must be equal"}
            }
            dnaArray.push(subArray);
        }
        
        if(allowedDNA){
            let count = 0;
            const findPattern = (dnaArray) => {

                //Deep code method
                let matrixToTranspose = JSON.parse(JSON.stringify(dnaArray));
            
                //Function to verify if all elements of an array are equals
                const arrayDNAVerifier = (array) =>( array.every((element) => (
                    element === array[0] ? true : false
                ))
                );
            
                //Function to help find vertical patterns - Transpose matrix
                const transpose = (matrix) => {
                    for (let i = 0; i < matrix.length; i++) {
                    for (let j = 0; j < i; j++) {
                        const tmp = matrix[i][j];
                        matrix[i][j] = matrix[j][i];
                        matrix[j][i] = tmp;
                    };
                    }
                    return matrix
                }
                let matrizTransposed = transpose(matrixToTranspose);
                //Checks lines and collumns patterns with arrayDnaVerifier
                for(i in dnaArray){
                    let qttToCourse = dnaArray[i].length - 3;
                    
                    for(let j = 0; j < qttToCourse; j ++){
                        let arrayLinePivot = dnaArray[i].slice(j, j +4);
                        let arrayColumnPivot = matrizTransposed[i].slice(j, j +4);
                        
                        let arrayLineValidation = arrayDNAVerifier(arrayLinePivot, count); 
                        let arrayColumnValidation = arrayDNAVerifier(arrayColumnPivot, count);
            
                        if(arrayLineValidation){
                            count +=1;
                        };
                        if(arrayColumnValidation){
                            count +=1;
                        };               
    
                    }
                };
                
                //Checks diagonals patterns
                for (let i = 0; i < dnaArray.length -3; i++){
                    for(let j = 0; j < dnaArray[i].length -3; j++){
                        subArrayDGprimary = []
                        subArrayDGsecundary = []
            
                        for(let h = 0; h < 4 ; h++){
                            subArrayDGprimary.push(dnaArray[i+h][j+h]);
                            subArrayDGsecundary.push(dnaArray[i+h][dnaArray.length -1 -j -h]);
                        }
            
                    let arrayDGPvalidation = arrayDNAVerifier(subArrayDGprimary, count); 
                    let arrayDGSvalidation = arrayDNAVerifier(subArrayDGsecundary, count); 
            
                    if(arrayDGPvalidation){
                        count +=1;
                    };
                    if(arrayDGSvalidation){
                        count +=1;
                    };    
                    }
                }
            }
            (findPattern(dnaArray));
            if(count >= 2){
                return true
            }
            else{
                return false;
            }
        }
    }          
}

let dna =  ["CTGAGA", "CTGAGC", "TATTGT", "AGAGGG", "CCCCTA", "TCACTG"];

hasMutation(dna);