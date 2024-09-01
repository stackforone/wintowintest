function winNumber() {
    const input = document.getElementById('input-number').value;
    const excludeDouble = document.getElementById('exclude-checkbox').checked;
    let results = generateCombinations(input, excludeDouble);
    displayResults(results);
}

function generateCombinations(input, excludeDouble) {
    if (input.length < 2) {
        return ['ป้อนเลขอย่างน้อย 2 ตัว'];
    }

    let results = [];
    let length = input.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (j !== i) {
                let combination2 = input[i] + input[j];
                results.push(combination2);
                for (let k = 0; k < length; k++) {
                    if (k !== i && k !== j) {
                        let combination3 = input[i] + input[j] + input[k];
                        results.push(combination3);
                    }
                }
            }
        }
    }
    return results;
}

function displayResults(results) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    const set1 = filterResults(results, 3, false);
    const set2 = filterResults(results, 2, false);
    const set3 = filterResults(results, 3, true);
    const set4 = filterResults(results, 2, true);

    resultContainer.appendChild(createResultSet(set1, "เลข 3 ตัว ไม่รวมเบิ้ล"));
    resultContainer.appendChild(createResultSet(set2, "เลข 2 ตัว ไม่รวมเบิ้ล"));
    resultContainer.appendChild(createResultSet(set3, "เลข 3 ตัว รวมเบิ้ล"));
    resultContainer.appendChild(createResultSet(set4, "เลข 2 ตัว รวมเบิ้ล"));
}

function filterResults(results, length, includeDouble) {
    return results.filter(result => {
        if (result.length === length) {
            if (includeDouble) {
                return result[0] === result[1] || (length === 3 && (result[1] === result[2] || result[0] === result[2]));
            } else {
                return result[0] !== result[1] && (length === 2 || (result[1] !== result[2] && result[0] !== result[2]));
            }
        }
        return false;
    });
}

function createResultSet(results, title) {
    const resultSet = document.createElement('div');
    resultSet.className = 'result-set';

    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    resultSet.appendChild(titleElement);

    const resultText = results.join(' ');
    const resultTextNode = document.createElement('p');
    resultTextNode.textContent = resultText;
    resultSet.appendChild(resultTextNode);

    const countText = document.createElement('p');
    countText.textContent = `(รวม ${results.length} ชุด)`;
    resultSet.appendChild(countText);

    const copyButton = document.createElement('button');
    copyButton.textContent = 'คัดลอก';
    copyButton.onclick = function() {
        navigator.clipboard.writeText(resultText).then(() => {
            alert('คัดลอกสำเร็จ');
        });
    };
    resultSet.appendChild(copyButton);

    return resultSet;
}

function checkEnter(event) {
    if (event.key === "Enter") {
        winNumber();
    }
}

function resetForm() {
    document.getElementById('input-number').value = '';
    document.getElementById('exclude-checkbox').checked = false;
    document.getElementById('result').innerHTML = '';
}