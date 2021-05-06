class Validator {
    validatePassword(password) {
        let regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regEx.test(password);
    };

    validateEmail(email) {
        let regEx = /\S+@\S+\.\S+/;
        return regEx.test(email);
    };

    validateNick(nick) {
        let regEx = /^[0-9a-zA-Z]{3,}$/;
        return regEx.test(nick);
    };
};
module.exports = new Validator();