const id=document.getElementById('id_text')

const bt_busca=document.getElementById('busca')
const bt_limpa=document.getElementById('limpa')
const bt_lista=document.getElementById('lista')

const tabela=document.getElementById('tabela')

const aviso=document.getElementById('aviso')

async function getVenda(ida){
    const url=`https://fastapi-ds.up.railway.app/vendas/${ida}`

    fetch(url).then((response)=>response.json())
    .then(criaLinha)

    
}

async function getVendas(){
    const url='https://fastapi-ds.up.railway.app'

    fetch(url).then((response)=>response.json())
    .then(criaTabela)
}

function limpar(){
    tabela.innerHTML=''
    id.value=''
    aviso.innerText=''
}

function criaLinha(venda_info){
    if(venda_info.hasOwnProperty('erro')){
        aviso.innerText=venda_info.erro
    }else{

        let vid=venda_info.id
        let item=venda_info.item
        let preco=venda_info.preco_uni
        let qtd=venda_info.quantidade

        tabela.innerHTML+=`
            <tr>
                <td>${vid}</td>
                <td>${item}</td>
                <td>${preco}</td>
                <td>${qtd}</td>
            </tr>
            `
        }
}

function criaTabela(vendas){
    const vendas_info=vendas.info_vendas
    
    Object.keys(vendas_info).forEach(element => {
        criaLinha(vendas_info[element])
    });
}


bt_busca.addEventListener('click', ()=>{
    if(id.value==''){
        aviso.innerText='Você não escreveu um id.'
    }else{
        tabela.innerHTML=''
        aviso.innerText=''
        getVenda(id.value)
    }
})

bt_lista.addEventListener('click', ()=>{
    limpar()
    getVendas()
})

bt_limpa.addEventListener('click', ()=>{
    limpar()
})