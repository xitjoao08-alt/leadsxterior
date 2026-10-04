/* =========================================================
   LEADXTERIOR V2
   Demo frontend
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =========================
   DADOS
========================= */

const motivations = [
  "Você é um futuro milionário? Então bora trabalhar.",
  "Enquanto muitos estão pensando, você está construindo.",
  "Cada lead pode ser o cliente que muda seu mês.",
  "Não espere oportunidade. Procure por ela.",
  "Trabalhe em silêncio. Deixe seus resultados falarem.",
  "Hoje é mais um dia para chegar mais perto do seu objetivo.",
  "Quem prospecta, vende. Quem vende, cresce."
];

const cities = {
  BR: [
    "Jales", "São Paulo", "Campinas", "Ribeirão Preto",
    "São José do Rio Preto", "Bauru", "Presidente Prudente",
    "Araçatuba", "Sorocaba", "Santos", "Franca",
    "Marília", "São Carlos", "Araraquara", "Piracicaba",
    "Uberlândia", "Uberaba", "Belo Horizonte", "Juiz de Fora",
    "Montes Claros", "Varginha", "Poços de Caldas"
  ],

  PT: [
    "Lisboa", "Porto", "Braga", "Coimbra", "Aveiro",
    "Faro", "Setúbal", "Leiria", "Sintra",
    "Cascais", "Guimarães", "Viseu", "Évora"
  ],

  US: [
    "Miami", "Orlando", "New York", "Los Angeles",
    "Boston", "Chicago", "Houston", "Dallas",
    "Austin", "Atlanta", "Las Vegas", "San Diego",
    "Phoenix", "Tampa", "Seattle"
  ]
};

const businesses = {
  BR: [
    "Barbearia",
    "Salão de beleza",
    "Clínica odontológica",
    "Clínica estética",
    "Restaurante",
    "Pizzaria",
    "Hamburgueria",
    "Loja de roupas",
    "Academia",
    "Studio de tatuagem",
    "Pet shop",
    "Auto center",
    "Oficina mecânica",
    "Imobiliária",
    "Fotógrafo",
    "Confeitaria",
    "Doceria",
    "Sorveteria",
    "Mercado",
    "Loja de móveis"
  ],

  PT: [
    "Barbearia",
    "Cabeleireiro",
    "Clínica dentária",
    "Clínica estética",
    "Restaurante",
    "Café",
    "Pastelaria",
    "Pizzaria",
    "Ginásio",
    "Loja de roupa",
    "Agência imobiliária",
    "Fotógrafo",
    "Confeitaria",
    "Pet shop",
    "Oficina automóvel"
  ],

  US: [
    "Barbershop",
    "Beauty salon",
    "Dental clinic",
    "Med spa",
    "Restaurant",
    "Coffee shop",
    "Pizza restaurant",
    "Gym",
    "Clothing store",
    "Real estate agency",
    "Tattoo studio",
    "Auto repair shop",
    "Pet shop",
    "Bakery",
    "Photography studio"
  ]
};

const fakeNames = {
  BR: [
    "Studio Prime",
    "Espaço Bella",
    "Barbearia Imperial",
    "Clínica Vida",
    "Elite Concept",
    "Casa do Corte",
    "Urban Style",
    "Espaço Saúde",
    "Prime Estética",
    "Bella Forma",
    "Point Business",
    "Studio Exclusive",
    "Viva Bem",
    "Golden Concept",
    "Original Barber"
  ],

  PT: [
    "Lisboa Prime",
    "Studio Bella",
    "Porto Concept",
    "Espaço Elegance",
    "Braga Style",
    "Casa Prime",
    "Urban Lisboa",
    "Elite Beauty",
    "Porto Saúde",
    "Bella Studio",
    "Concept Center",
    "Premium Space",
    "Original Style",
    "Portugal Prime",
    "Nova Era"
  ],

  US: [
    "Prime Studio",
    "Urban Barber",
    "Elite Beauty",
    "Downtown Concept",
    "Miami Style",
    "Premium Cuts",
    "Modern House",
    "Prime Dental",
    "Urban Wellness",
    "Golden Studio",
    "Next Level",
    "The Beauty Room",
    "City Barber",
    "Elite Center",
    "Original Studio"
  ]
};

