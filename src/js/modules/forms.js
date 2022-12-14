export function forms() {
   const tips = {
      tipsEn: {
         required: "Pole obowiązkowe",
         requiredPhone: "Wpisz numer telefonu",
         requiredName: "Wpisz imię",
         requiredMail: "Wpisz adres e-mail",
         requiredText: "Wpisz tekst",
         lengthMinName: "Minimum 2 znaki",
         lengthMinPassword: "Co najmniej 4 znaki",
         easyPassword: "Tylko znaki łacińskie z literami lub cyframi. Długość musi mieć od 5 do 15 znaków",
         validEmail: "Wpisz poprawny format poczty",
         validPhone: "Wpisz poprawny numer telefonu",
         onlyNumbers: "Tylko cyfry",
         validName: "Tylko litery",
         formatFile: "Niepoprawny format pliku",
         sizeFile: "Rozmiar pliku musi wynosić do 2 MB",
         success: "ok",
         conform: "Pola hasła nie pasują do siebie",
         lengthMinMessage: "Minimum 10 znaków",
         phonePrefix: "Zaczynając od '+'"
      }
   }

   const forms = document.querySelectorAll('._valid-form');
   if (forms.length > 0) {
      forms.forEach(form => {
         const btn = form.querySelector('button[type="submit"]');
         const tips = form.querySelectorAll('.tips');
         const validInput = form.querySelectorAll('._valid-input');
         validInput.forEach(elem => {
            elem.addEventListener("focus", () => focus(elem));
            checkInputsValueBlur(form);
         });
         if (!btn) return;
         btn.addEventListener("click", function (e) {
            e.preventDefault();
            validInput.forEach(elem => {
               checkInput(elem);
            });
            [...tips].some(span => span.classList.contains('tips-wrong')) ? alert('Заполни поля все') : alert('Красаучик');
         });
      });
   }

   function focus(elem) {
      elem.classList.add('focus');
   }

   function checkInputsValueBlur(form) {
      form.addEventListener('click', (e) => {
         if (e.target.closest('._valid-form') && e.target.classList.contains('_valid-input')) {
            e.target.addEventListener('blur', () => {
               e.target.classList.remove('focus');
               if (!e.target.classList.contains('valid')) {
                  e.target.value = '';
               }
               checkInput(e.target)
            });
            ;
            e.target.addEventListener('input', () => checkInput(e.target));
         }
      })
   }

   function checkInput(elem) {
      const type = elem.getAttribute('data-type') ? elem.getAttribute('data-type') : elem.type;

      if (type === 'email') {
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // =================
            tipMessage(elem, tips.tipsEn.requiredMail, true);
            return true;
         } else if (!(/^(([^А-Яа-я<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elem.value))) {
            tipMessage(elem, tips.tipsEn.validEmail, true);
            // add changes
            elem.classList.remove('valid');
            // =================
            return true;
         } else {
            // add changes
            elem.classList.add('valid');
            // =================
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      }

      if (type === 'text') {
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // =================
            tipMessage(elem, tips.tipsEn.required, true);
            return true;
         } else if (elem.value.length < 2) {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.lengthMinName, true);
            return true;
         } else {
            // add changes
            elem.classList.add('valid');
            // =================
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      }

      if (type === 'tel') {
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.requiredPhone, true);
            return true;
         } else if (!(/^[\d\s+()]{1,}$/.test(elem.value))) {
            tipMessage(elem, tips.tipsEn.onlyNumbers, true);
            // add changes
            elem.classList.remove('valid');
            // ====================
            return true;
         } else if (elem.value.length <= 5 || elem.value.length > 21) {
            tipMessage(elem, tips.tipsEn.validPhone, true);
            // add changes
            elem.classList.remove('valid');
            // ====================
            return true;
         } else {
            // add changes
            elem.classList.add('valid');
            // =================
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      }

      if (type === 'name') {
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.required, true);
            return true;
         } else if (elem.value.length < 3) {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.lengthMinName, true);
            return true;
         } else if (!(/^[A-Za-zА-Яа\s\'\-]{2,40}$/.test(elem.value))) {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.validName, true);
            return true;
         } else {
            // add changes
            elem.classList.add('valid');
            // =================
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      }

      if (type === 'customRadio') {
         const elemList = elem.closest('.form-group').querySelectorAll('[data-type="customRadio"]');
         const isChecked = [...elemList].some(elem => elem.checked);
         if (!isChecked) {
            tipMessage(elem, tips.tipsEn.required, true);
            return true;
         } else {
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      };

      if (type === 'password') {
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.required, true);
            return true;
         } else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/.test(elem.value))) {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.easyPassword, true);
            return true;
         } else {
            tipMessage(elem, tips.tipsEn.success, false);
            // add changes
            elem.classList.add('valid');
            // =================
            return false;
         }
      };

      if (type === 'passwordConfirm') {
         const passwordElem = elem.closest('form').querySelector('input[name="password"]');
         if (elem.value === "") {
            // add changes
            elem.classList.remove('valid');
            // ====================
            tipMessage(elem, tips.tipsEn.required, true);
            return true;
         } else if (elem.value !== passwordElem.value) {
            // add changes
            elem.classList.remove('valid');
            // ====================
            this.tipMessage(elem, tips.tipsEn.conform, true);
            return true;
         } else {
            // add changes
            elem.classList.add('valid');
            // =================
            tipMessage(elem, tips.tipsEn.success, false);
            return false;
         }
      };
   }

   function tipMessage(elem, tip, status) {
      const fieldParent = elem.closest('.field-parent');
      const tipElementHtml = fieldParent.querySelector('.tips');

      if (!status) {
         tipElementHtml.classList.remove('tips-hidden', 'tips-wrong');
         tipElementHtml.classList.add('tips-success', 'tips-visibility');
         tipElementHtml.textContent = tip;
      } else {
         tipElementHtml.classList.remove('tips-hidden', 'tips-success');
         tipElementHtml.classList.add('tips-wrong', 'tips-visibility');
         tipElementHtml.textContent = tip;
      }
   }
}


/*
Добавить тегу form два класса class="_valid-form form-group";
Каждый инпут оборачиваем в обертку с классом class="field-parent".указываем ему posr
Каждому инпуту добавляем класс class="_valid-input"
Под инпутом или перед закрывающим тегом field-parent мы добавляем span c классами что указаны class="tips tips-hidden". указываем ему posa
// ====================================================================== //
<form class="_valid-form form-group" name="faqForm">
   <div class="form-faq__input-body field-parent">
      <input class="form-faq__input _valid-input" name="Your Name" data-type="name" type="text"
         placeholder="Your Name">
      <span class="form-faq__tips tips tips-hidden"></span>
   </div>
</form>
*/