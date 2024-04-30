const firebaseConfig = {
    apiKey: "AIzaSyCCznh8WEdpoiFxGQqDCuN9DCe4XR8Yw-M",
    authDomain: "quierohablar-e860c.firebaseapp.com",
    projectId: "quierohablar-e860c",
    storageBucket: "quierohablar-e860c.appspot.com",
    messagingSenderId: "591388910225",
    appId: "1:591388910225:web:ad4777883e9407287f1530"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var cChat = db.collection('Chat');

var lista = document.querySelector('ul');

var msg = function (conteudo) {
    var l = document.createElement('li');

    var n = document.createElement('h2');
    n.innerHTML = conteudo.nome + ':';
    l.appendChild(n);

    var men = document.createElement('h3');
    men.innerHTML = conteudo.mensagem;
    l.appendChild(men);

    return l;
};

cChat.orderBy('data', 'desc').onSnapshot(function (qs) {
    lista.innerHTML = '';
    var i;
    for (i = 0; i < qs.docs.length; i++) {
        var c = qs.docs[i].data();

        lista.append(msg(c));
    }
});

var envio = function () {
    var nome = document.querySelector('#idNome').value;
    var mensagem = document.querySelector('#idMensagem').value;

    if (!nome.trim() || !mensagem.trim()) {
        alert('Por favor, preencha ambos os campos.');
        return;
    }

    var novoChat = {
        nome: nome,
        mensagem: mensagem,
        data: firebase.firestore.FieldValue.serverTimestamp()
    };
    cChat.add(novoChat);
    document.querySelector('#idNome').value = '';
    document.querySelector('#idMensagem').value = '';
};
