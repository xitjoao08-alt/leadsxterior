const STORAGE = {
  saved: "leadxterior_saved",
  history: "leadxterior_history",
  found: "leadxterior_found",
  searches: "leadxterior_searches"
};


let state = {
  saved: JSON.parse(
    localStorage.getItem(STORAGE.saved) || "[]"
  ),

  history: JSON.parse(
    localStorage.getItem(STORAGE.history) || "[]"
  ),

  found: Number(
    localStorage.getItem(STORAGE.found) || 0
  ),

  searches: Number(
    localStorage.getItem(STORAGE.searches) || 0
  )
};


const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  document.querySelectorAll(selector);


let currentLeads = [];


/* =====================================
   PAÍSES
===================================== */

const COUNTRY_DATA = {

  BR: {
    name: "Brasil",
    flag: "🇧🇷"
  },

  PT: {
    name: "Portugal",
    flag: "🇵🇹"
  },

  US: {
    name: "Estados Unidos",
    flag: "🇺🇸"
  }

};


/* =====================================
   CIDADES
===================================== */

const CITIES = {

  BR: [

    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Curitiba",
    "Campinas",
    "Santos",
    "São José dos Campos",
    "São José do Rio Preto",
    "Jales",
    "Votuporanga",
    "Fernandópolis",
    "Ribeirão Preto",
    "Sorocaba",
    "Bauru",
    "Marília",
    "Presidente Prudente",
    "Araçatuba",
    "Franca",
    "São Carlos",
    "Araraquara",
    "Piracicaba",
    "Limeira",
    "Mogi das Cruzes",
    "Guarulhos",
    "Osasco",
    "Santo André",
    "São Bernardo do Campo",
    "São Caetano do Sul",
    "Uberlândia",
    "Uberaba",
    "Juiz de Fora",
    "Montes Claros",
    "Contagem",
    "Divinópolis",
    "Poços de Caldas",
    "Governador Valadares",
    "Londrina",
    "Maringá",
    "Foz do Iguaçu",
    "Joinville",
    "Florianópolis",
    "Blumenau",
    "Porto Alegre",
    "Caxias do Sul",
    "Salvador",
    "Recife",
    "Fortaleza",
    "Natal",
    "João Pessoa",
    "Maceió",
    "Aracaju",
    "Manaus",
    "Belém",
    "Goiânia",
    "Campo Grande",
    "Cuiabá"
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
    "Évora",
    "Viseu",
    "Santarém",
    "Portimão",
    "Almada",
    "Amadora",
    "Oeiras",
    "Matosinhos",
    "Vila Nova de Gaia"
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
    "San Jose",
    "Austin",
    "Jacksonville",
    "San Francisco",
    "Columbus",
    "Indianapolis",
    "Fort Worth",
    "Charlotte",
    "Seattle",
    "Denver",
    "Washington",
    "Boston",
    "Nashville",
    "Las Vegas",
    "Miami",
    "Atlanta",
    "Orlando",
    "Tampa",
    "Portland",
    "Detroit",
    "Memphis"
  ]

};


/* =====================================
   SUGESTÕES DE NEGÓCIOS
===================================== */

