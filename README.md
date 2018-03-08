QuizzJs Lib
-----------

> **LibJs para gerar Quizz**. *Um questionário de perguntas e repostas*.
> Possui alguns métodos para facilitar seu uso, é bem **versátil** e
> *principalmente* é **fácil de usar**.

**Como usar:**

 

Primeiro
--------

Apos ter criado o seu questionario, você irá montar um Array de Objeto Json, com suas perguntas, respostas e alternativa correta.

**Crie no formato Abaixo.**

*Você pode adicionar quantas perguntas desejar, seguindo o padrão abaixo.*

    [
    	{
    		"question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    		"numberAnswerCorrect":"4",
    		"answer":{
    			"1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"2":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"3":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"4":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"5":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"6":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    		}					
    	},
    	{
    		"question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ? ",
    		"numberAnswerCorrect":"2",
    		"answer":{
    			"1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"2":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"3":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"4":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"5":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"6":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    		}					
    	}
    ]




Segundo
-------



No codigo html você irá criar um seletor, uma id, class etc. 
Que será a referencia na qual será gerado dentro dele o seu quizz.

*Lembre se de chamar o **script do quizz na pagina***.

    <body>
    ...
    	<div id="quizz"></div><!-- referência -->
    ...		
    <script src="quizz-min.js" type="text/javascript" ></script>	
    </body>
	

Terceiro
----------

Agora irá criar um script externo ou interno no qual irá escrever os metodos para se chamar o quizz, e os metodos de controle do mesmo.

Metodos
-------

> **Quizz()**  Esse é o método principal, todo o restante do codigo será
> vinculado a ele.  Dentro dele você irá chamar o **seletor** que adicionou
> no **código HTML** 

Observe o exemplo

    <script>
    ...
    Quizz('#quizz')
    ...
    </script>

> **.start( ArrayObjectJson )** Aqui você irá inserir o Array Object Json
> que você criou. A partir dele todo o seu código será gerado.

Você pode inserir o objeto direto nele, como fez acima, ou armazenar o objeto em uma variável e inserir somente a variável que irá representá-lo, dentro desse método.

Caso faça isso, lembre se de criar e inicializar a variável acima desse método, para não ter problemas na hora de renderizar seu script.

    <script>
    ...
    Quizz('#quizz').start( 
    [
    	{
    		"question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    		"numberAnswerCorrect":"4",
    		"answer":{
    			"1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"2":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"3":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"4":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"5":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"6":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    		}					
    	},
    	{
    		"question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ? ",
    		"numberAnswerCorrect":"2",
    		"answer":{
    			"1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"2":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"3":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"4":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"5":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    			"6":"Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    		}					
    	}
    ]
    )
    ...
    </script>

Pronto!
-------

Seu código já está funcionando e operando em sua forma mais básica. Simples não ?!

Em nossos arquivos você irá encontrar um arquivo css muito simples, para dar a formatação padrão ao código que está sendo gerado.

*Se for utiliza-lo lembre-se de chamalo em seus head.*

    <head>
    ...
    	<link rel="stylesheet" href="quizz.css">
    ...
    </head>

Caso não vá utiliza-lo faça uma estilização seguindo a codigo que é gerado, ou poderá encontrar dificuldade em utilizar o codigo que é gerado.

> **Observação** O input radio gerado pelo script vem por padrão com **display:none** pelo código, e o label com **display:block** de forma a se espalhar por toda lista, e facilitar o usuário selecionar o item
> desejado. Essa foi a unica estilização feita direta *inline pelo
> script*, **porque é importante**.  No entanto a classe .Quizz__hidden
> é chamada pelo css, se você não for utilizar o css padrão, crie essa
> classe em seu css e adicione display:none a ela, caso contrário o
> método se for utilizar o método setOneByOne() você não vai conseguir
> ver a diferença, irá parecer que não funciona, o que não é verdade.
> Fiz essa alteração pensando na **flexibilidade** do código
> proporcionando a **melhor experiência tanto ao programador quanto a um
> usuário** *sem tanta experiência.*

Métodos
-------

> **.config( object )** Esse é o método de configuração do quizz, é onde começamos ver a magia acontecendo. Config recebe um objeto com vários
> atributos, você pode iniciar o quizz sem ele, usando ele e um
> atributo, ou todos atributos, a sua escolha.

    <script>
    ...
    .config({ 
    	classul : 'QuizzClassUl',
    	classli : 'QuizzClassLi',
    	classBtn : 'QuizzClassBtn',
    	textBtn : 'Confirmar Resposta',
    	setOneByOne: false, 
    	showResults : false
    })
    ...
    </script>

Todos os valores dos atributos são **strings**, exceto *setOneByOne e showResults* que pode ser booleans ou definidos como string também
**classul** : insere uma classe na Ul
**classli** : insere uma classe na Li
**classBtn** : insere uma classe no button 
**textBtn** : insere o texto que desejar no button

Se você não quiser criar o config, pode chamar esses atributos através de seus respectivos metodos, como segue abaixo:.

    <script>
    ...
    Quizz('#quizz')
    .setClassUl('QuizzClassUl')
    .setClassLi('QuizzClassLi')
    .setClassBtn('QuizzClassBtn')
    .setTextBtn("Confirmar Resposta")
    .setOneByOne( false )
    .setShowResults( false )
    .start( ArrayObjectJsonQuizz );
    ...
    </script>

O que não fazemos pela flexibilidade , é linda essa LIB não ?

> **.setOneByOne( true )  ou .config({ setOneByOne: true })** O quizz não
> vai aparecer em lista, ele irá aparecer uma pergunta por vez. A cada
> pergunta respondida o quizz passa para outra pergunta, e assim até o
> final, ele não retorna a pergunta anterior.

A maioria dos quizz, que vemos na internet hoje funciona dessa forma, é muito popular.

> **.setShowResults( false )  ou .config({ setShowResults: false })** O
> quizz por padrão mostra os resultados, esse método por padrão é
> definido como true. Esse mostrar o resultado é assim: quando o usuário
> clica em uma respostas ela no exato momento fica vermelha, sinalizando
> que está errada, ou fica verde sinalizando que está correta.
> 
> Se você alterar ele para false, quando o usuário clicar a resposta irá
> ficar azul, e o botão da questão ficará desabilitado, ou seja o
> usuário so tem uma chance de acertar por questão, então no final
> quando ele responder todas as questões você utiliza o método 
> .finished() para dar uma resposta ao usuário.

Aquele momento que a lib só fica melhor.

> **.finished( Codigo HTML )** O que esse método faz é simples, se você
> utilizar .setOneByOne( true ) ou .setShowResults( false )  você pode
> configurar esse método. Nele você insere um bloco de codigo html que
> será executado ao final do quizz para informar o termino do quizz, e
> se desejar seus acertos e erros, é muito interativo. Ele possui uma
> propriedade especial, existem três palavras especiais que você pode
> adicionar em seu codigo html que irão exibir na tela acertos, erros, e
> quantidade de perguntas, irei dar o exemplo.

O MÉTODO finished() SÓ FUNCIONA SE setOneByOne: TRUE OU showResults : FALSE
No método finished() pode se utilizar palavras reservadas que irão retornar valores especificos
**QuizzNumberOfHits**			   => *Retorna números de acertos*
**QuizzNumberOfErrors**			=> *Retorna números de erros*
**QuizzNumberOfQuestions**		=> *Retorna quantidade de perguntas*

Observe o código abaixo e veja as palavras em uso.

    <script>
    ...
    Quizz().finished(  '<h2>Você acertou QuizzNumberOfHits e errou QuizzNumberOfErrors  das  QuizzNumberOfQuestions  perguntas</h2>');
    ...
    </script>

O resultado disso seria algo assim:
**Você acertou 3 e errou 2 das 5 perguntas**

As palavras chaves foram convertidas em números de acordo com os acertos,  erros, e quantidade de perguntas do usuário. 


Para facilitar a compreensão do código, e mostrar algumas coisas bem legais que é possível fazer com ele, estarei adicionando alguns exemplos ao pacote de arquivos, essa é minha primeira LIB, fiz com muito carinho, espero que gostem e que ajude muitas pessoas, é minha contribuição a comunidade. Sucesso a todos nós. Um grande abraço.

William D. de Oliveira.
Brasil / Sp















