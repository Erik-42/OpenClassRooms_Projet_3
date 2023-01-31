let ID = 'admin';
let PWD = 'admin';
function Compare(mail, password) {
    if (mail == ID & password == PWD) {
        document.write('Bienvenue');
    } else {
        document.write('Accés Refusé');
    }
}
