class Utils {

    static prefixUser = 'http://localhost:8000/asset/img/user/';
    static prefixLogo = 'http://localhost:8000/asset/img/logo/';

    static writeNumber(nb){
        nb = String(nb);
        if (nb > 999 && nb < 1000000) {
            let tamp = nb.slice(0, -3);
            nb = tamp + ' k';
        }
        else if (nb > 999999) {
            let fNb = nb.slice(0, 1);
            let sNb = nb.slice(1, 2);
            nb = `${fNb},${sNb} M`;
        }
        return nb;
    }
}

export default Utils;