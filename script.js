const API_URL = "https://leadxterior-api.xitjao08.workers.dev";

const motivations = [
  "Você é um futuro milionário? Então bora trabalhar.",
  "Cada lead é uma nova oportunidade.",
  "Quem procura clientes todos os dias encontra resultados.",
  "Não espere oportunidades. Vá atrás delas.",
  "Hoje pode ser o dia do seu próximo cliente."
];

const cities = {
  BR: [
    "Jales",
    "São José do Rio Preto",
    "Votuporanga",
    "Fernandópolis",
    "Araçatuba",
    "Catanduva",
    "Ribeirão Preto",
    "Bauru",
    "Marília",
    "Presidente Prudente",
    "Campinas",
    "Sorocaba",
    "São Paulo"
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
    "Cascais"
  ],

  US: [
    "Miami",
    "Orlando",
    "New York",
    "Los Angeles",
    "Houston",
    "Dallas",
    "Chicago",
    "Boston",
    "Atlanta",
    "San Diego"
  ]
};

const businesses = {
  BR: [
    "Barbearia",
    "Salão de beleza",
    "Clínica odontológica",
    "Clínica médica",
    "Restaurante",
    "Pizzaria",
    "Hamburgueria",
    "Sorveteria",
    "Academia",
    "Loja de roupas",
    "Auto elétrica",
    "Oficina mecânica",
    "Imobiliária",
    "Pet shop",
    "Estética"
  ],

  PT: [
    "Barbearia",
    "Cabeleireiro",
    "Clínica dentária",
    "Restaurante",
    "Café",
    "Pizzaria",
    "Ginásio",
    "Loja de roupa",
    "Oficina",
    "Imobiliária",
    "Pet shop"
  ],

  US: [
    "Barbershop",
    "Hair salon",
    "Dental clinic",
    "Restaurant",
    "Pizza restaurant",
    "Gym",
    "Clothing store",
    "Auto repair",
    "Real estate agency",
    "Pet shop",
    "Coffee shop"
  ]
};

let leads = JSON.parse(localStorage.getItem("leadxterior_leads") || "[]");
let saved = JSON.parse(localStorage.getItem("leadxterior_saved") || "[]");

const $ = (selector) => document.querySelector(selector);

function saveStorage() {
  localStorage.setItem("leadxterior_leads", JSON.stringify(leads));
  localStorage.setItem("leadxterior_saved", JSON.stringify(saved));
  updateStats();
}

function updateStats() {
  $("#totalLeads").textContent = leads.length;
  $("#savedLeads").textContent = saved.length;

  const opportunities = leads.filter(
    lead => Number(lead.score || 0) >= 70
  ).length;

  $("#opportunities").textContent = opportunities;
}

