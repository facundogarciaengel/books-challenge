window.addEventListener('load', function () {
    console.log('JS vinculado correctamente');
    let name = document.querySelector('#name');
    name.focus();
    let form = document.querySelector('form');
    let errorMsg = document.querySelector('#errorMsg');
    form.addEventListener('submit', function (event) {
       let errors = [];
        event.preventDefault();
        errorMsg.innerHTML = '';
        console.log(form.name.value);
        if(form.name.value == ''){
            form.name.classList.remove('is-valid');
            form.name.classList.add('is-invalid');
            errors.push('El campo nombre no puede estar vacio');
        }else{
            form.name.classList.remove('is-invalid');
            form.name.classList.add('is-valid');
        }
        if(form.email.value == ''){
            form.email.classList.remove('is-valid');
            form.email.classList.add('is-invalid');
            errors.push('El campo email no puede estar vacio');
        }
        else{
            form.email.classList.remove('is-invalid');
            form.email.classList.add('is-valid');
        }
        if(form.password.value == ''){
            form.password.classList.remove('is-valid');
            form.password.classList.add('is-invalid');
            errors.push('El campo password no puede estar vacio');
        }
        else{
            form.password.classList.remove('is-invalid');
            form.password.classList.add('is-valid');
        }
       if(form.country.value == ''){
            form.country.classList.remove('is-valid');
            form.country.classList.add('is-invalid');
            errors.push('El campo pais no puede estar vacio');
        }
        else{
            form.country.classList.remove('is-invalid');
            form.country.classList.add('is-valid');
        }

        console.log(errors);
        if(errors.length > 0){
            errorMsg.innerHTML = '<ul>';
            for(let i = 0; i < errors.length; i++){
                errorMsg.innerHTML += '<li>' + errors[i] + '</li>';
            }
            Swal.fire({
              icon: "error",
              title: "Check the inputs...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        else{
            errorMsg.innerHTML = '';
            Swal.fire({
                title: "Good job!",
                text: "You register succesfuly!",
                icon: "success"
              }).then(() => form.submit())
            
        }

    });

});