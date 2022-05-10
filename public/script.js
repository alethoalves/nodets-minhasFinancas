//Simplificando o código
const q = (e)=> document.querySelector(e);
const qAll = (e)=> document.querySelectorAll(e);
/********************
 Funções auxiliares
 ********************/
// Converte o número do mês no nome do mês
const nameMonth = (month) =>{
    switch (month) {
        case 0: return "Janeiro";
        case 1: return "Fevereiro";
        case 2: return "Março";
        case 3: return "Abril";
        case 4: return "Maio";
        case 5: return "Junho";
        case 6: return "Julho";
        case 7: return "Agosto";
        case 8: return "Setembro";
        case 9: return "Outubro";
        case 10: return "Novembro";
        case 11: return "Dezembro"
    }
}
// Altera o estilo do item de menu selecionado
function selected_btn_menu(params) {
    q('.btn-menu-selected').classList.remove('btn-menu-selected')
    // inclui no elemento informado no parâmetro a classe .btn-menu-selected
    params.classList.add('btn-menu-selected');
}
// Formata número no padrão de maeda
function formatMoney(value) {
    // fixa apenas 2 casas decimais ao número
    let newValue = value.toFixed(2)
    // transforma o número em float
    let valueInt = parseInt(value)
    // testa se o número é inteiro ou decimal
    if (newValue == valueInt) {
        // Se for interio, acrescenta 2 casas decimais 'vazias'
        value = `${value.toLocaleString('pt-BR')},00`
    } else {
        // Se for um número decimal, formata no modelo padrão
        value = value.toLocaleString('pt-BR')
    }
    return value
}
// em um array de objetos, soma o valor de itens específicos de um objeto
function sum(array) {
    let sum1 = 0;
    let sum2 =0
    // para cada objeto contido no array, execute:
    array.forEach(params => {
        // se, o item type do objeto selecionado do array for true
        if (params.type) {
            //incremente a var sum1 com o valor contido no item value do objeto
            sum1 += params.value;
        } else {
            //incremente a var sum2 com o valor contido no item value do objeto
            sum2 += params.value;
        }
    })
    return [sum1,sum2]
}
// fecha campo de formulário
function closeAside() {
    q('aside').style['margin-right'] = '-319px'
    changeBorder()
}
// abre o campo de formulário
function openAside() {
    q('aside').style['margin-right'] = '0px'
}
// expande ou contrai o menu lateral do site
function viewMore() {
    if (q('.display-nav').style['max-height']=='100%') {
        q('.display-nav').style['max-height']='210px'
        q('.btn-add i').style.transform = 'rotate(0deg)'
    } else {
        q('.display-nav').style['max-height']='100%'
        q('.btn-add i').style.transform = 'rotate(180deg)'
    }
}
//Alterar borda dos itens para light
function changeBorder() {
    qAll('.btn-item').forEach((e)=>{
        e.style.border = 'border: 1px solid var(--collor-light)'
    })
}
/********************
Constructor functions - MAIS UM TESTE COM O GIT
 ********************/