function showSection(section) {

  document.querySelectorAll(".section").forEach(item => {
    item.classList.remove("active-section");
  });

  const target = document.getElementById(section);

  if (target) {
    target.classList.add("active-section");
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  const nav = document.querySelector(
    `.nav-item[data-section="${section}"]`
  );

  if (nav) nav.classList.add("active");

  const titles = {
    dashboard: "Olá, João 👋",
    search: "Encontrar Leads",
    saved: "Meus Leads"
  };

  $("#pageTitle").textContent = titles[section] || "LEADXTERIOR";
}

document.querySelectorAll(".nav-item").forEach(button => {

  button.addEventListener("click", () => {
    showSection(button.dataset.section);

    if (button.dataset.section === "saved") {
      renderSaved();
    }
  });

});

$("#startSearch").addEventListener("click", () => {
  showSection("search");
  $("#business").focus();
});

function setupAutocomplete(inputId, suggestionsId, sourceFunction) {

  const input = $(inputId);
  const suggestions = $(suggestionsId);

  input.addEventListener("input", () => {

    const value = input.value.trim().toLowerCase();

    if (!value) {
      suggestions.style.display = "none";
      return;
    }

    const items = sourceFunction()
      .filter(item =>
        item.toLowerCase().includes(value)
      )
      .slice(0, 6);

    if (!items.length) {
      suggestions.style.display = "none";
      return;
    }

    suggestions.innerHTML = items
      .map(item => `
        <div class="suggestion">
          ${escapeHtml(item)}
        </div>
      `)
      .join("");

    suggestions.style.display = "block";

    suggestions.querySelectorAll(".suggestion").forEach(item => {

      item.addEventListener("click", () => {
        input.value = item.textContent.trim();
        suggestions.style.display = "none";
      });

    });

  });

  document.addEventListener("click", event => {

    if (!input.contains(event.target) &&
        !suggestions.contains(event.target)) {

      suggestions.style.display = "none";
    }

  });
}

$("#country").addEventListener("change", () => {
  $("#city").value = "";
  $("#business").value = "";
});

setupAutocomplete(
  "#business",
  "#businessSuggestions",
  () => businesses[$("#country").value]
);

setupAutocomplete(
  "#city",
  "#citySuggestions",
  () => cities[$("#country").value]
);

async function searchLeads() {

  const country = $("#country").value;
  const business = $("#business").value.trim();
  const city = $("#city").value.trim();
  const quantity = Number($("#quantity").value);

  $("#searchMessage").textContent = "";

  if (!business || !city) {
    $("#searchMessage").textContent =
      "Preencha o tipo de negócio e a cidade.";
    return;
  }

  $("#loading").classList.remove("hidden");
  $("#resultsHeader").classList.add("hidden");
  $("#results").innerHTML = "";

  try {

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        country,
        business,
        city,
        quantity
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.details ||
        data.error ||
        "Não foi possível buscar os leads."
      );
    }

    leads = data.leads || [];

    saveStorage();

    $("#resultCount").textContent =
      `${leads.length} lead${leads.length === 1 ? "" : "s"}`;

    $("#resultsHeader").classList.remove("hidden");

    renderResults(leads);

  } catch (error) {

    console.error(error);

    $("#searchMessage").textContent =
      "Não foi possível buscar os leads. Verifique o Worker e tente novamente.";

  } finally {

    $("#loading").classList.add("hidden");
  }
}

$("#searchButton").addEventListener("click", searchLeads);