const BUSINESS_SUGGESTIONS = {

  BR: [

    "Barbearia",
    "Barbeiro",
    "Salão de beleza",
    "Salão masculino",
    "Clínica odontológica",
    "Clínica médica",
    "Clínica de estética",
    "Estética",
    "Academia",
    "Restaurante",
    "Pizzaria",
    "Hamburgueria",
    "Sorveteria",
    "Doceria",
    "Padaria",
    "Cafeteria",
    "Pet shop",
    "Veterinário",
    "Loja de roupas",
    "Loja de calçados",
    "Ótica",
    "Imobiliária",
    "Contabilidade",
    "Advocacia",
    "Fotógrafo",
    "Design",
    "Agência de marketing",
    "Oficina mecânica",
    "Auto center",
    "Lavagem automotiva"

  ],


  PT: [

    "Barbearia",
    "Barbeiro",
    "Salão de cabeleireiro",
    "Salão de beleza",
    "Clínica dentária",
    "Clínica médica",
    "Clínica de estética",
    "Estética",
    "Ginásio",
    "Restaurante",
    "Pizzaria",
    "Hamburgueria",
    "Gelataria",
    "Pastelaria",
    "Cafetaria",
    "Pet shop",
    "Veterinário",
    "Loja de roupa",
    "Loja de calçado",
    "Ótica",
    "Imobiliária",
    "Contabilidade",
    "Advocacia",
    "Fotógrafo",
    "Agência de marketing",
    "Oficina automóvel",
    "Lavagem automóvel"

  ],


  US: [

    "Barber shop",
    "Barber",
    "Beauty salon",
    "Hair salon",
    "Dental clinic",
    "Medical clinic",
    "Aesthetic clinic",
    "Gym",
    "Restaurant",
    "Pizza restaurant",
    "Burger restaurant",
    "Ice cream shop",
    "Bakery",
    "Coffee shop",
    "Pet shop",
    "Veterinarian",
    "Clothing store",
    "Shoe store",
    "Optical store",
    "Real estate agency",
    "Accounting",
    "Law firm",
    "Photographer",
    "Marketing agency",
    "Auto repair shop",
    "Car wash"

  ]

};


/* =====================================
   STORAGE
===================================== */

function saveState() {

  localStorage.setItem(
    STORAGE.saved,
    JSON.stringify(state.saved)
  );

  localStorage.setItem(
    STORAGE.history,
    JSON.stringify(state.history)
  );

  localStorage.setItem(
    STORAGE.found,
    state.found
  );

  localStorage.setItem(
    STORAGE.searches,
    state.searches
  );

}


function updateStats() {

  $("#statFound").textContent =
    state.found;

  $("#statSaved").textContent =
    state.saved.length;

  $("#statSearches").textContent =
    state.searches;

}


/* =====================================
   NORMALIZA TEXTO
===================================== */

function normalizeText(text) {

  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

}


/* =====================================
   AUTOCOMPLETE — NEGÓCIO
===================================== */

function renderBusinessSuggestions() {

  const input =
    $("#business");

  const container =
    $("#businessSuggestions");

  const country =
    $("#country").value;

  const query =
    normalizeText(input.value);


  let items =
    BUSINESS_SUGGESTIONS[country] || [];


  /*
    Se não digitou nada:
    mostra sugestões iniciais.
  */

  if (!query) {

    items =
      items.slice(0, 8);

  } else {

    /*
      Exemplo:
      "sa"

      encontra:

      Salão
      Salão masculino
      Saúde etc.

      A comparação ignora
      acentos e maiúsculas.
    */

    items =
      items.filter(
        item =>
          normalizeText(item)
            .includes(query)
      ).slice(0, 8);

  }


  if (!items.length) {

    container.classList.remove("show");

    container.innerHTML = "";

    return;
  }


  container.innerHTML =
    items.map(item => {

      return `
        <button
          type="button"
          class="suggestion-item"
          data-business="${escapeHTML(item)}"
        >

          <span class="suggestion-icon">
            🏢
          </span>

          <span>
            ${escapeHTML(item)}

            <small>
              Buscar leads desse segmento
            </small>
          </span>

        </button>
      `;

    }).join("");


  container.classList.add("show");


  container
    .querySelectorAll(
      ".suggestion-item"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          input.value =
            button.dataset.business;

          container.classList.remove(
            "show"
          );

        }
      );

    });

}


/* =====================================
   AUTOCOMPLETE — CIDADE
===================================== */

