function buatMatriks() {
    let table = document.getElementById("matrix");
    for (let i = 0; i < 4; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 4; j++) {
            let cell = row.insertCell();
            cell.innerHTML = `<input type='number' id='m${i}${j}' value='0'>`;
        }
    }
}

function getMatriks() {
    let matriks = [];
    for (let i = 0; i < 4; i++) {
        matriks[i] = [];
        for (let j = 0; j < 4; j++) {
            matriks[i][j] = parseFloat(document.getElementById(`m${i}${j}`).value) || 0;
        }
    }
    return matriks;
}

function determinan3x3(m) {
    let det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    let explanation = `det = ${m[0][0]}(${m[1][1]}*${m[2][2]} - ${m[1][2]}*${m[2][1]})`
                    + ` - ${m[0][1]}(${m[1][0]}*${m[2][2]} - ${m[1][2]}*${m[2][0]})`
                    + ` + ${m[0][2]}(${m[1][0]}*${m[2][1]} - ${m[1][1]}*${m[2][0]})`
                    + ` = ${det}`;
    return { det, explanation };
}

function minor(matriks, row, col) {
    let sub = [];
    for (let i = 0; i < 4; i++) {
        if (i !== row) {
            let newRow = [];
            for (let j = 0; j < 4; j++) {
                if (j !== col) {
                    newRow.push(matriks[i][j]);
                }
            }
            sub.push(newRow);
        }
    }
    return sub;
}

function hitungKofaktor() {
    let matriks = getMatriks();
    let minorContainer = document.getElementById("minorMatrices");
    minorContainer.innerHTML = "";
    let kofaktor = [];
    let perhitunganDet = "Det(A) = ";
    
    for (let j = 0; j < 4; j++) {
        let minorMatriks = minor(matriks, 0, j);
        let { det: minorDet, explanation } = determinan3x3(minorMatriks);
        let kof = (j % 2 === 0 ? 1 : -1) * minorDet;
        kofaktor.push(kof);
        perhitunganDet += `${matriks[0][j]} * ${kof} ${j < 3 ? '+ ' : ''}`;
        
        minorContainer.innerHTML += `<div class='matrix-box'><h4>M1${j+1}</h4><p>${explanation}</p></div>`;
    }
    
    let determinan = kofaktor.reduce((sum, k, i) => sum + matriks[0][i] * k, 0);
    minorContainer.innerHTML += `<div class='matrix-box det-container'><h4>Det(A)</h4><p>${perhitunganDet} = ${determinan}</p></div>`;
    
    document.getElementById("containerHasil").style.display = "block";
    document.getElementById("blurBg").style.display = "block";
}

function tutupHasil() {
    window.location.href = "kofaktor.html";
}

buatMatriks();
