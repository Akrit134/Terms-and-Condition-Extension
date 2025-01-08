// // content.js: Keyword highlighting with dynamic risk scoring
// console.log("Content script loaded.");

// // Problematic keywords and explanations with weights
// const riskKeywords = [
//   { keyword: 'arbitration', weight: 3, explanation: 'Limits your rights to sue in court.' },
//   { keyword: 'no liability', weight: 3, explanation: 'Company disclaims responsibility for damages.' },
//   { keyword: 'automatic renewal', weight: 2, explanation: 'Subscriptions may auto-renew without notice.' },
//   { keyword: 'termination', weight: 2, explanation: 'Company can terminate service at any time.' },
//   { keyword: 'indemnify', weight: 3, explanation: 'You agree to cover company losses.' },
//   { keyword: 'personal data', weight: 2, explanation: 'Your data may be shared or sold.' },
//   { keyword: 'non-refundable', weight: 2, explanation: 'Payments cannot be refunded.' },
//   { keyword: 'binding agreement', weight: 1, explanation: 'Legally enforces the terms as written.' },
//   { keyword: 'third-party', weight: 1, explanation: 'Your data may be shared with third parties.' }
// ];

// let totalScore = 0; // To calculate the overall risk score

// // Function to highlight matched keywords and calculate scores
// function highlightKeywords(element) {
//   if (!element || element.nodeType !== 3) return; // Process only text nodes

//   const parent = element.parentNode;
//   if (parent && parent.hasAttribute('data-processed')) return; // Skip already processed

//   let content = element.textContent;
//   let updatedHTML = '';

//   riskKeywords.forEach(risk => {
//     const regex = new RegExp(`\\b(${risk.keyword})\\b`, 'gi'); // Match whole word

//     // Replace matched keywords and calculate score
//     content = content.replace(regex, match => {
//       console.log(`Keyword found: ${match}`);
//       totalScore += risk.weight; // Add weight to total score
//       return `<span style="background-color: yellow; border: 1px solid red; padding: 2px;" data-tooltip="${risk.explanation}" data-score="${risk.weight}">${match}</span>`;
//     });
//   });

//   // Replace text node with processed HTML only if a match is found
//   if (content !== element.textContent) {
//     const span = document.createElement('span');
//     span.innerHTML = content;
//     parent.replaceChild(span, element);
//     parent.setAttribute('data-processed', 'true');

//     // Tooltip handling
//     span.querySelectorAll('[data-tooltip]').forEach(highlight => {
//       highlight.addEventListener('mouseenter', () => {
//         const tooltip = document.createElement('div');
//         const score = highlight.getAttribute('data-score');
//         tooltip.textContent = `${highlight.getAttribute('data-tooltip')} (Risk: ${score}/3)`;
//         tooltip.style.position = 'fixed';
//         tooltip.style.bottom = '10px';
//         tooltip.style.left = '10px';
//         tooltip.style.backgroundColor = '#fff';
//         tooltip.style.border = '1px solid black';
//         tooltip.style.padding = '5px';
//         tooltip.style.zIndex = '1000';
//         tooltip.className = 'tc-tooltip';
//         document.body.appendChild(tooltip);
//       });

//       highlight.addEventListener('mouseleave', () => {
//         const tooltip = document.querySelector('.tc-tooltip');
//         if (tooltip) tooltip.remove();
//       });
//     });
//   }
// }

// // Process all text nodes in the DOM
// function processTextNodes(node) {
//   const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
//   while (walker.nextNode()) {
//     highlightKeywords(walker.currentNode);
//   }
// }

// // Initial processing after short delay
// setTimeout(() => {
//   processTextNodes(document.body);
//   displayOverallRisk(); // Display total risk score after processing
// }, 500);

// // Display overall risk score on page
// function displayOverallRisk() {
//   const score = Math.min(Math.ceil((totalScore / (riskKeywords.length * 3)) * 10), 10); // Scale to 0-10
//   const badge = document.createElement('div');
//   badge.textContent = `Risk Score: ${score}/10`;
//   badge.style.position = 'fixed';
//   badge.style.top = '10px';
//   badge.style.right = '10px';
//   badge.style.backgroundColor = score > 7 ? 'red' : score > 4 ? 'orange' : 'green';
//   badge.style.color = '#fff';
//   badge.style.padding = '10px';
//   badge.style.borderRadius = '5px';
//   badge.style.zIndex = '1000';
//   document.body.appendChild(badge);
// }

// // Throttled MutationObserver for dynamic updates
// let debounceTimer;
// const observer = new MutationObserver(mutations => {
//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     mutations.forEach(mutation => {
//       mutation.addedNodes.forEach(node => {
//         if (node.nodeType === 1) processTextNodes(node); // Process only elements
//       });
//     });
//     displayOverallRisk(); // Update risk score after dynamic changes
//   }, 300); // 300ms debounce time
// });

