function validateForm() {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const dateNaissance = document.getElementById('dateNaissance');
    const lieuNaissance = document.getElementById('lieuNaissance');
    const deptNaissance = document.getElementById('deptNaissance');
    const numeroRue = document.getElementById('numeroRue');
    const libelleRue = document.getElementById('libelleRue');
    const codePostal = document.getElementById('codePostal');
    const ville = document.getElementById('ville');

    let invalidFields = [];

    if (nom.value.trim() === '') {
        invalidFields.push({ field: nom, message: 'Le champ "Nom de famille" est obligatoire.' });
    } else {
        hideErrorMessage(nom);
    }
    if (prenom.value.trim() === '') {
        invalidFields.push({ field: prenom, message: 'Le champ "Prénom" est obligatoire.' });
    } else {
        hideErrorMessage(prenom);
    }
    if (dateNaissance.value === '') {
        invalidFields.push({ field: dateNaissance, message: 'Le champ "Date de naissance" est obligatoire.' });
    } else {
        hideErrorMessage(dateNaissance);
    }
    if (lieuNaissance.value.trim() === '') {
        invalidFields.push({ field: lieuNaissance, message: 'Le champ "Lieu de naissance" est obligatoire.' });
    } else {
        hideErrorMessage(lieuNaissance);
    }
    if (deptNaissance.value.trim() === '') {
        invalidFields.push({ field: deptNaissance, message: 'Le champ "Département de naissance" est obligatoire.' });
    } else {
        hideErrorMessage(deptNaissance);
    }
    if (numeroRue.value.trim() === '') {
        invalidFields.push({ field: numeroRue, message: 'Le champ "Numéro de rue" est obligatoire.' });
    } else {
        hideErrorMessage(numeroRue);
    }
    if (libelleRue.value.trim() === '') {
        invalidFields.push({ field: libelleRue, message: 'Le champ "Libellé de la rue" est obligatoire.' });
    } else {
        hideErrorMessage(libelleRue);
    }
    if (codePostal.value.trim() === '') {
        invalidFields.push({ field: codePostal, message: 'Le champ "Code postal" est obligatoire.' });
    } else {
        hideErrorMessage(codePostal);
    }
    if (ville.value.trim() === '') {
        invalidFields.push({ field: ville, message: 'Le champ "Ville" est obligatoire.' });
    } else {
        hideErrorMessage(ville);
    }

    if (invalidFields.length > 0) {
        clearErrorMessages();

        invalidFields.forEach(({ field, message }) => {
            displayErrorMessage(message, field);
        });

        return;
    }

    const today = new Date();
    const birthDate = new Date(dateNaissance.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        displayErrorMessage('Vous devez avoir au moins 18 ans pour soumettre ce formulaire.', dateNaissance);
        return;
    }

    const userData = {
        identite: "LCT",
        nom: nom.value.trim(),
        prenom: prenom.value.trim(),
        dateNaissance: dateNaissance.value,
        lieuNaissance: lieuNaissance.value.trim(),
        departementNaissance: deptNaissance.value.trim(),
        numeroRue: numeroRue.value.trim(),
        libelleRue: libelleRue.value.trim(),
        codePostal: codePostal.value.trim(),
        ville: ville.value.trim()
    };

    fetch('https://digicode.cleverapps.io/utilisateurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la création du compte utilisateur.');
            }
            return response.text();
        })
        .then(data => {
            console.log('Réponse du serveur:', data);
            displaySuccessMessage(data);
            document.getElementById('userForm').reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
            displayErrorMessage('Erreur lors de la création du compte utilisateur.');
        });
}

function displayErrorMessage(message, inputElement) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.classList.add('error-message');

    inputElement.errorElement = errorDiv;

    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);

    inputElement.classList.add('is-invalid');
}

function hideErrorMessage(inputElement) {
    if (inputElement.errorElement) {
        inputElement.errorElement.remove();
        inputElement.errorElement = null;
    }

    inputElement.classList.remove('is-invalid');
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => {
        errorMessage.remove();
    });

    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
}

function displaySuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.classList.add('alert', 'alert-success', 'mt-4');
    successDiv.textContent = message;
    const container = document.querySelector('.container');
    container.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