/* =========================
   ESTADO
========================= */

let leads = JSON.parse(localStorage.getItem("leadxterior_leads") || "[]");
let savedLeads = JSON.parse(localStorage.getItem("leadxterior_saved") || "[]");
let history = JSON.parse(localStorage.getItem("leadxterior_history") || "[]");
let searchCount = Number(localStorage.getItem("leadxterior_searches") || 0);

/* =========================
   UTILIDADES
========================= */

function saveState() {
  localStorage.setItem("leadxterior_leads", JSON.stringify(leads));
  localStorage.setItem("leadxterior_saved", JSON.stringify(savedLeads));
  localStorage.setItem("leadxterior_history", JSON.stringify(history));
  localStorage.setItem("leadxterior_searches", searchCount);
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomPhone(country) {
  if (country === "BR") {
    return `(17) 9${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}`;
  }

  if (country === "PT") {
    return `9${Math.floor(10000000 + Math.random() * 89999999)}`;
  }

  return `+1 (${Math.floor(200 + Math.random() * 700)}) ${Math.floor(200 + Math.random() * 700)}-${Math.floor(1000 + Math.random() * 8999)}`;
}

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

function countryName(country) {
  return {
    BR: "Brasil",
    PT: "Portugal",
    US: "Estados Unidos"
  }[country];
}

/* =========================
   MOTIVAÇÃO
========================= */

function updateMotivation() {
  const phrase = randomFrom(motivations);

  if ($("#dashboardPhrase")) {
    $("#dashboardPhrase").textContent = phrase;
  }

  if ($("#introPhrase")) {
    $("#introPhrase").textContent = phrase;
  }
}

updateMotivation();

/* =========================
   AUTOCOMPLETE NEGÓCIO
========================= */

function renderBusinessSuggestions() {
  const country = $("#country").value;
  const value = normalizeText($("#business").value);

  let results = businesses[country];

  if (value) {
    results = results.filter(item =>
      normalizeText(item).includes(value)
    );
  }

  results = results.slice(0, 7);

  const container = $("#businessSuggestions");

  if (!results.length) {
    container.style.display = "none";
    return;
  }

  container.innerHTML = results.map(item => `
    <div class="suggestion" data-business="${item}">
      ${item}
    </div>
  `).join("");

  container.style.display = "block";

  container.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", () => {
      $("#business").value = item.dataset.business;
      container.style.display = "none";
      $("#city").focus();
    });
  });
}

/* =========================
   AUTOCOMPLETE CIDADE
========================= */

function renderCitySuggestions() {
  const country = $("#country").value;
  const value = normalizeText($("#city").value);

  let results = cities[country];

  if (value) {
    results = results.filter(item =>
      normalizeText(item).includes(value)
    );
  }

  results = results.slice(0, 7);

  const container = $("#citySuggestions");

  if (!results.length) {
    container.style.display = "none";
    return;
  }

  container.innerHTML = results.map(item => `
    <div class="suggestion" data-city="${item}">
      ${item}
    </div>
  `).join("");

  container.style.display = "block";

  container.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", () => {
      $("#city").value = item.dataset.city;
      container.style.display = "none";
    });
  });
}

$("#business").addEventListener("input", renderBusinessSuggestions);
$("#business").addEventListener("focus", renderBusinessSuggestions);

$("#city").addEventListener("input", renderCitySuggestions);
$("#city").addEventListener("focus", renderCitySuggestions);

$("#country").addEventListener("change", () => {
  $("#business").value = "";
  $("#city").value = "";

  $("#businessSuggestions").style.display = "none";
  $("#citySuggestions").style.display = "none";
});

