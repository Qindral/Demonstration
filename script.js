const operationForm = document.querySelector('#operation-form');
const operationInput = document.querySelector('#operation-input');
const operationOutput = document.querySelector('#operation-output');

const operationLibrary = {
  tonsillektomie: {
    title: 'Tonsillektomie',
    type: 'animation',
    description:
      'Darstellung einer klassischen Entfernung der Gaumenmandeln mit Markierung des Operationsgebietes.',
    steps: [
      'Patient in Rückenlage mit leichter Überstreckung des Kopfes positionieren.',
      'Öffnung des Mundraums mit einem Mundsperrer und Darstellung der Gaumenmandeln.',
      'Inzision entlang des vorderen Gaumenbogens und Auslösen der Tonsille aus der Loge.',
      'Darstellung der Gefäßligatur und vollständige Entfernung der Mandel.',
      'Inspektion der Loge und Blutstillung durch Bipolar oder Ligaturen.'
    ]
  },
  submandibulektomie: {
    title: 'Submandibulektomie',
    type: 'text',
    description:
      'Die Submandibulektomie beschreibt die operative Entfernung der Glandula submandibularis. Nach Darstellung des Operationsfeldes unterhalb des Unterkiefers wird die Drüse unter Schonung des N. facialis freipräpariert, die zuführenden Gefäße und der Ausführungsgang unterbunden und die Drüse entnommen.'
  },
  tracheotomie: {
    title: 'Tracheotomie',
    type: 'animation',
    description:
      'Schematische Darstellung eines chirurgischen Luftröhrenschnitts zur Sicherung der Atemwege.',
    steps: [
      'Lagerung in Rückenlage mit überstrecktem Hals und steriles Abdecken.',
      'Quere Hautinzision zwei Querfinger oberhalb des Jugulums.',
      'Präparation der Halsweichteile bis zur Trachea und Schonung der Gefäße.',
      'Querer Schnitt zwischen dem zweiten und dritten Trachealring.',
      'Einführen der Kanüle und Fixation.'
    ]
  }
};

const defaultMessage = `Bitte gib den Namen einer Operation ein. Beispiele: ${Object.keys(
  operationLibrary
)
  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  .join(', ')}.`;

function resetOutput() {
  operationOutput.innerHTML = '';
  const placeholder = document.createElement('p');
  placeholder.className = 'empty-state';
  placeholder.textContent = defaultMessage;
  operationOutput.append(placeholder);
}

function renderAnimation(operation) {
  const container = document.createElement('div');
  container.className = 'fade-in';

  const title = document.createElement('h2');
  title.className = 'operation-title';
  title.textContent = operation.title;

  const description = document.createElement('p');
  description.className = 'operation-description';
  description.textContent = operation.description;

  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  operation.steps.forEach((step, index) => {
    const stepElement = document.createElement('div');
    stepElement.className = 'timeline-step';

    const heading = document.createElement('strong');
    heading.textContent = `Schritt ${index + 1}`;

    const text = document.createElement('p');
    text.textContent = step;

    stepElement.append(heading, text);
    timeline.append(stepElement);
  });

  container.append(title, description, timeline);
  operationOutput.innerHTML = '';
  operationOutput.append(container);
}

function renderText(operation) {
  const container = document.createElement('div');
  container.className = 'fade-in';

  const title = document.createElement('h2');
  title.className = 'operation-title';
  title.textContent = operation.title;

  const description = document.createElement('p');
  description.className = 'operation-description';
  description.textContent = operation.description;

  container.append(title, description);
  operationOutput.innerHTML = '';
  operationOutput.append(container);
}

function handleOperationSearch(event) {
  event.preventDefault();
  const query = operationInput.value.trim().toLowerCase();

  if (!query) {
    resetOutput();
    return;
  }

  const operation = operationLibrary[query];

  if (!operation) {
    const fallbackOperation = {
      title: `Keine Animation für "${operationInput.value}" verfügbar`,
      description:
        'Für diesen Eingriff liegt keine Simulation vor. Bitte überprüfe die Schreibweise oder wähle eine andere Operation aus dem bekannten Repertoire.'
    };

    renderText(fallbackOperation);
    return;
  }

  if (operation.type === 'animation') {
    renderAnimation(operation);
  } else {
    renderText(operation);
  }
}

operationForm?.addEventListener('submit', handleOperationSearch);

resetOutput();
