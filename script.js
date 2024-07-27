const id=document.getElementById('id_text')
const nome=document.getElementById('nome')
const valor=document.getElementById('valor_uni')
const quantidade=document.getElementById('quantidade')

const bt_busca=document.getElementById('busca')
const bt_limpa=document.getElementById('limpa')
const bt_lista=document.getElementById('lista')
const bt_insere=document.getElementById('insere')

const tabela=document.getElementById('tabela')

const aviso=document.getElementById('aviso')

async function getVenda(ida){
    // const url=`https://fastapi-ds.up.railway.app/vendas/${ida}`
    const url=`http://localhost:8000/pesquisa?id=${ida}`

    fetch(url).then((response)=>response.json())
    .then(criaLinha)

    
}

async function getVendas(){
    // const url='https://fastapi-ds.up.railway.app'
    const url='http://localhost:8000/'

    fetch(url).then((response)=>response.json())
    .then(criaTabela)
}



async function insertVendas(nome, valor, quantidade){
    // const url='https://fastapi-ds.up.railway.app'
    const url='http://localhost:8000/insert'

    if(nome!=''&&valor!=''&&quantidade!=''){

        fetch(url,{
            method:"POST",
            body: JSON.stringify({
                nome:nome,
                valor_uni:valor,
                quantidade:quantidade
            }),headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response)=>response.json()).then((element)=>{console.log(element)})
    }
    
}





function limpar(){
    tabela.innerHTML=''
    id.value=''
    aviso.innerText=''
    nome.value= ''
    valor.value= ''
    quantidade.value= ''
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

bt_insere.addEventListener('click', ()=>{
    insertVendas(nome.value, valor.value, quantidade.value)
    nome.value= ''
    valor.value= ''
    quantidade.value= ''
    getVendas()
})