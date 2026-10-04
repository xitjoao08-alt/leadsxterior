/* =====================================================
   LEADXTERIOR
   Sistema de geração/prospecção de leads
===================================================== */


/* =====================================================
   FRASES MOTIVACIONAIS
===================================================== */

const motivationPhrases = [
    "Você quer ser um futuro milionário?",
    "Enquanto muitos estão pensando, você está construindo.",
    "Seu próximo cliente pode estar a uma pesquisa de distância.",
    "Grandes resultados começam com uma pequena ação.",
    "Não espere a oportunidade. Encontre ela.",
    "Hoje você procura leads. Amanhã eles podem procurar você.",
    "Foco no trabalho. O resultado vem depois."
];

const randomPhrase =
    motivationPhrases[
        Math.floor(Math.random() * motivationPhrases.length)
    ];


const motivationPhrase =
    document.getElementById("motivationPhrase");

const introPhrase =
    document.getElementById("introPhrase");

if (motivationPhrase) {
    motivationPhrase.textContent = randomPhrase;
}

if (introPhrase) {
    introPhrase.textContent = randomPhrase;
}


/* =====================================================
   CIDADES
===================================================== */

const CITIES = {

    BR: [
        "São Paulo",
        "Rio de Janeiro",
        "Belo Horizonte",
        "Brasília",
        "Curitiba",
        "Campinas",
        "Santos",
        "Jundiaí",
        "Sorocaba",
        "Ribeirão Preto",
        "São José dos Campos",
        "São José do Rio Preto",
        "Jales",
        "Presidente Prudente",
        "Marília",
        "Bauru",
        "Franca",
        "Uberlândia",
        "Uberaba",
        "Juiz de Fora",
        "Montes Claros",
        "Contagem",
        "Divinópolis",
        "Londrina",
        "Maringá",
        "Joinville",
        "Florianópolis",
        "Porto Alegre",
        "Caxias do Sul",
        "Salvador",
        "Feira de Santana",
        "Recife",
        "Fortaleza",
        "Goiânia",
        "Campo Grande",
        "Cuiabá",
        "Manaus",
        "Belém"
    ],

    PT: [
        "Lisboa",
        "Porto",
        "Braga",
        "Coimbra",
        "Aveiro",
        "Faro",
        "Setúbal",
        "Sintra",
        "Cascais",
        "Guimarães",
        "Leiria",
        "Viseu",
        "Évora",
        "Funchal",
        "Almada",
        "Amadora"
    ],

    US: [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "Austin",
        "Miami",
        "Orlando",
        "Tampa",
        "Boston",
        "Seattle",
        "Denver",
        "Atlanta",
        "Las Vegas",
        "San Francisco",
        "Washington",
        "Charlotte",
        "Nashville",
        "Detroit",
        "Portland"
    ]

};


/* =====================================================
   SUGESTÕES DE NEGÓCIOS
===================================================== */

const BUSINESS_SUGGESTIONS = {

    BR: [
        "Barbearia",
        "Salão de beleza",
        "Salão masculino",
        "Clínica odontológica",
        "Clínica médica",
        "Clínica de estética",
        "Estética",
        "Academia",
        "Restaurante",
        "Hamburgueria",
        "Pizzaria",
        "Sorveteria",
        "Padaria",
        "Confeitaria",
        "Doceria",
        "Loja de roupas",
        "Loja de móveis",
        "Loja de celulares",
        "Pet shop",
        "Veterinário",
        "Oficina mecânica",
        "Auto center",
        "Imobiliária",
        "Hotel",
        "Pousada",
        "Fotógrafo",
        "Designer",
        "Agência de marketing",
        "Sapataria",
        "Salgados",
        "Casa de festas",
        "Escola",
        "Curso profissionalizante"
    ],

    PT: [
        "Barbearia",
        "Salão de beleza",
        "Cabeleireiro",
        "Clínica dentária",
        "Clínica médica",
        "Clínica de estética",
        "Restaurante",
        "Hamburgueria",
        "Pizzaria",
        "Pastelaria",
        "Padaria",
        "Doçaria",
        "Loja de roupa",
        "Loja de móveis",
        "Loja de telemóveis",
        "Pet shop",
        "Oficina automóvel",
        "Imobiliária",
        "Hotel",
        "Alojamento local",
        "Fotógrafo",
        "Agência de marketing",
        "Ginásio",
        "Escola"
    ],

    US: [
        "Barbershop",
        "Hair salon",
        "Beauty salon",
        "Dental clinic",
        "Medical clinic",
        "Aesthetic clinic",
        "Restaurant",
        "Burger restaurant",
        "Pizza restaurant",
        "Bakery",
        "Coffee shop",
        "Clothing store",
        "Furniture store",
        "Cell phone store",
        "Pet shop",
        "Veterinary clinic",
        "Auto repair shop",
        "Real estate agency",
        "Hotel",
        "Motel",
        "Photography studio",
        "Marketing agency",
        "Gym",
        "Spa",
        "School"
    ]

};


