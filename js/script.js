/*--CALL_BASE_FUNCTIONS-----------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
  check_language(); check_theme();

  var theme = localStorage.getItem('local_theme');

  // funzione rallentata per un bug del toggle
  setTimeout(function() {
      if ( theme == "dark" )
        document.getElementById("chk").checked = true;
        else 
        document.getElementById("chk").checked = false;

    }, 50);


    setTimeout(function() {
      // cambiata lingua e cambiato tema, mostro il body
      document.body.style.visibility = "visible";
      }, 60);


}, false);


/* -------------- CHANGE THEME --------------------------------------------------- */

/*----TOGGLE_CHANGE_THEME---------------------------*/

const chk = document.getElementById('chk');
chk.addEventListener('change', () => {
document.getElementsByClassName("ball")[0].style.transition = "transform .2s linear"; //attivo l'animazione con il click
document.body.style.transition = "0.8s";            // attivo l'animazione dei colori 
if ( document.getElementById("chk").checked == true)  //se ho premuto il bottone passo al tema scuro
    change_theme('dark');
else         
    change_theme('light');

});

/*------------------------------------------------*/


//SECOND ONLOAD FUNCTION (AFTER LANGUAGE)

function check_theme() {
  var theme = localStorage.getItem('local_theme');

  if (theme == 'dark') {
      change_theme('dark');
  }
  else if (theme == 'light')
      change_theme('light');

  else {    //imposto di default lo stesso tema del computer 

          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)  {
              change_theme('dark'); 
            }
          else  {
              change_theme('light'); 
            }
  }
       
}



// funzione che imposta il nuovo href (link css) nella pagina html corrente
function change_theme(color_of_theme){
  var link_css = document.getElementById("theme"); //tema è l'intero link css che sta nell'html
  //var url_loc = $("#theme").attr("href");          //url_loc cattura il contenuto SCRITTO di href
  var url_loc = theme.getAttribute("href"); 

  var url;                                         //url finale che va immesso nell'href del link css

  if ( url_loc.includes("../../") ) {      //se l'html è all'interno della directory pages

        if (color_of_theme=="light") 
            url='../../css/light.css';

        else 
            url='../../css/dark.css';
  }

  else if ( url_loc.includes("../") ) {      //se l'html è all'interno della directory pages

    if (color_of_theme=="light") 
        url='../css/light.css';
        
    else 
        url='../css/dark.css';
  }

  else {                                       //se sono nella home directory (website)
        if (color_of_theme=="light") 
            url='css/light.css';
        
        else 
            url='css/dark.css';
      }

    

  link_css.setAttribute('href', url);                            // IMPOSTO IL NUOVO HREF PER IL LINK CSS NELL'HTML
  localStorage.setItem('local_theme', color_of_theme);   //salvo il colore del tema nello storage   

}

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------LANGUAGE---------------------------------------------------------------------------------*/
var array_tags_it = [];
var array_tags_en = [];
var array_contents_it = []; 
var array_contents_en = []; 

// chiamata e funzione che salvano il contenuto e i tag in un array
convert_languages_array();
function convert_languages_array() {
var n;

// per la lingua italiana
n = 0;                              //contatore array;
for (var tag in it) {
array_tags_it.push(tag);           //array aggiunge un tag
array_contents_it.push(it[tag]);  //array aggiunge un contenuto di tag      
n++; 
}   

// contenuto per la lingua inglese                  
n = 0;                              //contatore array;
for (var tag in en) {
array_tags_en.push(tag);           //array aggiunge un tag
array_contents_en.push(en[tag]);  //array aggiunge un contenuto di tag      
n++;    
}
}

// funzione che si avvia all'inizio 
function check_language()  { 
var language = localStorage.getItem('local_language');
if (language == 'en') 
set_lang("en");

else if (language == 'it')    
set_lang("it");

else {   //nessuna lingua impostata, quindi carico quella del browser
var language = navigator.language || navigator.userLanguage; 
if (language.includes("it") || language.includes("IT") || language.includes("It") || language.includes("ita") || language.includes("Ita") || language.includes("ITA")) 
  set_lang("it");
else    
  set_lang("en");
}
}

// funzione che si avvia quando cambio lingua
function switch_language() {
var language = localStorage.getItem('local_language');
if (language == 'en') 
set_lang("it");
else 
set_lang("en");
}




