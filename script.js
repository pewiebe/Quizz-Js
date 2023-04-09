//selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// se o botão Iniciar teste clicado
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //caixa mostrar informações
}

// se o botão de sair do questionário clicado
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
}

// se o botão continuar do teste clicado
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de quiz
    showQuetions(0); //chamando mostrar a função Perguntas
    queCounter(1); //passando 1 parâmetro para que Counter
    startTimer(15); //função de temporizador de início de chamada
    startTimerLine(0); //função de linha do tempo de início de chamada
}
// variáveis 
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se o botão reiniciar o questionário clicado
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de quiz
    result_box.classList.remove("activeResult"); //ocultar caixa de resultados
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //chamando mostrar a função Perguntas
    queCounter(que_numb); //passando que_numb valor para que Counter
    clearInterval(counter); //contador claro
    clearInterval(counterLine); //limpar a linha do contador
    startTimer(timeValue); //chamando a função de temporizador de início
    startTimerLine(widthValue); //função de linha do tempo de início de chamada
    timeText.textContent = "Tempo Restante"; //alterar o texto do texto de hora para Hora Restante
    next_btn.classList.remove("show"); //ocultar o botão seguinte
}

// se o botão sair do questionário clicado
quit_quiz.onclick = () => {
    window.location.reload(); //recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// se o botão Next Que foi clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //se a contagem de perguntas for menor que o comprimento total da pergunta
        que_count++; //incrementar o valor que_count
        que_numb++; //incrementar o valor que_numb
        showQuetions(que_count); //chamando mostrar a função Perguntas
        queCounter(que_numb); //passando que_numb valor para que o contador
        clearInterval(counter); //contador claro
        clearInterval(counterLine); //limpar a linha do contador
        startTimer(timeValue); //chamando a função de temporizador de início
        startTimerLine(widthValue); //chamando a função timberline estrela
        timeText.textContent = "Tempo Restante"; //alterar o texto de hora para Hora Restante
        next_btn.classList.remove("show"); //ocultar o botão seguinte
    } else {
        clearInterval(counter); //limpar o contador 
        clearInterval(counterLine); //limpar a linha do contador
        showResult(); //função show result de chamada
    }
}

// obtendo perguntas e opções do array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //criando uma nova tag span e div para pergunta e opção e passando o valor usando o índice de matriz
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //adicionando nova tag span dentro que_tag
    option_list.innerHTML = option_tag; //adicionando nova tag div dentro option_tag

    const option = option_list.querySelectorAll(".option");

    // definir atributo onclick para todas as opções disponíveis
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// criando as novas tags div que para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//se o usuário clicou na opção
function optionSelected(answer) {
    clearInterval(counter); //Limpador o contador
    clearInterval(counterLine); //Limpar linha do contador
    let userAns = answer.textContent; //Opção de seleção do usuário
    let correcAns = questions[que_count].answer; //obtendo a resposta correta do array
    const allOptions = option_list.children.length; //obtendo todos os itens de opção

    if (userAns == correcAns) { //se a opção selecionada pelo usuário for igual à resposta correta da matriz
        userScore += 1; //atualizando o valor da pontuação com 1
        answer.classList.add("correct"); //adicionando cor verde para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de marcar para corrigir a opção selecionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adicionando cor vermelha para corrigir a opção selecionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adicionando ícone de cruz para corrigir a opção selecionada
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //se houver uma opção correspondente a uma resposta de matriz
                option_list.children[i].setAttribute("class", "option correct"); //adicionando cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de tick à opção correspondente
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //uma vez que o usuário selecione uma opção, em seguida, desativou todas as opções
    }
    next_btn.classList.add("show"); //mostrar o botão Avançar se o usuário selecionar qualquer opção
}

function showResult() {
    info_box.classList.remove("activeInfo"); //ocultar caixa de informações
    quiz_box.classList.remove("activeQuiz"); //ocultar caixa de teste
    result_box.classList.add("activeResult"); //Mostrar resultado 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // se o usuário marcou mais de 3
        //criando uma nova tag span e passando o número de pontuação do usuário e o número total da pergunta
        let scoreTag = '<span>e parabéns ! 🎉, Você tem <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adicionando nova tag span dentro score_Text
    }
    else if (userScore > 1) { // se o usuário marcou mais de 1
        let scoreTag = '<span>legal 😎,  Você tem <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // se o usuário obteve uma pontuação inferior a 1
        let scoreTag = '<span>desculpe 😐, Você só tem <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //alterando o valor da contagem de tempo com o valor de tempo
        time--; //diminuir o valor do tempo
        if (time < 9) { //se o temporizador for inferior a 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //adicionar um valor 0 antes do tempo
        }
        if (time < 0) { //se o temporizador for inferior a 0
            clearInterval(counter); //Limpador do contador 
            timeText.textContent = "Time Off"; //alterar o texto de hora para tempo de folga
            const allOptions = option_list.children.length; //obtendo todos os itens de opção
            let correcAns = questions[que_count].answer; //obtendo a resposta correta do array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //se houver uma opção correspondente a uma resposta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //adicionando cor verde à opção correspondente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de tick à opção correspondente
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //uma vez que o usuário selecione uma opção, em seguida, desativou todas as opções
            }
            next_btn.classList.add("show"); //mostrar o botão Avançar se o usuário selecionar qualquer opção
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //atualizando o valor do tempo com 1
        time_line.style.width = time + "px"; //aumentar a largura do time_line com px por valor de tempo
        if (time > 549) { //se o valor do tempo for maior que 549
            clearInterval(counterLine); //limpar a linha do contador
        }
    }
}

function queCounter(index) {
    //criando uma nova tag de extensão e passando o número da pergunta e a pergunta total
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionando nova tag span dentro bottom_ques_counter
}