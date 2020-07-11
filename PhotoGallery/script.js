class model {
    imgs = [];
    doneImg = [];
    users = [{ name: 'aaa', email: 'a', password: 'aaaaaa' }];
    userLiked = [['a', []]];
    userInfo = {};
    curImg = [];
    logged = true;
    dark = false;
}

class view {

    m = new model;

    body = document.querySelector('body');
    searchPage = document.querySelector('.searchPart');
    likedPage = document.querySelector('.likedPart');
    loginPage = document.querySelector('.loginPart');
    signupPage = document.querySelector('.signupPart');
    contentPart = document.querySelector('.content');
    user = document.querySelector('.user');
    inpUsername = document.querySelector('.usernameInput');
    signUsername = document.querySelector('.usernamesign');
    inpPassword = document.querySelector('.passwordInput');
    signPassword = document.querySelector('.passwordsign');
    signEmail = document.querySelector('.emailsign');
    loginUserName = document.querySelector('.user');
    sUpLink = document.querySelector('.signupLnk');
    logoutLink = document.querySelector('.logoutLink');
    loginLnk = document.querySelector('.loginLnk');
    nameimginp = document.querySelector('.nameimginp');
    addimginp = document.querySelector('.addimginp');
    likeLink = document.querySelector('.likedLink');
    signMistakes = document.querySelector('.signMistakes');
    loginMistakes = document.querySelector('.loginMistakes');

    searchLink() {
        this.loginPage.style.display = 'none';
        this.signupPage.style.display = 'none';
        if (this.user.textContent != 'Привет, Гость') {
            this.contentPart.style.display = 'block';
        }
    }

    loginLink() {
        this.loginPage.style.display = 'block';
        this.signupPage.style.display = 'none';
    }

    signupLink() {
        this.loginPage.style.display = 'none';
        this.signupPage.style.display = 'block';
    }

    imgLoop() {
        for (let i = 1; i < 20; i++) {
            this.m.imgs.push('./img/' + i + '.jpg');
        }
    }

    imgs() {
        let aImg = 0;
        for (const img of this.m.imgs) {
            aImg++;
            if (this.m.doneImg.length == 0 || img != this.m.doneImg[aImg - 1]) {
                let imgCreate = document.createElement('img');
                imgCreate.id = img;
                imgCreate.src = img;
                this.contentPart.appendChild(imgCreate);
                this.m.doneImg.push(img);
            }
        }
    }

    logoutfunc() {
        this.loginLink();
        this.logoutLink.style.display = 'none';
        this.loginLnk.style.display = 'inline';
        this.sUpLink.style.display = 'inline';
        this.user.innerHTML = "Привет, Гость"
        this.contentPart.style.display = 'none';
    }
}

class controller {

    m = new model;
    v = new view;


    emailCheck() {
        let em = this.v.signEmail.value;
        let arrem = em.split('@');
        if (arrem.length > 1) {
            return true;
        }
        else {
            this.v.signMistakes.innerHTML = `Email должен иметь символ @`
            this.v.signMistakes.style.display = 'block';
            this.v.signMistakes.style.color = 'tomato';
        }
    }

    signup() {
        var a = 0;
        let em = this.emailCheck();
        if (this.v.signEmail.value && this.v.signPassword.value.length > 5 && this.v.signUsername.value.length > 2) {
            this.m.userInfo = { name: this.v.signUsername.value, email: this.v.signEmail.value, password: this.v.signPassword.value };
            for (const name of this.m.users) {
                if (this.m.userInfo.name != name.name && this.m.userInfo.email != name.email) {
                    a = 0;
                }

                else if (this.v.signUsername.value == name.name) {
                    a = 1;
                    this.v.signMistakes.innerHTML = 'Пользователь с таким никнеймом уже имеется!';
                    this.v.signMistakes.style.display = 'block';
                    this.v.signMistakes.style.color = 'tomato';
                }

                else {
                    a = 1;
                    this.v.signMistakes.innerHTML = 'Пользователь с такой почтой уже имеется!';
                    this.v.signMistakes.style.display = 'block';
                    this.v.signMistakes.style.color = 'tomato';
                }
            }

            if (a == 0 && em == true) {
                this.m.users.push(this.m.userInfo);
                this.v.loginLink();
                this.v.signEmail.value = '';
                this.v.signUsername.value = '';
                this.v.signPassword.value = '';
                this.v.signMistakes.style.display = 'none';
            }
        }

        else if (this.v.signUsername.value.length <= 2) {
            this.v.signMistakes.innerHTML = 'Никнейм должен иметь больше 2 символов!'
            this.v.signMistakes.style.display = 'block';
            this.v.signMistakes.style.color = 'tomato';
        }

        else if (this.v.signPassword.value.length <= 5) {
            this.v.signMistakes.innerHTML = 'Пароль должен иметь больше 5 символов!'
            this.v.signMistakes.style.display = 'block';
            this.v.signMistakes.style.color = 'tomato';
        }
    }

    login() {
        let a = 1;

        if (this.v.inpPassword.value && this.v.inpUsername.value) {
            for (const name of this.m.users) {
                if (this.v.inpUsername.value == name.name && this.v.inpPassword.value == name.password) {
                    a = 0;
                }

                else if (this.v.inpUsername.value != name.name) {
                    this.v.loginMistakes.style.display = 'block';
                    this.v.loginMistakes.innerHTML = 'Неправильный никнейм!'
                    this.v.loginMistakes.style.color = 'red';

                }

                else if (this.v.inpPassword.value != name.password) {
                    this.v.loginMistakes.style.display = 'block';
                    this.v.loginMistakes.innerHTML = 'Неправильный пароль!'
                    this.v.loginMistakes.style.color = 'red';
                }
            }

            if (a == 0) {
                if (this.m.logged == true) {
                    this.v.imgLoop();
                }
                this.v.loginUserName.innerHTML = 'Привет, ' + this.v.inpUsername.value;
                this.v.contentPart.style.display = 'block';
                this.v.logoutLink.style.display = 'inline';
                this.v.loginLnk.style.display = 'none';
                this.v.searchLink();
                this.v.sUpLink.style.display = 'none';
                this.v.inpPassword.value = '';
                this.v.inpUsername.value = '';
                this.v.imgs();
                this.v.loginMistakes.style.display = 'none';
                this.m.logged = false;
            }
        }
    }
}

let v = new view;
let c = new controller;