// funzione che carica la nuova lingua e salva la preferenza in storage
function set_lang(language) {
if (language == "it") {
localStorage.setItem('local_language', 'it');

var n = array_tags_it.length; 
for (c=0; c<n; c++) {
  try {
      //try with id
      document.getElementById(array_tags_it[c]).innerHTML = array_contents_it[c];

  } catch (error) {

      try {
          //try with class
          document.getElementsByClassName(array_tags_it[c])[0].innerHTML = array_contents_it[c];
          } catch (error) {
              //use tagname
              document.getElementsByTagName(array_tags_it[c])[0].innerHTML = array_contents_it[c];
          }
  }
}
}

else {
localStorage.setItem('local_language', 'en');
var n = array_tags_en.length; 
for (c=0; c<n; c++) {
  try {
      document.getElementById(array_tags_en[c]).innerHTML = array_contents_en[c];
  } catch (error) {
              try {
              //console.log("error");
              document.getElementsByClassName(array_tags_en[c])[0].innerHTML = array_contents_en[c];
              // expected output: ReferenceError: nonExistentFunction is not defined
              } catch (error) {
                  document.getElementsByTagName(array_tags_en[c])[0].innerHTML = array_contents_en[c];
              }
  }
}
}

print_age();
top_bar_function();
}


/*----UPGRADE AGE----------------------------------------------------*/

function print_age() {
    //calcualte age
    var dob = new Date("09/27/2000");   //my birthday
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();    
    var age = Math.abs(year - 1970);

    //print 
    try {
        var language = localStorage.getItem('local_language');
        if (language == 'en') 
            document.getElementById("my_age").innerHTML = "My name is Gabriele and I'm " + age + ' years old';
        else 
            document.getElementById("my_age").innerHTML = 'Mi chiamo Gabriele e ho ' + age + ' anni';

      } catch (error) {
        null;
      }
}

/*--TOP_BAR-----------------------------------------------------------*/
window.onscroll = function() {top_bar_function()};

function top_bar_function() {
        try {
          var home_nav = document.getElementById("home_nav");

          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                home_nav.style.height = "50px"; 
                home_nav.style.backgroundColor = "black"; 
          }
              else {
                home_nav.style.height = "90px"; 
                home_nav.style.backgroundColor = "transparent"; //la rimetto trasparente se torno in cima
              }

        } catch (error) {
              null;
        }

      // link  "back_to_top" if I scroll the page
        try {
          var back_to_top = document.getElementById("back_to_top");

          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                back_to_top.style.visibility = "visible";
          }
              else {
                back_to_top.style.visibility = "hidden";
              }

        } catch (error) {
            null;
        } 

}
/*----SHOW_INFOWINDOW ONLY IN INDEX.HTML------------------------------------------------*/

function show_infowindows() { 
    var windows = localStorage.getItem('local_infowindows');
    if (windows == null) {  //is the first time I open the webpage ?
        document.getElementById("info_theme").style.visibility = "visible";
        setTimeout(() => { 
            document.getElementById("info_theme").style.visibility = "hidden";
        }, 2800);

		    setTimeout(() => { 
            document.getElementById("info_language").style.visibility = "visible";
        }, 2800);
        
        setTimeout(() => { 
            document.getElementById("info_language").style.visibility = "hidden";
        }, 5600);
        localStorage.setItem('local_infowindows', "already_loaded");   //saved the info in the storage
    }

}

/*----LOADING IMAGES AFTER PAGE IS LOADED-------------------------------------------*/

(function() {
	var elements = document.querySelectorAll('img[data-src]');
	var index = 0;
	var lazyLoad = function() {	
		if(index >= elements.length) return;
		var item = elements[index];	
		if((this.scrollY + this.innerHeight) > item.offsetTop) {			
			var src = item.getAttribute("data-src");
			item.src = src;
			item.addEventListener('load', function() {
				item.removeAttribute('data-src');    	 
			});     	
			index++;
			lazyLoad();
		}
	};
	var init = function() {
		window.addEventListener('scroll', lazyLoad);
		lazyLoad();
	};
	return init();
})();


/*----SMOOTH EFFECT--------------------------------------------------------*/

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/*-----------------------------------------------------------------------*/

