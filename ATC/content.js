function ensureAlertContainer() {
    var alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '50%';
        alertContainer.style.right = '10px'; // Default position: right
        alertContainer.style.transform = 'translateY(-50%)';
        alertContainer.style.backgroundColor = '#FF0000';
        alertContainer.style.border = '1px solid #FF0000';
        alertContainer.style.padding = '20px';
        alertContainer.style.borderRadius = '10px';
        alertContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        alertContainer.style.zIndex = '1000';
        alertContainer.style.display = 'flex';
        alertContainer.style.flexDirection = 'column';
        alertContainer.style.alignItems = 'flex-start';
        alertContainer.style.cursor = 'move'; // Add cursor style for dragging

        // Create and append logo
        var logo = document.createElement('img');
        logo.src = 'https://www.interpublic.com/wp-content/uploads/2019/04/Logo_UM-e1566481266432.png';
        logo.alt = 'Logo';
        logo.id = 'alert-logo';
        logo.style.width = '50px';
        logo.style.height = '50px';
        logo.style.marginBottom = '10px';
        alertContainer.appendChild(logo);

        document.body.appendChild(alertContainer);

        makeDraggable(alertContainer); // Make the alert container draggable
    }
    return alertContainer;
}

function removeAlertContainerIfEmpty() {
    var alertContainer = document.getElementById('alert-container');
    if (alertContainer && alertContainer.childElementCount <= 1) { // Adjust to 1 because of the logo
        alertContainer.remove();
    }
}

function addAlert(id, message) {
    var alertContainer = ensureAlertContainer();
    var alert = document.getElementById(id);
    if (!alert) {
        alert = document.createElement('p');
        alert.id = id;
        alert.innerHTML = message; // innerHTML is used to add HTML content
        alert.style.margin = '0 0 10px 0'; // Space between alerts
        alert.style.padding = '10px'; // Padding for alerts
        alert.style.backgroundColor = '#f8f9fa'; // Light background for alerts
        alert.style.border = '1px solid #ff0000'; // Red border for alerts
        alert.style.borderRadius = '5px'; // Rounded corners for alerts
        alert.style.fontSize = '14px'; // Ensure font size consistency
        alertContainer.appendChild(alert);
    }
}

function removeAlert(id) {
    var alert = document.getElementById(id);
    if (alert) {
        alert.remove();
        removeAlertContainerIfEmpty();
    }
}

function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;

        // Remove right style and set left style
        element.style.left = element.getBoundingClientRect().right + 'px';
        element.style.right = '';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            element.style.left = initialX + deltaX + 'px';
            element.style.top = initialY + deltaY + 'px';
            element.style.transform = ''; // Disable transform during dragging
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// GOOGLE HANDLERS

function handleBudgetInputChange(event) {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value > 100) {
        addAlert('alert7', 'Bütçe tutarı 100₺ üzerinde.');
    } else {
        removeAlert('alert7');
    }
}

function handleCampaignInputChange(event) {
    const value = event.target.value.toLowerCase();
    if (value === 'dyson') {
        addAlert('alert8', 'Kampanya adı "Dyson" olarak girildi.');
    } else {
        removeAlert('alert8');
    }
}

function handleTargetCPMBidInputChange(event) {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value > 100) {
        addAlert('alert9', 'Hedef GBM teklifi 100₺ üzerinde.');
    } else {
        removeAlert('alert9');
    }
}

function handleKeywordTextareaChange(event) {
    const value = event.target.value.toLowerCase();
    if (value.includes('entertainment')) {
        addAlert('alert10', 'Anahtar kelimeler arasında "entertainment" bulundu.');
    } else {
        removeAlert('alert10');
    }
}

function checkDivContent() {
    const targetDiv = document.querySelector('div[debugid="title"]');
    if (targetDiv && targetDiv.textContent.includes('Sanat ve Eğlence')) {
        addAlert('alert11', 'Sanat ve Eğlence içeriği bulundu.');
    } else {
        removeAlert('alert11');
    }
}

function handleAdGroupName(event) {
    const value = event.target.value.toLowerCase();
    if (value === 'dyson') {
        addAlert('alert12', 'Reklam Grubu Adı Dyson olarak girildi.');
    } else {
        removeAlert('alert12');
    }
}

