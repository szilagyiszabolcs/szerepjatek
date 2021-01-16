let kuldetesek = document.getElementById("kuldetesek");
let karakter = document.getElementById("karakter");
kuldetesek.style.display = "none";
karakter.style.display = "none";
let osztalyvalaszto = document.getElementById("osztalyvalaszto");
let VanKarakter = false;
let XPBar = document.getElementById("bar");
let xp = 0;
let NextLevelXp = 100;
let lvl = 1;
let statpoint = 0;
let buttons = document.getElementsByClassName("gomb");
let story = document.getElementById("story");
let harcgomb = document.getElementById("harcgomb");
let harcveg = document.getElementById("harcvege");
harcveg.style.display = "none";
let LevelUpAudio = new Audio('lvlup.mp3');

let CharacterSheet =  {
    "dmg" : document.getElementById("sebzes"),
    "def" : document.getElementById("vedekezes"),
    "hp" : document.getElementById("eletero")
}

let ChosenEnemy = {
    "name" : document.getElementById("EnemyName"),
    "hp" : document.getElementById("EnemyHp"),
    "dmg" : document.getElementById("EnemyDmg"),
    "def" : document.getElementById("EnemyDef"),
    "xp" : document.getElementById("EnemyXp")
}

let stats_harcos = {
    "dmg" : 14,
    "def" : 10,
    "hp" : 60
}

let stats_demonvadasz = {
    "dmg" : 14,
    "def" : 12,
    "hp" : 50
}

let stats_tolvaj = {
    "dmg" : 10,
    "def" : 20,
    "hp" : 50
}

let stats = {
    "dmg" : 12,
    "def" : 14,
    "hp" : 60
}

let ellenfelek = [
    {
        "name" : "farkas",
        "hp" : 40,
        "dmg" : 6,
        "def" : 4,
        "xp" : 40
    },
    {
        "name" : "medve",
        "hp" : 70,
        "dmg" : 8,
        "def" : 2,
        "xp" : 60
    },
    {
        "name" : "útonálló",
        "hp" : 40,
        "dmg" : 9,
        "def" : 5,
        "xp" : 25
    },
    {
        "name" : "mágus",
        "hp" : 30,
        "dmg" : 14,
        "def" : 10,
        "xp" : 35
    },
    {
        "name" : "csontváz",
        "hp" : 70,
        "dmg" : 6,
        "def" : 3,
        "xp" : 50
    },
    {
        "name" : "óriás",
        "hp" : 70,
        "dmg" : 9,
        "def" : 1,
        "xp" : 65
    },
    {
        "name" : "gólem",
        "hp" : 80,
        "dmg" : 8,
        "def" : 2,
        "xp" : 70
    },
    {
        "name" : "szellem",
        "hp" : 40,
        "dmg" : 4,
        "def" : 12,
        "xp" : 60
    },
    {
        "name" : "pingvin",
        "hp" : 160,
        "dmg" : 20,
        "def" : 14,
        "xp" : 80
    },
    {
        "name" : "vaddisznó",
        "hp" : 60,
        "dmg" : 12,
        "def" : 4,
        "xp" : 70
    },
];

let KivalasztottEllenfel = ellenfelek[0];

function OsztalyValasztas(szam) {
    if (szam == 1) {
        stats.dmg = stats_harcos.dmg;
        stats.def = stats_harcos.def;
        stats.hp = stats_harcos.hp;
        document.getElementById("kep").src = 'harcos.jpeg';
    }

    else if (szam == 2) {
        stats.dmg = stats_demonvadasz.dmg;
        stats.def = stats_demonvadasz.def;
        stats.hp = stats_demonvadasz.hp;
        document.getElementById("kep").src = 'demonvadasz.jpg';
    }

    else {
        stats.dmg = stats_tolvaj.dmg;
        stats.def = stats_tolvaj.def;
        stats.hp = stats_tolvaj.hp;
        document.getElementById("kep").src = 'tolvaj.jpeg';
    }
    
    osztalyvalaszto.style.display = "none";
    karakter.style.display = "block";
    VanKarakter = true;
    updateCharSheet();
    RandomEnemy();
}

function valtas(szam) {
    if (VanKarakter == true) {
        if (szam == 1) {
            kuldetesek.style.display = "none";
            karakter.style.display = "block";
        }
    
        else {
            kuldetesek.style.display = "block";
            karakter.style.display = "none";
        }
    }

    else {
        alert("Még nem választottál osztályt!");
    }
}

