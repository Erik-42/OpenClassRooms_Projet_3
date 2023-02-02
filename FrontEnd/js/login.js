//localStorage.clear()
document.getElementById("connect").onclick = function (event) {
    document.getElementById("password").select();

    //methode 1
    let ID = 'admin';
    let PWD = 'admin';
    function compareLogin(mail, password) {
        if (mail == ID & password == PWD) {
            document.write('Bienvenue');
        } else {
            document.write('Accés Refusé');
        }
    }