var allPickers = document.querySelectorAll('.selection-loading-content-picker');
allPickers.forEach(function(picker, index) {
    var divs = picker.querySelectorAll('div');
    divs.forEach(function(div, divIndex) {
        if (div.textContent.includes("Sanat ve Eğlence")) {
            addAlert('alert-picker-' + index + '-' + divIndex, 'Sanat ve Eğlence içeriği bulundu: ' + div.textContent);
        } else {
            removeAlert('alert-picker-' + index + '-' + divIndex);
        }
    });
});

function checkCampaignLifetimeBudgetLabel() {
    var labels = document.querySelectorAll('label[for="campaign-lifetime-budget"]');
    labels.forEach(function(label) {
        if (label && !label.textContent.includes('Currency in Turkey, New Lira (TRY)')) {
            addAlert('alert13', 'Şu anda currency olarak TL seçili değil.');
        } else {
            removeAlert('alert13');
        }
    });
}

function checkBoldTextInParagraphs() {
    var paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(function(paragraph) {
        var boldElements = paragraph.querySelectorAll('b');
        boldElements.forEach(function(boldElement) {
            var boldText = boldElement.textContent.trim();
            addAlert('alert16', boldText);
        });
    });
}

function checkSpanForPredictionText() {
    var spans = document.querySelectorAll('span');
    spans.forEach(function(span) {
        var text = span.textContent.trim();
        var match = text.match(/(.*)için harcamayı ve önemli sonuçları gösterir Öngörülen sonuçlar tahminidir ve gerçek performansı garanti etmez\./);
        if (match) {
            var precedingText = match[1].trim();
            addAlert('alert15', precedingText);
        }
    });
}