// Construtor do menu lateral direito
function menuLeftConstructor(userData) {
    if (userData.length > 3) {
        q('.btn-add-viewMore').style.display = 'inline-flex'
    }
   
    
    userData.map((month, index)=>{
        // importar e seta modelo do menu lateral
        let modelMenuMonth = q('.models .btn-menu').cloneNode(true);
        modelMenuMonth.innerHTML = `${month.year} <span>${nameMonth(month.month)}</span>`
        q('.display-nav nav').append(modelMenuMonth);
        modelMenuMonth.addEventListener('click',(e)=>{
            mainConstructor(month)
            selected_btn_menu(modelMenuMonth)
            closeAside()
        })
        // inclui selected ao primeiro item do menu
        if (index == 0) {modelMenuMonth.classList.add('btn-menu-selected')} 
    })
}
// Construtor do campo <main>
function mainConstructor(object) {
    let year = object.year;
    let month = nameMonth(object.month);
    let sumIncrease = formatMoney(sum(object.itens)[0]);
    let sumDecrease = formatMoney(sum(object.itens)[1]);
    let balance =formatMoney(sum(object.itens)[0] - sum(object.itens)[1]);
    q('main .title').innerHTML = `${year} <br> <span>${month}</span>`
    q('main .total-increase').innerHTML = `R$ ${sumIncrease}`;
    q('main .total-decrease').innerHTML = `R$ ${sumDecrease}`;
    q('main .balance').innerHTML = `R$ ${balance}`;
    q('main .balance').classList.remove('color-decrease');
    q('main .balance').classList.remove('color-increase');
    if ((sum(object.itens)[0] - sum(object.itens)[1]) < 0) {
        q('main .balance').classList.add('color-decrease')
    } else{
        q('main .balance').classList.add('color-increase')
    }
    let newObject = {
        year:object.year,
        month:object.month,
        itens:[
            {
                name:'',
                value: null,
                type:null,
                status:false,
                icon:''
            }
        ]
    }
    q('.add-increase').addEventListener('click',(e)=>{
        newObject.itens[0].type = true;
        formConstructor(newObject,0,'newForm')
    });
    q('.add-decrease').addEventListener('click',(e)=>{
        newObject.itens[0].type = false;
        formConstructor(newObject,0,'newForm')
    })
    mainItemsConstructor(object)
}
// Construção dos itens listados no <main>
function mainItemsConstructor(object){
    q('#itemIncrease').innerHTML = '';
    q('#itemDecrease').innerHTML = '';
    object.itens.map((item, itemIndex)=>{
        let modelItems = q('.models .btn-item').cloneNode(true);
        modelItems.querySelector('.item-name').innerHTML = item.name;
        if (item.status) {
            modelItems.querySelector('.item-value').innerHTML = `R$ ${formatMoney(item.value)} <span><i class="fa-solid fa-check"></i></span>`;
        } else {
            modelItems.querySelector('.item-value').innerHTML = `R$ ${formatMoney(item.value)}`;
        }
        modelItems.querySelector('.fa-solid').classList.add(`fa-${item.icon}`)
        if (item.type) {
            modelItems.querySelector('.icon').classList.add('increase');
            modelItems.querySelector('.item-value').classList.add('color-increase');
            modelItems.addEventListener('click',(e)=>{
                changeBorder()
                formConstructor(object,itemIndex,'editForm');
                modelItems.style.border = '1px solid var(--collor-green)'
            })
            document.querySelector('#itemIncrease').append(modelItems);
        } else {
            modelItems.querySelector('.icon').classList.add('decrease');
            modelItems.querySelector('.item-value').classList.add('color-decrease');
            modelItems.addEventListener('click',(e)=>{
                //object.newID = "";
                changeBorder()
                modelItems.style.border = '1px solid var(--collor-red)'
                formConstructor(object,itemIndex,'editForm')
            })
            document.querySelector('#itemDecrease').append(modelItems);
        }
    })
    
}
// Construtor do formulário de criação/edição
function formConstructor(object,id,typeForm) {
    q('form').reset()
    
    
    openAside()
    if (object.itens[id].type == true && typeForm == 'editForm') {
        q('aside .title').innerHTML = 'Editar entrada'
    }
    if (object.itens[id].type == false && typeForm == 'editForm') {
        q('aside .title').innerHTML = 'Editar saída'
    }
    if (object.itens[id].type == true && typeForm == 'newForm') {
        q('aside .title').innerHTML = 'Nova entrada'
    }
    if (object.itens[id].type == false && typeForm == 'newForm') {
        q('aside .title').innerHTML = 'Nova saída'
    }
    q('aside form input[name="year-item"]').value = object.year;
    q('aside form input[name="month-item"]').value = object.month;
    if(typeForm == 'editForm'){
        q('aside form input[name="id-item"]').value = id;
    }
    q('aside form input[name="name-item"]').value = object.itens[id].name;
    q('aside form input[name="value-item"]').value = object.itens[id].value;
    if(object.itens[id].type){
        q('aside form select[name="item-type"]').innerHTML = `
            <option value="0">Despesa</option>
            <option selected value="1">Receita</option>
            `
    }else{
        q('aside form select[name="item-type"]').innerHTML = `
            <option selected value="0">Despesa</option>
            <option  value="1">Receita</option>
            `
    }
    q('.label-name-status').innerHTML = ''
    if (object.itens[id].type) {
        q('.label-name-status').innerHTML = 'Receita recebida?'
    } else {
        q('.label-name-status').innerHTML = 'Despesa paga?'
    }
    if(object.itens[id].status){

        q('aside form select[name="item-status"]').innerHTML = `
            <option selected value="0">Sim</option>
            <option  value="1">Não</option>
            `
    }else{
        q('aside form select[name="item-status"]').innerHTML = `
            <option  value="0">Sim</option>
            <option selected value="1">Não</option>
            `
    }
    let valueIcon = object.itens[id].icon;
    q('.icones .input-icon').innerHTML = '';
    q('.icones .input-icon').innerHTML = `<i class="fa-solid fa-${valueIcon}"></i>`;
    q('aside form input[name="name-icon"]').value = valueIcon;
    q('aside form input[name="name-icon"]').addEventListener('keyup',(e)=>{
        valueIcon = q('aside form input[name="name-icon"]').value
        q('.icones .input-icon').innerHTML = '';
        q('.icones .input-icon').innerHTML = `<i class="fa-solid fa-${valueIcon}"></i>`;
        q('aside form input[name="name-icon"]').value = valueIcon;
    })
           
}
/********************
 Renderização da tela
 ********************/
let userData = bd[0].data;
menuLeftConstructor(userData)
mainConstructor(userData[0])







