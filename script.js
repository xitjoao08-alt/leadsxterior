const state = {

  saved:
    JSON.parse(
      localStorage.getItem("leadxterior_saved") || "[]"
    ),

  history:
    JSON.parse(
      localStorage.getItem("leadxterior_history") || "[]"
    ),

  found:
    Number(
      localStorage.getItem("leadxterior_found") || 0
    ),

  searches:
    Number(
      localStorage.getItem("leadxterior_searches") || 0
    )

};


const $ = (selector) =>
  document.querySelector(selector);


const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


/* =========================
   STORAGE
========================= */

function saveState() {

  localStorage.setItem(
    "leadxterior_saved",
    JSON.stringify(state.saved)
  );

  localStorage.setItem(
    "leadxterior_history",
    JSON.stringify(state.history)
  );

  localStorage.setItem(
    "leadxterior_found",
    state.found
  );

  localStorage.setItem(
    "leadxterior_searches",
    state.searches
  );

  updateStats();

}


/* =========================
   ESTATÍSTICAS
========================= */

function updateStats() {

  $("#foundCount").textContent =
    state.found;

  $("#savedCount").textContent =
    state.saved.length;

  $("#searchCount").textContent =
    state.searches;

}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    $("#toast");

  toast.textContent =
    message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* =========================
   NAVEGAÇÃO
========================= */

