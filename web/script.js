

var mdelLoaded = false;

// Update maximal output token
function updateValue(value) {
    document.getElementById("sliderValue").innerText = value;
    eel.get_slider_value(value)();
}


function setSliderValue() {
    document.getElementById("mySlider").value = 20;
    updateValue(20);
}


function loadModel() {
    eel.loadModel();
}









function isModelLoaded() {
    eel.isModelLoaded()(isModelLoadedCallback);
}


function isModelLoadedCallback(result) {
    console.log("Is model loaded:", result);
    mdelLoaded = result
}






  
  
function unloadModel() {
    eel.unloadModel();
}
   



eel.expose(writeLLMOutput);
function writeLLMOutput(text) {

  
  var elements = document.querySelectorAll('.botResponseText');
  var lastElement = elements[elements.length - 1];


  var text = insertBackticks(text)
  var text = text.replace(/\n/g, "  \n");

  // Marked.js wird verwendet, um den Markdown-Text zu HTML zu konvertieren
  var htmlText = marked.parse(text);
  lastElement.innerHTML = htmlText;

  //document.getElementById("submitButton").textContent = "Stop";
  //document.getElementById("submitButton").style.width = "80px";


  addcode();
  var container = document.getElementById("container");
  Prism.highlightAllUnder(container);

  scrollSmoothly(container);

}



function addBotResponseText(input) {

    // Neues div-Element erstellen
    var outputContainer = document.createElement("div");
    outputContainer.className = "output-container";

    // Div für das Symbol erstellen
    var iconDiv = document.createElement("div");
    iconDiv.className = "MessageIconAI";
    var iconText = document.createElement("p");
    iconText.className = "botResponseTextIcon";
    iconText.textContent = "⚇";
    iconDiv.appendChild(iconText);
    outputContainer.appendChild(iconDiv);

    // Div für den Textcontainer erstellen
    var textContainerDiv = document.createElement("div");
    textContainerDiv.className = "botResponseTextContainer";

    // Div für den Textkopf erstellen
    var textHeadDiv = document.createElement("div");
    textHeadDiv.className = "botResponseTextHead";
    var textHeadSpan = document.createElement("span");
    textHeadSpan.className = "botResponseTextAI";
    textHeadSpan.textContent = "Bot";
    textHeadDiv.appendChild(textHeadSpan);
    textContainerDiv.appendChild(textHeadDiv);

    // Div für die Bot-Antwort erstellen
    var botResponseDiv = document.createElement("div");
    botResponseDiv.className = "botResponse";
    var botResponseSpan = document.createElement("span");
    botResponseSpan.className = "botResponseText font";
    //botResponseSpan.textContent = "No generated answer.";
    //botResponseSpan.style.fontStyle = "italic";
    //botResponseSpan.style.color = "#aaaaaa";



    botResponseDiv.appendChild(botResponseSpan);
    textContainerDiv.appendChild(botResponseDiv);

    // Die Text-Container-Div dem Output-Container hinzufügen
    outputContainer.appendChild(textContainerDiv);

    // Den erstellten Output-Container zum vorhandenen Container hinzufügen
    var existingContainer = document.getElementById("container");
    existingContainer.appendChild(outputContainer);

    Prism.highlightAllUnder(existingContainer);
    scrollSmoothly(existingContainer, true);
}




