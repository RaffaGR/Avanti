// Código 2: script.js

// Obtém referências para os elementos HTML
const usernameInput = document.getElementById('username-input');
const searchButton = document.getElementById('search-button');
const resultsArea = document.getElementById('results-area');
const loadingSpinner = document.getElementById('loading-spinner');

// Função para exibir o spinner de carregamento
function showLoading() {
    resultsArea.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
}

// Função para esconder o spinner de carregamento
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Função para exibir a mensagem de erro
function displayError(message, msg2) {
    hideLoading();
    resultsArea.classList.remove('hidden');
    resultsArea.classList.add('bg-gray-200', 'text-red-800'); // Fundo e texto para erro
    resultsArea.classList.remove('bg-gray-300', 'text-gray-800'); // Remove estilos de sucesso
    let htmlContent = `
        <p class="text-red-600 text-center font-semibold">${message}</p>
    `;

    // Verifica se msg2 foi fornecido e se tem um valor "truthy" (não é null, undefined, "", 0, false)
    if (msg2) {
        // Se msg2 existe, adiciona o segundo parágrafo ao conteúdo HTML.
        htmlContent += `
            <p class="text-red-600 text-center font-semibold">${msg2}</p>
        `;
    }

    // Define o innerHTML da área de resultados com o conteúdo construído.
    resultsArea.innerHTML = htmlContent;
}

// Função para exibir o perfil do usuário
function displayProfile(profile) {
    hideLoading();
    resultsArea.classList.remove('hidden');
    resultsArea.classList.add('bg-gray-300', 'text-gray-800'); // Fundo e texto para resultado normal
    resultsArea.classList.remove('bg-red-200', 'text-red-800'); // Remove estilos de erro
    resultsArea.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center"> <!-- Flexbox responsivo -->
            <img
                id="profile-avatar"
                src="${profile.avatar_url}"
                alt="Foto de Perfil de ${profile.name || profile.login}"
                class="w-24 h-24 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0 border-4 border-blue-500"
            >
            <div class="text-center sm:text-left"> <!-- Texto responsivo -->
                <h2 id="profile-name" class="text-2xl font-semibold mb-1">${profile.name || profile.login}</h2> <!-- Usa nome ou login -->
                <p id="profile-bio" class="text-gray-700">${profile.bio || 'Bio não disponível.'}</p> <!-- Exibe bio ou mensagem -->
            </div>
        </div>
    `;
}

// Função para buscar o perfil do GitHub
async function fetchGithubProfile(username) {
    if (!username) {
        displayError("Por favor, digite um nome de usuário.");
        return;
    }

    // Exibe o spinner antes da requisição
    showLoading(); 

    // Limpa a área de resultados/erro anterior
    resultsArea.innerHTML = ''; 

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.status === 404) {
            displayError("Nenhum perfil foi encontrado com esse nome de usuário.", "Tente novamente.");
        } else if (!response.ok) {
            displayError(`Ocorreu um erro ao buscar o perfil: ${response.status}`);
        } else {
            // Exibição do perfil encontrado
            const data = await response.json();
            displayProfile(data); 
        }
    } catch (error) {
        displayError(`Ocorreu um erro na requisição: ${error.message}`);
    } finally {
        hideLoading(); 
    }
}

// Clique do botão de busca
searchButton.addEventListener('click', () => {
    const username = usernameInput.value.trim(); 
    fetchGithubProfile(username);
});

// Buscar pressionando Enter no input
usernameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const username = usernameInput.value.trim();
        fetchGithubProfile(username);
    }
});