/* =========================
   FECHAR SUGESTÕES
========================= */

document.addEventListener("click", (event) => {
  if (!event.target.closest(".autocomplete-field")) {
    $("#businessSuggestions").style.display = "none";
    $("#citySuggestions").style.display = "none";
  }
});

/* =========================
   GERAR LEADS DEMO
========================= */

function generateLeads(country, business, city, quantity) {

  const generated = [];

  for (let i = 0; i < quantity; i++) {

    const nameBase = fakeNames[country][i % fakeNames[country].length];

    const variations = [
      "",
      " Premium",
      " Concept",
      " Studio",
      " Prime",
      " Center"
    ];

    const name = nameBase + variations[i % variations.length];

    const hasWebsite = i % 4 !== 0;
    const hasInstagram = i % 5 !== 0;
    const hasWhatsApp = i % 3 !== 0;

    let opportunity = "medium";
    let score = 60;

    if (!hasWebsite) {
      score += 18;
    }

    if (hasWhatsApp) {
      score += 8;
    }

    if (hasInstagram) {
      score += 5;
    }

    if (score >= 78) {
      opportunity = "high";
    } else if (score < 55) {
      opportunity = "low";
    }

    generated.push({
      id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`,
      name,
      country,
      business: business || randomFrom(businesses[country]),
      city: city || randomFrom(cities[country]),
      phone: randomPhone(country),
      whatsapp: hasWhatsApp ? randomPhone(country) : null,
      website: hasWebsite ? `https://www.google.com/search?q=${encodeURIComponent(name + " " + city)}` : null,
      instagram: hasInstagram ? `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(name)}` : null,
      opportunity,
      score,
      status: "new",
      saved: false,
      createdAt: new Date().toISOString()
    });
  }

  return generated;
}

/* =========================
   BUSCAR LEADS
========================= */

async function searchLeads() {

  const country = $("#country").value;
  const business = $("#business").value.trim();
  const city = $("#city").value.trim();
  const quantity = Number($("#quantity").value);

  if (!business) {
    $("#business").focus();
    alert("Digite o tipo de negócio.");
    return;
  }

  if (!city) {
    $("#city").focus();
    alert("Digite ou selecione uma cidade.");
    return;
  }

  $("#results").classList.add("hidden");
  $("#loading").classList.remove("hidden");
  $("#searchBtn").disabled = true;

  await new Promise(resolve => setTimeout(resolve, 1800));

  const newLeads = generateLeads(
    country,
    business,
    city,
    quantity
  );

  leads = [...newLeads, ...leads];

  searchCount++;

  history.unshift({
    id: Date.now(),
    country,
    business,
    city,
    quantity,
    date: new Date().toLocaleString("pt-BR")
  });

  history = history.slice(0, 30);

  saveState();

  $("#loading").classList.add("hidden");
  $("#results").classList.remove("hidden");
  $("#searchBtn").disabled = false;

  renderLeads(newLeads);

  $("#resultCount").textContent = `${newLeads.length} leads`;

  $("#resultDescription").textContent =
    `${business} em ${city} • ${countryName(country)}`;

  updateDashboard();
  renderHistory();
  renderCRM();
}

/* =========================
   RENDER LEAD
========================= */

