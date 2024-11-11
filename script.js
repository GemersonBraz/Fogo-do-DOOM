
const array_pixel_fogo = []
const largura_fogo = 40
const altura_fogo = 40
const paleta_de_cores_do_fogo = [  {"r":7,"g":7,"b":7},
                             {"r":31,"g":7,"b":7},
                             {"r":47,"g":15,"b":7},
                             {"r":71,"g":15,"b":7},
                             {"r":87,"g":23,"b":7},
                             {"r":103,"g":31,"b":7},
                             {"r":119,"g":31,"b":7},
                             {"r":143,"g":39,"b":7},
                             {"r":159,"g":47,"b":7},
                             {"r":175,"g":63,"b":7},
                             {"r":191,"g":71,"b":7},
                             {"r":199,"g":71,"b":7},
                             {"r":223,"g":79,"b":7},
                             {"r":223,"g":87,"b":7},
                             {"r":223,"g":87,"b":7},
                             {"r":215,"g":95,"b":7},
                             {"r":215,"g":95,"b":7},
                             {"r":215,"g":103,"b":15},
                             {"r":207,"g":111,"b":15},
                             {"r":207,"g":119,"b":15},
                             {"r":207,"g":127,"b":15},
                             {"r":207,"g":135,"b":23},
                             {"r":199,"g":135,"b":23},
                             {"r":199,"g":143,"b":23},
                             {"r":199,"g":151,"b":31},
                             {"r":191,"g":159,"b":31},
                             {"r":191,"g":159,"b":31},
                             {"r":191,"g":167,"b":39},
                             {"r":191,"g":167,"b":39},
                             {"r":191,"g":175,"b":47},
                             {"r":183,"g":175,"b":47},
                             {"r":183,"g":183,"b":47},
                             {"r":183,"g":183,"b":55},
                             {"r":207,"g":207,"b":111},
                             {"r":223,"g":223,"b":159},
                             {"r":239,"g":239,"b":199},
                             {"r":255,"g":255,"b":255}]



function inicio() {
    cria_estrutura_de_dados_do_fogo()
    cria_fonte_do_fogo()
    renderiza_fogo()
    
    setInterval(calcula_propagacao_do_fogo, 50)
}

function cria_estrutura_de_dados_do_fogo() {
    const numero_de_pixels = largura_fogo * altura_fogo

    for (let i = 0; i < numero_de_pixels; i++){
        array_pixel_fogo[i] = 0
    }

}

function calcula_propagacao_do_fogo() {
   for (let coluna = 0; coluna < largura_fogo; coluna ++){
    for (let linha = 0; linha < altura_fogo; linha++){
        const indice_do_pixel = coluna + (largura_fogo * linha)  
        
        atualiza_intensidade_do_fogo_por_pixel(indice_do_pixel)   
    }
   } 
   renderiza_fogo()

}

function atualiza_intensidade_do_fogo_por_pixel(indice_pixel_atual){
    const indice_do_pixel_abaixo = indice_pixel_atual + largura_fogo
    if (indice_do_pixel_abaixo >= altura_fogo * largura_fogo ){
        return;
    }

    const enfraquecimento = Math.floor(Math.random()*3)
    const intensidade_do_fogo_abaixo = array_pixel_fogo[indice_do_pixel_abaixo]
    const nova_intensidade_do_fogo = Math.max(0, intensidade_do_fogo_abaixo - enfraquecimento);
        
    array_pixel_fogo[indice_pixel_atual-enfraquecimento] = nova_intensidade_do_fogo

}



function renderiza_fogo() {
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let linha = 0; linha < altura_fogo; linha++){
        html += '<tr>'

        for (let coluna = 0; coluna < largura_fogo; coluna++){
            const indice_do_pixel = coluna + (largura_fogo * linha)    
            const intensidade_do_fogo = array_pixel_fogo[indice_do_pixel]    

            if ( debug === true){
                html += '<td>'
                html += `<div class="indice-pixel">${indice_do_pixel}</div>`
                html += intensidade_do_fogo
                html += '</td>'
            } else {
                const cor = paleta_de_cores_do_fogo[intensidade_do_fogo]
                const codigo_da_cor = `${cor.r},${cor.g},${cor.b}`
                html +=`<td class="pixel" style="background-color: rgb(${codigo_da_cor})">`
                html += '</td>'
            }
            
        }

        html += '</tr>'

    }

    html += '</table>'

    document.querySelector('#canvas_fogo').innerHTML = html
}

function cria_fonte_do_fogo() {
    for (let coluna = 0; coluna < largura_fogo; coluna ++){
        const indice_da_fonte_do_fogo = largura_fogo * altura_fogo 
        const indice_do_pixel = (indice_da_fonte_do_fogo - largura_fogo) + coluna

        array_pixel_fogo[indice_do_pixel] = 36
    }

}

inicio()