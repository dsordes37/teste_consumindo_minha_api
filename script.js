const id=document.getElementById('id_text')
const nome=document.getElementById('nome')
const valor=document.getElementById('valor_uni')
const quantidade=document.getElementById('quantidade')

const up_id=document.getElementById('up_id')
const up_coluna=document.getElementById('up_coluna')
const up_valor=document.getElementById('up_valor')
const del_id=document.getElementById('del_id')



const bt_busca=document.getElementById('busca')
const bt_limpa=document.getElementById('limpa')
const bt_lista=document.getElementById('lista')
const bt_insere=document.getElementById('insere')
const bt_edita=document.getElementById('edita')
const bt_deleta=document.getElementById('deleta')

const tabela=document.getElementById('tabela')

const aviso=document.getElementById('aviso')



//FUNCTIONS DE ACESSO=================================
async function getVenda(ida){
    const url=`https://fastapi-ds.up.railway.app/pesquisa?id=${ida}`
    //const url=`http://localhost:8000/pesquisa?id=${ida}`

    fetch(url).then((response)=>response.json())
    .then(criaLinha)

    
}

async function getVendas(){
    const url='https://fastapi-ds.up.railway.app'
    //const url='http://localhost:8000/'

    fetch(url).then((response)=>response.json())
    .then(criaTabela)
}



async function insertVendas(nome, valor, quantidade){
    const url='https://fastapi-ds.up.railway.app/insert'
    //const url='http://localhost:8000/insert'

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


async function editaVendas(id, coluna, valor){
    const url=`https://fastapi-ds.up.railway.app/update/${id}`
    //const url=`http://localhost:8000/update/${id}`

    if(id!=''&&coluna!=''&&valor!=''){
        fetch(url, {
            method:"PUT",
            body: JSON.stringify({
                coluna:coluna,
                valor:valor
            }), headers:{
                "Content-type":"application/json;charset=UTF-8"
            }
        }).then((response)=>response.json()).then((element)=>{console.log(element)})
    }
}

async function deletaVenda(id){
    const url=`https://fastapi-ds.up.railway.app/delete/${id}`
    //const url=`http://localhost:8000/delete/${id}`

    fetch(url, {
        method:"DELETE"
    }).then((response)=>response.json()).then((element)=>{console.log(element)})

}


//FUNCTIONS DE CONTROLE =================================

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
        let nome=venda_info.nome
        let preco=venda_info.preco_uni
        let qtd=venda_info.quantidade

        tabela.innerHTML+=`
            <tr>
                <td>${vid}</td>
                <td>${nome}</td>
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

//LISTENERS ========================================


bt_busca.addEventListener('click', ()=>{
    if(id.value==''){
        aviso.innerText='Você não escreveu um id.'
    }else{
        venda_id=id.value
        limpar()
        
        getVenda(venda_id)
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


bt_edita.addEventListener('click', ()=>{
    editaVendas(up_id.value, up_coluna.value, up_valor.value)
    limpar()
    getVenda(up_id.value)
    up_id.value= ''
    up_coluna.value= ''
    up_valor.value= ''
    
})

bt_deleta.addEventListener('click', ()=>{
    deletaVenda(del_id.value)
    del_id.value= ''
    limpar()
    getVendas()
})
