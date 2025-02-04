let currentStep = 1;
let currentDogStep = 1;

function handleMainDropdownChange() {
  const mainDropdown = document.getElementById('main-dropdown');
  const additionalQuestion = document.getElementById('additional-question');
  const stepsPage = document.getElementById('steps-page');
  
  console.log('Main dropdown changed:', mainDropdown.value);

  // Hide all pages by default
  additionalQuestion.style.display = 'none';
  stepsPage.style.display = 'none';
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
  // Optionally display the first email template by default
  showEmailTemplate(1);
}

function showUserGuides() {
  console.log('Showing user guides');
  // Placeholder for user guide logic
  showSteps('user-guides');
}

function showStep(step) {
  console.log('Showing cat step:', step);
  for (let i = 1; i <= 3; i++) {
      document.getElementById(`step-${i}`).style.display = (i === step) ? 'block' : 'none';
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

function showDogStep(step) {
  console.log('Showing dog step:', step);
  for (let i = 1; i <= 3; i++) {
      document.getElementById(`dog-step-${i}`).style.display = (i === step) ? 'block' : 'none';
      document.getElementById(`dog-check-${i}`).checked = (i === step);
  }
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

function goBackFromDogs() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}

function goToStep(step) {
  currentStep = step;
  showStep(step);
}

function goToDogStep(step) {
  currentDogStep = step;
  showDogStep(step);
}

function showEmailTemplate(templateNumber) {
  // Hide all email templates first
  const templates = document.getElementsByClassName('email-template');
  for (let i = 0; i < templates.length; i++) {
      templates[i].style.display = 'none';
  }
  // Show the selected template
  document.getElementById(`email-template-${templateNumber}`).style.display = 'block';
}

function goBackFromEmailTemplates() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('email-templates-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}
