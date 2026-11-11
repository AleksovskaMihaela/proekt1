
function prikazi(id, klasa) {
    var delovi = document.getElementsByClassName(klasa);
    for (var i = 0; i < delovi.length; i++) delovi[i].hidden = true;
    document.getElementById(id).hidden = false;
    document.getElementById(id).scrollIntoView();
}

function otvoriGalerija(id) {
    prikazi(id, 'gradska-galerija');
}

function otvoriVodic(id) {
    document.getElementById('porakaVodic').hidden = true;
    prikazi(id, 'vodic');
}

function dodadiLike(id) {
    var broj = document.getElementById(id);
    broj.textContent = parseInt(broj.textContent) + 1;
}

function dodadiKomentar(poleId, listaId) {
    var pole = document.getElementById(poleId);
    if (pole.value.trim() == '') return;
    var komentar = document.createElement('li');
    komentar.textContent = pole.value.trim();
    document.getElementById(listaId).appendChild(komentar);
    pole.value = '';
}

function oznaciMeni(link) {
    var linkovi = document.getElementsByClassName('meni-link');
    for (var i = 0; i < linkovi.length; i++) linkovi[i].className = 'meni-link';
    link.className = 'meni-link izbrano';
}

function dodadiDestinacija() {
    var ime = document.getElementById('posakuvanaDestinacija').value.trim();
    var denovi = parseInt(document.getElementById('brDenovi').value);
    var budzet = parseInt(document.getElementById('planiranBudzet').value);
    var kategorija = document.getElementById('kategorija').value;
    if (ime == '' || !(denovi > 0) || !(budzet >= 0)) return;

    var nov = document.createElement('div');
    nov.className = 'col-md-4 mb-3 plan-destinacija';
    nov.innerHTML = '<div class="plan-karticka"><h4></h4><p class="plan-kategorija"></p><p></p>' +
        '<p>Планиран буџет: <span class="plan-budzet"></span> €</p>' +
        '<button type="button" class="btn btn-sm" onclick="izbrisiDestinacija(this)">Избриши</button></div>';
    nov.getElementsByTagName('h4')[0].textContent = ime;
    var podatoci = nov.getElementsByTagName('p');
    podatoci[0].textContent = kategorija;
    podatoci[1].textContent = 'Денови: ' + denovi;
    nov.getElementsByClassName('plan-budzet')[0].textContent = budzet;
    document.getElementById('listaDestinacii').appendChild(nov);
    document.getElementById('posakuvanaDestinacija').value = '';
    document.getElementById('brDenovi').value = '';
    document.getElementById('planiranBudzet').value = '';
    filtriraj();
}

function izbrisiDestinacija(kopce) {
    var karticka = kopce.parentNode.parentNode;
    karticka.parentNode.removeChild(karticka);
    filtriraj();
}

function filtriraj() {
    var limit = document.getElementById('filterBudzet').value;
    var kategorija = document.getElementById('filterKategorija').value;
    var karticki = document.getElementsByClassName('plan-destinacija');
    var broj = 0;
    for (var i = 0; i < karticki.length; i++) {
        var budzet = parseInt(karticki[i].getElementsByClassName('plan-budzet')[0].textContent);
        var tip = karticki[i].getElementsByClassName('plan-kategorija')[0].textContent;
        var odgovara = (limit == '' || budzet <= Number(limit)) && (kategorija == '' || tip == kategorija);
        karticki[i].hidden = !odgovara;
        if (odgovara) broj++;
    }
    document.getElementById('porakaFilter').textContent = 'Прикажани дестинации: ' + broj;
}

function resetFiltri() {
    document.getElementById('filterBudzet').value = '';
    document.getElementById('filterKategorija').value = '';
    filtriraj();
}

function presmetajPatniTrosoci() {
    var bilet = parseInt(document.getElementById('cenaBilet').value);
    var kuferi = parseInt(document.getElementById('brojKuferi').value);
    if (!(bilet >= 0) || !(kuferi >= 0)) return;
    document.getElementById('prikazBilet').textContent = 'Билет: ' + bilet + ' €';
    document.getElementById('prikazKuferi').textContent = 'Куфери: ' + kuferi + ' × 100 €';
    document.getElementById('prikazTrosoci').textContent = 'Вкупно: ' + (bilet + kuferi * 100) + ' €';
    document.getElementById('rezultatTrosoci').hidden = false;
}

function prikaziOcena() {
    document.getElementById('vrednostOcena').textContent = document.getElementById('ocena').value;
}

function ispratiAnketa() {
    var ime = document.getElementById('ime').value;
    var polinja = document.getElementById('formaAnketa').getElementsByTagName('input');
    var grad = '', dopadnato = '';
    for (var i = 0; i < polinja.length; i++) {
        if (polinja[i].checked && polinja[i].name == 'grad') grad = polinja[i].value;
        if (polinja[i].checked && polinja[i].name == 'dopadnato') {
            if (dopadnato != '') dopadnato += ', ';
            dopadnato += polinja[i].value;
        }
    }
    if (dopadnato == '') dopadnato = 'Нема избрана опција';
    var predlog = document.getElementById('komentar').value;
    if (predlog == '') predlog = 'Нема предлог';
    var odgovori = ['Име: ' + ime, 'Е-пошта: ' + document.getElementById('email').value,
        'Тип патување: ' + document.getElementById('tip').value, 'Дестинација: ' + grad,
        'Најмногу ми се допадна: ' + dopadnato,
        'Оцена: ' + document.getElementById('ocena').value + '/10', 'Предлог: ' + predlog];
    var lista = document.getElementById('odgovoriAnketa');
    lista.textContent = '';
    for (var j = 0; j < odgovori.length; j++) {
        var li = document.createElement('li');
        li.textContent = odgovori[j];
        lista.appendChild(li);
    }
    document.getElementById('anketaPoraka').textContent = 'Ти благодарам, ' + ime + '!';
    document.getElementById('rezultatAnketa').hidden = false;
}

function najava() {
    var ime = document.getElementById('korisnickoIme').value;
    var lozinka = document.getElementById('lozinka').value;
    var poraka = 'Погрешно корисничко име или лозинка.';
    if (ime == 'mihaela' && lozinka == '1234') poraka = 'Добредојде, ' + ime + '!';
    document.getElementById('porakaNajava').textContent = poraka;
    document.getElementById('lozinka').value = '';
}

filtriraj();

