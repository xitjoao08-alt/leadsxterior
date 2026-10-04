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


/* =========================
   COUNTRIES
========================= */

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


/* =========================
   DEMO LEADS
========================= */

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


/* =========================
   CONTACT DATA
========================= */

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

    return contacts[index % contacts.length];
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

    return contacts[index % contacts.length];
  }


  /* EUA */

  if (country === "US") {

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

    return contacts[index % contacts.length];
  }


  return {
    number: "",
    type: "unknown"
  };

}


/* =========================
   WEBSITE
========================= */

function getWebsite(name, index) {

  if (index % 4 === 3) {
    return null;
  }

  return (
    "https://www." +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 22) +
    ".com"
  );

}


/* =========================
   APPROACH
========================= */

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
      I’m reaching out because I believe I could help you strengthen your
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


/* =========================
   CALL SCRIPT
========================= */

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


/* =========================
   CONTACT BADGE
========================= */

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
          📞 CONTATO POR LIGAÇÃO
        </strong>

        Este contacto está disponível por telefone.
        <b>Ligue para o estabelecimento.</b>

      </div>
    `;

  }


  return "";

}


/* =========================
   CREATE LEADS
========================= */

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


/* =========================
   LINKS
========================= */

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


/* =========================
   COPY
========================= */

async function copyText(text) {

  const cleanText =
    text.replace(/\s+/g, " ").trim();


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


/* =========================
   LEAD CARD
========================= */

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


  const fixed =
    lead.contactType === "fixed";

  const phone =
    lead.phone;


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
    fixed || lead.contactType === "phone"

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
          fixed || lead.contactType === "phone"

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
          ${saved ? "★ Salvo" : "☆ Salvar lead"}
        </button>

      </div>

    </article>

  `;

}


/* =========================
   RENDER
========================= */

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


/* =========================
   SAVE
========================= */

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


/* =========================
   SAVED
========================= */

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


/* =========================
   HISTORY
========================= */

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
                ${item.business}
              </strong>

              <p>
                ${item.city} •
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


/* =========================
   SEARCH
========================= */

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

    }, 1000);


  try {

    /*
      ATUALMENTE É DEMONSTRAÇÃO.

      Aqui será conectado o backend real.

      Exemplo:

      const response = await fetch(
        "https://SEU-BACKEND/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            country,
            business,
            city,
            limit: quantity
          })
        }
      );

      currentLeads =
        await response.json();
    */


    await new Promise(
      resolve =>
        setTimeout(resolve, 2200)
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


/* =========================
   NAVIGATION
========================= */

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


/* =========================
   EVENTS
========================= */

$("#searchBtn")
  .addEventListener(
    "click",
    searchLeads
  );


$("#business")
  .addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        searchLeads();
      }

    }
  );


$("#city")
  .addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        searchLeads();
      }

    }
  );


/* =========================
   CLOCK
========================= */

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


/* =========================
   THEME
========================= */

$("#themeBtn")
  .addEventListener(
    "click",
    () => {

      toast(
        "O modo escuro está otimizado para prospecção."
      );

    }
  );


/* =========================
   INIT
========================= */

updateStats();

renderSaved();

renderHistory();

openSection("dashboard");