function openPage(pageName) {

  $$(".page").forEach(page => {

    page.classList.toggle(
      "active",
      page.id === pageName
    );

  });


  $$(".nav-item").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );

  });


  if (pageName === "saved") {

    renderSaved();

  }


  if (pageName === "history") {

    renderHistory();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


$$(".nav-item").forEach(button => {

  button.addEventListener(
    "click",
    () => openPage(button.dataset.page)
  );

});


$$("[data-go]").forEach(button => {

  button.addEventListener(
    "click",
    () => openPage(button.dataset.go)
  );

});


/* =========================
   ABORDAGEM
========================= */

function createApproach(
  name,
  business,
  city,
  country
) {

  return `Olá! Tudo bem? Encontrei a ${name} e gostei do trabalho de vocês. Estou entrando em contato porque acredito que posso ajudar a ${business.toLowerCase()} a fortalecer ainda mais sua presença online. Posso te mostrar uma ideia rápida, sem compromisso?`;

}


/* =========================
   DADOS DE DEMONSTRAÇÃO
========================= */

function createDemoLeads(
  country,
  business,
  city,
  quantity
) {

  const brazilNames = [

    "Studio Prime",
    "Barbearia Central",
    "Espaço Premium",
    "Barbearia Imperial",
    "Studio 7",
    "Barber House",
    "Clínica Vida",
    "Espaço Saúde",
    "Bella Estética",
    "Prime Concept",
    "Studio Elegance",
    "Viva Mais",
    "Urban Club",
    "Essência",
    "Conecta"

  ];


  const portugalNames = [

    "Studio Lisboa",
    "Clínica Central",
    "Espaço Chiado",
    "Barbearia Porto",
    "Prime Lisboa",
    "Saúde & Bem-Estar",
    "Studio Douro",
    "Clínica Atlântica",
    "Bella Porto",
    "Espaço Lusitano",
    "Urban Studio",
    "Essência Lisboa",
    "Viva Saúde",
    "Concept PT",
    "Porto Prime"

  ];


  const names =
    country === "BR"
      ? brazilNames
      : portugalNames;


  return Array.from(
    {
      length: quantity
    },
    (_, index) => {

      const name =
        names[
          index % names.length
        ];


      const hasSite =
        index % 4 !== 0;


      const whatsapp =
        country === "BR"

          ? `+55 17 9${String(
              10000000 + index
            ).slice(-8)}`

          : `+351 91${String(
              1000000 + index
            ).slice(-6)}`;


      return {

        id:
          `${country}-${Date.now()}-${index}`,

        name,

        business,

        city,

        country,

        site:
          hasSite
            ? `https://${name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "")}.com`
            : "",

        whatsapp,

        score:
          88 - (index % 9),

        approach:
          createApproach(
            name,
            business,
            city,
            country
          )

      };

    }
  );

}


/* =========================
   ESCAPE
========================= */

function escapeHTML(value) {

  return String(value)
    .replace(
      /[&<>"']/g,
      character => {

        const map = {

          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"

        };

        return map[character];

      }
    );

}


/* =========================
   RENDER LEADS
========================= */

function renderLeads(
  leads,
  container
) {

  container.innerHTML = "";


  leads.forEach(
    (lead, index) => {

      const isSaved =
        state.saved.some(
          saved =>
            saved.id === lead.id
        );


      const card =
        document.createElement("article");


      card.className =
        "lead-card";


      card.innerHTML = `

        <div class="lead-top">

          <span class="lead-number">

            LEAD #
            ${String(index + 1)
              .padStart(2, "0")}

          </span>

          <span class="score">

            🔥 ${lead.score}/100

          </span>

        </div>


        <h3>
          ${escapeHTML(lead.name)}
        </h3>


        <div class="lead-meta">

          📍
          ${escapeHTML(lead.city)}

          •

          ${lead.country === "BR"
            ? "🇧🇷 Brasil"
            : "🇵🇹 Portugal"}

        </div>


        <div class="lead-line">

          <span class="label">
            Site
          </span>

          ${
            lead.site

              ? `
                <a
                  href="${lead.site}"
                  target="_blank"
                  rel="noopener"
                >
                  ${escapeHTML(lead.site)}
                </a>
              `

              : `
                <span class="site-off">
                  Site OFF
                </span>
              `
          }

        </div>


        <div class="lead-line">

          <span class="label">
            WhatsApp
          </span>

          <a
            href="https://wa.me/${lead.whatsapp.replace(
              /\D/g,
              ""
            )}"
            target="_blank"
            rel="noopener"
          >
            ${escapeHTML(
              lead.whatsapp
            )}
          </a>

        </div>


        <div class="approach">

          <strong>
            ABORDAGEM PROFISSIONAL
          </strong>

          ${escapeHTML(
            lead.approach
          )}

        </div>


        <div class="lead-actions">

          <button
            class="small-button"
            data-copy="${encodeURIComponent(
              lead.approach
            )}"
          >
            📋 Copiar
          </button>


          <button
            class="small-button"
            data-save="${lead.id}"
          >
            ${
              isSaved
                ? "★ Salvo"
                : "☆ Salvar lead"
            }
          </button>


          <a
            class="small-button primary-mini"
            href="https://wa.me/${lead.whatsapp.replace(
              /\D/g,
              ""
            )}"
            target="_blank"
            rel="noopener"
          >
            WhatsApp ↗
          </a>

        </div>

      `;


      container.appendChild(card);

    }
  );


  container
    .querySelectorAll("[data-copy]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const text =
            decodeURIComponent(
              button.dataset.copy
            );


          navigator.clipboard.writeText(
            text
          );


          showToast(
            "Abordagem copiada!"
          );

        }
      );

    });


  container
    .querySelectorAll("[data-save]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const lead =
            leads.find(
              item =>
                item.id ===
                button.dataset.save
            );


          toggleSave(lead);

        }
      );

    });

}


/* =========================
   SALVAR LEAD
========================= */

function toggleSave(lead) {

  const index =
    state.saved.findIndex(
      item =>
        item.id === lead.id
    );


  if (index >= 0) {

    state.saved.splice(
      index,
      1
    );

    showToast(
      "Lead removido dos salvos."
    );

  } else {

    state.saved.push(lead);

    showToast(
      "Lead salvo com sucesso!"
    );

  }


  saveState();


  renderSaved();

}


/* =========================
   MEUS LEADS
========================= */

function renderSaved() {

  const container =
    $("#savedResults");

  const empty =
    $("#emptySaved");


  empty.classList.toggle(
    "hidden",
    state.saved.length > 0
  );


  if (
    state.saved.length === 0
  ) {

    container.innerHTML = "";

    return;

  }


  renderLeads(
    state.saved,
    container
  );

}


/* =========================
   HISTÓRICO
========================= */