function renderCitySuggestions() {

  const input =
    $("#city");

  const container =
    $("#citySuggestions");

  const country =
    $("#country").value;

  const query =
    normalizeText(input.value);


  const cities =
    CITIES[country] || [];


  let items;


  if (!query) {

    items =
      cities.slice(0, 10);

  } else {

    items =
      cities
        .filter(
          city =>
            normalizeText(city)
              .includes(query)
        )
        .slice(0, 10);

  }


  if (!items.length) {

    container.innerHTML = `
      <div class="suggestion-item">
        🔎 Nenhuma cidade encontrada
      </div>
    `;

    container.classList.add("show");

    return;
  }


  container.innerHTML =
    items.map(city => {

      return `
        <button
          type="button"
          class="suggestion-item"
          data-city="${escapeHTML(city)}"
        >

          <span class="suggestion-icon">
            📍
          </span>

          <span>
            ${escapeHTML(city)}

            <small>
              Usar esta cidade
            </small>
          </span>

        </button>
      `;

    }).join("");


  container.classList.add("show");


  container
    .querySelectorAll(
      ".suggestion-item"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          input.value =
            button.dataset.city;

          container.classList.remove(
            "show"
          );

        }
      );

    });

}


/* =====================================
   ESCAPE HTML
===================================== */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================
   CONTACTOS DEMO
===================================== */

function getContact(country, index) {

  if (country === "BR") {

    const contacts = [

      {
        number: "+55 17 99612-3456",
        type: "whatsapp"
      },

      {
        number: "+55 17 3621-4587",
        type: "fixed"
      },

      {
        number: "+55 11 99876-2345",
        type: "whatsapp"
      },

      {
        number: "+55 17 3632-7788",
        type: "fixed"
      },

      {
        number: "+55 11 98765-4321",
        type: "whatsapp"
      }

    ];

    return contacts[
      index % contacts.length
    ];

  }


  if (country === "PT") {

    const contacts = [

      {
        number: "+351 912 345 678",
        type: "whatsapp"
      },

      {
        number: "+351 211 234 567",
        type: "fixed"
      },

      {
        number: "+351 913 456 789",
        type: "whatsapp"
      },

      {
        number: "+351 218 765 432",
        type: "fixed"
      },

      {
        number: "+351 914 567 890",
        type: "whatsapp"
      }

    ];

    return contacts[
      index % contacts.length
    ];

  }


  const contacts = [

    {
      number: "+1 305 555 0142",
      type: "phone"
    },

    {
      number: "+1 305 555 0187",
      type: "phone"
    },

    {
      number: "+1 786 555 0134",
      type: "phone"
    },

    {
      number: "+1 407 555 0166",
      type: "phone"
    },

    {
      number: "+1 212 555 0198",
      type: "phone"
    }

  ];

  return contacts[
    index % contacts.length
  ];

}


/* =====================================
   DEMO LEADS
===================================== */

const DEMO_NAMES = {

  BR: [
    "Barbearia Prime",
    "Studio Bella",
    "Clínica Vida",
    "Espaço Premium",
    "Barbearia Central",
    "Studio Concept",
    "Clínica Sorriso",
    "Bella Estética",
    "Barber House",
    "Espaço Saúde",
    "Studio Elegance",
    "Clínica Mais",
    "Barbearia Gold",
    "Studio Urban",
    "Clínica Bem Estar"
  ],

  PT: [
    "Barbearia Lisboa",
    "Studio Elegance",
    "Clínica Portugal",
    "Espaço Beauty",
    "Barbearia Central",
    "Studio Lisboa",
    "Clínica Sorriso",
    "Bella Estética",
    "Barber House",
    "Espaço Saúde",
    "Studio Premium",
    "Clínica Vida",
    "Barbearia Gold",
    "Studio Urban",
    "Clínica Bem Estar"
  ],

  US: [
    "Premium Barber Shop",
    "Bella Beauty Studio",
    "Downtown Clinic",
    "Prime Wellness",
    "Classic Barber",
    "Urban Studio",
    "Smile Clinic",
    "Beauty House",
    "Gentlemen Barber",
    "Wellness Center",
    "Elite Studio",
    "Modern Clinic",
    "Gold Barber",
    "Urban Beauty",
    "Health Center"
  ]

};


/* =====================================
   SITE
===================================== */

function getWebsite(name, index) {

  if (index % 4 === 3) {
    return null;
  }

  return (
    "https://www." +
    normalizeText(name)
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 22) +
    ".com"
  );

}


