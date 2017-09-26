/***
* Lib Quizz.js | William Oliveira | @2017 | V0.1 | Good Vibes
***/
(function(){
	var Quizz = function(arg){
		if(!(this instanceof Quizz)){
		return new Quizz(arg);
	}
		this.element = arg;//O elemento html que o usuário setou
	}
	Quizz.fn = Quizz.prototype = {
		//@vars de suporte
		varSupport : {
			numberOfQuestions : 0,
			right : 0,
			errors : 0,
			preparingNewQuizz : new Array(),
			contextForReset : {}
		},
		//@vars de aparencia
		appearance : { 
			classBtn		: '',
			classUl 		: '',
			classLi 		: '',
			textBtn 		: 'Send Quizz',
			oneByOne 		: false,
			finished 		: false,
			finishedHTML 	: '',
			showResults 	: true
		},
		//*****************************************************//
		//entrada o array de classes separado por virgula do usuario
		//retonar um array com as classes do usuario separado por espaços em branco
		setClassBtn :  function ( arrayClasses ){		
			//Estou passando todos os argumentos que chegaram na função, 
			//assim se for inserido mais de uma classe, vou poder pega la através desse metodo
			this.appearance['classBtn'] =  this.__parseArrayClassToString(  arguments  ) ;
			return this;
		},
		setClassUl :  function ( arrayClasses ){
			this.appearance['classUl'] =  this.__parseArrayClassToString(  arguments  ) ;
			return this;
		},
		setClassLi :  function ( arrayClasses ){
			this.appearance['classLi'] =  this.__parseArrayClassToString(  arguments  ) ;
			return this;
		},
		setTextBtn :  function ( string ){
			this.appearance['textBtn'] =  string.toString();
			return this;
		},
		setOneByOne :  function ( boolean ){
			boolean = String(boolean);//convertendo qualquer tipo de entrada para string
			boolean = boolean.toLowerCase();//deixando como minuscula para ter certeza que não vai conflitar com nada
			this.appearance['oneByOne'] =  ( boolean == 'true' ) ? 'true' : false;
			return this;
		},
		setShowResults :  function ( boolean ){
			boolean = String(boolean);//convertendo qualquer tipo de entrada para string
			boolean = boolean.toLowerCase();//deixando como minuscula para ter certeza que não vai conflitar com nada
			this.appearance['showResults'] =  ( boolean == 'true' ) ? 'true' : false;
			return this;
		},
		config : function( arguments ){
			for( let [ key , value ] of  Object.entries(arguments) ){
				key = key.toUpperCase();
				if( ( key == 'SETCLASSUL' ) || ( key == 'CLASSUL' )  ){
					this.setClassUl( value );
				}else
				if( ( key == 'SETCLASSLI' ) || ( key == 'CLASSLI' )  ){
					this.setClassLi( value );
				}else
				if( ( key == 'SETCLASSBTN' ) || ( key == 'CLASSBTN' )  ){
					this.setClassBtn( value );
				}else
				if( ( key == 'SETONEBYONE' ) || ( key == 'ONEBYONE' )  ){
					this.setOneByOne( value );
				}else 
				if( ( key == 'SETSHOWRESULTS' ) || ( key == 'SHOWRESULTS' )  ){
					this.setShowResults( value );
				}else
				if( ( key == 'SETTEXTBTN' ) || ( key == 'TEXTBTN' )  ){
					this.setTextBtn( value );
				}else{
					console.error('[Quizz] Property not exist :: ' + key + ' :: Existing properties are : setClassUl, setClassLi, setClassBtn, setTextBtn, setOneByOne || or abbreviated forms classul, classli, classbtn, textbtn, onebyone');
				} 
			}
			return this;
		},

		//Entra uma ou varios classes, logo pego eles em um for 
		//e retorno uma  string, separada por espaços em brancos para por na classe
		__parseArrayClassToString : function ( arrayClasses ){
			var arrClasses = new Array();
			for ( var count = 0 ; count < arrayClasses.length ; count++){
				var clearDot = arrayClasses[count];
				clearDot = clearDot.toString().replace(/[.|#|(|)|*|=|\$|\^|~|,|(À-ú)]/g, "");
				arrClasses[count] = clearDot ;
			}
			arrClasses = arrClasses.join(' ');
			return arrClasses;
		},
		start : function( arrayObjectJson ){
			if( (  arrayObjectJson == undefined ) || (  arrayObjectJson == null ) ){
				console.error('[Quizz] Array Object Json :: Questions and Answers Not Found :: start( ObjectJson ) => Not Initialized || or object is being created / initialized below function call / method');
			}else{
				if( (  (typeof arrayObjectJson == 'object') && ( arrayObjectJson instanceof  Array ) ) ){
					this.construct( arrayObjectJson );
			 		this.__selected();//Chama a função que controla quando botão é selecionado
			 		
			 		//Recuperando o arrayObjectJson para inserir no resetquizz caso seja necessario reiniciar o quizz
			 		this.varSupport["preparingNewQuizz"] = arrayObjectJson;
			 		this.varSupport["contextForReset"] = this;
				}else{
					console.error('[Quizz] You inserted ' + arrayObjectJson );
					console.error(  arrayObjectJson  );
					console.error('[Quizz] Please, enter an Array Object Json [ {} , {} ]');
				}
			}
			 return this;
		},
		construct : function( arrayObjectQuestions ){

			var el = document.querySelector(this.element);//var ref : : O elemento html que o usuário setou
			
			this.varSupport['numberOfQuestions'] = arrayObjectQuestions.length;//registro numero de perguntas no quizz

			//Preparando as classes para inserir na lista quizz
			var classBtn 	= ( this.appearance["classBtn"] 		!= "" )	? 'class="'+this.appearance["classBtn"]+'"'	: '' ;
			if(  this.appearance['oneByOne']  ){//So irei esconder os quizz se for oneByOne
				var classUl 		= ( this.appearance["classUl"] 		!= "" )	? 'class="quizzHidden '+this.appearance["classUl"]+'"'	: 'quizzHidden' ;
			}else{
				var classUl 		= ( this.appearance["classUl"] 		!= "" )	? 'class="'+this.appearance["classUl"]+'"'	: '' ;
			}
			var classLi 		= ( this.appearance["classLi"] 		!= "" )	? 'class="'+this.appearance["classLi"]+'"'		: '' ;

			//Params recebe um array de objetos com todas as perguntas e respostas 
			//gera abaixo da componente criado pelo usuario o formulario de quizz
			var countId = 0;		 // id respostas
			var numIdQuizz = 0; //id por cada questão do quizz

			for( var count = 0 ; count < arrayObjectQuestions.length ;  count ++ ){
				arrayObjectQuestions[count] = this.__correctArrayQuestions(   arrayObjectQuestions[count]  );//verificar se o obj possue todas as propriedades necessarias para poder cria lo no html
				numberAnswers = Object.keys(  arrayObjectQuestions[count]['answer']  ).length ; //@INT Qtdade Respostas
				numIdQuizz += 1;
				//*****************************************************//
				var MyQuizz = '<ul '+ classUl  +' id="MyQuizz_'+numIdQuizz+'">';
				//*****************************************************//
				MyQuizz +='<li '+ classLi  +' >'+arrayObjectQuestions[count]["question"]+'</li>';//@String Pergunta da questão
				//*****************************************************//
				for( var nAnsw = 1 ; nAnsw <= numberAnswers ;  nAnsw ++ ){
					var answer = arrayObjectQuestions[count]['answer'][nAnsw]; //@String  Responsta
					var numCorrectAnswer = arrayObjectQuestions[count]["numberAnswerCorrect"] ; //@INT numero resposta correta
					var correct = (  numCorrectAnswer ==  nAnsw ) ? 'correct' : ''; //caso a resposta correta no objeto seja o mesmo numero resposta no quizz insere a propriedade correct no input
					countId += 1; //Int retorna a soma +1 para incrementar as ids e não confundir os label for inputs
					//*****************************************************//
					MyQuizz += '<li '+ classLi  +' ><input style="display:none;" type="radio" id="Q'+countId+'" name="quizz" value="q_'+countId+'" '+correct+' ><label style="display:block;width:100%;height:100%;" for="Q'+countId+'">'+answer+'</label></li>';
					//*****************************************************//
				}
				//*****************************************************//
				MyQuizz += '<li '+ classLi  +' >';
				MyQuizz +='<button ' +  classBtn  + ' id="QuizzSendBtn" onclick="Quizz().check( event, '+numIdQuizz+' )">'+ this.appearance["textBtn"] +'</button>';
				MyQuizz += '</li></ul>';	
				//*****************************************************//
				el.insertAdjacentHTML('beforeend', MyQuizz );//Imprime no Dom o quizz

				if(  this.appearance['oneByOne']  ){//So irei esconder os quizz se for oneByOne
					document.querySelector('#MyQuizz_'+1).classList.toggle('quizzHidden');
				}

			}//@ End For questão Quizz
		},
		//Verificar se o o objeto possue a propriedade, caso o usuario tenha esquecido de adicionar, então é adiciona para não dar erro no codigo
		__correctArrayQuestions : function( arrQuestions ){
			if( !arrQuestions.hasOwnProperty('question') ){  arrQuestions['question'] = "Question not found" ; }
			if( !arrQuestions.hasOwnProperty('numberAnswerCorrect') ){  arrQuestions['numberAnswerCorrect'] = 0 ; }
			if( !arrQuestions.hasOwnProperty('answer') ){  arrQuestions['answer'] = { '1' : 'Answer not found'} ; }
			return arrQuestions;
		},
		check : function( event , numIdQuizz ){
	
			event.preventDefault();			

			var radios = document.getElementById('MyQuizz_'+numIdQuizz ).querySelectorAll('input[type="radio"]');
			if(   !this.appearance['oneByOne'] ){
			  	for (var i = 0; i < radios.length; i++) {
					radios[i].parentNode.classList.remove("error","right","selected");
				}	
			}
			var btnSendQuizz = document.getElementById('MyQuizz_'+numIdQuizz ).querySelector('button');

			//Lê todos os inputs e adiciona classe na li em cima do input correto, alem de verificar se o mesmo foi checkado
			for (var i = 0; i < radios.length; i++) {
		
			//verifica se o input correto foi selecionado, incrementa contador e adiciona classe right na LI
			    	if (   ( radios[i].checked )   && ( radios[i].hasAttribute('correct')  )   ) {
				    	if(   !this.appearance['oneByOne']  ){ //Não adiciona classe se oneByOne trues
				    		if(  this.appearance['showResults'] ){
				    			radios[i].parentNode.classList.add("right");
				    		}
				    		else{//se this.appearance['showResults'] for false eu quero deixar o selected na tela
				    			radios[i].parentNode.classList.add("copySelected");
				    		}
				    	}
				    	this.__right();//incrementa acertos
				    	this.__btnDisabled( btnSendQuizz , numIdQuizz);
				    	return true;
			    	}

		    	//verifica se o input correto foi selecionado, incrementa contador e adiciona classe Error na LI
			     	if (   ( radios[i].checked )  ){
				     	if(   !this.appearance['oneByOne']  ){ //Não adiciona classe se oneByOne true
				     		if(  this.appearance['showResults'] ){
				 			radios[i].parentNode.classList.add("error");
				 		}
				 		else{//se this.appearance['showResults'] for false eu quero deixar o selected na tela
				    			radios[i].parentNode.classList.add("copySelected");
				    		}
				     	}
				 		this.__errors();//incrementa errors
					     	this.__btnDisabled( btnSendQuizz , numIdQuizz );
			     	}

			}
		},
		__btnDisabled : function( button , numIdQuizz ){
			//quando showResults for false, o botão de sendquizz ira fica com disabled e no final podera exibir a mensagem pelo metodo finish
			if(   !this.appearance['showResults'] ){
				button.disabled = true;
				if( !this.appearance['oneByOne'] ){
					var btnSendQuizz = document.querySelectorAll('button[id="QuizzSendBtn"]');
					var allBtnSendQuizz = 0;
					var unitBtnSendQuizz = 0;
					//estou pegando a quantidade de botões send quizz no dom
					//estou pegando botão por botão
					btnSendQuizz.forEach( function(curr , index , arr){
					allBtnSendQuizz = arr.length;
						if( curr.disabled == true ){
							unitBtnSendQuizz += 1;
						}
					});
					//aqui comparo o total com a qtidade de botões confirmados, se for igual então todos foram pressionados e a mensagem pode ser exibida na tela
					if( unitBtnSendQuizz ==  allBtnSendQuizz ){

						if(  this.appearance['finished']  ){
							var contentHTML = this.appearance['finishedHTML'];
							contentHTML = contentHTML.replace('QuizzNumberOfHits', this.varSupport['right'] );
							contentHTML = contentHTML.replace('QuizzNumberOfErrors', this.varSupport['errors'] );
							contentHTML = contentHTML.replace('QuizzNumberOfQuestions', this.varSupport['numberOfQuestions'] );
							this.__finished(  contentHTML );
						}

					}
				}				
			}
			//quando oneByOne for true, o botão de sendquizz ira fica com disabled e no final podera exibir a mensagem pelo metodo finish
			if( this.appearance['oneByOne'] ){
				button.disabled = true;
				document.querySelector('#MyQuizz_'+numIdQuizz).classList.toggle('quizzHidden');
				var testBtnSenQuizz = document.querySelector('#MyQuizz_'+(numIdQuizz+1) );
				if(  testBtnSenQuizz  ){ //Somente se a proxima ID existir ele realiza a função
					testBtnSenQuizz.classList.toggle('quizzHidden');
				}else{
					if(  this.appearance['finished']  ){
						var contentHTML = this.appearance['finishedHTML'];
						contentHTML = contentHTML.replace('QuizzNumberOfHits', this.varSupport['right'] );
						contentHTML = contentHTML.replace('QuizzNumberOfErrors', this.varSupport['errors'] );
						contentHTML = contentHTML.replace('QuizzNumberOfQuestions', this.varSupport['numberOfQuestions'] );
						this.__finished(  contentHTML );
					}
				}
			}
			return this;
		},
		__finished : function ( htmlBlock ){
			var context = this.varSupport["contextForReset"];//precisei pegar esse contexto para referenciar o elemento que o usuario chamou a função
			var el = document.querySelector(context.element);//var ref : : O elemento html que o usuário setou
			el.insertAdjacentHTML('beforeend', htmlBlock );//Imprime no Dom o quizz
			return this;
		},
		finished : function( htmlBlock ){
			var htmlBlock = htmlBlock.toString();
			this.appearance['finishedHTML'] = htmlBlock ;
			this.appearance['finished'] = true;
			return this;
		},
		score : function(){
			//Retorna o score com acertos, erros, e número de questões
			return { 
				numberOfQuestions	: this.varSupport['numberOfQuestions'] ,
				right 					: this.varSupport['right'] ,
				errors 					: this.varSupport['errors'] 
			}
		},
		resetQuizz : function(){
			if(  this.appearance['oneByOne']  ){ 
				//O this[elemento#quizz] que o start estava utilizando e foi passado como refer para o resete
				var context = this.varSupport["contextForReset"];
				//O objeto que foi passado para o start refer para o resete
				var arrayObjectJson =  this.varSupport["preparingNewQuizz"];
				//estou pegando somente o elemento #quizz para limpar o html em caso de reset
				var quizzID = document.querySelector(  context.element  );
				//estou limpando toda a minha lista de quizz para colocar uma nova 
				while(  quizzID.firstChild  ){
					 quizzID.removeChild( quizzID.firstChild );
				}
				//estou resetando o score
				this.clearQuizz();
				//estou chamando novamente o start e adicionando os elementos no dom
				this.start.call(  context , arrayObjectJson  ) ;
			}else{
				console.error('[Quizz] resetQuizz() can not be initialized ::  To start configure too setOneByOne( true ) or config({ setOneByOne : true }) ');
			}
		},
		__selected : function (){
			//Return : Habilita a seleção do botão ao clicar sobre ele
			//Varre todos os inputs de nome radio, e adiciona função ao clicar add class selected e remove dos outros 
			var radios = document.querySelectorAll('input[name="quizz"]'); 
			 for (var i = 0; i < radios.length; i++) {	
				radios[i].addEventListener( 'click' , function(){
					for (var i = 0; i < radios.length; i++) {
						if (   ( radios[i].checked )  ){
							radios[i].parentNode.classList.add("selected");
						}
						else{
							radios[i].parentNode.classList.remove("selected");
						}
					}					
				});
			}
			return this;
		},
		__right : function(){
			this.varSupport['right'] += 1;
		},
		__errors : function(){
			this.varSupport['errors'] += 1;
		},

		clearQuizz : function(){
			var btnSendQuizz = document.querySelectorAll('button[id="QuizzSendBtn"]');
			btnSendQuizz.forEach( function(curr){
				curr.disabled = false;
			});
			//zera os acertos e erros e reseta o score 
			this.varSupport['right'] = 0 ;
			this.varSupport['errors']  = 0 ;
			var radios = document.querySelectorAll('input[name="quizz"]'); 
			//Limpa as classes de todos os inputs
	          	for (var i = 0; i < radios.length; i++) {
          		 	radios[i].checked = false;//Alterando os inputs checkados para false
				radios[i].parentNode.classList.remove("error","right","selected","copySelected",);
			}
			return this;
		}
		
	}
	
	window.Quizz = Quizz;

})();
