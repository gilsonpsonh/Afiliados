// Função para calcular a porcentagem
function calculatePercentage() {
    const valueInput = document.getElementById('value');
    const value = parseFloat(valueInput.value);

    if (isNaN(value) || value <= 0) {
        document.getElementById('error-message').textContent = 'Por favor, insira um valor válido maior que zero.';
        return;
    }

    document.getElementById('error-message').textContent = '';

    // Calcula e atualiza os resultados
    const percentages = {
        'result-12-value': 0.12,
        'result-12-value': 0.12,
        'result-8-value': 0.08,
        'result-7-value': 0.07,
        'result-5-value': 0.05
    };

    for (const [id, percentage] of Object.entries(percentages)) {
        const result = value * percentage;
        const formattedResult = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById(id).textContent = `R$ ${formattedResult}`;
    }
}

// Função para lidar com mudanças no campo de entrada
function onValueInputChange() {
    calculatePercentage();
}

// Função para limpar os campos e resultados da Calculadora de Porcentagem
function clearPercentageCalculator() {
    document.getElementById('value').value = '';
    document.getElementById('error-message').textContent = '';
    const resultIds = [
        'result-12-value',
        'result-10-value',
        'result-8-value',
        'result-7-value',
        'result-5-value'
    ];
    resultIds.forEach(id => document.getElementById(id).textContent = 'R$ 0,00');
}

// Adiciona eventos para a Calculadora de Porcentagem
document.getElementById('value').addEventListener('input', onValueInputChange);
document.getElementById('clear-percentage-button').addEventListener('click', clearPercentageCalculator);

// Função para calcular a soma na Calculadora de Somas
function calculateSum() {
    const expressionInput = document.getElementById('expression').value;

    if (expressionInput.trim() === '') {
        // Se a expressão estiver vazia, limpe a caixa de expressão-cópia
        document.getElementById('sum-result').textContent = 'Resultado: R$ 0,00';
        document.getElementById('expression-copy').value = '';
        return;
    }

    try {
        // Avalia a expressão matemática de forma segura
        const result = new Function('return ' + expressionInput.replace(',', '.'))();
        if (isNaN(result)) {
            throw new Error('Resultado inválido.');
        }
        const formattedResult = result.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        document.getElementById('sum-result').textContent = `Resultado: R$ ${formattedResult}`;
        document.getElementById('expression-copy').value = expressionInput;
    } catch (error) {
        document.getElementById('sum-result').textContent = 'Insira uma expressão matemática válida.';
    }
}

// Função para copiar o resultado da soma e atualizar as caixas de "Últimas 2 Somas"
function copyToLog() {
    const expressionText = document.getElementById('expression').value;
    const resultText = document.getElementById('sum-result').textContent.replace('Resultado: R$', '').trim();
    
    // Obter a hora atual
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Obter o conteúdo atual da primeira caixa
    const oldExpression1 = document.getElementById('expression-copy-1').value;
    const oldTime1 = document.getElementById('result-time-1').textContent;

    // Atualizar a primeira caixa com o valor mais recente e a hora
    document.getElementById('expression-copy-1').value = `${expressionText} = R$ ${resultText}`;
    document.getElementById('result-time-1').textContent = `Gerado às: ${formattedTime}`;

    // Mover o valor antigo da primeira caixa para a segunda
    document.getElementById('expression-copy-2').value = oldExpression1;
    document.getElementById('result-time-2').textContent = oldTime1;
}

// Função para copiar o conteúdo de uma caixa para a área de transferência
function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    const textToCopy = textarea.value;

    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('Texto copiado com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
    });
}

// Adiciona eventos para copiar o conteúdo das caixas de "Últimas 2 Somas"
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target'); // Obter o ID da caixa correspondente
        copyToClipboard(targetId); // Copiar o conteúdo da caixa
    });
});

// Função para mostrar a notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Remove a notificação após 3 segundos
}

// Função para limpar os campos e resultados da Calculadora de Somas
function clearSumCalculator() {
    document.getElementById('expression').value = '';
    document.getElementById('sum-result').textContent = 'Resultado: R$ 0,00';
    document.getElementById('expression-copy').value = '';
}

// Adiciona eventos para o botão de limpar
document.getElementById('clear-sum-button').addEventListener('click', clearSumCalculator);

// Adiciona eventos para a Calculadora de Somas
document.getElementById('copy-button').addEventListener('click', copyToLog);
document.getElementById('expression').addEventListener('input', calculateSum);