/* =====================================
   ABORDAGEM
===================================== */

function createApproach(
  name,
  business,
  country
) {

  if (country === "PT") {

    return `
      Olá! Tudo bem? Encontrei a ${name} e gostei do vosso trabalho.
      Estou a entrar em contacto porque acredito que posso ajudar o
      vosso negócio a reforçar ainda mais a presença online e a captar
      novos clientes. Posso mostrar-vos uma ideia rápida, sem compromisso?
    `;

  }


  if (country === "US") {

    return `
      Hi! How are you? I came across ${name} and really liked your business.
      I'm reaching out because I believe I could help you strengthen your
      online presence and attract more customers. Would you be open to
      seeing a quick idea with no commitment?
    `;

  }


  return `
    Olá! Tudo bem? Encontrei a ${name} e gostei do trabalho de vocês.
    Estou entrando em contato porque acredito que posso ajudar a
    ${business.toLowerCase()} a fortalecer ainda mais sua presença online
    e atrair novos clientes. Posso te mostrar uma ideia rápida,
    sem compromisso?
  `;

}


/* =====================================
   ROTEIRO DE LIGAÇÃO
===================================== */

function createCallScript(
  name,
  business,
  country
) {

  if (country === "PT") {

    return `
      Bom dia, estou a falar com o responsável pela ${name}?
      O meu nome é João e estou a entrar em contacto porque encontrei
      o vosso negócio e gostei do trabalho que fazem.
      Trabalho com soluções de presença digital e acredito que posso
      ajudar a ${business.toLowerCase()} a conseguir mais contactos
      e clientes através da internet.
      Teriam alguns minutos para eu explicar-vos uma ideia rápida,
      sem qualquer compromisso?
    `;

  }


  if (country === "US") {

    return `
      Hi, am I speaking with the person responsible for ${name}?
      My name is João. I came across your business and really liked
      what you're doing. I help businesses improve their online presence
      and attract more customers. I have a quick idea that could be
      useful for your business. Would you have a minute for me to
      explain it?
    `;

  }


  return `
    Olá, estou falando com o responsável pela ${name}?
    Meu nome é João. Encontrei o negócio de vocês e gostei bastante
    do trabalho. Eu trabalho com soluções de presença digital e acredito
    que posso ajudar a ${business.toLowerCase()} a conseguir mais clientes
    através da internet. Tenho uma ideia rápida que pode ser interessante
    para vocês. Posso explicar em um minutinho?
  `;

}


/* =====================================
   BADGE DE CONTACTO
===================================== */

function contactBadge(type) {

  if (type === "whatsapp") {

    return `
      <div class="contact-type contact-whatsapp">
        🟢 WHATSAPP DISPONÍVEL
      </div>
    `;

  }


  if (type === "fixed") {

    return `
      <div class="contact-type contact-fixed">
        📞 NÚMERO FIXO — LIGAR
      </div>

      <div class="fixed-warning">

        <strong>
          ⚠️ ATENÇÃO
        </strong>

        Este número não possui WhatsApp.
        É um telefone fixo.
        <b>Ligue para o estabelecimento.</b>

      </div>
    `;

  }


  if (type === "phone") {

    return `
      <div class="contact-type contact-phone">
        ☎️ TELEFONE — LIGAR
      </div>

      <div class="fixed-warning">

        <strong>
          📞 CONTACTO POR TELEFONE
        </strong>

        Este contacto está disponível por telefone.
        <b>Ligue para o estabelecimento.</b>

      </div>
    `;

  }


  return "";

}


/* =====================================
   CRIAR LEADS
===================================== */