function addUserInput(input) {

    // Neues div-Element erstellen
    var outputContainer = document.createElement("div");
    outputContainer.className = "input-container";

    // Div für das Symbol erstellen
    var iconDiv = document.createElement("div");
    iconDiv.className = "MessageIconAI";
    var iconText = document.createElement("p");
    iconText.className = "botResponseTextIcon";
    iconText.textContent = "☺";
    iconDiv.appendChild(iconText);
    outputContainer.appendChild(iconDiv);

    // Div für den Textcontainer erstellen
    var textContainerDiv = document.createElement("div");
    textContainerDiv.className = "botResponseTextContainer";

    // Div für den Textkopf erstellen
    var textHeadDiv = document.createElement("div");
    textHeadDiv.className = "botResponseTextHead";
    var textHeadSpan = document.createElement("span");
    textHeadSpan.className = "botResponseTextAI";
    textHeadSpan.textContent = "You";
    textHeadDiv.appendChild(textHeadSpan);
    textContainerDiv.appendChild(textHeadDiv);

    // Div für die Bot-Antwort erstellen
    var botResponseDiv = document.createElement("div");
    botResponseDiv.className = "botResponse";

    //var botResponseSpan = document.createElement("span");
    var botResponseSpan = document.createElement("textarea");
    botResponseSpan.className = "botResponseText userInputArea font";
    botResponseSpan.setAttribute("readonly", "true"); // Textarea schreibgeschützt machen

    var textContent = input.trim();


    botResponseSpan.textContent = textContent;
    botResponseDiv.appendChild(botResponseSpan);
    textContainerDiv.appendChild(botResponseDiv);

    // Die Text-Container-Div dem Output-Container hinzufügen
    outputContainer.appendChild(textContainerDiv);

    // Den erstellten Output-Container zum vorhandenen Container hinzufügen
    var container = document.getElementById("container");
    container.appendChild(outputContainer);
    

    var lineCount = (botResponseSpan.value.match(/\n/g) || []).length + 1;

    botResponseSpan.style.height = (lineCount*30)+"px";    
    botResponseSpan.style.maxHeight = (lineCount*30)+"px";    

    if ((lineCount*30) >= 900){
      botResponseSpan.style.maxHeight = "900px";    
    } 

    if (botResponseSpan.scrollHeight <= 60){
      botResponseSpan.style.height = "30px";
    }

    if (isVerticalScrollbarVisible(botResponseSpan)) {

      botResponseSpan.style.height = botResponseSpan.scrollHeight + 'px';
      botResponseSpan.style.maxHeight = "900px";    
    }

    scrollSmoothly(container, false);
}




function isVerticalScrollbarVisible(textarea) {
  return textarea.scrollHeight > textarea.clientHeight;
}



function isModelLoaded(callback) {
    eel.isModelLoaded()(function(result) {
        console.log("Is model loaded:", result);
        callback(result);
    });
}








  


document.getElementById('toggleSidebarBtn').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var button = document.getElementById('toggleSidebarBtn');
    var container = document.querySelector('.content_frame');

    var output_container = document.querySelector('.output-container');
    var input_container = document.querySelector('.input-container');

    const sidebarElements = document.querySelectorAll('.sidebarElement');
    
    if (sidebar.style.width === '25px') {
        sidebar.style.width = '350px';
        button.textContent = '‹';
        
        container.style.width = ''; 
        container.style.paddingLeft = ''; 
        container.style.maxWidth = ''; 
        container.style.left = '';

        if (output_container && input_container) {
            output_container.style.maxWidth = '';
            input_container.style.maxWidth = '';
        }

        sidebarElements.forEach(function(element) {
          element.style.display = '';
        });


    } else {
        
        sidebar.style.width = '25px';
        button.textContent = '›';

        sidebarElements.forEach(function(element) {
          element.style.display = 'none';
        });

        container.style.width = 'calc(100% - 40px)';
        container.style.left = '-320px'; // Sidebar

        if (output_container && input_container) {
            output_container.style.maxWidth = '1400px';
            input_container.style.maxWidth = '1400px';
        }
    }
});






var container = document.getElementById("container");
var lastScrollTop = 0;
var isScrollingUp;

container.addEventListener('scroll', function() {
    var currentScrollTop = container.scrollTop; // Aktuelle Scrollposition

    // Überprüfe, ob der Benutzer nach oben scrollt
    isScrollingUp = currentScrollTop < lastScrollTop;

    // Aktualisiere die vorherige Scrollposition
    lastScrollTop = currentScrollTop;
});