/* =====================================================
   NORMALIZAÇÃO
===================================================== */

function normalizeText(text) {

    return String(text || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


/* =====================================================
   ELEMENTOS
===================================================== */

const country =
    document.getElementById("country");

const business =
    document.getElementById("business");

const city =
    document.getElementById("city");

const quantity =
    document.getElementById("quantity");

const businessSuggestions =
    document.getElementById("businessSuggestions");

const citySuggestions =
    document.getElementById("citySuggestions");

const searchButton =
    document.getElementById("searchButton");

const results =
    document.getElementById("results");

const loading =
    document.getElementById("loading");

const resultsHeader =
    document.getElementById("resultsHeader");

const resultCount =
    document.getElementById("resultCount");


/* =====================================================
   AUTOCOMPLETE - NEGÓCIO
===================================================== */

function renderBusinessSuggestions() {

    const countryCode = country.value;

    const search =
        normalizeText(business.value);

    let list =
        BUSINESS_SUGGESTIONS[countryCode] || [];

    if (search) {

        list = list.filter(item =>
            normalizeText(item).includes(search)
        );

    }

    list = list.slice(0, 10);

    businessSuggestions.innerHTML = "";

    if (!list.length) {
        businessSuggestions.classList.remove("show");
        return;
    }

    list.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "suggestion-item";

        element.innerHTML = `
            ${item}
            <small>Categoria / negócio</small>
        `;

        element.addEventListener("click", () => {

            business.value = item;

            businessSuggestions.classList.remove("show");

            city.focus();

        });

        businessSuggestions.appendChild(element);

    });

    businessSuggestions.classList.add("show");

}


/* =====================================================
   AUTOCOMPLETE - CIDADE
===================================================== */

function renderCitySuggestions() {

    const countryCode = country.value;

    const search =
        normalizeText(city.value);

    let list =
        CITIES[countryCode] || [];

    if (search) {

        list = list.filter(item =>
            normalizeText(item).includes(search)
        );

    }

    list = list.slice(0, 10);

    citySuggestions.innerHTML = "";

    if (!list.length) {
        citySuggestions.classList.remove("show");
        return;
    }

    list.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "suggestion-item";

        element.innerHTML = `
            ${item}
            <small>Cidade disponível</small>
        `;

        element.addEventListener("click", () => {

            city.value = item;

            citySuggestions.classList.remove("show");

        });

        citySuggestions.appendChild(element);

    });

    citySuggestions.classList.add("show");

}


/* =====================================================
   EVENTOS DO AUTOCOMPLETE
===================================================== */

business.addEventListener(
    "focus",
    renderBusinessSuggestions
);

business.addEventListener(
    "input",
    renderBusinessSuggestions
);

city.addEventListener(
    "focus",
    renderCitySuggestions
);

city.addEventListener(
    "input",
    renderCitySuggestions
);


country.addEventListener("change", () => {

    business.value = "";
    city.value = "";

    businessSuggestions.classList.remove("show");
    citySuggestions.classList.remove("show");

});