function createLeads(
  country,
  business,
  city,
  quantity
) {

  const leads = [];

  const names =
    DEMO_NAMES[country];


  for (
    let i = 0;
    i < quantity;
    i++
  ) {

    const name =
      names[i % names.length];

    const contact =
      getContact(
        country,
        i
      );

    const website =
      getWebsite(
        name,
        i
      );


    leads.push({

      id:
        `${country}-${Date.now()}-${i}`,

      name,

      business,

      city,

      country,

      countryName:
        COUNTRY_DATA[country].name,

      flag:
        COUNTRY_DATA[country].flag,

      website,

      phone:
        contact.number,

      contactType:
        contact.type,

      score:
        96 - ((i * 3) % 15),

      approach:
        createApproach(
          name,
          business,
          country
        ),

      callScript:
        createCallScript(
          name,
          business,
          country
        ),

      createdAt:
        new Date().toISOString()

    });

  }


  return leads;

}


/* =====================================
   LINKS
===================================== */

function whatsappLink(phone) {

  return (
    "https://wa.me/" +
    phone.replace(/\D/g, "")
  );

}


function phoneLink(phone) {

  return (
    "tel:" +
    phone.replace(/[^\d+]/g, "")
  );

}


/* =====================================
   COPY
===================================== */

async function copyText(text) {

  const cleanText =
    text
      .replace(/\s+/g, " ")
      .trim();


  try {

    await navigator.clipboard.writeText(
      cleanText
    );

    toast("Copiado!");

  } catch {

    toast(
      "Não foi possível copiar."
    );

  }

}


/* =====================================
   CARD
===================================== */

function leadCard(lead) {

  const saved =
    state.saved.some(
      item => item.id === lead.id
    );


  const websiteHTML =
    lead.website

      ? `
        <a
          href="${lead.website}"
          target="_blank"
          rel="noopener"
        >
          🌐 Abrir site
        </a>
      `

      : `
        <strong>
          🚫 site off
        </strong>
      `;


  const phone =
    lead.phone;


  const needsCall =
    lead.contactType === "fixed" ||
    lead.contactType === "phone";


  const contactButton =
    lead.contactType === "whatsapp"

      ? `
        <a
          class="lead-button primary"
          href="${whatsappLink(phone)}"
          target="_blank"
          rel="noopener"
        >
          💬 Abrir WhatsApp
        </a>
      `

      : `
        <a
          class="lead-button call"
          href="${phoneLink(phone)}"
        >
          📞 LIGAR AGORA
        </a>
      `;


  const callBox =
    needsCall

      ? `
        <div class="call-box">

          <span class="approach-label">
            📞 O QUE FALAR NA LIGAÇÃO
          </span>

          <div class="call-text">
            ${lead.callScript}
          </div>

        </div>
      `

      : "";


  return `

    <article class="lead-card">

      <div class="lead-top">

        <div>

          <div class="lead-name">
            ${lead.name}
          </div>

          <div class="lead-location">
            ${lead.flag}
            ${lead.city} •
            ${lead.countryName}
          </div>

        </div>

        <span class="lead-score">
          ${lead.score}% match
        </span>

      </div>


      <div class="lead-info">

        <div class="info-row">
          🏢
          <strong>
            ${lead.business}
          </strong>
        </div>

        <div class="info-row">
          🌐
          ${websiteHTML}
        </div>

        <div class="info-row">
          📱
          <a href="${phoneLink(phone)}">
            ${phone}
          </a>
        </div>

        ${contactBadge(
          lead.contactType
        )}

      </div>


      <div class="approach-box">

        <span class="approach-label">
          💬 ABORDAGEM PROFISSIONAL
        </span>

        <div class="approach-text">
          ${lead.approach}
        </div>

      </div>


      ${callBox}


      <div class="lead-actions">

        ${contactButton}


        <button
          class="lead-button"
          onclick='copyText(${JSON.stringify(
            lead.approach
          )})'
        >
          📋 Copiar abordagem
        </button>


        ${
          needsCall

            ? `
              <button
                class="lead-button call"
                onclick='copyText(${JSON.stringify(
                  lead.callScript
                )})'
              >
                📞 Copiar roteiro
              </button>
            `

            : `
              <button
                class="lead-button"
                onclick='copyText(${JSON.stringify(
                  lead.phone
                )})'
              >
                📱 Copiar número
              </button>
            `
        }


        <button
          class="lead-button ${
            saved ? "primary" : ""
          }"
          onclick="toggleSave('${lead.id}')"
        >
          ${
            saved
              ? "★ Salvo"
              : "☆ Salvar lead"
          }
        </button>

      </div>

    </article>

  `;

}