function scrollSmoothly(container) {
  var visibleHeight = container.clientHeight;
  var scrollHeight = container.scrollHeight;
  var duration = 1000;
  var increment = 20;
  var startTime = null;
  var startScroll = container.scrollTop;

  
  if ((container.scrollTop + visibleHeight >= scrollHeight) && !isScrollingUp) {
      function easeOutCubic(t) {
          return (--t) * t * t + 1;
      }

      function animateScroll(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsedTime = timestamp - startTime;
          var progress = Math.min(elapsedTime / duration, 1);

          container.scrollTop = startScroll + (scrollHeight - startScroll) * easeOutCubic(progress);

          if (progress < 1) {
              window.requestAnimationFrame(animateScroll);
          }
      }
      window.requestAnimationFrame(animateScroll);
  }
}





  function setDefaultButtons() {
    selectButton(2, 'group1');
    selectButton(2, 'group2');
    selectButton(2, 'group3');

  }


  // Standard-Buttons beim Laden der Seite setzen
window.onload = function() {
    setDefaultButtons();
  };


  function selectButton(selectedIndex, group) {
    var buttons = document.querySelectorAll('.selectable-button.' + group);
    
    buttons.forEach(function(button, index) {
      if (index + 1 === selectedIndex) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });


    getSelectedButtons()

  }




  function getActiveButtons(group) {
    var activeButtons = [];
    var buttons = document.querySelectorAll('.selectable-button.' + group);
  
    buttons.forEach(function(button, index) {
      if (button.classList.contains('selected')) {
        activeButtons.push(index + 1); // Index des aktiven Buttons
      }
    });
  
    return activeButtons;
  }


  function getSelectedButtons(){
        var activeButtonsGroup1 = getActiveButtons('group1');
        console.log("Aktive Buttons in Gruppe 1: ", activeButtonsGroup1);

        var activeButtonsGroup2 = getActiveButtons('group2');
        console.log("Aktive Buttons in Gruppe 2: ", activeButtonsGroup2);

        var activeButtonsGroup3 = getActiveButtons('group3');
        console.log("Aktive Buttons in Gruppe 3: ", activeButtonsGroup3);
  }



















  



  function adjustTextareaHeight(textarea) {

    textarea.style.height = "5px";
    textarea.style.height = (textarea.scrollHeight)+"px";
  }

  function convertToEntities(htmlText) {
    return htmlText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}




function handleKeyPress(event) {
  
  if (event.keyCode === 9) {   // Überprüfe, ob die Taste die Tabulatortaste ist (keyCode 9)

      event.preventDefault();

      var textarea = event.target;
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var tab = '    '; 
      textarea.value = textarea.value.substring(0, start) + tab + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + tab.length;
  }

  var inputText = document.getElementById("textInput").value;
  var tag = document.getElementById("textInput");

  // Wenn Escape (27) oder Entf (46) gedrückt wurde
  if (event.keyCode === 27 || event.keyCode === 46) {
      document.getElementById("textInput").value = "";
      tag.style.height = "40px";
  }

  // Wenn Enter (13) gedrückt wurde
  if (event.keyCode === 13 && inputText.trim() !== "" && !event.shiftKey) {
      executeAction();
  }
}

// Funktion wird aufgerufen, wenn der Button geklickt wird
document.getElementById("submitButton").onclick = function() {

  var inputText = document.getElementById("textInput").value;
  if (inputText.trim()){
    executeAction();
  }
};

// Funktion, um die Aktion auszuführen
function executeAction() {
  var inputText = document.getElementById("textInput").value;
  var tag = document.getElementById("textInput");

  isModelLoaded(function(loaded) {
      if (!loaded) {
          document.getElementById("textInput").value = "";
          tag.style.height = "40px";
          return;
      }
      eel.receiveTextAndEnter(inputText, true);
      document.getElementById("textInput").value = "";
      tag.style.height = "40px";
      addUserInput(inputText);
      addBotResponseText("");
      var numberOfElements = document.querySelectorAll('.botResponseText').length;
      console.log("Anzahl der .botResponseText-Elemente: " + numberOfElements);
  });
}























function insertBackticks(text) {
  // Überprüfen, ob der Text "```" enthält
  if (text.includes('```')) {
    // Wenn ja, den Text unverändert zurückgeben
    return text;
  } else {
    return text.replace(/<([^>]+)>/g, '`<$1>`');
  }
}



    function addcode() {
      var codeElements = document.querySelectorAll("pre code");
      codeElements.forEach(function(element) {
          if (!element.classList.contains("language-java")) {
              element.classList.add("language-java");
          }
      });
      Prism.highlightAll();
  };