document.addEventListener("click", event => {

    if (!event.target.closest(".autocomplete-field")) {

        businessSuggestions.classList.remove("show");
        citySuggestions.classList.remove("show");

    }

});


/* =====================================================
   ENTER
===================================================== */

business.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        city.focus();

    }

});


city.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        searchLeads();

    }

});


/* =====================================================
   DADOS DEMO
===================================================== */

const demoBusinesses = {

    BR: [
        "Studio Prime",
        "Espaço Bella",
        "Barbearia Central",
        "Clínica Vida",
        "Estética Prime",
        "Sabor & Cia",
        "Burger House",
        "Doce Encanto",
        "Auto Center Brasil",
        "Pet Mais"
    ],

    PT: [
        "Barbearia Lisboa",
        "Espaço Beleza",
        "Clínica Saúde",
        "Porto Burger",
        "Doçaria Central",
        "Auto Lisboa",
        "Pet House",
        "Studio Porto"
    ],

    US: [
        "Downtown Barbers",
        "Prime Beauty Studio",
        "Miami Dental",
        "Burger House",
        "Sunshine Auto",
        "Urban Fitness",
        "Happy Paws",
        "Elite Real Estate"
    ]

};


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   CRIAR LEADS
===================================================== */

function generateLeads() {

    const countryCode =
        country.value;

    const businessQuery =
        business.value.trim() || "Empresa";

    const cityQuery =
        city.value.trim() || "Cidade";

    const amount =
        Number(quantity.value) || 15;

    const names =
        demoBusinesses[countryCode] || [];

    const leads = [];

    for (let i = 0; i < amount; i++) {

        const base =
            names[i % names.length];

        const number =
            String(11 + i).padStart(2, "0");

        let phone = "";

        let contactType = "";

        if (i % 3 !== 0) {

            phone =
                countryCode === "BR"
                    ? `+55 11 98888-${number}0${i}`
                    : countryCode === "PT"
                    ? `+351 91 888 88 ${number}`
                    : `+1 (305) 555-${number}0${i}`;

            contactType = "whatsapp";

        } else {

            phone =
                countryCode === "BR"
                    ? `(17) 3200-${number}0${i}`
                    : countryCode === "PT"
                    ? `21 3000 ${number}`
                    : `+1 (305) 555-${number}0${i}`;

            contactType = "phone";

        }


        const website =
            i % 4 === 0
                ? ""
                : `https://www.google.com/search?q=${encodeURIComponent(
                    base + " " + cityQuery
                )}`;


        leads.push({

            id:
                Date.now() +
                "-" +
                i,

            name:
                `${base} ${number}`,

            category:
                businessQuery,

            city:
                cityQuery,

            country:
                countryCode,

            website:
                website,

            phone:
                phone,

            contactType:
                contactType

        });

    }

    return leads;

}


/* =====================================================
   ABORDAGEM
===================================================== */

function getApproach(lead) {

    if (lead.country === "BR") {

        return `Olá! Tudo bem? Meu nome é João. Encontrei a ${lead.name} e vi que vocês trabalham com ${lead.category}. Eu trabalho com soluções digitais e acredito que posso ajudar a empresa a conseguir uma presença online mais profissional. Posso te explicar rapidinho?`;

    }


    if (lead.country === "PT") {

        return `Olá! Tudo bem? O meu nome é João. Encontrei a ${lead.name} e reparei que trabalham na área de ${lead.category}. Trabalho com soluções digitais e acredito que posso ajudar a melhorar a presença online da empresa. Posso explicar-lhe rapidamente a ideia?`;

    }


    return `Hi! How are you? My name is João. I came across ${lead.name} and noticed that you work in the ${lead.category} industry. I work with digital solutions and I believe I could help improve your online presence. Can I quickly explain the idea?`;

}


/* =====================================================
   SCRIPT DE LIGAÇÃO
===================================================== */