function renderResults(list) {

  const container = $("#results");

  if (!list.length) {

    container.innerHTML = `
      <div class="empty-state">
        <div>⌕</div>
        <h3>Nenhuma empresa encontrada</h3>
        <p>Tente outro negócio ou outra cidade.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = list.map(lead => {

    const phone = lead.phone || "";
    const whatsapp = normalizePhone(phone);

    const website = lead.website
      ? `<button class="action-btn primary"
           onclick="openUrl('${escapeAttr(lead.website)}')">
           Site
         </button>`
      : `<button class="action-btn">
           Site off
         </button>`;

    const phoneButton = phone
      ? `<button class="action-btn"
           onclick="callPhone('${escapeAttr(phone)}')">
           ☎ ${escapeHtml(phone)}
         </button>`
      : `<button class="action-btn">
           Sem telefone
         </button>`;

    const whatsappButton = whatsapp
      ? `<button class="action-btn"
           onclick="openUrl('https://wa.me/${whatsapp}')">
           WhatsApp
         </button>`
      : "";

    const mapsButton = lead.maps
      ? `<button class="action-btn"
           onclick="openUrl('${escapeAttr(lead.maps)}')">
           Maps
         </button>`
      : "";

    const savedButton = isSaved(lead.id)
      ? `<button class="action-btn" onclick="removeSaved('${escapeAttr(lead.id)}')">
           ★ Salvo
         </button>`
      : `<button class="action-btn" onclick="saveLead('${escapeAttr(lead.id)}')">
           ☆ Salvar
         </button>`;

    return `
      <article class="lead-card">

        <div class="lead-main">

          <h3>${escapeHtml(lead.name)}</h3>

          <div class="lead-meta">
            ${escapeHtml(lead.category || "")}<br>
            ${escapeHtml(lead.address || "Endereço não informado")}
            ${lead.rating ? `<br>⭐ ${lead.rating} (${lead.reviews || 0} avaliações)` : ""}
          </div>

          <div class="lead-score">
            OPORTUNIDADE ${lead.score || 0}/100
          </div>

        </div>

        <div class="lead-actions">

          ${website}

          ${phoneButton}

          ${whatsappButton}

          ${mapsButton}

          <button
            class="action-btn"
            onclick="showApproach('${escapeAttr(lead.id)}')">
            O que falar
          </button>

          ${savedButton}

        </div>

      </article>
    `;

  }).join("");
}

function renderSaved() {

  const container = $("#savedResults");
  const empty = $("#emptySaved");

  if (!saved.length) {
    container.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  container.innerHTML = saved.map(lead => {

    const phone = lead.phone || "";
    const whatsapp = normalizePhone(phone);

    return `
      <article class="lead-card">

        <div class="lead-main">

          <h3>${escapeHtml(lead.name)}</h3>

          <div class="lead-meta">
            ${escapeHtml(lead.category || "")}<br>
            ${escapeHtml(lead.address || "")}
          </div>

          <div class="lead-score">
            OPORTUNIDADE ${lead.score || 0}/100
          </div>

        </div>

        <div class="lead-actions">

          ${
            lead.website
              ? `<button class="action-btn primary"
                  onclick="openUrl('${escapeAttr(lead.website)}')">
                  Site
                </button>`
              : ""
          }

          ${
            whatsapp
              ? `<button class="action-btn"
                  onclick="openUrl('https://wa.me/${whatsapp}')">
                  WhatsApp
                </button>`
              : ""
          }

          <button
            class="action-btn"
            onclick="showApproach('${escapeAttr(lead.id)}')">
            O que falar
          </button>

          <button
            class="action-btn"
            onclick="removeSaved('${escapeAttr(lead.id)}')">
            Remover
          </button>

        </div>

      </article>
    `;

  }).join("");
}

function saveLead(id) {

  const lead = leads.find(item => item.id === id);

  if (!lead) return;

  if (!isSaved(id)) {
    saved.push(lead);
  }

  saveStorage();
  renderResults(leads);
}

function removeSaved(id) {

  saved = saved.filter(item => item.id !== id);

  saveStorage();

  renderResults(leads);
  renderSaved();
}

function isSaved(id) {
  return saved.some(item => item.id === id);
}

function showApproach(id) {

  const lead =
    leads.find(item => item.id === id) ||
    saved.find(item => item.id === id);

  if (!lead) return;

  const country = $("#country").value;

  let text = "";

  if (country === "PT") {

    text =
`Olá, tudo bem?

O meu nome é João.

Encontrei a ${lead.name} enquanto procurava empresas da região.

Trabalho com criação de presença digital e acredito que consigo ajudar o negócio a conseguir mais clientes através da internet.

Gostaria de lhe mostrar uma ideia rápida que preparei para a empresa.

Tem 2 minutos para eu explicar?`;

  } else if (country === "US") {

    text =
`Hi! My name is João.

I found ${lead.name} while looking for businesses in the area.

I work with digital presence and I noticed a few opportunities that could help your business attract more customers online.

I'd love to show you a quick idea I prepared.

Do you have two minutes?`;

  } else {

    text =
`Olá, tudo bem?

Meu nome é João.

Encontrei a ${lead.name} enquanto estava procurando empresas da região.

Eu trabalho com presença digital e percebi que posso ajudar a empresa a conseguir mais clientes pela internet.

Preparei uma ideia rápida para vocês.

Posso te mostrar?`;

  }

  $("#modalTitle").textContent = lead.name;

  $("#modalContent").textContent = text;

  $("#leadModal").classList.remove("hidden");
}

$("#closeModal").addEventListener("click", () => {
  $("#leadModal").classList.add("hidden");
});

document.querySelector(".modal-overlay").addEventListener("click", () => {
  $("#leadModal").classList.add("hidden");
});

function normalizePhone(phone) {

  if (!phone) return "";

  let number = phone.replace(/\D/g, "");

  if (!number) return "";

  if (number.startsWith("0")) {
    number = number.substring(1);
  }

  return number;
}

function callPhone(phone) {

  window.location.href =
    `tel:${phone}`;
}

function openUrl(url) {

  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

const motivation =
  motivations[
    Math.floor(Math.random() * motivations.length)
  ];

$("#motivationText").textContent = motivation;

updateStats();