function updateCharSheet() {
    CharacterSheet.dmg.innerHTML = stats.dmg;
    CharacterSheet.def.innerHTML = stats.def;
    CharacterSheet.hp.innerHTML = stats.hp;

    if (statpoint <= 0) {
        statpoint = 0;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none";
        }
    }

    else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "block";
        }
    }
}

function AddDmg() {
    stats.dmg++;
    statpoint--;
    updateCharSheet();
}

function AddDef() {
    stats.def++;
    statpoint--;
    updateCharSheet();
}

function AddHp() {
    stats.hp++;
    statpoint--;
    updateCharSheet();
}

function levelUp() {
    if (xp >= NextLevelXp) {
        xp = xp - NextLevelXp;
        statpoint+=5;
        updateCharSheet()
        NextLevelXp = Math.round(NextLevelXp * 1.2);
        LevelUpAudio.play();
    }
    XPBar.style.width = xp/NextLevelXp*100+"%";
}

function random_chance(){
    return Math.floor(Math.random()*100);
}


function RandomEnemy() {
    let randomszam = Math.floor(Math.random() * 10);
    KivalasztottEllenfel = ellenfelek[randomszam];
    ChosenEnemy.name.innerHTML = KivalasztottEllenfel.name;
    ChosenEnemy.hp.innerHTML = KivalasztottEllenfel.hp;
    ChosenEnemy.dmg.innerHTML = KivalasztottEllenfel.dmg;
    ChosenEnemy.def.innerHTML = KivalasztottEllenfel.def;
    ChosenEnemy.xp.innerHTML = KivalasztottEllenfel.xp;
}

function fight() {
    harcgomb.style.display = "none";
    let hpBeforeFight = stats.hp;
    let EnemyHpBeforeFight = KivalasztottEllenfel.hp;
    story.innerHTML = "Egy " + KivalasztottEllenfel.name + " megtámadott téged!<br>";

    let szamlalo = 0;
    let ellenfel_tamad = true;

    do {
        szamlalo++;
        story.innerHTML += "<br>"+szamlalo+". kör: ";
        let szazalek = random_chance();
        if(ellenfel_tamad) {
            let elkerules = 50 + stats.def;
            if(elkerules >= 95) elkerules = 95;

            if(szazalek < elkerules) {
                story.innerHTML += "Sikeresen hárítod a "+KivalasztottEllenfel.name+" ütését!<br>";
            }
            else{
                stats.hp -= KivalasztottEllenfel.dmg;
                
                story.innerHTML += "A "+KivalasztottEllenfel.name+" eltalál és megsebez! (-"+KivalasztottEllenfel.dmg+" élet, maradt: "+stats.hp+")<br>";
            }
        }

        else {
            let elkerules = 50 + KivalasztottEllenfel.def;
            if(elkerules >= 95) elkerules = 95;

            if(szazalek < elkerules) {
                story.innerHTML += "A "+KivalasztottEllenfel.name+" elkerüli a csapásodat!<br>";
            }

            else {
                KivalasztottEllenfel.hp -= stats.dmg;

                story.innerHTML += "Eltalálod a " +KivalasztottEllenfel.name+"-t! (-"+stats.dmg+" élet, maradt: "+KivalasztottEllenfel.hp+")<br>";
            }
        }

        ellenfel_tamad = !ellenfel_tamad;
    } while (stats.hp > 0 && KivalasztottEllenfel.hp > 0 && szamlalo < 10);

    if (stats.hp <= 0) {
        story.innerHTML += "<br>Ellenfeled felülkerekedett rajtad. Csalódottan hazakullogsz.";
    }
    else if (KivalasztottEllenfel.hp <= 0) {
        story.innerHTML += "<br>Sikeresen legyőzted ellenfeledet. Begyűjtöd a trófeát, és hazamész.<br>Szerzett tapasztalati pont: "+KivalasztottEllenfel.xp+".";
        xp += KivalasztottEllenfel.xp;
        levelUp();
    }
    else {
        story.innerHTML += "<br>Órákon át tartó küzdelem után egyikőtök sem tudja legyőzni a másikat. Kezet ráztok, majd mindketten hazamentek.";
    }

    KivalasztottEllenfel.hp = EnemyHpBeforeFight;
    stats.hp = hpBeforeFight;
    harcveg.style.display = "block";
}

function harcvege() {
    story.innerHTML = "";
    RandomEnemy();
    updateCharSheet();
    harcgomb.style.display = "block";
    harcveg.style.display = "none";
}