function renderHistory() {

  const container =
    $("#historyList");

  const empty =
    $("#emptyHistory");


  container.innerHTML = "";


  empty.classList.toggle(
    "hidden",
    state.history.length > 0
  );


  state.history
    .slice()
    .reverse()
    .forEach(item => {

      const element =
        document.createElement("div");


      element.className =
        "history-item";


      element.innerHTML = `

        <div>

          <strong>
            ${escapeHTML(
              item.business
            )}
          </strong>

          <span>
            •
            ${escapeHTML(
              item.city
            )}
          </span>

          <br>

          <span>

            ${
              item.country === "BR"
                ? "🇧🇷 Brasil"
                : "🇵🇹 Portugal"
            }

            •

            ${item.count}
            leads

          </span>

        </div>


        <time>
          ${escapeHTML(
            item.time
          )}
        </time>

      `;


      container.appendChild(
        element
      );

    });

}


/* =========================
   BUSCA
========================= */

async function searchLeads() {

  const country =
    $("#country").value;

  const business =
    $("#business")
      .value
      .trim();

  const city =
    $("#city")
      .value
      .trim();

  const quantity =
    Number(
      $("#quantity").value
    );


  if (
    !business ||
    !city
  ) {

    showToast(
      "Preencha o negócio e a cidade."
    );

    return;

  }


  const button =
    $("#searchButton");

  const loading =
    $("#loading");


  button.disabled =
    true;

  loading.classList.remove(
    "hidden"
  );


  $("#resultsHeader")
    .classList.add(
      "hidden"
    );


  $("#results")
    .innerHTML = "";


  let seconds = 0;


  $("#loadingTimer")
    .textContent = "0s";


  const timer =
    setInterval(() => {

      seconds++;

      $("#loadingTimer")
        .textContent =
        `${seconds}s`;

    }, 1000);


  const messages = [

    "Procurando empresas...",

    "Verificando presença online...",

    "Analisando oportunidades...",

    "Organizando os melhores leads..."

  ];


  let messageIndex = 0;


  const messageTimer =
    setInterval(() => {

      messageIndex++;

      $("#loadingTitle")
        .textContent =
        messages[
          messageIndex %
          messages.length
        ];

    }, 1300);


  try {

    /*
      FUTURA API REAL

      Quando tivermos o backend,
      vamos colocar aqui a URL.

      Exemplo:

      const response =
        await fetch(
          "https://SEU-BACKEND/api/leads",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                country,
                business,
                city,
                limit: quantity
              })
          }
        );

      const leads =
        await response.json();
    */


    /*
      POR ENQUANTO:

      Dados de demonstração
      para testar o sistema.
    */

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          1600
        )
    );


    const leads =
      createDemoLeads(
        country,
        business,
        city,
        quantity
      );


    state.found +=
      leads.length;


    state.searches++;


    state.history.push({

      business,

      city,

      country,

      count:
        leads.length,

      time:
        new Date()
          .toLocaleString(
            "pt-BR"
          )

    });


    saveState();


    $("#resultsHeader")
      .classList.remove(
        "hidden"
      );


    $("#resultsTitle")
      .textContent =
      `${business} em ${city}`;


    $("#resultsCount")
      .textContent =
      `${leads.length} oportunidades`;


    renderLeads(
      leads,
      $("#results")
    );


    showToast(
      `${leads.length} leads encontrados!`
    );


  } catch (error) {

    console.error(error);

    showToast(
      "Erro ao realizar a pesquisa."
    );

  }


  clearInterval(timer);

  clearInterval(
    messageTimer
  );


  loading.classList.add(
    "hidden"
  );


  button.disabled =
    false;

}


/* =========================
   EVENTOS
========================= */

$("#searchButton")
  .addEventListener(
    "click",
    searchLeads
  );


/* =========================
   RELÓGIO
========================= */

function updateClock() {

  $("#clock")
    .textContent =
    new Date()
      .toLocaleTimeString(
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
   TEMA
========================= */

$("#themeButton")
  .addEventListener(
    "click",
    () => {

      showToast(
        "O modo escuro já está otimizado para o LEADXTERIOR."
      );

    }
  );


/* =========================
   INICIALIZAÇÃO
========================= */

updateStats();

renderSaved();

renderHistory();