/* =====================================
   RENDER
===================================== */

function renderLeads() {

  const container =
    $("#results");


  $("#resultsCount")
    .textContent =
    `${currentLeads.length} leads`;


  if (!currentLeads.length) {

    container.innerHTML = `
      <div class="empty-state">

        <div>🔎</div>

        <h3>
          Nenhum lead encontrado
        </h3>

        <p>
          Tente outra cidade ou segmento.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML =
    currentLeads
      .map(lead => leadCard(lead))
      .join("");

}


/* =====================================
   SALVAR
===================================== */

function toggleSave(id) {

  const exists =
    state.saved.find(
      lead => lead.id === id
    );


  if (exists) {

    state.saved =
      state.saved.filter(
        lead => lead.id !== id
      );

    toast(
      "Lead removido dos salvos."
    );

  } else {

    const lead =
      currentLeads.find(
        item => item.id === id
      );


    if (!lead) return;


    state.saved.push(lead);

    toast(
      "Lead salvo!"
    );

  }


  saveState();

  updateStats();

  renderLeads();

}


/* =====================================
   SALVOS
===================================== */

function renderSaved() {

  const container =
    $("#savedResults");


  if (!state.saved.length) {

    container.innerHTML = `
      <div class="empty-state">

        <div>★</div>

        <h3>
          Nenhum lead salvo
        </h3>

        <p>
          Salve os melhores leads durante suas pesquisas.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML =
    state.saved
      .map(lead => leadCard(lead))
      .join("");

}


/* =====================================
   HISTÓRICO
===================================== */

function renderHistory() {

  const container =
    $("#historyResults");


  if (!state.history.length) {

    container.innerHTML = `
      <div class="empty-state">

        <div>◷</div>

        <h3>
          Nenhuma pesquisa ainda
        </h3>

        <p>
          Suas pesquisas aparecerão aqui.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML =
    state.history
      .slice()
      .reverse()
      .map(item => {

        const date =
          new Date(
            item.date
          ).toLocaleString(
            "pt-BR",
            {
              dateStyle: "short",
              timeStyle: "short"
            }
          );


        return `
          <div class="history-item">

            <div class="history-main">

              <strong>
                ${COUNTRY_DATA[item.country].flag}
                ${escapeHTML(item.business)}
              </strong>

              <p>
                ${escapeHTML(item.city)} •
                ${COUNTRY_DATA[item.country].name} •
                ${item.quantity} leads
              </p>

            </div>

            <div class="history-date">
              ${date}
            </div>

          </div>
        `;

      })
      .join("");

}


/* =====================================
   PESQUISA
===================================== */

async function searchLeads() {

  const country =
    $("#country").value;

  const business =
    $("#business").value.trim();

  const city =
    $("#city").value.trim();

  const quantity =
    Number(
      $("#quantity").value
    );


  if (!business) {

    toast(
      "Digite o tipo de negócio."
    );

    $("#business").focus();

    return;
  }


  if (!city) {

    toast(
      "Digite a cidade."
    );

    $("#city").focus();

    return;
  }


  const button =
    $("#searchBtn");

  const loading =
    $("#loading");


  button.disabled = true;

  button.textContent =
    "🔎 PROCURANDO...";

  loading.classList.remove(
    "hidden"
  );


  const messages = [

    "Localizando empresas...",

    "Analisando presença online...",

    "Verificando sites...",

    "Separando WhatsApp e telefones fixos...",

    "Preparando as abordagens...",

    "Preparando os roteiros de ligação..."

  ];


  let messageIndex = 0;


  const interval =
    setInterval(() => {

      messageIndex =
        (messageIndex + 1)
        % messages.length;

      $("#loadingText")
        .textContent =
        messages[messageIndex];

    }, 700);


  try {

    /*
      IMPORTANTE:

      Esta parte ainda gera leads
      de demonstração.

      Depois podemos conectar
      uma API/backend real aqui.
    */


    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          2200
        )
    );


    currentLeads =
      createLeads(
        country,
        business,
        city,
        quantity
      );


    state.found +=
      currentLeads.length;

    state.searches++;


    state.history.push({

      country,

      business,

      city,

      quantity,

      date:
        new Date().toISOString()

    });


    state.history =
      state.history.slice(-30);


    saveState();

    updateStats();

    renderLeads();


    toast(
      `🚀 ${currentLeads.length} leads encontrados!`
    );

  } catch (error) {

    console.error(error);

    toast(
      "Erro ao procurar leads."
    );

  } finally {

    clearInterval(interval);

    loading.classList.add(
      "hidden"
    );

    button.disabled = false;

    button.textContent =
      "🚀 PROCURAR LEADS";

  }

}


/* =====================================
   NAVEGAÇÃO
===================================== */

function openSection(id) {

  $$(".section").forEach(
    section =>
      section.classList.remove(
        "active-section"
      )
  );


  $(`#${id}`)
    .classList.add(
      "active-section"
    );


  $$(".nav-item").forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.section === id
      );

    }
  );


  if (id === "saved") {
    renderSaved();
  }

  if (id === "history") {
    renderHistory();
  }

}


