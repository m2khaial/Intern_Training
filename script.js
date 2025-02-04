// Global variables for current step and progress tracking
let currentStep = 1;
let currentDogStep = 1;
let completedCatSteps = [false, false, false];
let completedDogSteps = [false, false, false];

function handleMainDropdownChange() {
  const mainDropdown = document.getElementById('main-dropdown');
  const additionalQuestion = document.getElementById('additional-question');
  
  console.log('Main dropdown changed:', mainDropdown.value);

  // Hide all pages by default
  additionalQuestion.style.display = 'none';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('email-templates-page').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';

  // Reset additionalQuestion content
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
  } else if (mainDropdown.value === 'manual-appointment-c3') {
      // Show the dog-themed steps page for manual appointment
      showStepsDogs('manual-appointment-c3');
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
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('email-templates-page').style.display = 'none';
  console.log('Showing steps for:', stepType);
  // Reset progress for cat steps
  completedCatSteps = [false, false, false];
  currentStep = 1;
  showStep(currentStep);
}

function showStepsDogs(stepType) {
  const stepsPageDogs = document.getElementById('steps-page-dogs');
  stepsPageDogs.style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';
  document.getElementById('additional-question').style.display = 'none';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('email-templates-page').style.display = 'none';
  console.log('Showing dog steps for:', stepType);
  // Reset progress for dog steps
  completedDogSteps = [false, false, false];
  currentDogStep = 1;
  showDogStep(currentDogStep);
}

function showEmailTemplates() {
  document.getElementById('email-templates-page').style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';
  document.getElementById('additional-question').style.display = 'none';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('steps-page-dogs').style.display = 'none';
  console.log('Showing email templates');
  // Display the first email template by default
  showEmailTemplate(1);
}

function showUserGuides() {
  console.log('Showing user guides');
  // Placeholder for user guide logic
  showSteps('user-guides');
}

// For cat-themed steps
function showStep(step) {
  if (!completedCatSteps[step - 1]) {
    completedCatSteps[step - 1] = true;
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`check-${i}`).checked = completedCatSteps[i - 1];
  }
  // Update progress bar width
  let completedCount = completedCatSteps.filter(val => val).length;
  document.getElementById('progress-bar').style.width = ((completedCount / 3) * 100) + '%';
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

function goToStep(step) {
  currentStep = step;
  showStep(step);
}

function goBack() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
  document.getElementById('additional-question').style.display = 'none';
  // Reset cat steps progress when leaving the page
  completedCatSteps = [false, false, false];
}

// For dog-themed steps
function showDogStep(step) {
  if (!completedDogSteps[step - 1]) {
    completedDogSteps[step - 1] = true;
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`dog-step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`dog-check-${i}`).checked = completedDogSteps[i - 1];
  }
  // Update dog progress bar width
  let completedCount = completedDogSteps.filter(val => val).length;
  document.getElementById('progress-bar-dogs').style.width = ((completedCount / 3) * 100) + '%';
}

function nextDogStep() {
  if (currentDogStep < 3) {
    currentDogStep++;
    showDogStep(currentDogStep);
  }
}

function prevDogStep() {
  if (currentDogStep > 1) {
    currentDogStep--;
    showDogStep(currentDogStep);
  }
}

function goToDogStep(step) {
  currentDogStep = step;
  showDogStep(step);
}

function goBackFromDogs() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
  completedDogSteps = [false, false, false];
}

// Email Templates: Show selected template
function showEmailTemplate(templateNumber) {
  const templates = document.getElementsByClassName('email-template');
  for (let i = 0; i < templates.length; i++) {
    templates[i].style.display = 'none';
  }
  document.getElementById(`email-template-${templateNumber}`).style.display = 'block';
}

// Copy email template text to clipboard
function copyEmailTemplate(templateId) {
  const templateContent = document.getElementById(templateId).innerText;
  navigator.clipboard.writeText(templateContent).then(() => {
    alert('Email template copied to clipboard!');
  });
}

function goBackFromEmailTemplates() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('email-templates-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}