function getCallScript(lead) {

    if (lead.country === "BR") {

        return `Olá, tudo bem? Eu estou falando com o responsável pela ${lead.name}? Meu nome é João e trabalho com soluções digitais. Encontrei a empresa de vocês e queria apresentar uma ideia rápida que pode ajudar na presença online.`;

    }


    if (lead.country === "PT") {

        return `Olá, boa tarde. Estou a falar com o responsável pela ${lead.name}? O meu nome é João e trabalho com soluções digitais. Encontrei a empresa e gostaria de apresentar uma ideia rápida que pode ajudar a melhorar a presença online.`;

    }


    return `Hi, how are you? Am I speaking with the person responsible for ${lead.name}? My name is João and I work with digital solutions. I found your business online and I have a quick idea that could improve your online presence.`;

}


/* =====================================================
   RENDER LEAD
===================================================== */

function renderLead(lead, index) {

    const badge =
        lead.contactType === "whatsapp"
            ? `<span class="badge badge-whatsapp">WHATSAPP</span>`
            : `<span class="badge badge-phone">TELEFONE</span>`;


    const phoneText =
        lead.contactType === "phone"
            ? `${lead.phone} — LIGAR`
            : lead.phone;


    const websiteHTML =
        lead.website
            ? `<a href="${lead.website}" target="_blank" rel="noopener noreferrer">🌐 Ver site</a>`
            : `<span>🌐 Site off</span>`;


    const card =
        document.createElement("article");

    card.className = "lead-card";

    card.style.animationDelay =
        `${index * 0.05}s`;


    card.innerHTML = `

        <div class="lead-top">

            <div>
                <div class="lead-name">
                    ${escapeHTML(lead.name)}
                </div>

                <div class="lead-category">
                    ${escapeHTML(lead.category)}
                    ·
                    ${escapeHTML(lead.city)}
                </div>
            </div>

            ${badge}

        </div>


        <div class="lead-info">

            ${websiteHTML}

            <span>
                📞 ${escapeHTML(phoneText)}
            </span>

        </div>


        <div class="call-script">

            <strong>O QUE FALAR NA LIGAÇÃO</strong>

            <p>
                ${escapeHTML(getCallScript(lead))}
            </p>

        </div>


        <div class="lead-actions">

            <button
                class="copy-approach">
                💬 Copiar abordagem
            </button>

            <button
                class="save-lead">
                ★ Salvar
            </button>

        </div>

    `;


    /* COPIAR ABORDAGEM */

    card
        .querySelector(".copy-approach")
        .addEventListener("click", async () => {

            await copyText(
                getApproach(lead)
            );

            alert("Abordagem copiada!");

        });


    /* SALVAR */

    card
        .querySelector(".save-lead")
        .addEventListener("click", () => {

            saveLead(lead);

            updateStats();

            alert("Lead salvo!");

        });


    return card;

}


/* =====================================================
   COPIAR
===================================================== */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

    } catch {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

    }

}


/* =====================================================
   STORAGE
===================================================== */

function getSavedLeads() {

    return JSON.parse(
        localStorage.getItem("leadxterior_saved") || "[]"
    );

}


function saveLead(lead) {

    const saved =
        getSavedLeads();

    if (
        !saved.some(
            item => item.id === lead.id
        )
    ) {

        saved.push(lead);

        localStorage.setItem(
            "leadxterior_saved",
            JSON.stringify(saved)
        );

    }

}


function getHistory() {

    return JSON.parse(
        localStorage.getItem("leadxterior_history") || "[]"
    );

}


function addHistory(search) {

    const history =
        getHistory();

    history.unshift({

        ...search,

        date:
            new Date().toLocaleString(
                "pt-BR"
            )

    });

    localStorage.setItem(
        "leadxterior_history",
        JSON.stringify(
            history.slice(0, 30)
        )
    );

}


function getSearchCount() {

    return Number(
        localStorage.getItem(
            "leadxterior_searches"
        ) || 0
    );

}


/* =====================================================
   BUSCAR
===================================================== */