function checkDaysInParagraphs() {
    var paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(function(paragraph) {
        var text = paragraph.textContent.trim();
        var match = text.match(/(\d+)\s+gün/);
        if (match) {
            var days = parseInt(match[1], 10);
            if (days > 15) {
                addAlert('alert14', '15 günden fazla olamaz');
            } else {
                removeAlert('alert14');
            }
        }
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        const adcamInput = document.querySelector('input[aria-label="Reklam grubu adı"]');
        if (adcamInput && !adcamInput.dataset.listenerAdded) {
            adcamInput.addEventListener('input', handleAdGroupName);
            adcamInput.dataset.listenerAdded = 'true';
        }

        const budgetInput = document.querySelector('input[aria-label="Bütçe tutarı (₺ cinsinden)"]');
        if (budgetInput && !budgetInput.dataset.listenerAdded) {
            budgetInput.addEventListener('input', handleBudgetInputChange);
            budgetInput.dataset.listenerAdded = 'true';
        }

        const campaignInput = document.querySelector('input[aria-label="Kampanya adı"]');
        if (campaignInput && !campaignInput.dataset.listenerAdded) {
            campaignInput.addEventListener('input', handleCampaignInputChange);
            campaignInput.dataset.listenerAdded = 'true';
        }

        const targetCPMBidInput = document.querySelector('input[aria-label="Hedef GBM teklifi (₺ cinsinden)"]');
        if (targetCPMBidInput && !targetCPMBidInput.dataset.listenerAdded) {
            targetCPMBidInput.addEventListener('input', handleTargetCPMBidInputChange);
            targetCPMBidInput.dataset.listenerAdded = 'true';
        }

        const keywordTextarea1 = document.querySelector('textarea[aria-label="Anahtar kelimeleri girin veya yapıştırın. Anahtar kelimeleri birbirinden virgülle ayırabilir veya her satıra bir anahtar kelime girebilirsiniz."]');
        if (keywordTextarea1 && !keywordTextarea1.dataset.listenerAdded) {
            keywordTextarea1.addEventListener('input', handleKeywordTextareaChange);
            keywordTextarea1.dataset.listenerAdded = 'true';
        }

        const keywordTextarea2 = document.querySelector('textarea[aria-label="Kelimeye veya kelime öbeğine göre arama yapın"]');
        if (keywordTextarea2 && !keywordTextarea2.dataset.listenerAdded) {
            keywordTextarea2.addEventListener('input', handleKeywordTextareaChange);
            keywordTextarea2.dataset.listenerAdded = 'true';
        }

        checkDivContent();
        checkCampaignLifetimeBudgetLabel(); // Call this function to check the label
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

observeDOMChanges();

// FACEBOOK HANDLERS

var callback = function(mutationsList, observer) {
    for (var mutation of mutationsList) {
        var element = document.querySelector('[aria-label="Create A/B test"]');
        if (element && element.getAttribute('aria-checked') === 'true') {
            addAlert('alert1', 'A/B test oluşturma durumu tespit edildi.');
        } else {
            removeAlert('alert1');
        }

        // Listen for campaign name and ad set name inputs
        let inputElement1 = document.querySelector('input[placeholder="Enter your campaign name here..."]');
        if (inputElement1) {
            inputElement1.addEventListener('input', function() {
                if (inputElement1.value.toLowerCase() === 'dyson') {
                    addAlert('alert2', 'Campaign name "Dyson" olarak girildi.');
                } else {
                    removeAlert('alert2');
                }
            });
        }

        let inputElement2 = document.querySelector('input[placeholder="Enter your ad set name here..."]');
        if (inputElement2) {
            inputElement2.addEventListener('input', function() {
                if (inputElement2.value.toLowerCase() === 'dyson') {
                    addAlert('alert3', 'Ad set name "Dyson" olarak girildi.');
                } else {
                    removeAlert('alert3');
                }
            });
        }

        var spans = document.querySelectorAll('span');
        var foundDailyBudget = false;
        spans.forEach(function(span) {
            if (span.textContent.includes('Daily budget')) {
                foundDailyBudget = true;
                addAlert('alert4', 'Daily budget seçildi.');
            }
        });
        if (!foundDailyBudget) {
            removeAlert('alert4');
        }

        var inputs = document.querySelectorAll('input[placeholder="Please enter amount"]');
        var budgetExceeded = false;
        inputs.forEach(function(input) {
            var value = parseFloat(input.value.replace('$', ''));
            if (!isNaN(value) && value > 50) {
                budgetExceeded = true;
                addAlert('alert5', 'Bütçe aşıldı.');
            }
        });
        if (!budgetExceeded) {
            removeAlert('alert5');
        }

        var dollarInputs = document.querySelectorAll('input[value^="$"]');
        var exceededValue = false;
        dollarInputs.forEach(function(input) {
            var value = parseFloat(input.value.replace('$', ''));
            if (!isNaN(value) && value > 100) {
                exceededValue = true;
                addAlert('alert6', 'Ad setteki bütçe 100 doların üzerinde.');
            }
        });
        if (!exceededValue) {
            removeAlert('alert6');
        }

        var allSpans = document.querySelectorAll('span');
        allSpans.forEach(function(span, index) {
            var spanText = span.textContent;
            var expectedStyle = 'font-family: Roboto, Arial, sans-serif; font-size: 0.875rem; line-height: 1.42857; letter-spacing: normal; overflow-wrap: normal; text-align: left; color: rgba(0, 0, 0, 0.85);';

            if (span.getAttribute('style') === expectedStyle && /\(\d+\)/.test(spanText)) { // Check style and regex
                addAlert('alert-span-' + index, spanText + '<br>olarak giriş yapıldı');
            } else {
                removeAlert('alert-span-' + index);
            }
        });

        checkLabelsForCurrency(); // Call to check for specific label content
        checkBoldTextInParagraphs(); // Call this function to check for bold text in paragraphs
        checkDivContent(); // Call to check for specific div content
        checkCampaignLifetimeBudgetLabel(); // Call to check the label
        checkSpanForPredictionText(); // Call this function to check for prediction text in spans
        checkDaysInParagraphs(); // Call this function to check the days in paragraphs
    }
};

/////// LINKEDIN HANDLERS

function checkCampaignLifetimeBudgetLabel() {
    var labels = document.querySelectorAll('label[for="campaign-lifetime-budget"]');
    labels.forEach(function(label) {
        if (label && !label.textContent.includes('Currency in Turkey, New Lira (TRY)')) {
            addAlert('alert13', 'Şu anda currency olarak TL seçili değil.');
        } else {
            removeAlert('alert13');
        }
    });
}




// Observe LinkedIn specific changes
function observeLinkedInDOMChanges() {
    const observer = new MutationObserver(() => {
        checkCampaignLifetimeBudgetLabel(); // Call this function to check the label
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

observeLinkedInDOMChanges(); // Call this function to start observing LinkedIn specific changes

// General observer for other changes
var targetNode = document.body;
var config = { attributes: true, childList: true, subtree: true };

var observer = new MutationObserver(callback);
observer.observe(targetNode, config);

observeDOMChanges(); // Call this function to start observing general changes



/////// google'daki sanat ve eğlence, linkedin'deki gün sayısı, linkedin'deki diğer detaylar, facebook'ta sayfa değiştikçe
/////// alert container'ın aynı kalması