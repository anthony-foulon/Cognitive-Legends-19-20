/* ------------ global variables ------------ */

var database = "";


/* ------------- nav management ------------- */

function nav_management() {
    document.getElementsByTagName("body")[0].classList.toggle("show_body");
    document.getElementById("navbar").classList.toggle("navbar");
    document.getElementById("nav").classList.toggle("show_nav");
}

/* remove the nav when clicking away */
window.onclick = function(event) {
    var nav = document.getElementById("nav");
    for (var i = 0; i < nav.length; i++) {
        var openDropdown = nav[i];
        if (openDropdown.classList.contains('show_nav')) {
            openDropdown.classList.remove('show_nav');
            openDropdown.classList.remove('navbar');
        }
    }
} 


/* ----------------- update ----------------- */

function update(kind, name){
    var txt = "";
    var name_place = document.getElementById('class_name');
    var description_place = document.getElementById('class_info');
    var img_place = document.getElementById('img_content');

    name_place.innerHTML = database[kind][name].nom;
    description_place.innerHTML = "<p>"+database[kind][name].description+"</p>";
    if (["heros", "mechants"].includes(kind)) {
        txt = "<img src=\"./utils/img/"+kind+"/"+name+"/"+name+".png\"";
        
        if (kind == "heros") {
            document.getElementById('force').innerHTML = database[kind][name].force
            document.getElementById('intelligence').innerHTML = database[kind][name].intelligence
            document.getElementById('agilite').innerHTML = database[kind][name].agilite
            document.getElementById('bagou').innerHTML = database[kind][name].bagou
        } else {
            document.getElementById('difficulte').innerHTML = database[kind][name].difficulte
            document.getElementById('attaque').innerHTML = database[kind][name].attaque
            document.getElementById('defense').innerHTML = database[kind][name].defense
        }
        
    } else {
        txt = "<img src=\"./utils/img/"+kind+"/"+name+".png\"";
    }
    txt += "alt=\"image "+name+"\">";
    img_place.innerHTML = txt; 
}


/* ----------- chargement dynamique ----------- */

function chargement(kind) {
    var xmlhttp, x, txt = "";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            database = JSON.parse(this.responseText);
            for (name in database[kind]) {
                txt += "<img class=\"link_class\" onclick=\"update('"+kind+"','"+name+"')\"";
                
                if (["heros", "mechants"].includes(kind)) {
                    txt += "src=\"./utils/img/"+kind+"/"+name+"/"+name+"_head.png\"";
                } else {
                    txt += "src=\"./utils/img/"+kind+"/"+name+".png\"";
                }
                txt += "alt=\"image "+name+"\">"
            }
            document.getElementById("class_list").innerHTML += txt;
        }
    };
    xmlhttp.open("GET", "utils/js/data.json", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send()
}