async function searchLeads() {

    const selectedBusiness =
        business.value.trim();

    const selectedCity =
        city.value.trim();

    if (!selectedBusiness) {

        alert("Digite um negócio ou categoria.");

        business.focus();

        return;

    }


    if (!selectedCity) {

        alert("Digite ou escolha uma cidade.");

        city.focus();

        return;

    }


    businessSuggestions.classList.remove("show");
    citySuggestions.classList.remove("show");


    loading.classList.remove("hidden");

    results.innerHTML = "";

    resultsHeader.classList.add("hidden");


    /*
       Simula uma busca.
       Quando conectar uma API real,
       esta parte será substituída pela chamada.
    */

    await new Promise(resolve =>
        setTimeout(resolve, 1800)
    );


    const leads =
        generateLeads();


    loading.classList.add("hidden");

    resultsHeader.classList.remove("hidden");

    resultCount.textContent =
        `${leads.length} encontrados`;


    leads.forEach((lead, index) => {

        results.appendChild(
            renderLead(lead, index)
        );

    });


    const searches =
        getSearchCount() + 1;


    localStorage.setItem(
        "leadxterior_searches",
        searches
    );


    addHistory({

        country:
            country.value,

        business:
            selectedBusiness,

        city:
            selectedCity,

        quantity:
            leads.length

    });


    updateStats();

}


/* =====================================================
   PESQUISAR
===================================================== */

searchButton.addEventListener(
    "click",
    searchLeads
);


/* =====================================================
   NAVEGAÇÃO
===================================================== */

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".section");


function openSection(id) {

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    navItems.forEach(item => {

        item.classList.remove("active");

    });


    const section =
        document.getElementById(id);

    const nav =
        document.querySelector(
            `[data-section="${id}"]`
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    if (nav) {

        nav.classList.add("active");

    }


    if (id === "saved") {

        renderSaved();

    }


    if (id === "history") {

        renderHistory();

    }

}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        openSection(
            item.dataset.section
        );

    });

});


document
    .getElementById("startSearch")
    .addEventListener("click", () => {

        openSection("leads");

        setTimeout(() => {
            business.focus();
        }, 200);

    });


/* =====================================================
   SALVOS
===================================================== */

function renderSaved() {

    const container =
        document.getElementById(
            "savedResults"
        );

    container.innerHTML = "";

    const saved =
        getSavedLeads();


    if (!saved.length) {

        container.innerHTML = `
            <div class="welcome-card">
                <div>
                    <span class="small-title">
                        NENHUM LEAD
                    </span>

                    <h2>
                        Você ainda não salvou leads.
                    </h2>

                    <p>
                        Encontre oportunidades e salve
                        as melhores para trabalhar depois.
                    </p>
                </div>
            </div>
        `;

        return;

    }


    saved.forEach((lead, index) => {

        container.appendChild(
            renderLead(lead, index)
        );

    });

}


/* =====================================================
   HISTÓRICO
===================================================== */

function renderHistory() {

    const container =
        document.getElementById(
            "historyResults"
        );

    container.innerHTML = "";

    const history =
        getHistory();


    if (!history.length) {

        container.innerHTML = `
            <div class="history-item">
                <span>
                    Nenhuma pesquisa realizada ainda.
                </span>
            </div>
        `;

        return;

    }


    history.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "history-item";

        element.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(item.business)}
                </strong>

                <span>
                    · ${escapeHTML(item.city)}
                </span>

            </div>

            <span>
                ${escapeHTML(item.date)}
            </span>

        `;

        container.appendChild(element);

    });

}


/* =====================================================
   ESTATÍSTICAS
===================================================== */

function updateStats() {

    document.getElementById(
        "savedLeads"
    ).textContent =
        getSavedLeads().length;


    document.getElementById(
        "totalSearches"
    ).textContent =
        getSearchCount();


    const history =
        getHistory();

    const total =
        history.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );


    document.getElementById(
        "totalLeads"
    ).textContent =
        total;

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

updateStats();
