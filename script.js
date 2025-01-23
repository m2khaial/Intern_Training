let currentStep = 1;

function handleDropdownChange() {
    const dropdown = document.getElementById('issue-dropdown');
    const additionalQuestion = document.getElementById('additional-question');
    const stepsPage = document.getElementById('steps-page');
    
    if (dropdown.value === 'new-dropdown') {
        additionalQuestion.style.display = 'block';
        stepsPage.style.display = 'none';
    } else if (dropdown.value === 'next-page') {
        additionalQuestion.style.display = 'none';
        stepsPage.style.display = 'block';
        document.getElementById('main-screen').style.display = 'none';
        showStep(1);
    } else {
        additionalQuestion.style.display = 'none';
        stepsPage.style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
    }
}

function handleAdditionalDropdownChange() {
    const additionalDropdown = document.getElementById('additional-dropdown');
    const stepsPage = document.getElementById('steps-page');

    if (additionalDropdown.value) {
        stepsPage.style.display = 'block';
        showStep(1);
    } else {
        stepsPage.style.display = 'none';
    }
}

function showStep(step) {
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`step-${i}`).style.display = i === step ? 'block' : 'none';
    }
}

function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}