function renderLeads(list) {

  const container = $("#leadList");

  container.innerHTML = list.map((lead, index) => {

    const opportunityText = {
      high: "ALTA OPORTUNIDADE",
      medium: "MÉDIA OPORTUNIDADE",
      low: "BAIXA OPORTUNIDADE"
    }[lead.opportunity];

    return `
      <article class="lead-card" style="animation-delay:${index * 40}ms">

        <div class="lead-top">

          <div class="lead-main">

            <div class="lead-avatar">
              ${getInitials(lead.name)}
            </div>

            <div class="lead-info">

              <h3>${lead.name}</h3>

              <p>
                ${lead.business} • ${lead.city}, ${countryName(lead.country)}
              </p>

              <div class="lead-tags">
                <span class="tag">Score ${lead.score}/100</span>

                ${!lead.website
                  ? `<span class="tag">Sem site</span>`
                  : `<span class="tag">Site encontrado</span>`
                }

                ${lead.whatsapp
                  ? `<span class="tag">WhatsApp</span>`
                  : `<span class="tag">Sem WhatsApp</span>`
                }

                ${lead.instagram
                  ? `<span class="tag">Instagram</span>`
                  : ""
                }
              </div>

            </div>

          </div>

          <div class="opportunity ${lead.opportunity}">
            ${opportunityText}
          </div>

        </div>

        <div class="lead-details">

          <div class="detail-box">
            <small>Telefone</small>
            <span>${lead.phone}</span>
          </div>

          <div class="detail-box">
            <small>WhatsApp</small>
            ${
              lead.whatsapp
              ? `<a href="https://wa.me/${cleanPhone(lead.whatsapp)}" target="_blank">${lead.whatsapp}</a>`
              : `<span>Não encontrado</span>`
            }
          </div>

          <div class="detail-box">
            <small>Site</small>
            ${
              lead.website
              ? `<a href="${lead.website}" target="_blank">Abrir site ↗</a>`
              : `<span>site off</span>`
            }
          </div>

          <div class="detail-box">
            <small>Instagram</small>
            ${
              lead.instagram
              ? `<a href="${lead.instagram}" target="_blank">Ver Instagram ↗</a>`
              : `<span>Não encontrado</span>`
            }
          </div>

        </div>

        <div class="lead-actions">

          ${
            lead.whatsapp
            ? `
              <button class="action-btn whatsapp" data-action="whatsapp" data-id="${lead.id}">
                WhatsApp
              </button>
            `
            : ""
          }

          <button class="action-btn primary" data-action="approach" data-id="${lead.id}">
            ✍ Abordagem
          </button>

          <button class="action-btn" data-action="call" data-id="${lead.id}">
            ☏ Ligação
          </button>

          <button class="action-btn" data-action="proposal" data-id="${lead.id}">
            📝 Proposta
          </button>

          <button class="action-btn" data-action="crm" data-id="${lead.id}">
            ▣ CRM
          </button>

          <button class="action-btn ${savedLeads.some(x => x.id === lead.id) ? "starred" : ""}"
                  data-action="save"
                  data-id="${lead.id}">
            ★ ${savedLeads.some(x => x.id === lead.id) ? "Salvo" : "Salvar"}
          </button>

        </div>

      </article>
    `;
  }).join("");

  attachLeadEvents(container);
}

/* =========================
   TELEFONE
========================= */

function cleanPhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

/* =========================
   EVENTOS DOS LEADS
========================= */

function attachLeadEvents(container) {

  container.querySelectorAll("[data-action]").forEach(button => {

    button.addEventListener("click", () => {

      const lead = leads.find(item =>
        item.id === button.dataset.id
      );

      if (!lead) return;

      const action = button.dataset.action;

      if (action === "whatsapp") {
        openWhatsApp(lead);
      }

      if (action === "approach") {
        showApproach(lead);
      }

      if (action === "call") {
        showCallScript(lead);
      }

      if (action === "proposal") {
        showProposal(lead);
      }

      if (action === "crm") {
        showCRMSelector(lead);
      }

      if (action === "save") {
        toggleSaved(lead);
      }

    });

  });
}

/* =========================
   WHATSAPP
========================= */

