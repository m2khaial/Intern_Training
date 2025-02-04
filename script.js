let currentStep = 1;

function handleMainDropdownChange() {
    const mainDropdown = document.getElementById('main-dropdown');
    const additionalQuestion = document.getElementById('additional-question');
    const stepsPage = document.getElementById('steps-page');
    
    console.log('Main dropdown changed:', mainDropdown.value);

    // Hide child elements and steps page by default
    additionalQuestion.style.display = 'none';
    stepsPage.style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';

    // Reset the additionalQuestion container content so it doesn’t accumulate extra elements
    additionalQuestion.innerHTML = `
        <label for="additional-dropdown"></label>
        <select id="additional-dropdown" onchange="handleAdditionalDropdownChange()">
            <option value="">Select an option</option>
        </select>
    `;

    if (mainDropdown.value === 'familiarize-platform') {
        additionalQuestion.style.display = 'block';
        additionalQuestion.querySelector('label').textContent = 'Which platform?';
        additionalQuestion.querySelector('select').innerHTML = `
            <option value="">Select an option</option>
            <option value="c3">C3</option>
            <option value="lcl-vendor-portal">LCL Vendor Portal</option>
            <option value="sharepoint">SharePoint</option>
        `;
    } else if (mainDropdown.value === 'email-templates') {
        showEmailTemplates();
    } else if (mainDropdown.value === 'adding-new-contact') {
        additionalQuestion.style.display = 'block';
        additionalQuestion.querySelector('label').textContent = 'Which platform?';
        additionalQuestion.querySelector('select').innerHTML = `
            <option value="">Select an option</option>
            <option value="c3">C3</option>
            <option value="lcl-vendor-portal">LCL Vendor Portal</option>
            <option value="backup-contacts">Backup Contacts</option>
        `;
        // Append the “Not sure” text just once
        const notSureText = document.createElement('p');
        notSureText.innerHTML = 'Not sure which one? <a href="#" onclick="showUserGuides()">Click here to find out.</a>';
        additionalQuestion.appendChild(notSureText);
    } else if (mainDropdown.value === 'offshore-priority-workbook') {
        showSteps('offshore-priority-workbook');
    } else if (mainDropdown.value === 'vendor-infractions') {
        showSteps('vendor-infractions');
    } else if (mainDropdown.value === 'portal-issues-general') {
        additionalQuestion.style.display = 'block';
        additionalQuestion.querySelector('label').textContent = 'What issue are you facing?';
        additionalQuestion.querySelector('select').innerHTML = `
            <option value="">Select an option</option>
            <option value="lockout">Lockout</option>
            <option value="access-roles">Access Roles</option>
            <option value="removing-user">Removing User</option>
            <option value="verifying-access">Verifying Access</option>
        `;
    }
}

function handleAdditionalDropdownChange() {
    const additionalDropdown = document.getElementById('additional-dropdown');
    const mainDropdown = document.getElementById('main-dropdown');

    console.log('Additional dropdown changed:', additionalDropdown.value);

    if (mainDropdown.value === 'familiarize-platform') {
        showSteps(`familiarize-${additionalDropdown.value}`);
    } else if (mainDropdown.value === 'adding-new-contact') {
        showSteps(`add-contact-${additionalDropdown.value}`);
    } else if (mainDropdown.value === 'portal-issues-general') {
        showSteps(`portal-issue-${additionalDropdown.value}`);
    }
}

function showSteps(stepType) {
    const stepsPage = document.getElementById('steps-page');
    stepsPage.style.display = 'block';
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('additional-question').style.display = 'none';
    console.log('Showing steps for:', stepType);
    // Reset current step if needed
    currentStep = 1;
    showStep(currentStep);
}

function showEmailTemplates() {
    const stepsPage = document.getElementById('steps-page');
    stepsPage.style.display = 'block';
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('additional-question').style.display = 'none';
    console.log('Showing email templates');
    showStep(1);
}

function showUserGuides() {
    const stepsPage = document.getElementById('steps-page');
    stepsPage.style.display = 'block';
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('additional-question').style.display = 'none';
    console.log('Showing user guides');
    showStep(1);
}

function showStep(step) {
    console.log('Showing step:', step);
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`step-${i}`).style.display = i === step ? 'block' : 'none';
        document.getElementById(`check-${i}`).checked = (i === step);
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

function goBack() {
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('steps-page').style.display = 'none';
    document.getElementById('main-dropdown').value = '';
    document.getElementById('additional-question').style.display = 'none';
}

function goToStep(step) {
    currentStep = step;
    showStep(step);
}