$$(".nav-item").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        openSection(
          button.dataset.section
        );

      }
    );

  }
);


$$("[data-go]").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        openSection(
          button.dataset.go
        );

      }
    );

  }
);


/* =====================================
   AUTOCOMPLETE EVENTS
===================================== */

$("#business")
  .addEventListener(
    "input",
    renderBusinessSuggestions
  );


$("#business")
  .addEventListener(
    "focus",
    renderBusinessSuggestions
  );


$("#city")
  .addEventListener(
    "input",
    renderCitySuggestions
  );


$("#city")
  .addEventListener(
    "focus",
    renderCitySuggestions
  );


/*
  Quando muda o país,
  atualiza as cidades e negócios.
*/

$("#country")
  .addEventListener(
    "change",
    () => {

      $("#businessSuggestions")
        .classList.remove("show");

      $("#citySuggestions")
        .classList.remove("show");

      /*
        Se o usuário já estiver
        com algum texto digitado,
        atualiza as sugestões.
      */

      if (
        document.activeElement ===
        $("#business")
      ) {

        renderBusinessSuggestions();

      }

      if (
        document.activeElement ===
        $("#city")
      ) {

        renderCitySuggestions();

      }

    }
  );


/*
  Fecha sugestões quando
  clicar fora dos campos.
*/

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.closest(
        ".autocomplete-field"
      )
    ) {

      $("#businessSuggestions")
        .classList.remove("show");

      $("#citySuggestions")
        .classList.remove("show");

    }

  }
);


/* =====================================
   ENTER
===================================== */

$("#business")
  .addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();

        $("#businessSuggestions")
          .classList.remove("show");

        $("#city").focus();

      }

    }
  );


$("#city")
  .addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();

        $("#citySuggestions")
          .classList.remove("show");

        searchLeads();

      }

    }
  );


/* =====================================
   PESQUISAR
===================================== */

$("#searchBtn")
  .addEventListener(
    "click",
    searchLeads
  );


/* =====================================
   RELÓGIO
===================================== */

function updateClock() {

  $("#clock")
    .textContent =
    new Date().toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

}

setInterval(
  updateClock,
  1000
);

updateClock();


/* =====================================
   THEME
===================================== */

$("#themeBtn")
  .addEventListener(
    "click",
    () => {

      toast(
        "O modo escuro está otimizado para prospecção."
      );

    }
  );


/* =====================================
   TOAST
===================================== */

let toastTimer;

function toast(message) {

  const element =
    $("#toast");

  $("#toastText")
    .textContent =
    message;

  element.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        element.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* =====================================
   INICIALIZAÇÃO
===================================== */

updateStats();

renderSaved();

renderHistory();

openSection(
  "dashboard"
);