function openWhatsApp(lead) {

  if (!lead.whatsapp) {
    alert("Este lead não possui WhatsApp encontrado.");
    return;
  }

  const message = getApproach(lead);

  const url =
    `https://wa.me/${cleanPhone(lead.whatsapp)}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* =========================
   ABORDAGEM
========================= */

function getApproach(lead) {

  if (lead.country === "BR") {

    return `Olá! Tudo bem? Me chamo João.

Encontrei a ${lead.name} e gostei bastante do trabalho de vocês.

Eu trabalho com soluções digitais para empresas e percebi que posso ajudar a ${lead.name} a ter uma presença ainda mais profissional na internet.

Posso te mostrar uma ideia rápida e sem compromisso de como ficaria?`;

  }

  if (lead.country === "PT") {

    return `Olá! Tudo bem?

O meu nome é João e trabalho com soluções digitais para empresas.

Encontrei a ${lead.name} e estive a analisar a presença da empresa online.

Tenho uma ideia simples que pode ajudar a melhorar a apresentação do negócio na internet.

Posso enviar-lhe uma pequena demonstração, sem qualquer compromisso?`;

  }

  return `Hi! How are you?

My name is João and I work with digital solutions for local businesses.

I found ${lead.name} and took a quick look at your online presence.

I have a simple idea that could help make your business look even more professional online.

Would you like me to send you a quick demo?`;
}

/* =========================
   ROTEIRO DE LIGAÇÃO
========================= */

function getCallScript(lead) {

  if (lead.country === "BR") {

    return `Olá, tudo bem? Eu poderia falar com o responsável pela ${lead.name}?

Meu nome é João.

Eu trabalho ajudando empresas locais a melhorar a presença delas na internet.

Encontrei a empresa de vocês e queria apresentar uma ideia bem rápida.

Não quero tomar muito tempo. Posso explicar em 30 segundos?

[ESPERE]

Eu analisei a presença digital da empresa e acredito que existe uma oportunidade de melhorar a forma como novos clientes encontram vocês.

Eu posso preparar uma demonstração sem compromisso e enviar pelo WhatsApp.

Qual seria o melhor número para eu enviar?`;

  }

  if (lead.country === "PT") {

    return `Olá, boa tarde. Poderia falar com o responsável pela ${lead.name}?

O meu nome é João e trabalho com soluções digitais para empresas.

Encontrei a vossa empresa online e reparei que existe uma oportunidade interessante para melhorar a presença digital.

Não quero tomar muito do seu tempo.

Posso explicar rapidamente a ideia?

[ESPERE]

Posso preparar uma demonstração sem qualquer compromisso e enviar por WhatsApp ou e-mail.

Qual seria a melhor forma de enviar?`;

  }

  return `Hi, could I speak with the person responsible for ${lead.name}?

My name is João and I help local businesses improve their online presence.

I found your business online and noticed an opportunity that could help you attract more customers.

I don't want to take much of your time.

Can I explain the idea in 30 seconds?

[WAIT]

I can prepare a quick demo specifically for your business, completely free.

What's the best way to send it to you?`;
}

/* =========================
   PROPOSTA
========================= */

function getProposal(lead) {

  if (lead.country === "BR") {

    return `PROPOSTA — ${lead.name}

Olá!

Preparei esta proposta pensando especificamente na ${lead.name}.

OBJETIVO

Criar uma presença digital mais profissional para facilitar que novos clientes encontrem e conheçam a empresa.

O QUE PODE SER DESENVOLVIDO

• Página profissional
• Informações do negócio
• Botão direto para WhatsApp
• Localização
• Serviços
• Redes sociais
• Design adaptado para celular
• Estrutura focada em conversão

INVESTIMENTO

Projeto personalizado conforme a necessidade da empresa.

PRÓXIMO PASSO

Posso preparar uma demonstração visual antes de qualquer contratação.

Sem compromisso.`;

  }

  if (lead.country === "PT") {

    return `PROPOSTA — ${lead.name}

Olá!

Preparei uma proposta inicial para a ${lead.name}.

OBJETIVO

Criar uma presença digital moderna e profissional para ajudar novos clientes a encontrar e contactar a empresa.

INCLUI

• Página profissional
• Serviços
• Contacto direto
• WhatsApp
• Localização
• Redes sociais
• Design responsivo
• Estrutura focada em conversão

O projecto pode ser adaptado às necessidades específicas da empresa.

Posso preparar uma demonstração visual sem qualquer compromisso.`;

  }

  return `PROPOSAL — ${lead.name}

Hello!

I prepared a quick proposal specifically for ${lead.name}.

OBJECTIVE

Create a modern and professional online presence that makes it easier for new customers to discover and contact the business.

INCLUDES

• Professional landing page
• Services section
• Direct contact
• WhatsApp integration
• Location
• Social media
• Mobile-friendly design
• Conversion-focused structure

I can prepare a free visual demo specifically for your business before you decide anything.`;
}

