// Initialization: Always show the course intro page on load.
function init() {
  document.getElementById("course-intro").style.display = "block";
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("training-video-page").style.display = "none";
}
window.onload = init;

// Course Intro Functions
function courseCompletedYes() {
  document.getElementById("course-intro").style.display = "none";
  document.getElementById("main-screen").style.display = "block";
}
function courseCompletedNo() {
  document.getElementById("course-intro").style.display = "none";
  document.getElementById("training-video-page").style.display = "block";
  currentVideo = 1;
  updateVideoProgress();
}

// Training Video Page Logic
var totalVideos = 3;
var currentVideo = 1;
function nextVideo() {
  if (currentVideo < totalVideos) {
    currentVideo++;
    updateVideoProgress();
  }
  if (currentVideo === totalVideos) {
    document.getElementById("next-video-button").style.display = "none";
    document.getElementById("complete-course-button").style.display = "inline-block";
  }
}
function updateVideoProgress() {
  let progress = (currentVideo / totalVideos) * 100;
  document.getElementById("video-progress-bar").style.width = progress + "%";
}
function completeCourse() {
  document.getElementById("training-video-page").style.display = "none";
  document.getElementById("main-screen").style.display = "block";
}
function redoTrainingCourse() {
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("training-video-page").style.display = "block";
  currentVideo = 1;
  updateVideoProgress();
  document.getElementById("next-video-button").style.display = "inline-block";
  document.getElementById("complete-course-button").style.display = "none";
}

// Static Training Page and Steps Logic (session-only progress)
let currentStep = 1;
let completedCatSteps = [false, false, false];
function showSteps(stepType) {
  document.getElementById('steps-page').style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';
  completedCatSteps = [false, false, false];
  currentStep = 1;
  showStep(currentStep);
}
function showStep(step) {
  if (!completedCatSteps[step - 1]) {
    completedCatSteps[step - 1] = true;
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`check-${i}`).checked = completedCatSteps[i - 1];
  }
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
}

// Dog-themed Steps Functions
let currentDogStep = 1;
let completedDogSteps = [false, false, false];
function showDogStep(step) {
  if (!completedDogSteps[step - 1]) {
    completedDogSteps[step - 1] = true;
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`dog-step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`dog-check-${i}`).checked = completedDogSteps[i - 1];
  }
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

// Dropdown Handling Functions
function handleMainDropdownChange() {
  const mainDropdown = document.getElementById('main-dropdown');
  const powerbiDropdown = document.getElementById('powerbi-dropdown');
  const portalIssuesDropdown = document.getElementById('portal-issues-dropdown');
  powerbiDropdown.style.display = 'none';
  portalIssuesDropdown.style.display = 'none';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('email-templates-page').style.display = 'none';
  if (mainDropdown.value === 'email-templates') {
    showEmailTemplates();
  } else if (mainDropdown.value === 'powerbi-reports') {
    powerbiDropdown.style.display = 'block';
  } else if (mainDropdown.value === 'portal-issues-general') {
    portalIssuesDropdown.style.display = 'block';
  } else if (mainDropdown.value === 'daily-pdrp' ||
             mainDropdown.value === 'offshore-priority-workbook' ||
             mainDropdown.value === 'vendor-infractions' ||
             mainDropdown.value === 'adding-new-contact' ||
             mainDropdown.value === 'manual-appointment-c3' ||
             mainDropdown.value === 'familiarize-platform') {
    showSteps(mainDropdown.value);
  }
}
function handlePowerBIDropdownChange() {
  const powerbiSelect = document.getElementById('powerbi-select');
  if (powerbiSelect.value === 'holes-report') {
    showSteps('holes-report');
  } else if (powerbiSelect.value === 'vendor-delivered-report') {
    showSteps('vendor-delivered-report');
  }
}
function handlePortalIssuesDropdownChange() {
  const portalIssuesSelect = document.getElementById('portal-issues-select');
  if (portalIssuesSelect.value === 'lockout') {
    showSteps('lockout');
  } else if (portalIssuesSelect.value === 'access-roles') {
    showSteps('access-roles');
  } else if (portalIssuesSelect.value === 'removing-user') {
    showSteps('removing-user');
  } else if (portalIssuesSelect.value === 'verifying-access') {
    showSteps('verifying-access');
  }
}

// Email Templates Functions
function showEmailTemplates() {
  document.getElementById('email-templates-page').style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';
}
function showEmailTemplate(templateNumber) {
  const templates = document.getElementsByClassName('email-template');
  for (let i = 0; i < templates.length; i++) {
    templates[i].style.display = 'none';
  }
  document.getElementById(`email-template-${templateNumber}`).style.display = 'block';
}
async function copyEmailTemplate(templateId) {
  let templateElement = document.getElementById(templateId);
  let templateClone = templateElement.cloneNode(true); // Clone to prevent modifying actual template

  // Remove elements that shouldn't be copied
  let title = templateClone.querySelector("h2"); // Remove "Email Template X" header
  if (title) title.remove();
  let button = templateClone.querySelector("button"); // Remove "Copy Template" button
  if (button) button.remove();

  // Replace the placeholder {{TEMP_PASSWORD}} with a generated password
  let tempPasswordElement = templateClone.querySelector("#temp-password");
  if (tempPasswordElement) {
    tempPasswordElement.textContent = generateTempPassword();
  }

  // Convert content to clean HTML (preserving formatting)
  let htmlContent = templateClone.innerHTML.trim();

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" })
      })
    ]);
    alert("Email template copied to clipboard with formatting!");
  } catch (err) {
    alert("Failed to copy email. Please try a different browser.");
    console.error("Copy failed:", err);
  }
}
function goBackFromEmailTemplates() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('email-templates-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}

// Generate a 7-character random password
function generateTempPassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 7; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}