// observer.observe(document.body, { childList: true, subtree: true });

// content.js: Keyword highlighting with dynamic risk scoring and backend integration
// content.js: Keyword highlighting with dynamic risk scoring and backend integration
// content.js: Keyword highlighting with dynamic risk scoring and backend integration
// content.js: Keyword highlighting with dynamic risk scoring
// content.js: Keyword highlighting with backend integration and sanitization fixes
// Updated content.js - Highlight keywords and integrate backend analysis
// Updated content.js - Highlight keywords and integrate backend analysis
// --- Content Script Loaded ---
// --- Content Script Loaded ---
// --- Content Script Loaded ---
// --- Content Script Loaded ---
// --- Content Script ---

console.log("Content script loaded successfully.");

// --- Keyword Definitions ---
const riskKeywords = [
  { keyword: 'arbitration', explanation: 'Limits your rights to sue in court.' },
  { keyword: 'termination', explanation: 'The company can end services anytime.' },
  { keyword: 'no liability', explanation: 'Company disclaims responsibility for damages.' }
];

// --- Variables ---
let riskyWordCount = 0;
let matchesFound = [];
let observer;
let processing = false;

// --- Highlight Keywords ---
function highlightKeywords(node) {
  if (!node || node.nodeType !== 3 || !node.textContent.trim()) return; // Skip empty nodes

  const parent = node.parentNode;

  // Skip already processed nodes or highlighted spans
  if (parent && (parent.hasAttribute('data-processed') || parent.tagName === 'SPAN')) return;

  let content = node.textContent;
  let updatedContent = content;
  let matchFound = false; // Track if any match is found

  riskKeywords.forEach(risk => {
    const regex = new RegExp(`\\b(${risk.keyword})\\b`, 'gi');
    updatedContent = updatedContent.replace(regex, match => {
      if (!matchFound) matchFound = true; // Set flag if match is found
      matchesFound.push({ match, explanation: risk.explanation });
      riskyWordCount++; // Increment only for new matches
      return `<span style="background-color: yellow; padding: 2px;" title="${risk.explanation}">
                ${match}
              </span>`;
    });
  });

  // Update DOM only if changes occurred
  if (matchFound) {
    const span = document.createElement('span');
    span.innerHTML = updatedContent;
    parent.replaceChild(span, node); // Safe replacement
    parent.setAttribute('data-processed', 'true'); // Mark as processed
  }
}

// --- Process Nodes in Chunks ---
function processNodesInChunks(nodes, chunkSize = 50) {
  let index = 0;

  function processChunk() {
    const endIndex = Math.min(index + chunkSize, nodes.length);

    for (let i = index; i < endIndex; i++) {
      highlightKeywords(nodes[i]);
    }

    index = endIndex;

    if (index < nodes.length) {
      requestAnimationFrame(processChunk); // Process next chunk
    } else {
      console.log("Processing complete.");
      displayRiskyWordCount(); // Update UI after processing
      sendDataToAPI(); // Send data once processing ends
      processing = false; // Mark processing as done
    }
  }
  processChunk();
}

// --- Collect Text Nodes ---
function collectTextNodes(node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

// --- Display Risky Word Count ---
function displayRiskyWordCount() {
  const badge = document.getElementById('risky-word-badge') || document.createElement('div');
  badge.id = 'risky-word-badge';
  badge.textContent = `Risky Words: ${riskyWordCount}`;
  badge.style.position = 'fixed';
  badge.style.top = '10px';
  badge.style.right = '10px';
  badge.style.padding = '10px';
  badge.style.borderRadius = '5px';
  badge.style.color = '#fff';
  badge.style.backgroundColor = riskyWordCount > 5 ? 'red' : riskyWordCount > 2 ? 'orange' : 'green';
  badge.style.zIndex = '1000';

  if (!document.getElementById('risky-word-badge')) {
    document.body.appendChild(badge); // Append only if not present
  }
}

// --- Send Data to API ---
function sendDataToAPI() {
  const payload = {
    createdAt: new Date().toISOString(),
    url: window.location.href,
    riskyWordCount,
    keywords: matchesFound
  };
  chrome.runtime.sendMessage({ action: "sendData", payload });
}

// --- Lazy Loading for Visible Content ---
function processVisibleContent() {
  if (processing) return; // Prevent parallel processing
  processing = true;

  const nodes = collectTextNodes(document.body);
  processNodesInChunks(nodes);
}

// --- Observe Dynamic Changes with Debouncing ---
function observeMutations() {
  if (observer) observer.disconnect();

  let debounceTimeout;

  observer = new MutationObserver(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      processVisibleContent(); // Process changes after debounce delay
    }, 500); // Debounced for 500ms
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// --- Initialize the Script ---
setTimeout(() => {
  processVisibleContent(); // Process initial content
  observeMutations(); // Monitor changes dynamically
}, 500);