/* =========================
   MODAL
========================= */

function openModal(content) {
  $("#modalContent").innerHTML = content;
  $("#modalOverlay").classList.remove("hidden");
}

function closeModal() {
  $("#modalOverlay").classList.add("hidden");
}

$("#closeModal").addEventListener("click", closeModal);

$("#modalOverlay").addEventListener("click", event => {
  if (event.target === $("#modalOverlay")) {
    closeModal();
  }
});

/* =========================
   MODAL ABORDAGEM
========================= */

function showApproach(lead) {

  const text = getApproach(lead);

  openModal(`
    <div class="eyebrow">ABORDAGEM PERSONALIZADA</div>
    <h2>${lead.name}</h2>
    <p class="modal-subtitle">
      Mensagem preparada para ${countryName(lead.country)}.
    </p>

    <div class="modal-section">
      <label>MENSAGEM</label>
      <div class="modal-text" id="modalText">${text}</div>
      <button class="copy-btn" onclick="copyModalText()">
        Copiar mensagem
      </button>
    </div>
  `);
}

/* =========================
   MODAL LIGAÇÃO
========================= */

function showCallScript(lead) {

  const text = getCallScript(lead);

  openModal(`
    <div class="eyebrow">ROTEIRO DE LIGAÇÃO</div>
    <h2>${lead.name}</h2>
    <p class="modal-subtitle">
      Fale com segurança e seja profissional.
    </p>

    <div class="modal-section">
      <label>O QUE FALAR</label>
      <div class="modal-text" id="modalText">${text}</div>
      <button class="copy-btn" onclick="copyModalText()">
        Copiar roteiro
      </button>
    </div>
  `);
}

/* =========================
   MODAL PROPOSTA
========================= */

function showProposal(lead) {

  const text = getProposal(lead);

  openModal(`
    <div class="eyebrow">PROPOSTA COMERCIAL</div>
    <h2>${lead.name}</h2>
    <p class="modal-subtitle">
      Proposta inicial personalizada.
    </p>

    <div class="modal-section">
      <label>PROPOSTA</label>
      <div class="modal-text" id="modalText">${text}</div>
      <button class="copy-btn" onclick="copyModalText()">
        Copiar proposta
      </button>
    </div>
  `);
}

function copyModalText() {

  const text = $("#modalText").innerText;

  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Copiado!");
    })
    .catch(() => {
      alert("Não foi possível copiar automaticamente.");
    });
}

/* =========================
   SALVAR LEAD
========================= */

function toggleSaved(lead) {

  const exists = savedLeads.some(item => item.id === lead.id);

  if (exists) {
    savedLeads = savedLeads.filter(item => item.id !== lead.id);
    lead.saved = false;
  } else {
    savedLeads.unshift(lead);
    lead.saved = true;
  }

  saveState();

  renderSaved();

  const visibleResults = [...document.querySelectorAll(".lead-card")];

  if (visibleResults.length) {
    const current = leads.filter(item =>
      visibleResults.some(card =>
        card.querySelector(`[data-id="${item.id}"]`)
      )
    );

    if (current.length) {
      renderLeads(current);
    }
  }

  updateDashboard();
}

/* =========================
   CRM
========================= */

function showCRMSelector(lead) {

  openModal(`
    <div class="eyebrow">ATUALIZAR CRM</div>
    <h2>${lead.name}</h2>
    <p class="modal-subtitle">
      Escolha a etapa atual desta oportunidade.
    </p>

    <div class="crm-options">
      <button class="action-btn primary" onclick="changeLeadStatus('${lead.id}','new')">
        Novo
      </button>

      <button class="action-btn" onclick="changeLeadStatus('${lead.id}','contacted')">
        Contatado
      </button>

      <button class="action-btn" onclick="changeLeadStatus('${lead.id}','replied')">
        Respondeu
      </button>

      <button class="action-btn" onclick="changeLeadStatus('${lead.id}','negotiating')">
        Negociando
      </button>

      <button class="action-btn" onclick="changeLeadStatus('${lead.id}','closed')">
        Fechou
      </button>
    </div>
  `);
}

function changeLeadStatus(id, status) {

  const lead = leads.find(item => item.id === id);

  if (!lead) return;

  lead.status = status;

  saveState();
  closeModal();

  renderCRM();
  updateDashboard();
}

/* =========================
   RENDER CRM
========================= */

function renderCRM() {

  const statuses = [
    "new",
    "contacted",
    "replied",
    "negotiating",
    "closed"
  ];

  statuses.forEach(status => {

    const container = $(`#pipeline-${status}`);
    const count = $(`#count-${status}`);

    if (!container || !count) return;

    const filtered = leads.filter(
      lead => lead.status === status
    );

    count.textContent = filtered.length;

    container.innerHTML = filtered.slice(0, 15).map(lead => `
      <div class="pipeline-card" data-crm-id="${lead.id}">
        <strong>${lead.name}</strong>
        <small>${lead.city}</small>
        <span class="mini-score">
          ${lead.score}/100
        </span>
      </div>
    `).join("");

    container.querySelectorAll("[data-crm-id]").forEach(card => {

      card.addEventListener("click", () => {

        const lead = leads.find(
          item => item.id === card.dataset.crmId
        );

        if (lead) showCRMSelector(lead);
      });

    });
  });
}

/* =========================
   MEUS LEADS
========================= */

function renderSaved() {

  const container = $("#savedList");

  if (!savedLeads.length) {
    container.innerHTML = "";
    $("#emptySaved").classList.remove("hidden");
    return;
  }

  $("#emptySaved").classList.add("hidden");

  container.innerHTML = savedLeads.map(lead => `
    <article class="lead-card">

      <div class="lead-top">

        <div class="lead-main">

          <div class="lead-avatar">
            ${getInitials(lead.name)}
          </div>

          <div class="lead-info">
            <h3>${lead.name}</h3>

            <p>
              ${lead.business} • ${lead.city}
            </p>

            <div class="lead-tags">
              <span class="tag">Score ${lead.score}/100</span>
              <span class="tag">★ Favorito</span>
            </div>
          </div>

        </div>

        <div class="opportunity ${lead.opportunity}">
          ${lead.opportunity === "high"
            ? "ALTA OPORTUNIDADE"
            : lead.opportunity === "medium"
              ? "MÉDIA OPORTUNIDADE"
              : "BAIXA OPORTUNIDADE"}
        </div>

      </div>

      <div class="lead-actions">

        ${
          lead.whatsapp
          ? `<button class="action-btn whatsapp" data-saved-action="whatsapp" data-id="${lead.id}">
              WhatsApp
            </button>`
          : ""
        }

        <button class="action-btn primary" data-saved-action="approach" data-id="${lead.id}">
          ✍ Abordagem
        </button>

        <button class="action-btn" data-saved-action="crm" data-id="${lead.id}">
          ▣ CRM
        </button>

        <button class="action-btn starred" data-saved-action="remove" data-id="${lead.id}">
          ★ Remover
        </button>

      </div>

    </article>
  `).join("");

  container.querySelectorAll("[data-saved-action]").forEach(button => {

    button.addEventListener("click", () => {

      const lead = leads.find(
        item => item.id === button.dataset.id
      );

      if (!lead) return;

      const action = button.dataset.savedAction;

      if (action === "whatsapp") openWhatsApp(lead);
      if (action === "approach") showApproach(lead);
      if (action === "crm") showCRMSelector(lead);

      if (action === "remove") {
        savedLeads = savedLeads.filter(
          item => item.id !== lead.id
        );

        lead.saved = false;

        saveState();
        renderSaved();
      }

    });

  });
}

/* =========================
   HISTÓRICO
========================= */

function renderHistory() {

  const container = $("#historyList");

  if (!history.length) {
    container.innerHTML = "";
    $("#emptyHistory").classList.remove("hidden");
    return;
  }

  $("#emptyHistory").classList.add("hidden");

  container.innerHTML = history.map(item => `
    <div class="history-item">

      <div>
        <strong>
          ${item.business} — ${item.city}
        </strong>

        <small>
          ${countryName(item.country)} •
          ${item.quantity} leads •
          ${item.date}
        </small>
      </div>

      <div class="history-badge">
        ${item.quantity} leads
      </div>

    </div>
  `).join("");
}

$("#clearHistory").addEventListener("click", () => {

  if (!history.length) return;

  if (confirm("Deseja realmente apagar o histórico?")) {

    history = [];

    saveState();
    renderHistory();
  }

});

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

  $("#statLeads").textContent = leads.length;

  $("#statHot").textContent =
    leads.filter(lead => lead.opportunity === "high").length;

  $("#statContacted").textContent =
    leads.filter(lead =>
      ["contacted", "replied", "negotiating", "closed"]
        .includes(lead.status)
    ).length;

  $("#statClosed").textContent =
    leads.filter(lead => lead.status === "closed").length;
}

/* =========================
   NAVEGAÇÃO
========================= */

function showSection(sectionId) {

  $$(".section").forEach(section => {
    section.classList.remove("active-section");
  });

  const section = $(`#${sectionId}`);

  if (!section) return;

  section.classList.add("active-section");

  $$(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.section === sectionId
    );
  });

  const titles = {
    dashboard: "Dashboard",
    search: "Encontrar Leads",
    crm: "CRM",
    saved: "Meus Leads",
    history: "Histórico"
  };

  $("#pageTitle").textContent = titles[sectionId] || "LEADXTERIOR";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (sectionId === "saved") renderSaved();
  if (sectionId === "crm") renderCRM();
  if (sectionId === "history") renderHistory();
}

$$(".nav-item").forEach(button => {

  button.addEventListener("click", () => {
    showSection(button.dataset.section);
  });

});

$$("[data-go]").forEach(button => {

  button.addEventListener("click", () => {
    showSection(button.dataset.go);
  });

});

/* =========================
   QUICK SEARCH
========================= */

$$("[data-search]").forEach(button => {

  button.addEventListener("click", () => {

    const business = button.dataset.search;

    showSection("search");

    $("#business").value = business;
    $("#city").focus();

  });

});

/* =========================
   ENTER
========================= */

$("#business").addEventListener("keydown", event => {

  if (event.key === "Enter") {
    $("#city").focus();
  }

});

$("#city").addEventListener("keydown", event => {

  if (event.key === "Enter") {
    searchLeads();
  }

});

/* =========================
   BOTÃO PESQUISAR
========================= */

$("#searchBtn").addEventListener("click", searchLeads);

/* =========================
   INICIALIZAÇÃO
========================= */

renderSaved();
renderHistory();
renderCRM();
updateDashboard();

console.log(`
LEADXTERIOR V2
Sistema iniciado.

Modo: DEMONSTRAÇÃO
Leads reais: ainda não conectados
Banco: LocalStorage
`);
